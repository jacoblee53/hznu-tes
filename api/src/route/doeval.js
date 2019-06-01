import Doeval from '../model/Doeval'
import authToken from '../middleware/authToken'
import express from 'express'
import Single from '../model/Single'

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

async function getSingles(id) {
  return await Single.find({ standardId: id }).exec()
}

router.get('/fetchDoeval', (req, res) => {
  const { id } = req.query
  Doeval
    .findOne({ _id: id })
    .populate([{
      path: 'dotaskId',
      model: 'Dotask',
      populate: [{
        path: 'task',
        model: 'Task',
        populate: [{
          path: 'standards',
          model: 'Standard',
          populate: [{
            path: 'singles',
            model: 'Single'
          }]
        }]
      }, {
        path: 'owner',
        model: 'User'
      }]
    }])
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
