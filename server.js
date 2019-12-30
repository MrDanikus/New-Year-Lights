//Before executing
require('dotenv').config();

var args = process.argv.slice(2);
(function(){
  let a = {};
  for(let i = 0; i < args.length; ++i){
    if(args[i][0] == '-'){
      a[args[i].slice(1)] = args[++i];
    }else{
      a[args[i]] = true;
    }
  }
  args = a;
})();

process.ip = args['srv'] || 'localhost';


const bodyParser                           = require('body-parser');
const { PerformanceObserver, performance } = require('perf_hooks');
const { spawn, exec }                            = require('child_process');




var fs              = require('fs');
var express         = require('express');

var app             = express();
var server          = require('http').Server(app);
var io              = require('socket.io')(server);
 
var path            = require('path');
var jsonParser      = bodyParser.json();

var ejs             = require('ejs');

// var IP;
// var SYSTEM_TYPE;


// var scriptOutput = "";
// exec("sh checkIP.sh",(error, stdout, stderr) => {
//   SYSTEM_TYPE = stdout.toString().replace(/\n/g,'');
//   //console.log(stderr);
//   if (error !== null) {
//      console.log(`exec error: ${error}`);
//      return;
//   }
//   if(SYSTEM_TYPE == "UNIX"){
//     const get_ip = exec("ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'");
//     get_ip.stdout.setEncoding('utf8');
//     get_ip.stdout.on('data',(data) => {
//       scriptOutput += (data.toString());
//     })
//     get_ip.stderr.on('data',(data) =>{
//       console.log(data);
//     })
//     get_ip.on('error',(err) => {
//       console.log(err);
//     })
//     get_ip.on('close',(code) => {
//       scriptOutput = scriptOutput.split(' ');
//       scriptOutput.forEach((el,index) => {scriptOutput[index] = el.replace(/\n/g,'');});
//       IP = scriptOutput[scriptOutput.length-1];
//       console.log(IP);
//     });
//   }else if(SYSTEM_TYPE == "WIN"){

//   }

// });





server.listen(process.env.PORT || 80, function(){
    console.log(`server is running on port ${process.env.PORT || 80}`);
})


//WebSocket





io.on('connection',function(socket){



  socket.on('message',function(message){
    let date = JSON.parse(message);


  })

  socket.on('Ping',function(pongCallback){
    let serverTime = performance.now();
    pongCallback(serverTime);
  })

})




// Middleware

app.set('view engine','ejs');





app.get('',jsonParser,function(req,res){
  ejs.renderFile(__dirname + '/index.ejs',{IP: process.ip},{},(err,str) => {
    res.send(str);
  })
})


app.get('*/client.js',jsonParser,function(req,res,next){
  res.type('.js');
  res.sendFile(__dirname + '/client.js');
})


app.get('*/socket/*',jsonParser,function(req,res,next){
  res.type('.js');
  res.sendFile(__dirname + `/socket/${req.originalUrl.split('/socket/')[1]}`);
})










