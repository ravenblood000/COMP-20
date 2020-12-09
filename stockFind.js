var http = require('http');
var url = require('url');
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb+srv://23lalickerk:Bobbin101!@cluster0.cl1u9.mongodb.net/HW12?retryWrites=true&w=majority";

MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function(err, db)
{
  if(err){ console.log("Connection err: " + err); return; }

  var dbo = db.db("HW12");
  var coll = dbo.collection("companies");
  theQuery = { $or: [{"company": "FLWS"},{"ticker":"FLWS"} ]};
  coll.find(theQuery).toArray(function(err, items)
  {
    if (err) {console.log("Error: " + err);}
    else 
    {
      for (i = 0; i < items.length; i++)
        console.log("Company Name: " + items[i].company + "\n\tTicker: " + items[i].ticker);				
    }   
    db.close();
  });  // end find		
});  // end connect

//http.createServer(function (req, res)
//{
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //var qobj = url.parse(req.url, true).query;
  //var text = qobj.search;
  //console.log("Search value: " + text);
  //res.end();
//}).listen(8080);