import mongoose from 'mongoose'

const Schema = mongoose.Schema

const standardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

export default mongoose.model('Standard', standardSchema)