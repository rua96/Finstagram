require('dotenv').config()

const AWS = require('aws-sdk')
const multer= require('multer')
const multerS3=require ('multer-s3')

const AWSConfig = {
    accessKeyId:process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region:"eu-central-1",
    Bucket:process.env.S3_BUCKET
}

AWS.config.update(AWSConfig)
s3=new AWS.S3()

const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket: process.env.S3_BUCKET,
        key:function (req, file, cb) {
            cb(null,"andrea/" + Date.now() + "-" +  file.originalname);
        }

    })
})

module.exports = {upload}