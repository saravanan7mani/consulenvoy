const net = require('net');
const fs       = require('fs');

const port = 9002;
const host = '127.0.0.1';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('Dashbaord TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);

		
		
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
			const client = new net.Socket();
			const countingport = 5000;
			const countinghost = '127.0.0.1';

			client.connect(countingport, countinghost, function() {
				console.log('Connected to counting service');
				client.write("Hello From Client Dashboard " + client.address().address);
			});

			client.on('data', function(data) {
				console.log('Server Says : ' + data);
			});

			client.on('close', function() {
				sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
				console.log('Connection closed');
			});
            
        });
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        //let index = sockets.findIndex(function(o) {
          //  return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        //})
        //if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});
