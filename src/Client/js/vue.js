// const $ = require("jquery");

// const bootstrap = require("bootstrap");
// import "bootstrap/dist/css/bootstrap.css";

// const axios = require("axios");
// const base64 = require("base-64");
// const enLang = require("ab-datepicker/js/locales/en-US-Posix.min");
// const datepicker = require("ab-datepicker");

const Vue = require("vue");
window.Vue = Vue;
const App  = require("./app.js");

const RPCTest = new Vue( {
	render: h => h(App)
}).$mount("#app");

console.log("Do we get here?")
console.log("The Module - ", RPCTest);
