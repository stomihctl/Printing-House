import express from 'express'
import { JavnaNabavkaController } from '../controllers/javnaNabavka.controller'

const javnaNabavkaRouter = express.Router()

javnaNabavkaRouter.route('/kreiraj').post(
    (req, res) => new JavnaNabavkaController().kreiraj(req, res)
)

javnaNabavkaRouter.route('/otvorene').get(
    (req, res) => new JavnaNabavkaController().otvorene(req, res)
)

javnaNabavkaRouter.route('/posaljiPonudu/:id').put(
    (req, res) => new JavnaNabavkaController().posaljiPonudu(req, res)
)

javnaNabavkaRouter.route('/izvestaj/:korIme').get(
    (req, res) => new JavnaNabavkaController().izvestaj(req, res)
)

javnaNabavkaRouter.route('/sve').get(
    (req, res) => new JavnaNabavkaController().sve(req, res)
)

export default javnaNabavkaRouter