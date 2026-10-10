import mongoose from "mongoose";

const kategorijaSchema = new mongoose.Schema({
  naziv: String,
  podkat: Array 
})

export default mongoose.model('KategorijaModel', kategorijaSchema, 'kategorije')