
// server's ip






const SERVER_NAME = `http://${IP}`;


const Delay = 20;
var sum = 255+255+255 + 1;

var elem = document.getElementById("col"); 

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
}






var ClientServerOffset = 0.0;
var offsets = [];
const offs_size = 100;

var flag = false;

const socket = io(SERVER_NAME);

function setColor(color){
	elem.style.backgroundColor = color;
	document.body.style.backgroundColor = color;
}

function syncClocks(){
	socket.emit('Ping',pongCallback);
	const clientPing = performance.now();
	function pongCallback(serverPong){
		const clientPong = performance.now();
		const oneWayPing = (clientPong + clientPing)/2.;
		var estimatedOffset = serverPong - oneWayPing;
		offsets.unshift(estimatedOffset);
		offsets.splice(offs_size);
		let offsetsSum = 0.;
		offsets.forEach((off) => {
			offsetsSum += off;
		});

		ClientServerOffset = offsetsSum/offsets.length;
		

		if(!flag && offsets.length == offs_size){
			flag = true;
			clearInterval(interval);
			//interval = setInterval(syncClocks,100);
			startLights();
		}
	}

}




var interval = setInterval(syncClocks,10);



function startLights(){
	setInterval(()=>{
		var col = Math.floor((Math.floor(performance.now() + ClientServerOffset)  % (Delay*sum))/Delay);

		if(col <= 255){
			setColor(`rgb(${col},0,${255 - col})`);
		}else if(col <= 255 + 255){
			setColor(`rgb(${255 + 255 - col},${col-255},0)`);
		}else{
			setColor(`rgb(0,${255 + 255 + 255 - col},${col - 255 - 255})`);
		}
		
	},10);
}




