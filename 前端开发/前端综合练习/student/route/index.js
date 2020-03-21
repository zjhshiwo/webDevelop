const getRouter = require('router');
const router =getRouter();
const Student = require('../model/user.js');
const template = require('art-template');
const querystring = require('querystring')
//学生信息页面
router.get('/add',(req,res) => {
	let html = template('index.art',{})
	res.end(html);
})
//学生信息列表页面
router.get('/list',async (req,res) => {
	//查询学生信息
	let students = await Student.find();
	let html = template('list.art',{
		students:students
	})
	res.end(html);
})

//添加信息页面
router.post('/add',(req,res) => {
	let formData = '';
	req.on('data',param => {  //事件处理函数
		formData += param;
	})
	req.on('end',async() =>{   //async转换为异步函数
		await Student.create(querystring.parse(formData));  //字符转换对象，给student构造函数
		res.writeHead(301,{
			Location:'/list'
		});
		res.end();
	})
})
module.exports = router;