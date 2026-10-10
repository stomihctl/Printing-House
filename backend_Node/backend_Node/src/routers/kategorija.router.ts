import express from 'express'
import { KategorijaController } from '../controllers/kategorija.controller'

const kategorijaRouter = express.Router()

kategorijaRouter.route('/dohvSveKat').get(
    (req, res) => new KategorijaController().dohvSveKat(req, res)
)

kategorijaRouter.route('/dodajKat').post(
    (req, res) => new KategorijaController().dodajKat(req, res)
)

kategorijaRouter.route('/dodajPodKat').put(
    (req, res) => new KategorijaController().dodajPodKat(req, res)
)

export default kategorijaRouter