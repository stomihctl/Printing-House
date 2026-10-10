import express from 'express'
import FakturaModel from '../models/faktura'
import ProizvodModel from '../models/proizvod'
import KorisnikModel from '../models/korisnik'

function izvuciGrad(adresa: string): string {
    if (!adresa || !adresa.includes(',')) {
        return ""
    }
    let delovi = adresa.split(',')
    return delovi[delovi.length - 1].trim()
}

export class FakturaController {

    potvrdi = async (req: express.Request, res: express.Response) => {
        try {
            let korpa = req.body.korpa
            let kliKorIme = req.body.klijentKorIme

            let ukupnoPoProizvodu: { [proId: string]: number } = {}
            for (let st of korpa) {
                if (!ukupnoPoProizvodu[st.proId]) {
                    ukupnoPoProizvodu[st.proId] = 0
                }
                ukupnoPoProizvodu[st.proId] = ukupnoPoProizvodu[st.proId] + st.kolicina
            }

            for (let proId in ukupnoPoProizvodu) {
                let proizvod = await ProizvodModel.findById(proId)
                if (!proizvod) {
                    return res.json({ uspeh: false, poruka: "Jedan od proizvoda vise ne postoji" })
                }
                if (proizvod.kolicinaNaLageru! < ukupnoPoProizvodu[proId]) {
                    return res.json({ uspeh: false, poruka: "Nema dovoljno proizvoda '" + proizvod.naziv + "' trenutno na stanju" })
                }
            }

            let stamparije: string[] = []

            for (let st of korpa) {
                if (!stamparije.includes(st.stamparKorIme)) {
                    stamparije.push(st.stamparKorIme)
                }
            }

            for (let stKorIme of stamparije) {
                let stavke = korpa.filter((st: any) => st.stamparKorIme === stKorIme)

                let ukupno = 0
                for (let st of stavke) {
                    ukupno = ukupno + st.cena
                }

                let stampar = await KorisnikModel.findOne({ kor_ime: stKorIme })

                let faktura = new FakturaModel({
                    kliKorIme: kliKorIme,
                    stamparKorIme: stKorIme,
                    stamparGrad: stampar ? izvuciGrad(stampar.adresaSedista as string) : "",
                    proizvodi: stavke,
                    ukCena: ukupno,
                    status: "naruceno",
                    datum: new Date()
                })

                await faktura.save()
            }

            for (let st of korpa) {
                await ProizvodModel.findByIdAndUpdate(st.proId, { $inc: { kolicinaNaLageru: -st.kolicina } })
            }

            res.json({ uspeh: true, poruka: "Narudzbina uspesno kreirana" })

        } catch (err) {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri kreiranju narudzbine" })
        }
    }

    mojeNarudzbine = (req: express.Request, res: express.Response) => {
        FakturaModel.find({ kliKorIme: req.params.korIme }).sort({ datum: -1 }).then((f) => {
            res.json(f)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    otkazi = (req: express.Request, res: express.Response) => {
        FakturaModel.findById(req.params.id).then((faktura) => {
            if (!faktura) {
                return res.json({ uspeh: false, poruka: "Faktura ne postoji" })
            }
            if (faktura.status != 'naruceno') {
                return res.json({ uspeh: false, poruka: "Narudzbina se vise ne moze otkazati" })
            }

            FakturaModel.findByIdAndUpdate(req.params.id, { status: 'otkazano' }).then(() => {
                res.json({ uspeh: true, poruka: "Narudzbina otkazana" })
            })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska na serveru" })
        })
    }

    zaStampariju = (req: express.Request, res: express.Response) => {
        FakturaModel.find({ stamparKorIme: req.params.korIme }).sort({ datum: -1 }).then((f) => {
            res.json(f)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    promeniStatus = (req: express.Request, res: express.Response) => {
        FakturaModel.findById(req.params.id).then((faktura) => {
            if (!faktura) {
                return res.json({ uspeh: false, poruka: "Faktura ne postoji" })
            }

            let novi = ""

            if (faktura.status == 'naruceno') {
                novi = 'u stampi'
            }
            if (faktura.status == 'u stampi') {
                novi = 'isporuceno'
            }

            if (novi == "") {
                return res.json({ uspeh: false, poruka: "Status se ne moze dalje menjati" })
            }

            FakturaModel.findByIdAndUpdate(req.params.id, { status: novi }).then(() => {
                res.json({ uspeh: true, poruka: "Status promenjen" })
            })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska na serveru" })
        })
    }

    primi = (req: express.Request, res: express.Response) => {
        FakturaModel.findById(req.params.id).then((faktura) => {
            if (!faktura) {
                return res.json({ uspeh: false, poruka: "Faktura ne postoji" })
            }
            if (faktura.status != 'isporuceno') {
                return res.json({ uspeh: false, poruka: "Narudzbina jos nije isporucena" })
            }

            FakturaModel.findByIdAndUpdate(req.params.id, { status: 'primljeno' }).then(() => {
                res.json({ uspeh: true, poruka: "Oznaceno kao primljeno" })
            })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska na serveru" })
        })
    }
}