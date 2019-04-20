import User from '../model/User'
import express from 'express'
import authToken from '../middleware/authToken'

const router = express.Router()

router.post('/register', (req, res) => {
  const { account, userName, password, role } = req.body
  const user = new User({ account, userName, role })

  user.setPassword(password)
  user
    .save()
    .then(r => {
      res.status(200).json({
        code: 200,
        msg: '注册成功',
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '注册失败',
        data: e,
      })
    })
})

router.post('/login', (req, res) => {
  const { account, password } = req.body

  User.findOne({
    account,
  })
    .then(r => {
      if (r && r.isValidPassword(password)) {
        res.status(200).json({
          code: 200,
          msg: '登录成功',
          data: r.toAuthJSON(),
        })
      } else {
        throw Error()
      }
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '登录失败',
        data: e,
      })
    })
})

router.post('/resetPwd', authToken, (req, res) => {
  const { newPwd, oldPwd } = req.body
  const { _id } = req.currentUser

  User.findOne({
    _id,
  })
    .then(r => {
      if (r.isValidPassword(oldPwd)) {
        r.setPassword(newPwd)
        r.save().then(() => {
          res.status(200).json({
            code: 200,
            msg: '修改密码成功',
            data: [],
          })
        })
      } else {
        throw Error()
      }
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '修改密码失败',
        data: e,
      })
    })
})

export default router
