const https = require('https'); // Loads the http module 
const fs = require('fs');

const httpsoptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(httpsoptions, (request, myresponse) => {
    const { headers } = request;
    const cookie = headers['cookie']; 
  //  console.log('I am counting-1 and I received header cookie: ' + cookie + '\n');
    // 1. Tell the browser everything is OK (Status code 200), and the data is in plain text
    myresponse.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    var url = request.url;
    if(url ==='/healthcheck') {
    	myresponse.write('up'); //write a response
    	myresponse.end(); //end the response
	console.log('counting-1:: I am healthy');
    } else {
    	myresponse.write('I am Counting-1'); //write a response
	console.log('I am counting-1');
    	myresponse.end(); //end the response
    }

}).listen(9003); // 4. Tells the server what port to be on
