import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dotaskSchema = new mongoose.Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  docPath: {
    type: String,
    default: ''
  },
  pptPath: {
    type: String,
    default: ''
  },
  mediaPath: {
    type: String,
    default: ''
  },
  docUploadDate: {
    type: Date
  },
  pptUploadDate: {
    type: Date
  },
  mediatUploadDate: {
    type: Date
  }
}, {
  timestamps: true,
})

export default mongoose.model('Dotask', dotaskSchema)