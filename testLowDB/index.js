const express= require('express');

const userRoute= require('./routes/user.route');

const port=3000;
const app=express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',function(req,res){
	res.render('index');
});

app.use('/users',userRoute);
app.use(express.static('public'))

app.listen(port,function(){
	console.log("Server starting" + port+" ...");
});