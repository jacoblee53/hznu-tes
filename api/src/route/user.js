import User from '../model/User'
import express from 'express'
import authToken from '../middleware/authToken'
import menu from '../util/menu'

const router = express.Router()

router.post('/register', (req, res) => {
  const {
    account,
    userName,
    password,
    role
  } = req.body
  const user = new User({
    account,
    userName,
    role
  })

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
  const {
    account,
    password
  } = req.body

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

router.post('/chanagePwd', authToken, (req, res) => {
  const {
    newPwd,
    oldPwd
  } = req.body
  const {
    _id
  } = req.currentUser

  User
    .findOne({ _id })
    .then(r => {
      if (r.isValidPassword(oldPwd)) {
        r.setPassword(newPwd)
        r.save().then(() => {
          res.status(200).json({
            code: 200,
            data: []
          })
        })
      } else {
        throw Error()
      }
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e,
      })
    })
})

router.get('/resetPwd', (req, res) => {
  const { id } = req.query
  User
    .findOne({ _id: id })
    .then(r => {
      r.setPassword('123456')
      r.save().then(() => {
        res.status(200).json({
          code: 200,
          data: []
        })
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e,
      })
    })
})

router.get('/fetch', (req, res) => {
  const role = req.query.role

  User
    .find({ role })
    .select('_id account userName role')
    .exec()
    .then(r => {
      res.status(200).json({
        code: 200,
        data: r
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e
      })
    })
})

router.get('/menu', (req, res) => {
  const role = parseInt(req.query.role)

  if (role === 0 || role === 1 || role === 2) {
    res.status(200).json({
      code: 200,
      data: menu[role]
    })
  } else {
    res.status(500).json({
      code: -1,
      data: []
    })
  }
})

export default router