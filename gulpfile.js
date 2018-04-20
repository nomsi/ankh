const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('tslint');
const lint = require('gulp-tslint');
const del = require('del');

const project = ts.createProject('tsconfig.json');
const linter = tslint.Linter.createProgram('tsconfig.json');

gulp.task('default', ['lint', 'build']);

gulp.task('lint', () => {
    gulp.src('./src/**/*.ts').pipe(lint({
        configuration: 'tslint.json',
        formatter: 'prose',
        program: linter
    })).pipe(lint.report());
});

gulp.task('build', () => {
    del.sync(['./dist/**/*.*']);
    const tsCompile = gulp.src('./src/**/*.ts').pipe(project());
    tsCompile.pipe(gulp.dest('dist/'));
    return tsCompile.js.pipe(gulp.dest('dist/'));
});
