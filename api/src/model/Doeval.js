import mongoose from 'mongoose'

const Schema = mongoose.Schema

const doevalSchema = new mongoose.Schema({

}, {
  timestamps: true,
})

export default mongoose.model('Doeval', doevalSchema)