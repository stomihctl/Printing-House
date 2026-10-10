import express from 'express'
import { ProizvodController } from '../controllers/proizvod.controller'

const proizvodRouter = express.Router()

proizvodRouter.route('/dodajProiz').post(
    (req, res) => new ProizvodController().dodajProiz(req, res)
)

proizvodRouter.route('/azurirajKol/:id').put(
    (req, res) => new ProizvodController().azurirajKol(req, res)
)

proizvodRouter.route('/topp').get(
    (req, res) => new ProizvodController().topp(req, res)
)

proizvodRouter.route('/pretProiz').post(
    (req, res) => new ProizvodController().pretProiz(req, res)
)

proizvodRouter.route('/det/:id').get(
    (req, res) => new ProizvodController().det(req, res)
)

proizvodRouter.route('/sveKat').get(
    (req, res) => new ProizvodController().sveKat(req, res)
)

proizvodRouter.route('/svidi/:id').put(
    (req, res) => new ProizvodController().svidi(req, res)
)

proizvodRouter.route('/nesvidi/:id').put(
    (req, res) => new ProizvodController().nesvidi(req, res)
)

proizvodRouter.route('/komentarisi/:id').post(
    (req, res) => new ProizvodController().komentarisi(req, res)
)

proizvodRouter.route('/:korIme').get(
    (req, res) => new ProizvodController().dohvProizOdStamp(req, res)
)
export default proizvodRouter