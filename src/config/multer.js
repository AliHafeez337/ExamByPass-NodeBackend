import path from 'path'
import multer from 'multer'

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../', 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'application/octet-stream'){
    req.file = file
    cb(null, true);
  }
  else{
    cb(null, false);
  }
}

 //.single expects the name of the file input field
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
}).single("ete");

export { upload as default }
