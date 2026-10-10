import express from 'express'
import KategorijaModel from '../models/kategorija'

export class KategorijaController {

    dohvSveKat = (req: express.Request, res: express.Response) => {
        KategorijaModel.find().then((k) => {
            res.json(k)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    dodajKat = (req: express.Request, res: express.Response) => {
        if (!req.body.naziv || req.body.naziv == '') {
            return res.json({ uspeh: false, poruka: "Naziv kategorije je obavezan" })
        }

        KategorijaModel.findOne({ naziv: req.body.naziv }).then((postoji) => {
            if (postoji) {
                return res.json({ uspeh: false, poruka: "Kategorija sa tim nazivom vec postoji" })
            }

            let kategorija = new KategorijaModel({
                naziv: req.body.naziv,
                potkategorije: []
            })

            kategorija.save().then((ok) => {
                res.json({ uspeh: true, poruka: "Kategorija dodata" })
            }).catch((err) => {
                console.log(err)
                res.json({ uspeh: false, poruka: "Greska pri dodavanju kategorije" })
            })
        })
    }

    dodajPodKat = (req: express.Request, res: express.Response) => {
        if (!req.body.podkat || req.body.podkat == '') {
            return res.json({ uspeh: false, poruka: "Naziv podkategorije je obavezan" })
        }

        KategorijaModel.findOne({ naziv: req.body.naziv }).then((k) => {
            if (!k) {
                return res.json({ uspeh: false, poruka: "Kategorija ne postoji" })
            }

            if (k.podkat.includes(req.body.podkat)) {
                return res.json({ uspeh: false, poruka: "Potkategorija vec postoji" })
            }

            KategorijaModel.findOneAndUpdate({ naziv: req.body.naziv }, { $push: { podkat: req.body.podkat } }).then((ok) => {
                res.json({ uspeh: true, poruka: "Potkategorija dodata" })
            }).catch((err) => {
                console.log(err)
                res.json({ uspeh: false, poruka: "Greska pri dodavanju podkategorije" })
            })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska na serveru" })
        })
    }
}