var http = require('http');
var MongoClient = require('mongodb').MongoClient;
url='mongodb://mongo1:g00se@127.0.0.1:27017/admin'
ctr=1


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  

  
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
  
    db.close();
	  console.log(result)
	
	res.write('<html><div width=500px>')
	res.write('<b>' + ctr +'</b>' + '<br>' + JSON.stringify(result));
	res.end('</div></html>')
	
  });
ctr=ctr+1  

  });
  
  
  
  
  
  
  }).listen(8080);