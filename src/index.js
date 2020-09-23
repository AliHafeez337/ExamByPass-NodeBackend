require('dotenv').config();
process.env.MSG ? console.log('\n', process.env.MSG) : console.log('\n', "Environment variables are not working.")

import express from 'express'
import http from 'http'


/* SERVER SETUP */

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('\n', `Server started on port ${process.env.PORT}.`);
});


/* ROUTES */

import fileUpload from './routes/fileUpload'

app.use('/fileUpload', fileUpload);
