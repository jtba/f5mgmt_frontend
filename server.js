"use strict";
// static server
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');

const port = process.argv[2] || 8080;

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url);
  const feCodeLocation = process.env.FE_CODE_LOCATION;

  // translate requested URL into pathname and prepend "application" to it since the JS app is in the "application" folder
  // in the Dockerfile, the entrypoint is fired from root, so this directory must have a path from root
  let pathname = `${feCodeLocation}` + `${parsedUrl.pathname}`;

  // create types object to make types available to send in header
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
  };

  fs.exists(pathname, function (exist) {
    if (!exist && (pathname == feCodeLocation + "/config")) {

      switch(process.env.SERVER_ENVIRONMENT) {
        case "production":
          var config_object = config.getProductionConfig();
          break;
        case "pre-production":
          var config_object = config.getPreProductionConfig();
          break;
        case "local":
          var config_object = config.getLocalConfig();
          break;
        default:
          var config_object = config.getLocalConfig();
          break;
      };

      var config_string = JSON.stringify(config_object);
      console.log(process.env.SERVER_ENVIRONMENT);
      res.end(config_string);
      return;

    } else if (!exist) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    };

    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }

    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        const ext = path.parse(pathname).ext;
        res.setHeader('Content-type', mimeType[ext] || 'text/plain');
        res.end(data);
      }
    });

  });
}).listen(parseInt(port));

console.log('Server is listening on port ' + port);
