import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named'; // 用来保持输入和输出的文件名相同的插件
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber'; // 防止来自 gulp 插件错误导致中断操作的插件
import rename from 'gulp-rename';
import uglify from 'gulp-uglify'; // js 代码混淆压缩插件
import { log, colors } from 'gulp-util';
import args from './util/args';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
gulp.task('js', () => {
    return gulp.src(['app/**/*.js', 'app/*.vue', 'app/**/*.vue'])
        .pipe(gulp.dest('server/package/'))
})

gulp.task('scripts', ['js'], () => {
    //   return gulp.src(['./app/*.js', './app/**/*.js', '!./app/lib/h-ui/js/H-ui.js', '!./app/lib/h-ui/js/H-ui.min.js'])
    return gulp.src(['./app/main.js'])
        .pipe(plumber({
            errorHandler: function() {}
        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                rules: [{
                        test: /\.vue$/,
                        loader: 'vue-loader',
                        options: {
                            /*  loaders: {
                                  css: 'css-loader',
                                  postcss: 'postcss-loader',
                                  scss: 'vue-style-loader',
                                  sass: 'vue-styloe-loader',

                              },
                              cssSourceMap: true,*/
                            /*    loaders: {
                                    css: ExtractTextPlugin.extract({
                                        use: "css-loader",
                                        fallback: 'vue-style-loader'
                                    })

                                },
                                extractCSS: true*/
                        }
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        /* use: [{
                             loader: 'vue-style-loader'
                         }, {
                             loader: 'css-loader',
                         }]*/
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                    }
                ]
            },
            externals: {
                //    'jquery': 'jQuery',
                //             'vue': 'Vue',
                // 'echarts': 'echarts'
            },
            mode: 'development',
            plugins: [
                new VueLoaderPlugin(),
                new MiniCssExtractPlugin({ filename: "output.css" }),
            ]

        }), null, (err, stats) => {
            log(`Finished '${colors,cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest('server/package'))
        //    .pipe(uglify())
        //    .pipe(gulp.dest('server/page/js'))
        .pipe(gulpif(args.watch, livereload()))


})

gulp.task('script-t', ['js'], () => {
    return gulp.src['app/main.js']
        .pipe(plumber({
            errorHandler: function() {}
        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors,cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest('package'))
        .pipe(rename({
            basename: 'cp',
            extname: '.min.s'
        }))
        .pipe(uglify({ compress: { properties: false }, output: { 'quote_key': true } }))
        .pipe(gulp.dest('server/page'))
        .pipe(gulpif(args.watch, livereload()))


})