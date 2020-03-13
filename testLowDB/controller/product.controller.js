const db= require('../db.js');

module.exports.index=function(req,res){
	let page = parseInt(req.query.page)||1;
	let numberPage= [page-2,page-1,page,page+1,page+2];
	if(page<3)
		numberPage= [1,2,3,4,5];
	let perpage = 8;
	let start = (page-1)*perpage;
	let end = start+perpage;
	res.render('product/index.pug',{
		products: db.get('products').value().slice(start,end),
		numberPage: numberPage
	});
}
