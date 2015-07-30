var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
//加载url解析模块
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

//superagent 的 end方法用来发起请求
superagent.get(cnodeUrl)
	.end(function(err, res) {
		if (err) {
			return console.error(err);
		}
		var topicUrls = [];
		var $ = cheerio.load(res.text);
		$('#topic_list .topic_title').each(function(idx, element) {
			var $element = $(element);
			var href = url.resolve(cnodeUrl, $element.attr('href'));
			topicUrls.push(href);
		});

		var ep = new eventproxy();

		ep.after('topic_html', topicUrls.length, function(topics) {
			//这时候topics的结构是一系列的 [topicUrl, res.text] 对构成的数组
			topics = topics.map(function(topicPair) {
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				var $ = cheerio.load(topicHtml);
				var 	author1HomeUrl = '',
					author1Name = '';
					author1Credits = 0;
				//author1HomeUrl = 	url.resolve(cnodeUrl, $('.author_content .user_avatar').eq(0).attr('href'));
				author1HomeUrl = 	$('.author_content .user_avatar').eq(0).attr('href');
				if (typeof author1HomeUrl !== 'undefined') {
					author1HomeUrl = url.resolve(cnodeUrl, author1HomeUrl);
					author1Name = (cheerio.load(author1HomeUrl)).html();
				};
				return ({
					title: $('.topic_full_title').text().trim(),
					href: topicUrl,
					comment1: $('.reply_content').eq(0).text().trim(),
					author1: author1Name,
				});
			});

			console.log('final:');
			console.log(topics);
		});

		topicUrls.forEach(function(topicUrl) {
			superagent.get(topicUrl)
				.end(function(err, res) {
					console.log('fetch ' + topicUrl + ' successful');
					ep.emit('topic_html', [topicUrl, res.text]);
				});
		});
	});