import multer from 'multer'

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/doc')
  }
})

const pptStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/ppt')
  }
})

const mediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/media')
  }
})

const docUpload = multer({
  storage: docStorage,
  limits: {
    fileSize: 10*1000000
  }
})

const pptUpload = multer({
  storage: pptStorage,
  limits: {
    fileSize: 20*1000000
  }
})

const mediaUpload = multer({
  storage: mediaStorage,
  limits: {
    fileSize: 200*1000000
  }
})

export default {
  docUpload,
  pptUpload,
  mediaUpload
}