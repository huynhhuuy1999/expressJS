require('dotenv').config(); //sử dụng tạo file .env

const express= require('express');
const cookieParser = require('cookie-parser');//sử dụng đọc được cookies
const csurf = require('csurf'); //sử dụng csrf
const mongoose= require('mongoose'); // sử dụng kết nối mongoDB

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
	()=> {
		console.log("access");
	},
	err=> {
		console.log("false");
	}
);

console.log(process.env.MONGO_URL);

const userRoute= require('./routes/user.route.js');
const authRoute= require('./routes/auth.route.js');
const productRoute= require('./routes/product.route.js');
const cardRoute= require('./routes/cards.route.js');
const transferRoute= require('./routes/transfer.route.js');

const authMiddleware= require('./middlewares/auth.middleware.js');
const sessionMiddleware= require('./middlewares/session.middleware.js');

const port=3000;
const app=express();

app.use(cookieParser(process.env.SESSION_SECRET)); //Sử dụng tạo dãy cookie bảo mật
app.use(sessionMiddleware); //sử dụng mỗi lần vào trang web phải có 1 session
// app.use(csurf({ cookie: true })); // câu lệnh phải được khai báo sau cookieParser
const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);

app.set('view engine', 'pug');
app.set('views', './views'); // tạo thư mục view default

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',function(req,res){
	res.render('index');
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cards',cardRoute);
app.use('/transfer',
		 authMiddleware.requireAuth,  //yêu cầu đăng nhập 
		 csrfProtection, //tránh hacker 
		 transferRoute); // chuyển vào các route

app.use(express.static('public'));

app.listen(port,function(){
	console.log("Server starting" + port+" ...");
});