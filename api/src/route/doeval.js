import Doeval from '../model/Doeval'
import authToken from '../middleware/authToken'
import express from 'express'
import _ from 'lodash'

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

router.post('/grade', (req, res) => {
  let { grade, id } = req.body

  console.log(grade)
  grade = JSON.stringify(grade)
  Doeval
    .findOneAndUpdate(
      { _id: id },
      { $set: { grade }},
      { new: true }
    )
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

router.get('/result', authToken, (req, res) => {
  const owner = req.currentUser._id
  const ownerRole = req.currentUser.role

  Doeval
    .find()
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
        model: 'User',
        populate: [{
          path: 'classId',
          model: 'Classes'
        }]
      }]
    }, {
      path: 'owner',
      model: 'User'
    }])
    .exec()
    .then(r => {
      var result = _(r)
                  .groupBy(x => x.dotaskId._id)
                  .map((value, key) => ({
                    owner: value.length > 0 ? value[0].dotaskId.owner : null,
                    task: value.length > 0 ? value[0].dotaskId.task : null,
                    value
                  }))
                  .value()

      result = result.map(item => {
        var result = 0
        item.value = item.value.map(value => {
          value = value.toObject()
          const current = value.dotaskId
          const role = current.owner.role
          const ratios = [current.task.expertRatio, current.task.teacherRatio, current.task.mateRatio]
          const grade = calculateGrade(value.grade)

          var ratio = 0
          if (owner === current.owner._id) {
            ratio = current.task.selfRatio
          } else {
            ratio = ratios[ownerRole]
          }

          result += (parseFloat(ratio) * parseFloat(grade))
          return {
            score: (parseFloat(ratio) * parseFloat(grade)).toFixed(2),
            ...value,
          }
        })
        return {
          score: result.toFixed(2),
          ...item,
        }
      })

      res.status(200).json({
        code: 200,
        data: result
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e
      })
    })
})

function calculateGrade(obj) {
  if (obj) {
    obj = JSON.parse(obj)
    let values = Object.values(obj)
    let result = 0
    values.map(item => {
      result += parseFloat(item)
    })
    return result
  } else {
    return 0
  }
}

export default router
