import mongoose from "mongoose";

const proizvodSchema = new mongoose.Schema({
  naziv: String,
  opis: String,
  kategorija: String,
  podkategorija: String,
  cena: Number,
  kolicinaNaLageru: Number,
  boje: Array,
  slika: String,
  uslugeStampe: Array,
  stamparKorIme: String,
  brojSvidjanja: Number,
  brojNesvidjanja: Number,
  komentari: Array,
  lajkovaliKorisnici: Array,
  nesvidjaliKorisnici: Array
})

export default mongoose.model('ProizvodModel', proizvodSchema, 'proizvodi')