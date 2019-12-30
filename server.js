//Before executing
require('dotenv').config();

var fs              = require('fs');
var express         = require('express');

var app             = express();
var server          = require('http').Server(app);
var io              = require('socket.io')(server);



server.listen(process.env.PORT || 3000, function(){
    console.log(`server is running on port ${process.env.PORT || 3000}`);
})


var path                            = require('path');

const bodyParser                    = require('body-parser');
var jsonParser                      = bodyParser.json();

const { PerformanceObserver, performance } = require('perf_hooks');



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





function registration(req,res,next){

}




app.get('',jsonParser,function(req,res){
  res.sendFile(__dirname + '/index.html');
 
})


app.get('*/client.js',jsonParser,function(req,res,next){
  res.type('.js');
  res.sendFile(__dirname + '/client.js');
})


app.get('*/socket/*',jsonParser,function(req,res,next){
  res.type('.js');
  res.sendFile(__dirname + `/socket/${req.originalUrl.split('/socket/')[1]}`);
})










