const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsc = require('gulp-tsc');
const tslint = require('tslint');
const lint = require('gulp-tslint');
const del = require('del');
const runseq = require('run-sequence');
const shell = require('gulp-shell');

const project = ts.createProject('tsconfig.json');
const linter = tslint.Linter.createProgram('tsconfig.json');

gulp.task('default', ['build']);

gulp.task('lint', () => {
    gulp.src('./src/**/*.ts').pipe(lint({
        configuration: 'tslint.json',
        formatter: 'prose',
        program: linter
    })).pipe(lint.report());
});

gulp.task('build', () => {
    del.sync(['./dist/**/*.*']);
    const tsCompile = gulp.src('./src/**/*.ts')
        .pipe(project());
    tsCompile.pipe(gulp.dest('dist/'));
    gulp.src('./src/**/*.js').pipe(gulp.dest('dist/'));
    gulp.src('./src/**.json').pipe(gulp.dest('dist/'));
    return tsCompile.js.pipe(gulp.dest('dist/'));
});

gulp.task('run', shell.task(['node ./dist/ankh.js']));
