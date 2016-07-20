import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('clean', ['clean:build']);
gulp.task('build', ['build:babel']);
gulp.task('default', ['build']);

gulp.task('clean:build', () => {
    return del(['lib']);
});

gulp.task('build:babel', ['clean:build'], () => {
    return gulp.src(['src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});