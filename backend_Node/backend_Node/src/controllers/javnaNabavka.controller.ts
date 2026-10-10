import express from 'express'
import JavnaNabavkaModel from '../models/javnaNabavka'
import ProizvodModel from '../models/proizvod'
import FakturaModel from '../models/faktura'
import KorisnikModel from '../models/korisnik'

function izvuciGrad(adresa: string): string {
    if (!adresa || !adresa.includes(',')) {
        return ""
    }
    let delovi = adresa.split(',')
    return delovi[delovi.length - 1].trim()
}

export class JavnaNabavkaController {

    kreiraj = (req: express.Request, res: express.Response) => {
        let korpa = req.body.korpa
        let kliKorIme = req.body.klijentKorIme

        let proizvodiZaNabavku = []
        for (let st of korpa) {
            proizvodiZaNabavku.push({ naziv: st.naziv, kolicina: st.kolicina })
        }

        let sad = new Date()
        let rok = new Date(sad.getTime() + 1 * 60000)

        let nabavka = new JavnaNabavkaModel({
            kliKorIme: kliKorIme,
            proizvodi: proizvodiZaNabavku,
            datumRaspisivanja: sad,
            rokIsteka: rok,
            status: "otvorena",
            ponude: [],
            pobednikStamparKorIme: ""
        })

        nabavka.save().then(() => {
            res.json({ uspeh: true, poruka: "Javna nabavka kreirana" })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri kreiranju nabavke" })
        })
    }

    otvorene = (req: express.Request, res: express.Response) => {
        JavnaNabavkaModel.find({ status: "otvorena" }).sort({ datumRaspisivanja: -1 }).then((nabavke) => {
            res.json(nabavke)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    posaljiPonudu = async (req: express.Request, res: express.Response) => {
        try {
            let nabavka = await JavnaNabavkaModel.findById(req.params.id)
            if (!nabavka) {
                return res.json({ uspeh: false, poruka: "Nabavka ne postoji" })
            }
            if (new Date() > nabavka.rokIsteka!) {
                return res.json({ uspeh: false, poruka: "Rok za ponude je istekao" })
            }

            let vecPoslao = false
            for (let p of nabavka.ponude as any[]) {
                if (p.stamparKorIme == req.body.stamparKorIme) {
                    vecPoslao = true
                }
            }
            if (vecPoslao) {
                return res.json({ uspeh: false, poruka: "Vec ste poslali ponudu za ovu nabavku" })
            }

            for (let s of req.body.stavke) {
                if (!s.cena || s.cena <= 0) {
                    return res.json({ uspeh: false, poruka: "Sve cene moraju biti vece od 0" })
                }
            }

            let ukupno = 0
            for (let s of req.body.stavke) {
                ukupno = ukupno + s.cena
            }

            let ponuda = {
                stamparKorIme: req.body.stamparKorIme,
                stavke: req.body.stavke,
                ukupno: ukupno,
                datum: new Date()
            }

            await JavnaNabavkaModel.findByIdAndUpdate(req.params.id, { $push: { ponude: ponuda } })

            res.json({ uspeh: true, poruka: "Ponuda poslata" })
        } catch (err) {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska na serveru" })
        }
    }

    // Poziva se automatski pri prijavi klijenta i zatvara sve njegove istekle nabavke
    zatvoriIstekleZaKlijenta = async (kliKorIme: string) => {
        let istekle = await JavnaNabavkaModel.find({
            kliKorIme: kliKorIme,
            status: "otvorena",
            rokIsteka: { $lt: new Date() }
        })

        for (let nabavka of istekle) {
            await this.zatvoriNabavku(nabavka)
        }
    }

    zatvoriNabavku = async (nabavka: any) => {
        let ponude = nabavka.ponude as any[]
        let najboljaPonuda: any = null

        for (let ponuda of ponude) {
            let imaDovoljno = true

            for (let stavka of ponuda.stavke) {
                let trazenKolicina = 0
                for (let p of nabavka.proizvodi as any[]) {
                    if (p.naziv == stavka.naziv) {
                        trazenKolicina = p.kolicina
                    }
                }

                let proizvod = await ProizvodModel.findOne({ naziv: stavka.naziv, stamparKorIme: ponuda.stamparKorIme })
                if (!proizvod || proizvod.kolicinaNaLageru! < trazenKolicina) {
                    imaDovoljno = false
                }
            }

            if (imaDovoljno) {
                if (!najboljaPonuda || ponuda.ukupno < najboljaPonuda.ukupno) {
                    najboljaPonuda = ponuda
                }
            }
        }

        if (najboljaPonuda) {
            await JavnaNabavkaModel.findByIdAndUpdate(nabavka._id, {
                status: "zatvorena",
                pobednikStamparKorIme: najboljaPonuda.stamparKorIme
            })

            let pobednikStampar = await KorisnikModel.findOne({ kor_ime: najboljaPonuda.stamparKorIme })

            let stavkeSaProId = []
            for (let stavka of najboljaPonuda.stavke) {
                let trazenKolicina = 0
                for (let p of nabavka.proizvodi as any[]) {
                    if (p.naziv == stavka.naziv) {
                        trazenKolicina = p.kolicina
                    }
                }

                let proizvod = await ProizvodModel.findOne({ naziv: stavka.naziv, stamparKorIme: najboljaPonuda.stamparKorIme })

                stavkeSaProId.push({
                    proId: proizvod ? proizvod._id : "",
                    naziv: stavka.naziv,
                    kolicina: trazenKolicina,
                    cena: stavka.cena
                })
            }

            let faktura = new FakturaModel({
                kliKorIme: nabavka.kliKorIme,
                stamparKorIme: najboljaPonuda.stamparKorIme,
                stamparGrad: pobednikStampar ? izvuciGrad(pobednikStampar.adresaSedista as string) : "",
                proizvodi: stavkeSaProId,
                ukCena: najboljaPonuda.ukupno,
                status: "u stampi",
                datum: new Date()
            })
            await faktura.save()

            for (let stavka of stavkeSaProId) {
                await ProizvodModel.findOneAndUpdate(
                    { naziv: stavka.naziv, stamparKorIme: najboljaPonuda.stamparKorIme },
                    { $inc: { kolicinaNaLageru: -stavka.kolicina } }
                )
            }
        } else {
            await JavnaNabavkaModel.findByIdAndUpdate(nabavka._id, { status: "neuspesna" })
        }
    }

    izvestaj = (req: express.Request, res: express.Response) => {
        JavnaNabavkaModel.find({ kliKorIme: req.params.korIme, status: { $ne: "otvorena" } }).sort({ datumRaspisivanja: -1 }).then((nabavke) => {
            res.json(nabavke)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    sve = (req: express.Request, res: express.Response) => {
        JavnaNabavkaModel.find().sort({ datumRaspisivanja: -1 }).then((nabavke) => {
            res.json(nabavke)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }
}