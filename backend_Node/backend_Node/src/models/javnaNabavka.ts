import mongoose from "mongoose";

const javnaNabavkaSchema = new mongoose.Schema({
  kliKorIme: String,
  proizvodi: Array,
  datumRaspisivanja: Date,
  rokIsteka: Date,
  status: String,
  ponude: Array,
  pobednikStamparKorIme: String
})

export default mongoose.model('JavnaNabavkaModel', javnaNabavkaSchema, 'javneNabavke')