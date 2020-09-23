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
  (req,res)=> {
    upload(req, res, async function (err) {
      if (err) {
        res.status(200).send({
          errmsg: "Couldn't upload file.",
          data: err
        })
        return
      }
      if (!req.file) {
        res.status(200).send({
          errmsg: "Something is wrong with file."
        })
        return
      }

      var FormData = require('form-data');
      var data = new FormData();
      data.append('file', fs.createReadStream(req.file.path));

      var config = {
        method: 'post',
        url: 'http://25.34.216.242:3000/upload',
        headers: { 
          ...data.getHeaders()
        },
        data
      };

      axios(config)
      .then(function (response) {
        fs.unlinkSync(req.file.path, (err)=>{
          if(err){
            console.log("couldnt delete " + req.file.filename + " image");
          }              
        });
        res.status(200).send({
          msg: "File uploaded successfully.",
          data: JSON.stringify(response.data)
        })
      })
      .catch(function (error) {
        fs.unlinkSync(req.file.path, (err)=>{
          if(err){
            console.log("couldnt delete " + req.file.filename + " image");
          }              
        });
        res.status(200).send({
          errmsg: "Couldn't upload file.",
          data: error
        })
      });
    })
  }
)

export { router as default }