var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

//添加url解析模块

var url = require('url');
var baseUrl = 'https://www.cnodejs.org';

var app = express();

app.get('/',function (req,res,next) {
	superagent.get('https://cnodejs.org/')
	.end(function (err,sres) {
		if (err) {
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items = [];
		$('#topic_list .topic_title').each(function (idx,element){
			var $element = $(element);
			var $authorParent = $element.parentsUntil('.cell');
			items.push({
				title:$element.attr('title'),
				href:url.resolve(baseUrl,$element.attr('href')),
				author:$authorParent.children('.user_avatar').children('img').attr('title'),
				});
		});		
		res.send(items);
	});
});

app.listen(3000,function(){
	console.log('app js listening at port 3000');
})
