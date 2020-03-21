const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
gulp.task('first',done=>{
	console.log('运行成功');
	gulp.src('src/index.css')
	.pipe(gulp.dest('dit/css'))
	done(); 
})
gulp.task('jsmin',done => {
	gulp.src('./src/*.js')
	.pipe(babel({
		presets:['@babel/env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest('dit/js'))
	done();
})