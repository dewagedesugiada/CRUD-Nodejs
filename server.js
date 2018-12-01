var http = require('http');
var url = require('url');
var routes = require('routes')();
var view = require('swig');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    database : 'nodejs',
    user : 'root',
    password : ''
});


routes.addRoute('/',function (req, res) {
   conn.query('Select * from mhs', function (err, row, field) {
       if (err) throw err;
       //console.log(row);
       // row.forEach(function (item) {
       //     console.log(item.nama);
       // })
       res.writeHead(200,{'Content-Type' : 'text-plain'});
       res.end(JSON.stringify(row));
   });
    });
//
// routes.addRoute('/profil/:nama?',function (req, res) {
//     res.writeHead(200, {'Content-Type' : 'text-plain'});
//     if (this.params.nama == 1){
//         res.end('ini profil milik dewa');
//     } else if (this.params.nama == 2){
//         res.end('Profil Kedua dewi');
//     }else{
//         res.end('hasil tidak ditemukan');
//     }
//
// });
//
// routes.addRoute('/kontak', function (req, res) {
//     var html = view.compileFile('./template/kontak.html')();
//     res.writeHead(200, {"Content-Type" : "text-html"});
//
//     res.end(html);
// })

var port = 8080;
http.createServer(function (req,res) {
    var path = url.parse(req.url).pathname;
    var match = routes.match(path);
    if (match){
        match.fn(req, res);
    }else{
        var html = view.compileFile('./template/404.html')();
        res.writeHead(404, {"Content-Type" : "text-html"});
        res.end(html);
    }
}).listen(port);
console.log('Server is running on port '+port);