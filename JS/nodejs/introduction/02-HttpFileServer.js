var http = require('http');
var fs = require('fs');

var fileServer = http.createServer(function (req, res) {
    var query = require('url').parse(req.url).query;
    var app = require('querystring').parse(query).file + ".txt";

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    setTimeout(function () {
        console.log('opening ' + app);
        // open and read in file contents
        fs.readFile(app, 'utf8', function (err, data) {
            if (err)
                res.write('Could not find or open file for reading\n');
            else {
                res.write(data);
            }
            // response is done
            res.end();
        });
    }, 2000);


});
fileServer.listen(8001);
console.log('Listening on port 8001');