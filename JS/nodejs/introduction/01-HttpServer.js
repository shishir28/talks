var http = require('http');
var httpServer = http.createServer(function (req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    // write message and signal communication is complete
    //res.end("Hello, World!\n");
    setTimeout(function () {
        res.end('world \n');
    }, 3000);
    res.write('Hello \n');


});
httpServer.listen(8000);
console.log('Listening on port 8000');