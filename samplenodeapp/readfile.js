var fs = require("fs");
var response = fs.createReadStream('bigfile.txt');

let len = 0;

          //another chunk of data has been received, so append it to `str`
          response.on('data', function (chunk) {

                len += chunk.length;
                //console.log('length: ' + len);
                if ((len%100) == 0){
                        console.log('length: ' + len);
                }
                //len += byteLength(chunk);
          });


