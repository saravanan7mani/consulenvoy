const https = require('http'); // Loads the http module 
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
    	myresponse.write('counting up\n'); //write a response
    	myresponse.end(); //end the response
	console.log('counting-1:: I am healthy');
    } else {
	let i = 0;
	const src = fs.createReadStream('bigfile.txt');
	src.pipe(myresponse);
	//while (i < 9) {
	  //setTimeout(function(){ myresponse.write('' + i++); }, 500);
//	  myresponse.write('' + i++); 
	//}
    	//myresponse.write('I am Counting-1'); write a response
	console.log('I am counting-1');
    	//myresponse.end(); end the response
    }

}).listen(9003, "127.0.0.2"); // 4. Tells the server what port to be on
