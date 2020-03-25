const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
	title:{
		type:String,
		maxlength:20,
		minlength:4,
		required:[true,'未写入文章标题']
	},
	//关联用户和文章集合
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:[true,'请输入作者']
	},
	publishDate:{
		type:Date,
		default:Date.now
	},
	cover:{
		type:String,
		default:null
	},
	content:{
		type:String
	}
});

const Article = mongoose.model('Article',artSchema);

module.exports ={
	Article
}