import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import korisnikRouter from './routers/korisnik.router'
import kategorijaRouter from './routers/kategorija.router'
import fakturaRouter from './routers/faktura.router'
import proizvodRouter from './routers/proizvod.router'
import javnaNabavkaRouter from './routers/javnaNabavka.router'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

mongoose.connect('mongodb://localhost:27017/bazaProjekat')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("DB ok")
})

const router = express.Router()
router.use('/korisnici', korisnikRouter)
router.use('/kategorije', kategorijaRouter)
router.use('/proizvodi', proizvodRouter)
router.use('/fakture', fakturaRouter)
router.use('/javneNabavke', javnaNabavkaRouter)

app.router.use('/', router)
//app.get('/', (req, res)=> {res.send("Hello world!")})
app.listen(4000, ()=>console.log("Express running on port 4000!"))