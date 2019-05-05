import Classes from '../model/Classes'
import User from '../model/User'
import express from 'express'
import bcrypt from 'bcrypt'
import authToken from '../middleware/authToken'

const router = express.Router()

router.use(authToken)

router.get('/download', (req, res) => {


})

router.post('/create', (req, res) => {
  const { className } = req.body
  const owner = req.currentUser._id

  const classes = new Classes({
    className,
    owner
  })

  classes
    .save()
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

router.get('/fetch', (req, res) => {
  const owner = req.currentUser._id

  Classes
    .find({ owner })
    .sort({createdAt: -1})
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

router.get('/delete', (req, res) => {
  const id = req.query.id

  Classes
    .deleteOne({ _id: id })
    .then(r => {
      res.status(200).json({
        code: 200,
        data: [],
        msg: '删除班级成功'
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '删除班级失败'
      })
    })
})


router.post('/import', (req, res) => {
  const { students } = req.body

  students.map(item => {
    item.password = bcrypt.hashSync(item.password, 10)
  })

  User
    .insertMany(students)
    .then(r => {
      res.status(200).json({
        code: 200,
        data: r,
        msg: '导入成功'
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e,
        msg: '导入失败'
      })
    })

})

router.get('/remove', (req, res) => {
  const id = req.query.id

  User
    .findOneAndUpdate(w)
    .then(r => {

    })

})

export default router
