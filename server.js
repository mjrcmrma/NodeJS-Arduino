var fs = require('fs'),
http = require('http'),
socketio = require('socket.io'),
url = require("url"), 
SerialPort = require("serialport").SerialPort,
socketServer,serialPort,
portName = '/dev/tty.usbmodem1411',
endData = "",
express = require("express"), 
app = express(),
HTTPC = require("jhttp-client"),
httpClient = HTTPC();

// handle contains locations to browse to (vote and poll); pathnames.
function startServer(route, handle, debug) {
	// on request event
	/*function onRequest(request, response) {
	  	var pathname = url.parse(request.url).pathname; 
	  	console.log("Request for " + pathname + " received");
	  	var content = route(handle, pathname, response, request, debug);
	}*/
	
	/*var httpServer = http.createServer(onRequest).listen(1337, function(){
		console.log("Listening at: http://localhost:1337");
		console.log("Server is up");
	}); */
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	var data = serialListener(debug);
	app.get('/', function(req, res){
    	res.send(data);//build html for condomino
	});
	app.listen(1337);
	//initSocketIO(httpServer,debug);
}

/*function initSocketIO(httpServer, debug) {
	socketServer = socketio.listen(httpServer);
	if(debug == false){
		socketServer.set('log level', 1);
	}
	socketServer.on('connection', function(socket) {
		console.log("user connected");
		socket.emit('onconnection', { pollOneValue:sendData });
		socketServer.on('update', function(data) {
			socket.emit('updateData',{ pollOneValue:data });
		});
		socket.on('buttonval', function(data) {
			serialPort.write(data);
		});
		serialPort.write(1);
    });
}*/

function serialListener(debug) {
    var receivedData = "", 
    code = 0, 
    userData = "", 
    url = "http://categoriatierraverde.org",
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
    }, false);
    serialPort.on("open", function (error) {
    	console.log('open serial communication');
            // Listens to incoming data
        serialPort.on('data', function(data) {
        	receivedData += data.toString();
        	httpClient.request(url + "/" + receivedData).then(function(response) {
			    console.log(response.body);        
			}).fail(function(response) {
			    console.log("Error");
			});
        	if (userData) {
          		//show info
          		code = 1;
         	}
        	serialPort.write(1);
        	sendData = code;
         // send the incoming data to browser with websockets.
       		//socketServer.emit('update', sendData);
      	});  
    });
    return "userData";  
}

exports.start = startServer;