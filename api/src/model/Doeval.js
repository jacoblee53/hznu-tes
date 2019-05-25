import mongoose from 'mongoose'

const Schema = mongoose.Schema

const doevalSchema = new mongoose.Schema({
  dotaskId: {
    type: Schema.Types.ObjectId,
    ref: 'Dotask'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  grade: [{
    type: Array
  }]
}, {
  timestamps: true,
})

export default mongoose.model('Doeval', doevalSchema)