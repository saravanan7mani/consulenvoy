const fs = require('fs');

stream  = fs.createWriteStream('mediumfile.txt', {flags : 'a'});
for (let i = 0; i < 999999; i++){
	stream.write('counting line ' + i);
}
stream.end();
