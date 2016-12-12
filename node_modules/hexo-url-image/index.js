var fs = require('hexo-fs');
var yaml = require('yaml-front-matter');

var contentJsonPath = hexo.public_dir + 'content.json';
var post_asset_folder = hexo.config.post_asset_folder;
var imagesUrl = hexo.config.image_server_url

hexo.extend.filter.register('before_post_render', function(data) {
	var url_image = yaml.loadFront(data.raw).url_image;
	if (url_image){
		var url_thumbnail = yaml.loadFront(data.raw).url_thumbnail;
		data.url_image = imagesUrl + url_image;
		if(url_thumbnail){
			data.url_thumbnail = imagesUrl + url_thumbnail;
		}
	}
	return data;
});

hexo.extend.filter.register('before_exit', function() {
	// to work smoothly with hexo_generator_json_content
	var jsonContentCfg = hexo.config.hasOwnProperty('jsonContent') ? hexo.config.jsonContent : {
		meta: true
	};
	var postsCfg = jsonContentCfg.hasOwnProperty('posts') ? jsonContentCfg.posts : {};

	if ((postsCfg.url_image) && fs.existsSync(contentJsonPath)) {
		var postsObject = {};
		var posts = hexo.locals.get('posts');
		posts.forEach(function(post) {
			postsObject[post.path] = post;
		});
		var content = JSON.parse(fs.readFileSync(contentJsonPath));
		var contentPosts = content.posts;
		if (!contentPosts) return;
		content.posts = contentPosts.map(function(post) {
			var fullPost = postsObject[post.path];
			if (fullPost && fullPost.url_image) {
				post.url_image = fullPost.url_image;
				if(postsCfg.url_thumbnail && fullPost.url_thumbnail){
					post.url_thumbnail = fullPost.url_thumbnail;
				}
			}
			return post;
		});
		fs.writeFileSync(contentJsonPath, JSON.stringify(content));
	}
});
