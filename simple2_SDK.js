var http = require('http');
var MongoClient = require('mongodb').MongoClient;
bongo='pw'
url='url'

ctr=1
const { spawn } = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'tss secret -s 4']);



bat.stdout.on('data', (data) => {
   bongo=data.toString();
  url='mongodb://mongo1:'+(bongo.trim())+'@127.0.0.1:27017/admin'
   console.log('ready')
});
bat.stderr.on('data', (data) => {
  console.log(data.toString());
 });
bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});


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