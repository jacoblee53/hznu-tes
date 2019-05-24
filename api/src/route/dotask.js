import express from 'express'
import Dotask from '../model/Dotask'
import { API_SERVER } from '../util/config'
import fs from 'fs'
import path from 'path'

import authToken from '../middleware/authToken'
import * as multerUpload from '../util/upload'

const router = express.Router()

router.get('/fetch', authToken, (req, res) => {
  const owner = req.currentUser._id
  const { taskId } = req.query

  Dotask
    .findOne({ owner, task: taskId })
    .then(r => {
      if (r) {
        res.status(200).json({
          code: 200,
          data: r
        })
      } else {
        const dotask = new Dotask({
          task: taskId,
          owner
        })
        dotask
          .save()
          .then(r => {
            res.status(200).json({
              code: 200,
              data: r
            })
          })
      }
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e
      })
    })
})

router.post('/create', (req, res) => {

})

router.post('/update', (req, res) => {

})

router.post('/doc', multerUpload.docUpload.single('doc'), (req, res) => {
  const { taskId, userId } = req.query

  const path = req.file.path
  Dotask
    .findOneAndUpdate(
      {task: taskId, owner: userId},
      {$set: { docPath: path}},
      { new: true }
    )
    .then(r => {
      res.status(200).json({
        code: 200,
        data: r,
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e
      })
    })
})

router.post('/ppt', multerUpload.pptUpload.single('ppt'), (req, res) => {
  const { taskId, userId } = req.query

  const path = req.file.path
  Dotask
    .findOneAndUpdate(
      {task: taskId, owner: userId},
      {$set: { pptPath: path }},
      { new: true }
    )
    .then(r => {
      res.status(200).json({
        code: 200,
        data: r,
      })
    })
    .catch(e => {
      res.status(500).json({
        code: -1,
        data: e
      })
    })
})

router.post('/media', multerUpload.mediaUpload.single('media'), (req, res) => {
  const { taskId, userId } = req.query

  const path = req.file.path
  Dotask
    .findOneAndUpdate(
      {task: taskId, owner: userId},
      {$set: { mediaPath: path }},
      { new: true }
    )
    .then(r => {
      res.status(200).json({
        code: 200,
        data: r,
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
