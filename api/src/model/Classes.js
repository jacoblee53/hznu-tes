import mongoose from 'mongoose'

const Schema = mongoose.Schema

const classesSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
})

export default mongoose.model('Classes', classesSchema)