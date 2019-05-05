import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dotaskSchema = new mongoose.Schema({

}, {
  timestamps: true,
})

export default mongoose.model('Dotask', dotaskSchema)