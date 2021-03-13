//CURRENTLY NOT IN USE
//TODO: CREATE MULTIPLE UPLOAD HANDLERS BASED ON USE/CONTEXT OF IMAGE
require('dotenv').config();
const sharp = require('sharp');
const { Entropy } = require('entropy-string')
const {webpEditUpload} = require('./utils/webp');
const {jpegEditUpload} = require('./utils/jpeg');
const {pngEditUpload} = require('./utils/png');

exports.contentPostArticlePic = async (req, res) => {
  //debug 1
  console.log('made it to API endpoint')

  let sizes = [400, 800, 1200]
  if (!req.files || Object.keys(req.files).length === 0) {
    return (res.statusCode=400,res.end('No files were uploaded.'));
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const file = req.files.sampleFile;
  const entropy = new Entropy({ total: 1e6, risk: 1e9 })
  const baseName = entropy.string()
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
      //console.log(data)
      const content = []
      data.map(datum => {
        let keySplit = datum.key.split('-')
        let sizeSplit = keySplit[keySplit.length-1].split('.')
        let imageData = {
          location: datum.Location,
          size: sizeSplit[0],
          format: sizeSplit[1]
        }
        content.push(imageData)
      })
      console.log(content)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.send(content);
    })
  })
}