const gulp = require('gulp');
const concat = require('gulp-concat');
const browserySync = require('browser-sync');

const dependencies = require('./dependencies');
const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;

gulp.task('dependecies', function(){
    gulp.src(dependencies)
        .pipe(concat('dependecies.js'))
        .pipe(gulp.dest('./static/js/'))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('js', function(){
    gulp.src(scripts)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./static/js/'))
        .pipe(browserySync.reload({
            stream: true
        }));
});
    

gulp.task('css', function(){
    gulp.src(styles)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./static/css/'))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('html', function(){
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./static/'))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function(){
    browserySync.init(null, {
        open: false,
        server: {
            baseDir: 'static'
        }
    });
});

gulp.task('build', function(){
    gulp.start(['css', 'dependecies', 'js', 'html']);
});

gulp.task('start', function(){
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./assets/**/*.css'], ['css']);
    gulp.watch(scripts, ['js']);
    gulp.watch(dependencies, ['dependecies']);
    gulp.watch(['./app/**/*.html'], ['html']);
});

gulp.task('default', function(){
    gulp.start(['start']);
})