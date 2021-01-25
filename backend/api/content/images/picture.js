require('dotenv').config();
const sharp = require('sharp');
const {webpEditUpload} = require('./utils/webp');
const {jpegEditUpload} = require('./utils/jpeg');
const {pngEditUpload} = require('./utils/png');

exports.contentPostPic = async (req, res) => {
  //debug 1
  console.log('made it to API endpoint')

  let sizes = [400, 800, 1200]
  if (!req.files || Object.keys(req.files).length === 0) {
    return (res.statusCode=400,res.end('No files were uploaded.'));
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const file = req.files.sampleFile;
  const baseName = file.name.substring(0, file.name.lastIndexOf('.'));
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
      let content = data.map(datum => ({
        location: datum.Location
      }))
      //console.log(content)
      res.status(200)
      res.writeHeader('Content-Type', 'application/json')
      res.send(content);
    })
  })
}
