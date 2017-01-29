
const gulp = require("gulp");
let concat = require("gulp-concat");





gulp.task("Group Settings",function(){
    gulp.src("lib/Config/Settings/**/*.ts").
    pipe(concat({path:"Settings.ts"})).
    pipe(gulp.dest("lib/Config"))
})

gulp.task("Group Decorators",function(){
    gulp.src("lib/Decorator/Decorators/**/*.ts").
    pipe(concat({path:"index.ts"})).
    pipe(gulp.dest("lib/Decorator"))
})



gulp.task("default",["Group Decorators","Group Settings"])