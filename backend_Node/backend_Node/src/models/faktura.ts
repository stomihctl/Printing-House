import mongoose from "mongoose";

const fakturaSchema = new mongoose.Schema({
  kliKorIme: String,
  stamparKorIme: String,
  stamparGrad: String,
  proizvodi: Array,
  ukCena: Number,
  status: String,
  datum: Date
})

export default mongoose.model('FakturaModel', fakturaSchema, 'fakture')