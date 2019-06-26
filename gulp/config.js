"use strict";

/* Modules used within the application */
const dotenv = require("dotenv").config(); // Use .ENV files for configuration, use .env.example to check for required variables
const gulp = require("gulp-help")(require("gulp")); // Adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks

/* Modules used for testing the application */
const chai = require("chai");		// BDD / TDD assertion library for use with any javascript testing framework.
const expect = chai.expect;
const assert = chai.assert;

const mocha = require("gulp-mocha");		// Gulp plugin for Modha a simple, flexible, fun test framework
const mochawesome = require("mochawesome");		// An HTML/CSS Reporter for Mocha.js

const eslint = require("gulp-eslint");	// A gulp plugin for processing files with ESLint
const notify = require("gulp-notify");	// A gulp plugin for sending notification messages to the console



// const run = require("gulp-run");
const nodemon = require("nodemon");

const argv         = require("yargs");
const log         = require("fancy-log");	// Replaces the log module in gulp-util which is deprecated
const colors       = require("ansi-colors");	// Replaces the colors module in gulp-util which is deprecated
// const connect = require("browser-sync"); // Plugin to keep multiple browsers & devices in sync when building websites, includes livereload capability.
const browserify = require("browserify"); // lets you require('modules') in the browser by bundling up all of your JavaScript source
const babelify = require("babelify");

const del = require("del");	// Module for deleting files
const fs = require("fs-extra");	// Module which adds file system methods that aren't included in the native node.js fs module

const concat = require("gulp-concat"); // A gulp plugin to combine multiple files into a single file via streams
const requireDir = require("require-dir"); // Plugin to require() directories.
const source = require("vinyl-source-stream"); // Plugin to convert the readable stream from browserify into a vinyl stream for gulp
const buffer = require("vinyl-buffer");


// Modules used within the application
const axios = require("axios");
const base64 = require("base-64");
const moment = require("moment");



// const reload = connect.reload; // browser-sync component to reload the browser

const src = process.env.SOURCE_ROOT;
const dest = process.env.BASE_PATH;
const main_script = process.env.APP_FILE;


const clientRoot = src + "/Client";
const clientDest = dest + "/Server/Client";
const serverRoot = src + "/Server";
const serverDest = dest + "/Server";

const script_path = "/js/";
const style_path = "/css/";
const image_path = "/imgs/";

const test_path = "./tests";
const p_dest = "./pretty";


const page_dest = clientDest;
const style_dest = clientDest + style_path;
const script_dest = clientDest + script_path;
const image_dest = clientDest + image_path;


const pretty_dest = p_dest;

const main_script_assets = clientRoot + script_path + main_script;
const script_assets = clientRoot + script_path + "**/*.js"; // The **/ is used to make sure even any subdirectories are traversed
const style_assets =  clientRoot + style_path + "*.css";
const page_assets =   clientRoot + "/*.html";
const image_assets =  clientRoot + image_path + "**/*.*";

const pretty_assets = [script_assets, "./*.md", "./doc/**/*.md"];

const root_assets = [
	clientRoot + "/*.webmanifest",
	clientRoot + "/*.ico",
	clientRoot + "/*.xml"
];

const cb = function() {};

const deprecated = function(task) {
	console.log(colors.bgBlue.yellowBright(` ${task} Task has been Deprecated! Oh my heavens! (Wait for Gulp4 Re-write)`));
};
deprecated.description = colors.bgBlue.yellowBright("   Task has been deprecated   ");

module.exports = {
	cb: cb,
	deprecated: deprecated,
	chai: chai,
	expect: expect,
	assert: assert,
	// run: run,
	nodemon: nodemon,

	dotenv: dotenv,
	eslint: eslint,
	notify: notify,
	mocha: mocha,
	mochawesome: mochawesome,

	comment1: "Export Variables; Some variables are pulled from the .ENV file",
	src: src,
	dest: dest,
	port: process.env.PORT,

	// src_path: "../" + src+script_path,
	// test_path: test_path,

	comment2: "The various assets which make up the application.",
	comment2a: "The individual assets are used in the individual build modules",
	// main_script: main_script,
	main_script_assets: main_script_assets,
	script_assets: script_assets,
	style_assets: style_assets,
	page_assets: page_assets,
	root_assets: root_assets,
	image_assets: image_assets,
	pretty_assets: pretty_assets,

	clientRoot: clientRoot,
	clientDest: clientDest,
	serverRoot: serverRoot,
	serverDest: serverDest,
	page_dest: page_dest,
	style_dest: style_dest,
	script_dest: script_dest,
	image_dest: image_dest,
	pretty_dest: pretty_dest,

	// assets: [page_assets, style_assets, script_assets, root_assets],

	comment3: "Export Modules",
	browserify: browserify,
	babelify: babelify,
	del: del,
	fs: fs,
	gulp: gulp,
	concat: concat,
	// connect: connect,
	argv: argv,
	log: log,
	colors: colors,
	requireDir: requireDir,
	source: source,
	buffer: buffer,




	axios: axios,
	base64: base64,
	moment: moment

};
