var gulp = require('gulp');
var screeps = require('gulp-screeps');
var credentials = require('./credentials.js');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

gulp.task('screeps', function() {
    gulp.src(['src/*.js', 'src/**/*.js'])
        .pipe(rename(function(path){
            if(path.dirname != '.'){
                var path_array = path.dirname.split('/');
                var new_path = '';
                for(var i in path_array){
                    if(path_array[i] != 'main'){
                        new_path += (new_path.length ? '.' : '') + path_array[i];
                    }
                }
                path.basename = new_path + '.' + path.basename;
                path.dirname = '.';
            }
        }))
        .pipe(gulp.dest('dist'))
        .pipe(screeps(credentials))
        .pipe(livereload())
});

gulp.task('default', function() {
    livereload.listen();
    gulp.watch(['src/*.js','src/**/*.js'], ['screeps']);
});