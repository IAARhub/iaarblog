# Hexo Url Image

A Hexo plugin to allow adding url_image in front-matter, then you can refer post.url_image in your templates;

For example:

`CoolPost.md`

	---
	title: Cool post
	url_image: my_img.png
	---
	What a cool blog I have!

By setting url_image, you specify a post's url image in its front matter.

The absolute path to `my_img.png` will be available through `post.url_image` in your templates.

For example:

`article.ejs`

	...
	<% if (post.url_image){ %>
        <img src="<%- post.url_image %>">
    <% } %>
    ...

## Installation
	npm install --save hexo-url-image
## Usage
This plugin will make automatically make `post.url_image` available in your templates when you run `hexo server` or `hexo generate`.

If you are using [hexo-generator-json-content](https://github.com/alexbruno/hexo-generator-json-content), it will automatically add the `url_image` property to `content.json` when you run `hexo generate` and when you __exit__ `hexo server`.
## Configuration
### URL
For this plugin to work correctly, you must set `image_server_url` to your URL in `_config.yml`. if you use a image cloud server with url //some.bkt.clouddn.com/,  set it like this:

`_config.yml`

    ...
    # URL
    image_server_url: http://some.bkt.clouddn.com/
    ...

### [hexo-generator-json-content](https://github.com/alexbruno/hexo-generator-json-content) (!!!Experiment)
This plugin plays nicely with [hexo-generator-json-content](https://github.com/alexbruno/hexo-generator-json-content), and will output the absolute path of `url_image` to `content.json` if `url_image` has been set to `true` in the `jsonContent` configuration part of `_config.yml` like so:

	...
    jsonContent: {
    	...
        posts: {
        	...
            url_image: true
            thumbnail: true # if you want thumbnail to be added as well
        }
    }
