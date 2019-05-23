import express from 'express'
import Dotask from '../model/Dotask'
import fs from 'fs'
import path from 'path'

import authToken from '../middleware/authToken'
import * as multerUpload from '../util/upload'

const router = express.Router()


router.get('/fetch', authToken, (req, res) => {
  const owner = req.currentUser._id
  const { taskId } = req.query

  Dotask
    .findOne({ owner })
    .then(r => {
      if (r && r.taskId === taskId) {
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

export default router
