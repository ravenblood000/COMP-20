var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;

http.createServer(function (req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var qobj = url.parse(req.url, true).query;
  var text = qobj.search;
  res.end("The search value is " + text);
}).listen(port);