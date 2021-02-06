import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join('public/temp'))
    },

    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        cb(err, hash.toString('hex') + '.' + file.originalname.split('.')[1]) // + '-' + file.originalname
      })
    }

  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    const isAccepted = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/webp'
      // 'application/octet-stream',
    ]

    return cb(null, isAccepted.includes(file.mimetype))
  }

})
