require('dotenv').config();
const AWS = require('aws-sdk');
const sharp = require('sharp');

exports.jpegEditUpload = (size, image, baseName) => {
  let jpegOptions = {
    quality: 70,
    progressive: false,
    force: false
  }
  return sharp(image.data)
    .resize({width: size, withoutEnlargement: true})
    .jpeg(jpegOptions)
    .toBuffer()
    .then(data => { 
      const S3_Bucket = `dev-tankienews`

      AWS.config.update({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
      })
      const s3 = new AWS.S3();

      let params = {
        Bucket: S3_Bucket,
        Key: `testing/${baseName}-${size}.jpeg`,
        Body: data
      }

      let s3Promise = s3.upload(params).promise()
      return s3Promise
    })
    .catch( err => { 
      console.log(err)
      return err
    });
}