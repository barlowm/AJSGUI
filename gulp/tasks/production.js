"use strict";

const $ = require("../config.js");

// // Run this to compress all the things!
// $.gulp.task(
// 	"production",
// 	"Run this to build the production environment",
// 	["markup", "images", "fonts", "minifyCss", "uglifyJs"],
// 	function() {}
// );


const devFnc = function(cb) {
	$.deprecated("Production");
	cb();
};
devFnc.description = $.deprecated.description;
$.gulp.task("production", devFnc);
