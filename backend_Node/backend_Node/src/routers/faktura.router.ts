import express from 'express'
import { FakturaController } from '../controllers/faktura.controller'

const fakturaRouter = express.Router()

fakturaRouter.route('/potvrdi').post(
    (req, res) => new FakturaController().potvrdi(req, res)
)

fakturaRouter.route('/moje/:korIme').get(
    (req, res) => new FakturaController().mojeNarudzbine(req, res)
)

fakturaRouter.route('/otkazi/:id').put(
    (req, res) => new FakturaController().otkazi(req, res)
)

fakturaRouter.route('/zaStampariju/:korIme').get(
    (req, res) => new FakturaController().zaStampariju(req, res)
)

fakturaRouter.route('/promeniStatus/:id').put(
    (req, res) => new FakturaController().promeniStatus(req, res)
)

fakturaRouter.route('/primi/:id').put(
    (req, res) => new FakturaController().primi(req, res)
)
export default fakturaRouter