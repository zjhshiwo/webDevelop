const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
	
	name:{
		type:String,
		required:true,
		minlength:2,
		maxlength:6
	},
	age:{
		type:Number,
		min:10,
		max:30
	},
	sex:{
		type:String
	},
	email:String,
	hobbies:[String],
	collage:String,
	enterDate:{
		type:Date,
		default:Date.now
	}
	
})

const Student = mongoose.model('Student',studentsSchema);
module.exports =Student;