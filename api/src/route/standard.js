import Standard from '../model/Standard'
import express from 'express'
import authToken from '../middleware/authToken'

const router = express.Router()

router.use(authToken)

router.get('/fetch', (req, res) => {

})


export default router
