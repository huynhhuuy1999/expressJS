var express=require('express');
var app= express();
var port=3000;


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users=[
			{name: 'duc'},
			{name: 'y'},
			{name: 'phap'}
		];

app.listen(port,function(){
	console.log("server is starting...");
});

app.get('/',function(request,response){
	response.render('index',{
		name: 'Y'
	});
});

app.get('/users',function(request,response){
	response.render('users/index',{
		users:users //users dau tien la ten bien 
	});
});
app.get('/users/search',function(req,res){
	var search= req.query.k;
	var arrUserSearch= users.filter(function(user){
		return user.name.toLowerCase().indexOf(search.toLowerCase())!==-1;
	});
	res.render('users/index',{
		users:arrUserSearch
	});
});

app.get('/users/create',function(req,res){
	res.render('users/create');
});
app.post('/users/create',function(req,res){
	users.push(req.body);
	res.redirect('/users');
});