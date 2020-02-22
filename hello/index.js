var express = require('express');
var app = express();
var port=3000;

app.listen(port,function(){
	console.log("Server listening on port "+ port);
});

app.get('/',function(request,response){
	response.send("<h1>Hello</h1>");
});
app.get('/user',function(request,response){
	response.send("<h1>Huynh Huu Y</h1>");
});