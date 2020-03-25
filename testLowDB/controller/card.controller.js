const db= require('../db.js');

module.exports.addToCard= function(req,res){
	let productId= req.params.productId;
	let sessionId= req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/products');
		return;
	}

	let count= db.get('sessions') // đếm số product đã đặt của 1 product
	.find({id:sessionId})
	.get('card.'+ productId,0) // nếu chưa đặt thì product = 0
	.value();

	db.get('sessions')
	.find({id:sessionId})
	.set('card.' + productId,count+1) //đặt thêm thì tăng 1
	.write();

	res.redirect('/products');
}