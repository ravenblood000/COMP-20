var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const MongoURL = "mongodb+srv://23lalickerk:Bobbin101!@cluster0.cl1u9.mongodb.net/?retryWrites=true&w=majority";
var text = "";
var results = "";

http.createServer(function (req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var qobj = url.parse(req.url, true).query;
  text = qobj.search;
  
  MongoClient.connect(MongoURL, { useUnifiedTopology: true }, function(err, db)
  {
    if(err) {console.log("Connection err: " + err); return;}
      var dbo = db.db("HW12");
      var coll = dbo.collection("companies");
      results = text;
      db.close();		
  });  //end connect

  // search after connection?
  res.write("Heeeeyyyy...." + results);
  res.end();
}).listen(port);