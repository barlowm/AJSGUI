"use strict";

const $ = require("../config.js");

const serverFnc = function(cb) {
	console.log("------------------ Building Server Scripts ------------------");
	console.log(`Root - ${$.serverRoot}; Dest - ${$.serverDest}`);
	$.gulp.src([$.serverRoot + "/**/*.js"]).pipe($.gulp.dest($.serverDest));
	cb();
};
serverFnc.description = "Combine any Script files into a single file and move combined file into the build folder";
$.gulp.task("index", serverFnc);


const jsFnc = function(cb) {
	console.log("------------------ Building Client Scripts ------------------");
	console.log(`Source Files: ${$.script_assets}`);
	console.log(`Output Script File: ${$.script_dest}`);
	console.log(`Dest Folder: ${$.script_dest}`);

	// Note in this task, we're using Browserify to transform, concatinate, and pipe the output rather than $.gulp
	$.browserify($.main_script_assets)
		.transform("babelify", {
			presets: ["@babel/preset-env"]
		})
		.bundle()
		.pipe($.source("app.js"))
		.pipe($.gulp.dest($.script_dest));
	cb();
};
jsFnc.description = "Combine any Script files into a single file and move combined file into the build folder";
$.gulp.task("js", jsFnc);


const cssFnc = function(cb) {
	console.log("------------------ Building CSS ------------------");
	console.log(`Source Files: ${$.style_assets}`);
	console.log(`Dest Folder: ${$.style_dest}`);

	$.gulp
		.src($.style_assets)
		.pipe($.concat("common.css"))
		.pipe($.gulp.dest($.style_dest));
	cb();
};
cssFnc.description = "Combine any CSS files into a single file and move combined file into the build folder";
$.gulp.task("css", cssFnc);


const htmlFnc = function(cb) {
	console.log("------------------ Building HTML ------------------");
	console.log(`Source Files: ${$.page_assets}`);
	console.log(`Dest Folder: ${$.page_dest}`);

	$.gulp.src($.page_assets).pipe($.gulp.dest($.page_dest));
	cb();
};
htmlFnc.description = "Copy any HTML pages into the build folder";
$.gulp.task("html", htmlFnc);


const miscFnc = function(cb) {
	console.log("------------------ Building Misc Assets ------------------");
	console.log(`Source Files: ${$.root_assets}`);
	console.log(`Dest Folder: ${$.page_dest}`);

	$.gulp.src($.root_assets).pipe($.gulp.dest($.page_dest));
	cb();
};
miscFnc.description = "Copy any Misc Assets into the build folder";
$.gulp.task("misc", miscFnc);


const done = function(cb) {
	console.log("------------------ Build Complete ------------------");
	cb();
};

const buildFnc = $.gulp.series(htmlFnc, cssFnc, jsFnc, miscFnc, serverFnc, done);
buildFnc.description = "Build the entire application by running individual processes";
$.gulp.task("build", buildFnc);

