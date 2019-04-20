import mongoose from 'mongoose'

const Schema = module.Schema

const menuSchema = new mongoose.Schema({
  menuType: {
    type: Number,
  },
  menuContent: [
    {
      url: String,
      path: String,
    },
  ],
})

export default mongoose.model('Menu', menuSchema)
