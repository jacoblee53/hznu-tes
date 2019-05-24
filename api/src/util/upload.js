import multer from 'multer'

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/doc')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const pptStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/ppt')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const mediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/media')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

export const docUpload = multer({
  storage: docStorage,
  limits: {
    fileSize: 10*1000000
  }
})

export const pptUpload = multer({
  storage: pptStorage,
  limits: {
    fileSize: 20*1000000
  }
})

export const mediaUpload = multer({
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