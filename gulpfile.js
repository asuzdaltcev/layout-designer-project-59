const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Пути к файлам
const paths = {
  app: {
    pug: 'app/**/*.pug',
    scss: 'app/styles/**/*.scss',
    js: 'app/js/**/*.js',
    images: 'app/images/**/*',
    svg: 'app/images/svg/**/*.svg',
    fonts: 'app/fonts/**/*'
  },
  build: {
    html: 'build/',
    css: 'build/css/',
    js: 'build/js/',
    images: 'build/images/',
    fonts: 'build/fonts/'
  }
};

// Компиляция Pug в HTML
function pugTask() {
  return gulp.src('app/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.build.html))
    .pipe(browserSync.stream());
}

// Компиляция SASS в CSS
function sassTask() {
  return gulp.src('app/styles/main.scss')
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build.css))
    .pipe(browserSync.stream());
}

// Создание SVG спрайта
function svgSpriteTask() {
  return gulp.src(paths.app.svg)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest(paths.build.images));
}

// Объединение и минификация JavaScript
function jsTask() {
  return gulp.src(paths.app.js)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build.js))
    .pipe(browserSync.stream());
}

// Копирование изображений
function imagesTask() {
  return gulp.src(paths.app.images)
    .pipe(gulp.dest(paths.build.images))
    .pipe(browserSync.stream());
}

// Копирование шрифтов
function fontsTask() {
  return gulp.src(paths.app.fonts)
    .pipe(gulp.dest(paths.build.fonts))
    .pipe(browserSync.stream());
}

// Отслеживание изменений
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch(paths.app.pug, pugTask);
  gulp.watch(paths.app.scss, sassTask);
  gulp.watch(paths.app.js, jsTask);
  gulp.watch(paths.app.images, imagesTask);
  gulp.watch(paths.app.svg, svgSpriteTask);
  gulp.watch(paths.app.fonts, fontsTask);
}

// Экспорт задач
exports.pug = pugTask;
exports.sass = sassTask;
exports.svgSprite = svgSpriteTask;
exports.js = jsTask;
exports.images = imagesTask;
exports.fonts = fontsTask;
exports.watch = watchTask;

// Задача по умолчанию
exports.default = gulp.series(
  gulp.parallel(pugTask, sassTask, svgSpriteTask, jsTask, imagesTask, fontsTask),
  watchTask
);

// Задача сборки
exports.build = gulp.parallel(pugTask, sassTask, svgSpriteTask, jsTask, imagesTask, fontsTask);
