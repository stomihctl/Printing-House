import mongoose from "mongoose";

const korisnikSchema = new mongoose.Schema({
  kor_ime: { type: String, required: true, unique: true },
  lozinka: { type: String, required: true },
  uloga: { type: String, enum: ["klijent", "stampar", "admin"], required: true },
  tip: { type: String, enum: ["fizicko", "pravno"] }, // samo za klijenta
  ime: String,
  prezime: String,
  telefon: String,
  mejl: { type: String, required: true, unique: true },
  profilnaSlika: { type: String, default: "default_profile_image.jpg" },

  // samo za pravno lice i stampare
  nazivInstitucije: String,
  adresaSedista: String,
  maticniBroj: String,
  pib: String,

  status: { type: String, enum: ["neaktivan", "aktivan", "odbijen"], default: "aktivan" }
})

export default mongoose.model('KorisnikModel', korisnikSchema, 'korisnici')