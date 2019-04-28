import Classes from '../model/Classes'
import express from 'express'
import authToken from '../middleware/authToken'

const router = express.Router()

router.use(authToken)

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


export default router
