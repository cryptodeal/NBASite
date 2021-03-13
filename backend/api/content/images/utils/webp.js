require('dotenv').config();
const AWS = require('aws-sdk');
const sharp = require('sharp');

exports.webpEditUpload = (size, image, baseName) => {
  let webpOptions = {
    quality: 75,
    lossless: false,
    force: true
  }
  return sharp(image.data)
  .resize({width: size, withoutEnlargement: true})
  .webp(webpOptions)
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
      Key: `testing/${baseName}-${size}.webp`,
      Body: data
    }

    return s3.upload(params).promise()
  })
  .catch( err => { 
    console.log(err)
    return err;
   });
}