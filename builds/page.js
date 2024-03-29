import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';
gulp.task('pages', () => {
    return gulp.src(['app/**/*.html','app/**/*.ejs','app/**/*.png'])
        .pipe(gulp.dest('server/package'))
        .pipe(gulpif(args.watch, livereload()))
})