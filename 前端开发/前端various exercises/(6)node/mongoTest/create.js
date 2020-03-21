const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demon',{ useUnifiedTopology: true,useNewUrlParser: true })
	.then(() => console.log('数据库连接成功'))
	.catch(err => console.log(err,'数据库连接失败'))
	
 const courseSchema = new mongoose.Schema({
	name:String,
	author:String,
	published:Boolean
}) //创建集合规则

//使用规则创建集合,集合名称，集合规则
const Course = mongoose.model('Course',courseSchema)  //courses

//创建文档
// const course = new Course({
// 	name:'mongo操作',
// 	author:'zjh',
// 	published:true
// });
// course.save();//保存文档

//创建文档2
Course.create({name:'newway' , author:'zjh' , published:false} , (err,doc) => {
	console.log(err)
	console.log(doc)
})
