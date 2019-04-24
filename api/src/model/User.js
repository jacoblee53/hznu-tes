import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema

/*
 * ROLE
 * 0 专家
 * 1 教师
 * 2 学生
 */

const userSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
    default: 2,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
})

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, 10)
}

userSchema.methods.generateJWT = function() {
  const { account, userName, role, classId, _id } = this
  return jwt.sign(
    {
      id: _id,
      account,
      userName,
      role,
      classId,
    },
    process.env.JWT_SECRET,
  )
}

userSchema.methods.toAuthJSON = function() {
  return { token: this.generateJWT() }
}

export default mongoose.model('User', userSchema)
