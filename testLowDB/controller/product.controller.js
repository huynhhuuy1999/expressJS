// const db= require('../db.js');
const Product= require('../models/products.model.js');

// ----------Code low db---------------------
/*module.exports.index=function(req,res){
	let page = parseInt(req.query.page)||1;
	let numberPage= [page-2,page-1,page,page+1,page+2];
	if(page<3)
		numberPage= [1,2,3,4,5];
	let perpage = 8; // mỗi trang hiển thị 8 product
	let start = (page-1)*perpage;
	let end = start+perpage;

	// let sessionId= req.signedCookies.sessionId;
	// let session= db.get('sessions').find({id:sessionId}).value();
	res.render('product/index.pug',{
		products: db.get('products').value().slice(start,end), // tách số product hiển thị trong mảng products
		numberPage: numberPage
	});

}*/

/*module.exports.search=function(req,res){
	let name= req.query.name;
	let products= db.get('products').value();
	let listProduct=products.filter(function(product){
		return product.name.indexOf(name)!==-1;
	});
	res.render('product/index',{
		products:listProduct
	});
}*/
//-----------Code MongoDB-----------------------
module.exports.index= function(req,res){
	//Product.find trả về promise nên có then()

	Product.find().then(function(products){
		res.render('product/index.pug',{
			products:products
		});
	});
}