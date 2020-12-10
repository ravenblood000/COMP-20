var http = require('http');
var url = require('url');
const MongoClient = require('mongodb').MongoClient;
const MongoURL = "mongodb+srv://23lalickerk:Bobbin101!@cluster0.cl1u9.mongodb.net/HW12?retryWrites=true&w=majority";

http.createServer(function (req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var qobj = url.parse(req.url, true).query;
  var text = qobj.searchC;
  var radio = qobj.search;
  res.write("<h1>Database Results: </h1>");
  var x = doit(text, radio);
  x.then(function(s)
  {
    res.write(s);
    res.end();
  });      
}).listen(8080);

async function doit(input, rad)
{
   client = new MongoClient(MongoURL, { useUnifiedTopology: true});
   try
   {
     await client.connect();
     var dbo = client.db("HW12");
     var coll = dbo.collection("companies");
     var results = "";
     query = {}
     if (rad == "ticker")
       query = {"ticker": input}
     else
     {query = {"company": input}}

     const curs = coll.find(query);
     if ((await curs.count()) === 0)
     {results = "No documents found!";}
     await curs.forEach(function(item)
     {
       results += ("Company Name: " + item.company + ", Company Ticker: " + item.ticker + "<br>");
     });
   } 
   catch(err)
   {console.log("Database error: " + err);}
   finally
   {
     client.close();
     return results;
   }
} // end of doit()