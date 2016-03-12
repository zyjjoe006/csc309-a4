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
            // 1
            else if (req.url == "/all") {

                getAll(req, resp);
            }
            // 2
            else if (req.url == "/users") {
                getUsers(req, resp);
            }
            // 3
            else if (req.url.indexOf("/links") === 0) {
                getExternalLinks(req, resp);
            }
            // 4
            else if (req.url.indexOf("/details/id=") === 0) {
                getDetails(req, resp);
            }
            // 5
            else if (req.url.indexOf("/profile/") === 0) {
                getUserInfo(req, resp);
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
            // else if (req.url.indexOf(FONT_PREFIX) == 0) {
            //     var filename = process.cwd();
            //     filename += req.url;
            //     fs.readFile(filename, "binary", function(err, file) {
            //         if (err) {
            //             resp.writeHead(500, { "Content-Type": "text/html" });
            //             resp.write(err + "into the error");
            //             resp.end();
            //             return;
            //         }

            //         resp.writeHead(200,{"Content-Type":"application/font-woff"});
            //         resp.write(file, "binary");
            //         resp.end();
            //     });

            // }
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
                if (fs.statSync(filename).isDirectory()) filename = process.cwd();
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
                // get404(req, resp);
            }
    }

}).listen(port);
//  1. /all
function getAll(req, resp) {
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var data = [];

    for (var i = 0; i < obj.length; i++) {
        var element = {};

        element["created_at"] = obj[i].created_at;
        element["id"] = obj[i].id_str;
        element["text"] = obj[i].text;
        data.push(element);

    }
    resp.write(JSON.stringify(data, null, 4));
    resp.end();
}
// 2. /users
function getUsers(req, resp) {
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var data = [];
    for (var i = 0; i < obj.length; i++) {
        var element = {};
        element["name"] = obj[i].user.name;
        element["username"] = obj[i].user.screen_name;
        element["id"] = obj[i].user.id_str;
        element["description"] = obj[i].user.description;
        data.push(element);
    }
    resp.write(JSON.stringify(data, null, 4));
    resp.end();
}

// 3. /links

function getExternalLinks(req, resp) {
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    });

    var result = {};
    for (var i in obj) {
        var id = JSON.stringify(obj[i].id_str);
        if (!result.hasOwnProperty(id)) {
            result[id] = [];
        }
        traverse(obj[i], id, result);
    }

    resp.write(JSON.stringify(result), null, 4);

    resp.end();
}


function traverse(jsonfile, id, result) {
    for (var i in jsonfile) {

        if (jsonfile[i] !== null && typeof(jsonfile[i]) == "object") {

            result = traverse(jsonfile[i], id, result);
        } else {
            var checklink = new RegExp(/(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/ig);

            if (checklink.test(jsonfile[i])) {
                // if (!result.hasOwnProperty(id)) {
                //     result[id] = [];
                //     result[id].push(jsonfile[i].match(checklink));
                // } else {
                    result[id].push(jsonfile[i].match(checklink));
                // }
            }
        }
    }
    return result
}


// 4. /details/id=
function getDetails(req, resp) {

    var id = req.url.substring(12);
    var aimid = obj.filter(function(obj) {
        return obj.id_str == id;
    });
    var data = {};
    if (typeof aimid[0] !== 'undefined') {
        resp.writeHead(200, {
            'Content-Type': 'application/json'
        });
        data[aimid[0].id_str] = aimid[0].text;
        resp.write(JSON.stringify(data));
    } else {
        resp.writeHead(404, {
            'Content-Type': 'application/json'
        });
        resp.write("id not found");
    }

    resp.end();
}

// 5. /profile/
function getUserInfo(req, resp) {
    var screnName = req.url.substring(9);
    var aimUser = obj.filter(function(obj) {
        return obj.user.screen_name == screnName;
    });
    if (typeof aimUser[0] !== 'undefined') {
        resp.writeHead(200, {
            'Content-Type': 'application/json'
        });
        var data = {};
        data["name"] = aimUser[0].user.name;
        data["username"] = aimUser[0].user.screen_name;
        data["id"] = aimUser[0].user.id_str;
        data["description"] = aimUser[0].user.description;
        resp.write(JSON.stringify(data));
        // resp.write(JSON.stringify(aimUser[0].user));
    } else {
        resp.writeHead(404, {
            'Content-Type': 'application/json'
        });
        resp.write("name not found");
    }

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
