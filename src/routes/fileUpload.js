import express from 'express'
import axios from 'axios'
import FormData  from 'form-data'
import fs from 'fs'

// Local imports
import upload from '../config/multer'

// Variables
const router = express.Router();

router.post(
  '/eteFile',
  (req, res) => {
    upload(req, res, async function (err) {
      
      let newFile = await fs.createReadStream(req.file.path);
      const form_data = new FormData();
      form_data.append('file', newFile);

      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
			axios.post(`http://25.34.216.242:3000/upload`, form_data)
      .then(res2 => {
        console.log(res2.data);
        res.status(200).send({
          msg: "File uploaded."
        })
      })
      .catch(err2 => {
        console.log(err2)
        res.status(400).send({
          errmsg: err2
        })
      })

      // try {
      //   var res2 = await axios({
      //     method: "post",
      //     url: 'http://25.34.216.242:3000/upload',
      //     headers: {
      //         // "Authorization": "Bearer " + access_token,
      //         "Content-Type": "multipart/form-data"
      //     },
      //     data: form_data
      //   });
      //   console.log(res2.data)
  
      //   if (res2.data){
      //     if (res2.data.upload === 'done'){
      //       res.status(200).send({
      //         msg: "File uploaded."
      //       })
      //     } else if (res2.data.errmsg){
      //       res.status(400).send({
      //         errmsg: res2.data.errmsg
      //       })
      //     }
      //   } else {
      //     res.status(400).send({
      //       errmsg: "Unable to upload file."
      //     })
      //   }
      // } catch(err2) {
      //   console.log(err2)
      //   res.status(400).send({
      //     errmsg: err2
      //   })
      // }

    })
  }
)

export { router as default }