const http = require('http');
const url = require('url');
const app=http.createServer();//返回一个服务器对象
app.on('request',(req,res) => {
	const method = req.method.toLowerCase()  //获取请求方式
	const pathname = url.parse(req.url).pathname;//获取请求地址
	res.writeHead(200,{
		'content-type':'text/html;charset=utf8'
	})
	if(method == 'get'){
		if(pathname == '/' || pathname == '/index'){
			res.end('这是首页');
		}else if((pathname == '/list')){
			res.end('这是列表页');
		}else{
			res.end('页面不存在')
		}
		
	}else if(method == 'post'){
		
	}
});
//端口监听
app.listen(1212);
console.log('启动成功');