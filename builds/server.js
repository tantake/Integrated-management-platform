import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';
gulp.task('server', (cb) => {
    if (!args.watch) return cb();
    var server = liveserver.new(['--harmony', 'server/bin/www']);
    server.start();

    gulp.watch(['server/package/**/*.js', 'server/package/**/*.html', 'server/package/**/*.css'], (file) => {
        server.notify.apply(server, [file]);

    })

})