import Doeval from '../model/Doeval'
import authToken from '../middleware/authToken'
import express from 'express'

const router = express.Router()

router.get('/fetch', authToken, (req, res) => {
  const owner = req.currentUser._id

  Doeval
    .find({ owner })
    .populate([{
      path: 'dotaskId',
      model: 'Dotask',
      populate: [{
        path: 'task',
        model: 'Task',
        populate: [{
          path: 'standards',
          model: 'Standard'
        }]
      }, {
        path: 'owner',
        model: 'User'
      }]
    }])
    .sort([['createdAt', -1]])
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

export default router
