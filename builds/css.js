import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';
import less from 'gulp-less';

gulp.task('Less', () => {
    gulp.src('app/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('server/package/'))
})
gulp.task('css', ['Less'], () => {
    return gulp.src('app/**/*.css')
        .pipe(gulp.dest('server/package/'))
        .pipe(gulpif(args.watch, livereload()))
})