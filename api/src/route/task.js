import Task from '../model/Task'
import express from 'express'
import authToken from '../middleware/authToken'
import taskPrivilege from '../middleware/taskPrivilege'
import User from '../model/User';

const router = express.Router()

router.use(authToken)

router.post('/create', taskPrivilege, (req, res) => {
  const {
    taskName,
    taskDesc,
    taskSize,
    taskClass,
    owner,
    experts,
    isExpert,
    taskDate,
    standards,
    mateRatio,
    teacherRatio,
    selfRatio,
    expertRatio,
  } = req.body

  const task = new Task({
    taskName,
    taskDesc,
    taskSize,
    taskClass,
    owner,
    standards,
    startDate: taskDate[0],
    endDate: taskDate[1],
    mateRatio,
    teacherRatio,
    selfRatio,
    isExpert,
    experts: isExpert ? experts : [],
    expertRatio: isExpert ? expertRatio : 0,
  })

  task
    .save()
    .then(r => {
      res.status(200).json({
        code: 200,
        msg: '新建任务成功',
        data: r,
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e,
        msg: '新建任务失败',
      })
    })
})

router.get('/fetch',  (req, res) => {
  const owner = req.currentUser._id

  Task
    .find({ owner })
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

router.get('/fetchMyTask', (req, res) => {
  const owner = req.currentUser._id
  User
    .findOne({ _id: owner })
    .then(r => {
      const { classId } = r
      Task
        .find({ taskClass: {$in: [classId]} })
        .sort([['startDate', 1]])
        .exec()
        .then(r => {
          res.status(200).json({
            code: 200,
            data: r
          })
        })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: []
      })
    })
})

router.get('/fetchTask', (req, res) => {
  const id = req.query.id

  Task
    .findOne({ _id: id })
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

router.get('/search', (req, res) => {
  const query = req.query.query

  Task
    .find({ taskName: {
      '$regex': query,
      '$options': 'i'
    }})
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

router.post('/update', (req, res) => {
  const {
    taskId,
    taskName,
    taskDesc,
    taskSize,
    standards,
    taskClass,
    owner,
    experts,
    isExpert,
    taskDate,
    mateRatio,
    teacherRatio,
    selfRatio,
    expertRatio,
  } = req.body

  Task
    .findOneAndUpdate({ _id: taskId }, {$set: {
      taskName,
      taskDesc,
      taskSize,
      taskClass,
      standards,
      owner,
      startDate: taskDate[0],
      endDate: taskDate[1],
      mateRatio,
      teacherRatio,
      selfRatio,
      isExpert,
      experts: isExpert ? experts : [],
      expertRatio: isExpert ? expertRatio : 0,
    }})
    .then(r => {
      res.status(200).json({
        code: 200,
        msg: '任务更新成功',
        data: r
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '任务更新失败',
        data: e
      })
    })
})

router.get('/delete', taskPrivilege, (req, res) => {
  const id = req.query.id

  Task
    .deleteOne({ _id: id })
    .then(e => {
      if (!e) {
        res.status(200).json({
          code: 200,
          msg: '删除任务成功'
        })
      } else {
        throw Error()
      }
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        msg: '删除任务失败'
      })
    })
})

export default router
