import Task from '../model/Task'
import express from 'express'
import authToken from '../middleware/authToken'
import taskPrivilege from '../middleware/taskPrivilege'

const router = express.Router()

router.use(authToken)

router.post('/create', taskPrivilege, (req, res) => {
  const {
    taskName,
    taskDesc,
    taskSize,
    taskClass,
    owner,
    expert,
    startDate,
    endDate,
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
    expert,
    startDate,
    endDate,
    teacherRatio,
    selfRatio,
    expertRatio,
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
        msg: '新建任务失败',
      })
    })
})

router.get('/fetch',  (req, res) => {
  const { owner } = req.currentUser._id

  Task
    .find({ owner })
    .sort([['date', -1]])
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

router.get('/fetch/:id', (req, res) => {
  const id = req.params.id

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

router.get('/search/:query', (req, res) => {

})

router.post('/update', (req, res) => {
  const {
    taskId,
    taskName,
    taskDesc,
    taskSize,
    taskClass,
    owner,
    expert,
    startDate,
    endDate,
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
      owner,
      expert,
      startDate,
      endDate,
      teacherRatio,
      selfRatio,
      expertRatio,
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

router.get('/delete/:id', taskPrivilege, (req, res) => {
  const id = req.params.id

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

export default Task
