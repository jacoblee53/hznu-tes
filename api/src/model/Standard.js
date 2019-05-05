import mongoose from 'mongoose'

const Schema = mongoose.Schema

const standardSchema = new mongoose.Schema({
  standardName: {
    type: String,
    required: true,
  },
  tableId: {
    type: Schema.Types.ObjectId,
    ref: 'Table'
  }
}, {
  timestamps: true,
})

export default mongoose.model('Standard', standardSchema)