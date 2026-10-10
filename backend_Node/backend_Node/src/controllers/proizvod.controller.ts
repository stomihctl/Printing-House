import express from 'express'
import ProizvodModel from '../models/proizvod'

export class ProizvodController {

    dohvProizOdStamp = (req: express.Request, res: express.Response) => {
        ProizvodModel.find({ stamparKorIme: req.params.korIme }).then((proizvodi) => {
            res.json(proizvodi)
        }).catch((err) => {
            console.log(err)
            res.json({uspeh: false, poruka: "Greska pri dodavanju proizvoda"})
        })
    }

    dodajProiz = (req: express.Request, res: express.Response) => {
        if (!req.body.naziv || req.body.naziv == '') {
            return res.json({ uspeh: false, poruka: "Naziv proizvoda je obavezan" })
        }
        if (!req.body.cena || req.body.cena <= 0) {
            return res.json({ uspeh: false, poruka: "Cena mora biti veca od 0" })
        }
        if (req.body.kolicinaNaLageru == null || req.body.kolicinaNaLageru < 0) {
            return res.json({ uspeh: false, poruka: "Kolicina ne sme biti negativna" })
        }

        let proizvod = new ProizvodModel({
            naziv: req.body.naziv,
            opis: req.body.opis,
            kategorija: req.body.kategorija,
            podkategorija: req.body.podkategorija,
            cena: req.body.cena,
            kolicinaNaLageru: req.body.kolicinaNaLageru,
            boje: req.body.boje,
            slika: req.body.slika,
            uslugeStampe: req.body.uslugeStampe,
            stamparKorIme: req.body.stamparKorIme,
            brojSvidjanja: 0,
            brojNesvidjanja: 0
        })

        proizvod.save().then((ok) => {
            res.json({ uspeh: true, poruka: "Proizvod dodat" })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri dodavanju proizvoda" })
        })
    }

    azurirajKol = (req: express.Request, res: express.Response) => {
         if (req.body.kolicinaNaLageru == null || req.body.kolicinaNaLageru < 0) {
            return res.json({ uspeh: false, poruka: "Kolicina ne sme biti negativna" })
        }
        ProizvodModel.findByIdAndUpdate(req.params.id, { kolicinaNaLageru: req.body.kolicinaNaLageru }).then((ok) => {
            res.json({ uspeh: true, poruka: "Kolicina azurirana" })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri azuriranju" })
        })
    }


    topp = (req: express.Request, res: express.Response) => {
        ProizvodModel.find().sort({ brojSvidjanja: -1 }).limit(5).then((proizvodi) => {
            res.json(proizvodi)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    pretProiz = (req: express.Request, res: express.Response) => {
        let traNaziv = req.body.n
        let traKat = req.body.k
        let redosled = req.body.s

        let filter: any = { naziv: { $regex: traNaziv, $options: 'i' }, kolicinaNaLageru: { $gt: 0 }  }

        if (traKat !== 'Sve kategorije') {
            filter.kategorija = traKat
        }

        let poredjaj: any = {}

        switch (redosled) {
            case 'asc':
                poredjaj = { naziv: 1 }
                break
            case 'desc':
                poredjaj = { naziv: -1 }
                break
        }

        ProizvodModel.find(filter).sort(poredjaj).then((rez) => {
            res.json(rez)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    det = (req: express.Request, res: express.Response) => {
        ProizvodModel.findById(req.params.id).then((proizvod) => {
            res.json(proizvod)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    sveKat = (req: express.Request, res: express.Response) => {
        ProizvodModel.distinct('kategorija').then((kat) => {
            res.json(kat)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    svidi = async (req: express.Request, res: express.Response) => {
        let proizvod = await ProizvodModel.findById(req.params.id)
        if (!proizvod) {
            return res.json({ uspeh: false, poruka: "Proizvod ne postoji" })
        }

        let lajkovali = proizvod.lajkovaliKorisnici as any[]
        let nesvidjali = proizvod.nesvidjaliKorisnici as any[]

        if (lajkovali.includes(req.body.korIme) || nesvidjali.includes(req.body.korIme)) {
            return res.json({ uspeh: false, poruka: "Vec ste ocenili ovaj proizvod" })
        }

        await ProizvodModel.findByIdAndUpdate(req.params.id, {
            $inc: { brojSvidjanja: 1 },
            $push: { lajkovaliKorisnici: req.body.korIme }
        })

        res.json({ uspeh: true })
    }

    nesvidi = async (req: express.Request, res: express.Response) => {
        let proizvod = await ProizvodModel.findById(req.params.id)
        if (!proizvod) {
            return res.json({ uspeh: false, poruka: "Proizvod ne postoji" })
        }

        let lajkovali = proizvod.lajkovaliKorisnici as any[]
        let nesvidjali = proizvod.nesvidjaliKorisnici as any[]

        if (lajkovali.includes(req.body.korIme) || nesvidjali.includes(req.body.korIme)) {
            return res.json({ uspeh: false, poruka: "Vec ste ocenili ovaj proizvod" })
        }

        await ProizvodModel.findByIdAndUpdate(req.params.id, {
            $inc: { brojNesvidjanja: 1 },
            $push: { nesvidjaliKorisnici: req.body.korIme }
        })

        res.json({ uspeh: true })
    }

    komentarisi = async (req: express.Request, res: express.Response) => {
        let proizvod = await ProizvodModel.findById(req.params.id)
        if (!proizvod) {
            return res.json({ uspeh: false, poruka: "Proizvod ne postoji" })
        }

        let komentari = proizvod.komentari as any[]
        let vecKomentarisao = false
        for (let k of komentari) {
            if (k.korIme == req.body.korIme) {
                vecKomentarisao = true
            }
        }

        if (vecKomentarisao) {
            return res.json({ uspeh: false, poruka: "Vec ste komentarisali ovaj proizvod" })
        }

        let komentar = {
            korIme: req.body.korIme,
            tekst: req.body.tekst,
            datum: new Date()
        }

        await ProizvodModel.findByIdAndUpdate(req.params.id, { $push: { komentari: komentar } })

        res.json({ uspeh: true, poruka: "Komentar dodat" })
    }
}