"use strict";

//!<Начальные параметры проекта>
//Тестирование второй ветки в репозитории
//<Объявление всех модулей>
const { src, dest } = require("gulp"),
    gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    cssbeautify = require("gulp-cssbeautify"),
    removeComments = require("gulp-strip-css-comments"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    plumber = require("gulp-plumber"),
    panini = require("panini"),
    imagemin = require("gulp-imagemin"),
    del = require("del"),
    notify = require("gulp-notify"),
    webpack = require("webpack"),
    webpackStream = require("webpack-stream"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    webp = require("gulp-webp"),
    webpHtml = require("gulp-webp-html"),
    webpCss = require("gulp-webpcss"),
    browserSync = require("browser-sync").create();

//<Папка src и dist>
const srcPath = "src/";
const distPath = "dist/";

const fs = require('fs');

//<Пути к файлам>
const path = {
    build: {
        html: distPath,
        js: distPath + "assets/js/",
        css: distPath + "assets/css/",
        images: distPath + "assets/images/",
        fonts: distPath + "assets/fonts/",
    },
    src: {
        html: srcPath + "*.html",
        js: srcPath + "assets/js/*.js",
        css: srcPath + "assets/scss/*.scss",
        images:
            srcPath +
            "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts: srcPath + "assets/fonts/*.ttf",
    },
    watch: {
        html: srcPath + "**/*.html",
        js: srcPath + "assets/js/**/*.js",
        css: srcPath + "assets/scss/**/*.scss",
        images:
            srcPath +
            "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
    },
    clean: "./" + distPath,
};

//!<Функции>
//<Создание локального сервера>
function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath,
        },
    });
}

//<Сборка HTML>
function html(cb) {
    panini.refresh();
    return src(path.src.html, { base: srcPath })
        .pipe(plumber())
        .pipe(
            panini({
                root: srcPath,
                layouts: srcPath + "layouts/",
                partials: srcPath + "partials/",
                helpers: srcPath + "helpers/",
                data: srcPath + "data/",
            })
        )
        .pipe(webpHtml())
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

//<Сборка SCSS>
function css(cb) {
    return src(path.src.css, { base: srcPath + "assets/scss/" })
        .pipe(
            plumber({
                errorHandler: function (err) {
                    notify.onError({
                        title: "SCSS Error",
                        message: "Error: <%= error.message %>",
                    })(err);
                    this.emit("end");
                },
            })
        )
        .pipe(
            sass({
                includePaths: "./node_modules/",
            })
        )
        .pipe(
            autoprefixer({
                cascade: true,
            })
        )
        .pipe(cssbeautify())
        .pipe(webpCss({
            webpClass: '.webp',
            noWebpClass: '.no-webp'
        }))
        .pipe(dest(path.build.css))
        .pipe(
            cssnano({
                zindex: false,
                discardComments: {
                    removeAll: true,
                },
            })
        )
        .pipe(removeComments())
        .pipe(
            rename({
                suffix: ".min",
                extname: ".css",
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

//<Просмотр событий SCSS>
function cssWatch(cb) {
    return src(path.src.css, { base: srcPath + "assets/scss/" })
        .pipe(
            plumber({
                errorHandler: function (err) {
                    notify.onError({
                        title: "SCSS Error",
                        message: "Error: <%= error.message %>",
                    })(err);
                    this.emit("end");
                },
            })
        )
        .pipe(
            sass({
                includePaths: "./node_modules/",
            })
        )
        .pipe(
            rename({
                suffix: ".min",
                extname: ".css",
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

//<Сборка JS>
function js(cb) {
    return src(path.src.js, { base: srcPath + "assets/js/" })
        .pipe(
            plumber({
                errorHandler: function (err) {
                    notify.onError({
                        title: "JS Error",
                        message: "Error: <%= error.message %>",
                    })(err);
                    this.emit("end");
                },
            })
        )
        .pipe(
            webpackStream({
                mode: "production",
                output: {
                    filename: "app.js",
                },
                module: {
                    rules: [
                        {
                            test: /\.(js)$/,
                            exclude: /(node_modules)/,
                            loader: "babel-loader",
                            query: {
                                presets: ["@babel/preset-env"],
                            },
                        },
                    ],
                },
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

//<Просмотр событий JS>
function jsWatch(cb) {
    return src(path.src.js, { base: srcPath + "assets/js/" })
        .pipe(
            plumber({
                errorHandler: function (err) {
                    notify.onError({
                        title: "JS Error",
                        message: "Error: <%= error.message %>",
                    })(err);
                    this.emit("end");
                },
            })
        )
        .pipe(
            webpackStream({
                mode: "development",
                output: {
                    filename: "app.js",
                },
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

//<Сжатие IMG>
function images(cb) {
    return src(path.src.images)
        .pipe(
            webp({
                quality: 75
            })
        )
        .pipe(dest(path.build.images))
        .pipe(src(path.src.images))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 95, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

//<Конвертирование TTF в WOFF, WOFF2>
function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

//<Конвертирование OTF в TTF(использовать как отдельную команду --gulp otf2ttf--)>
gulp.task('otf2ttf', function () {
    return src([srcPath + 'assets/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(srcPath + 'assets/fonts/'));
});

//<Подключение шрифтов в файл fonts.scss>
function fontsStyle(params) {
    let file_content = fs.readFileSync(srcPath + 'assets/scss/_fonts.scss');
    if (file_content == '') {
        fs.writeFile(srcPath + 'assets/scss/_fonts.scss', '', cb1);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(srcPath + 'assets/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb1);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb1() {

}

//<Очистка>
function clean(cb) {
    return del(path.clean);

    cb();
}

//<Просмотр событий>
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], cssWatch);
    gulp.watch([path.watch.js], jsWatch);
    gulp.watch([path.watch.images], images);
}

//!<Сборка проекта>
//<сборка экспортированных функций, установка на них просмотрщика событий и запуск локального сервера>
const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts), fontsStyle);
const watch = gulp.parallel(build, watchFiles, serve);


//<Экспорт функций>
exports.css = css;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.html = html;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
