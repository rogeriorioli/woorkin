import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const storageType = {
  local : multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..','..', 'tmp' , 'uploads'))
  },
  filename : (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      //@ts-ignore
      if(err) cb(err);
        
      const filename = `${hash.toString('hex')}-${file.originalname}`

      cb(null , filename)
    })
  } 
  }),
  //@ts-ignore
    s3: multerS3({
        s3 : new aws.S3(),
        bucket : 'devrec',
        contentType : multerS3.AUTO_CONTENT_TYPE,
        acl : 'public-read',
        key : (req, file, cb) => {
          crypto.randomBytes(16, (err, hash) => {
            //@ts-ignore
            if(err) cb(err);
             //@ts-ignore  
            file.key = `${hash.toString('hex')}-${file.originalname}`
            //@ts-ignore
            cb(null , file.key)
          });
        }
    })
}



module.exports = {

  dest : path.resolve(__dirname, '..','..', 'tmp' , 'uploads'),
  storage :storageType['s3'],
  limits : {
    fileSize : 2 * 1024 * 1024
  },
  // fileFilter : ({req, file, cb} : any ) => {
  //   const allowedMimes = [
  //     'image/jpg',
  //     'image/jpeg',
  //     'image/png',
  //     'image/gif',
  //   ]
  //   if(allowedMimes.includes(file.mimetype)) {
  //     cb(null, true)
  //   }else {
  //     cb(new Error('invalid type'))
  //   }
  // } 
}