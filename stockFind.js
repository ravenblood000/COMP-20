var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const MongoURL = "mongodb+srv://23lalickerk:Bobbin101!@cluster0.cl1u9.mongodb.net/?retryWrites=true&w=majority";
var text;

http.createServer(function (req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var qobj = url.parse(req.url, true).query;
  text = qobj.search;
  res.write("The search value is " + text);
  
  MongoClient.connect(MongoURL, { useUnifiedTopology: true }, function(err, db)
  {
    if(err) {console.log("Connection err: " + err); return;}
      var dbo = db.db("HW12");
      var coll = dbo.collection("companies");
	console.log(text);
      db.close();		
  });  //end connect
  // search after connection?
  res.end();
}).listen(port);