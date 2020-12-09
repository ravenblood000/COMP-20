var readline = require('readline');
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://23lalickerk:Bobbin101!@cluster0.cl1u9.mongodb.net/HW12?retryWrites=true&w=majority";

function main() 
{
  myFile.on('line', function (line)
  {
    if (line.substring(0, line.indexOf(',')) != "Company")
    {
      MongoClient.connect(url, function(err, db)
      {
        if(err) {return console.log(err);}
        var dbo = db.db("HW12");
        var collection = dbo.collection("companies");
	
        var newData = {"company": line.substring(0, line.indexOf(',')), "ticker": line.substring(line.indexOf(',') + 1)};
        collection.insertOne(newData, function(err, res)
	{
          if (err) throw err;
        }); // end of function
        db.close(); 
      }); // end of Mongo Client function
    } // end of if iteration
  }); // end of myFile.on function
} // end of main function

var myFile = readline.createInterface({
  input: fs.createReadStream('companies-1.csv')
});

main();