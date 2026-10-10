import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller'

const korisnikRouter = express.Router()

korisnikRouter.route('/login').post(
    (req, res)=>new KorisnikController().login(req, res)
)

korisnikRouter.route('/register').post(
    (req, res)=>new KorisnikController().register(req, res)
)

korisnikRouter.route('/admin-login').post(
    (req, res) => new KorisnikController().adminLogin(req, res)
)

korisnikRouter.route('/svi').get(
    (req, res) => new KorisnikController().sviKor(req, res)
)

korisnikRouter.route('/neodobreni').get(
    (req, res) => new KorisnikController().neodobreni(req, res)
)

korisnikRouter.route('/odobri/:id').put(
    (req, res) => new KorisnikController().odobri(req, res)
)

korisnikRouter.route('/odbij/:id').put(
    (req, res) => new KorisnikController().odbij(req, res)
)

korisnikRouter.route('/dohvKor/:id').get(
    (req, res) => new KorisnikController().dohvKor(req, res)
)

korisnikRouter.route('/dohvKorIme/:ime').get(
    (req, res) => new KorisnikController().dohvKorIme(req, res)
)

korisnikRouter.route('/obrisiKor/:id').delete(
    (req, res) => new KorisnikController().obrisiKor(req, res)
)

korisnikRouter.route('/izmeniKor/:id').post(
    (req, res) => new KorisnikController().izmeniKor(req, res)
)

korisnikRouter.route('/brStamp').get(
    (req, res) => new KorisnikController().brStamp(req, res)
)

export default korisnikRouter