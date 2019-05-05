
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const singleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  point: {
    type: String,
    required: true
  },
  standardId: {
    type: Schema.Types.ObjectId,
    ref: 'Standard'
  }
}, {
  timestamps: true,
})

export default mongoose.model('Single', singleSchema)