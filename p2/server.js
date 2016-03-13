var http = require("http");
var port = 3000;
// Declare variables
var fs = require('fs'),
    obj;
var path = require('path');
var url = require("url");
var JS_PREFIX = '/js/';
var CSS_PREFIX = '/css/';
var FONT_PREFIX = '/font/';
var IMG_PREFIX = '/img/';
// load json
fs.readFile('data.json', handleFile);

function handleFile(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
}

http.createServer(function(req, resp) {
    var uri = url.parse(req.url).pathname,
        filename = path.join(process.cwd(), uri);
    switch (req.method) {
        case "GET":
            if (req.url == '/') {     
                // if (fs.statSync(filename).isDirectory()) filename += '/my_project_detail.html';
                if (fs.statSync(filename).isDirectory()) filename += '/project-detail.html';
                fs.readFile(filename, "binary", function(err, file) {
                    if (err) {
                        resp.writeHead(500, { "Content-Type": "text/plain" });
                        resp.write(err + "\n");
                        resp.end();
                        return;
                    }

                    resp.writeHead(200);
                    resp.write(file, "binary");
                    resp.end();
                });

            }
            else if (req.url=="/project-detail.html"){
                if (fs.statSync(filename).isDirectory()) filename += '/project-detail.html';
                fs.readFile(filename, "binary", function(err, file) {
                    if (err) {
                        resp.writeHead(500, { "Content-Type": "text/plain" });
                        resp.write(err + "\n");
                        resp.end();
                        return;
                    }

                    resp.writeHead(200);
                    resp.write(file, "binary");
                    resp.end();
                });
            }
            else if (req.url=="/data.json"){
                getData(req,resp);
            }
           
            // load js file
            else if (req.url.indexOf(JS_PREFIX) == 0) {
                var filename = process.cwd();
                filename += req.url;
                fs.readFile(filename, "binary", function(err, file) {
                    if (err) {
                        resp.writeHead(500, { "Content-Type": "text/html" });
                        resp.write(err + "into the error");
                        resp.end();
                        return;
                    }

                    resp.writeHead(200, { "Content-Type": "text/javascript" });
                    resp.write(file, "binary");
                    resp.end();
                });

            }
             // load css file
            else if (req.url.indexOf(CSS_PREFIX) == 0) {
                var filename = process.cwd();
                filename += req.url;
                fs.readFile(filename, "binary", function(err, file) {
                    if (err) {
                        resp.writeHead(500, { "Content-Type": "text/html" });
                        resp.write(err + "into the error");
                        resp.end();
                        return;
                    }

                    resp.writeHead(200,{"Content-Type": "text/css" });
                    resp.write(file, "binary");
                    resp.end();
                });

            }
           
             else if (req.url.indexOf(IMG_PREFIX) == 0) {
                var filename = process.cwd();
                filename += req.url;
                fs.readFile(filename, "binary", function(err, file) {
                    if (err) {
                        resp.writeHead(500, { "Content-Type": "text/html" });
                        resp.write(err + "into the error");
                        resp.end();
                        return;
                    }

                    resp.writeHead(200);
                    resp.write(file, "binary");
                    resp.end();
                });

            }
            // error
            else {
                get404(req, resp);
            }
    }

}).listen(port);

function getData(req,resp){
    resp.writeHead(200,{
        "Content-Type":"application/json"
    });  
    resp.write(JSON.stringify(obj,null,4));
    resp.end();
}



// 404
function get404(req, resp) {
    resp.writeHead(404, {
        'Content-Type': 'text/html'
    });
    resp.write("404 error");
    resp.end();
}

console.log('Server running at http://127.0.0.1:' + port + '/');
