import mongoose from 'mongoose'

const Schema = module.Schema

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    unique: true,
  },
})

export default mongoose.model('Class', classSchema)
