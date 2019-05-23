import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dotaskSchema = new mongoose.Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  }
}, {
  timestamps: true,
})

export default mongoose.model('Dotask', dotaskSchema)