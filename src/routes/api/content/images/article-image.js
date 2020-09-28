require('dotenv').config();
const AWS = require('aws-sdk');
const sharp = require('sharp');

export async function post(req, res){
  //debug 1
  console.log('made it to API endpoint')

  let sizes = [400, 800, 1200]
  if (!req.files || Object.keys(req.files).length === 0) {
    return (res.statusCode=400,res.end('No files were uploaded.'));
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const file = req.files.sampleFile;
  //const baseName = file.name.substring(0, file.name.lastIndexOf('.'));
  const baseName = 'test.jpg'
  if(!file.mimetype.startsWith('image')) {
    return (res.statusCode=400,res.end('Images only!'));
  }
  
  sharp(file.data).metadata().then(meta => {
    let promises = []
    console.log(meta.format)
    if(meta.format === 'png'){
      sizes.map(size => {
        promises.push(webpEditUpload(size, file, baseName))
        promises.push(pngEditUpload(size, file, baseName))        
      })
    } else {
      sizes.map(size => {
        promises.push(webpEditUpload(size, file, baseName))
        promises.push(jpegEditUpload(size, file, baseName))       
      })
    }
    return Promise.all(promises).then(data => {
      console.log(data)
      let content = JSON.stringify(data.map(datum => ({
        location: datum.Location
      })))
      //console.log(content)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(content);

    })
  })
}

function jpegEditUpload(size, image, baseName){
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

function webpEditUpload(size, image, baseName){
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

    let s3Promise = s3.upload(params).promise()
    return s3Promise
  })
  .catch( err => { 
    console.log(err)
    return err;
   });
}

function pngEditUpload(size, image, baseName){
  let pngOptions = {
    compressionLevel: 8, 
    force: false
  }
  return sharp(image.data)
  .resize({width: size, withoutEnlargement: true})
  .png(pngOptions)
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
      Key: `testing/${baseName}-${size}.png`,
      Body: data
    }

    let s3Promise = s3.upload(params).promise()
    return s3Promise
  })
  .catch( err => { 
    console.log(err)
    return err;
   });
}