const https = require('https'); // Loads the http module 
const http = require('http');
const fs = require('fs');
var setCookie = require('set-cookie-parser');
var mycookie = '';

const httpsoptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }
  return s;
}

http.createServer((request, myresponse) => {

	var url = request.url;
        if(url ==='/healthcheck') {
	    myresponse.writeHead(200, {
                        'Content-Type': 'text/plain'
            });
    	    myresponse.write('dashboard up\n'); //write a response
            myresponse.end(); //end the response
            console.log('dashboard:: I am healthy');
    } else {
	const { headers } = request;
	const xUserId = headers['x-user-id'];

	var options = {
	  host: '127.0.0.1',
	  port: '5000',
	};

	if (xUserId) {
	  options = {
		  host: 'localhost',
		  port: '5000',
		  headers: { 'x-user-id': xUserId }
	  };
	}

	callback = function(response) {
	  
	  console.log('set-cookie from dashboard-envoy response: '+response.headers['set-cookie']);
	  var cookies = setCookie.parse(response, {
	    decodeValues: true,  // default: true
	    map: true           //default: false
	  });

	  var desiredCookie = cookies['cookie-x-user-id'];
	  //console.log('desiredCookie: ' + desiredCookie);
	  if (desiredCookie) {
	 	 mycookie = desiredCookie.value;
	  	//console.log('new mycookie is set: ' + mycookie);
	  }
	  

	  let len = 0;

	  //another chunk of data has been received, so append it to `str`
	  response.on('data', function (chunk) {
		
		len += chunk.length;
		console.log(chunk);
		//if ((len%100) == 0){
		//	console.log('length: ' + len);
		//}
		//len += byteLength(chunk);
	  });

	  //the whole response has been received, so we just print it out here
	  response.on('end', function () {
		// 1. Tell the browser everything is OK (Status code 200), and the data is in plain text
		myresponse.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		// 2. Write the announced text to the body of the page
		str = 'I am dashboard and I received message - ' + len + '\n';
		myresponse.write(str);

		// 3. Tell the server that all of the response headers and body have been sent
		myresponse.end();
		console.log('len: ' + len);
	  });
	}
//	console.log('mycookie in outside: ' + mycookie);
	if (mycookie) {
//		console.log('mycookie is available: ' + mycookie);
		var cookieset = "cookie-x-user-id="+mycookie+';';
		options = {
		host: 'localhost',
		port: '5000',
		headers: {cookie: cookieset }
		
	  };
	}
	
	//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
	http.request(options, callback).end();
    }
}).listen(9002, "127.0.0.1"); // 4. Tells the server what port to be on
