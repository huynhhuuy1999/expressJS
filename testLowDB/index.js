require('dotenv').config();

const express= require('express');
var cookieParser = require('cookie-parser');

const userRoute= require('./routes/user.route.js');
const authRoute= require('./routes/auth.route.js');
const productRoute= require('./routes/product.route.js');

const authMiddleware= require('./middlewares/auth.middleware.js');

const port=3000;
const app=express();

app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',function(req,res){
	res.render('index');
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

app.use(express.static('public'));

app.listen(port,function(){
	console.log("Server starting" + port+" ...");
});