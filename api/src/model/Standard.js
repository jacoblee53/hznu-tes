import mongoose from 'mongoose'

const Schema = mongoose.Schema

const standardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
})

standardSchema.virtual('singles', {
  ref: 'Single',
  localField: '_id',
  foreignField: 'standardId',
  justOne: false
})


export default mongoose.model('Standard', standardSchema)