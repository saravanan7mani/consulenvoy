const net = require('net');
const fs  = require('fs');

const port = 9003;
const host = '127.0.0.2';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('Counting TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
		
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
//			var stream = fs.createReadStream('bigfile.txt');
//			stream.pipe(sock);
//			stream = fs.createReadStream('bigfile.txt');
  //                      stream.pipe(sock);
            	let i = 0;
		while(i++ < 999999999) {
			sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + ', i: ' + i + '\n');
		}

        });
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});
