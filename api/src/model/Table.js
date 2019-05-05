import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tableSchema = new mongoose.Schema({

}, {
  timestamps: true,
})

export default mongoose.model('Table', tableSchema)