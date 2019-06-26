// const bunyan = require("bunyan");
const axios = require("axios");
const fs = require("fs-extra");
const path = require('path');
const base64 = require('base-64');
const url = require('url');

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpg',
	'.gif': 'image/gif',
	'.wav': 'audio/wav',
	'.mp4': 'video/mp4',
	'.woff': 'application/font-woff',
	'.ttf': 'application/font-ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'application/font-otf',
	'.svg': 'application/image/svg+xml',
	'.m': 'application/txt'
};



const WebRoot = "./Client";
const ErrPage = "./Client/404.html/";

const Get = {
	getFilePath: function(request) {

		let filePath = WebRoot + request.url;

		if (filePath == `${WebRoot}/`) {
			filePath = `${WebRoot}/index.html`;
		}

		let stripPos = filePath.indexOf("?");
		if (stripPos > 0) {
			filePath = filePath.substring(0, stripPos);
		}

		filePath = decodeURI(filePath);
		return filePath;
	},

	getFileExt: function(filePath) {
		var extName = String(path.extname(filePath)).toLowerCase();
		return extName;
	},

	readFile: function(filePath, response) {
		var contentType = mimeTypes[Get.getFileExt(filePath)] || 'application/txt'; // 'application/octet-stream';


		console.log("FilePath - ", filePath);
		console.log("ContentType - ", contentType);

		fs.readFile(filePath, function(error, content) {
			if (error) {
console.log(`readFile error trapper - ${error.code}`)
fs.readdir(WebRoot, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});
				if (error.code == 'ENOENT') {
					fs.readFile(ErrPage, function(error, content) {
						response.writeHead(200, {
							'Content-Type': contentType
						});
						response.end(content, 'utf-8');
					});
				} else {
					response.writeHead(500);
					response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
					response.end();
				}
			} else {
				response.writeHead(200, {
					'Content-Type': contentType
				});
				response.end(content, 'utf-8');
			}
		});
	},

	callServer: function(URL, type, CachéAuth, response, dataHandler) {
		let rpcInfo = "";
		const headers = {
			"Accept": "application/json",
			"Authorization": "Basic " + CachéAuth,
			"Access-Control-Allow-Origin": '*'
		};

		axios.get(URL, {
				headers: headers
			})
			.then(rData => {
				let theData = dataHandler(rData);
				response.write(theData);
				response.end();
				aSocket.emit("info", `Service ${type} is complete`)
			})
			.catch(error => {
				console.log("-----------------------")
				console.log(`ERROR...Type: ${type}...`);
				console.log(`ERROR...${error}...`);
				if (error.response) {
					console.log(`ERROR...${JSON.stringify(error.response)}`);
					if (error.response.status) {
						console.log(`ERROR...Status: ${error.response.status}...`);
					}
				}
				console.log("-----------------------")

				let eResponse = {
					"error": [{
						"msg": `ERROR...${error}...`
					}]
				};
				response.write(JSON.stringify(eResponse));
				response.end();
				rpcInfo = error;
			});
		return (rpcInfo);
	},


	/**
	 *
	 *	Routines for processing external requests
	 *
	 **/
	getOptionList: function(CachéAuth, theServerName, request, response) {
		const URL = config.servers[theServerName].optionlist;

		return (this.callServer(URL, "getOptionList", CachéAuth, response, function(d) {
			return d.data.trim();
		}));
	},

	getAllRPCs: function(CachéAuth, theServerName, RunRPCAuthenticated, RunRPCUnAuthenticated, request, response) {
		aSocket.emit("info", "GetALLRPCs");
		let URL = config.servers[theServerName].rpclist;
		let csDone = this.callServer(URL, "getAllRPCs", CachéAuth, response, function(d) {
			const theData = JSON.stringify({
				"data": d.data.rpclist
			});
			let list = JSON.parse(theData).data;

			let AuthList = [];
			if ("Auth" == RunRPCAuthenticated) {
				AuthList.push(`"Auth": { "params": [] }`);
			}
			if (("NoAuth" == RunRPCUnAuthenticated) || (("AuthNo" == RunRPCAuthenticated) && ("NoAuthNo" == RunRPCUnAuthenticated))) {
				AuthList.push(`"NoAuth": { "params": [] }`);
			}
			let Auth = AuthList.join(",");

			let rList = list.map(function(d) {
				let aString = `"${d}":{ ${Auth} }`;
				return aString;
			});

			aSocket.emit("RPC_List", rList.join(",\n"));
			console.log("getAllRPCs - List returned via RPC_List socket message")
			return theData;
		});
		return csDone;
	},

	getRPCList: function(filter, CachéAuth, theServerName, request, response) {
		aSocket.emit("info", "getRPCList");
		let URL = config.servers[theServerName].rpclist;
		if ("*" !== filter) {
			const Encoded = base64.encode(filter);
			URL += "?" + Encoded;
			return (this.callServer(URL, "getRPCList", CachéAuth, response, function(d) {
				const theData = JSON.stringify({
					"data": d.data.rpclist
				});
				if ("*" === filter) {
					let list = theData.data;
					list.map(function(d) {
						return JSON.parse(`"${d}": { "${CachéAuth? "": "No"}Auth": { "params": []}}`);
					});
					aSocket.emit("RPCInfo", theData)
				}
				return theData;
			}));
		}
		return null;
	},

	getRPCData: function(EncodedFilterText, CachéAuth, theServerName, request, response) {
		aSocket.emit("info", "getRPCData");
		const DEcoded = base64.decode(EncodedFilterText);
		const URL = config.servers[theServerName].rpcdetail + "?" + EncodedFilterText;
		let savedParams = history.getHistory(history.getState(DEcoded, CachéAuth)).params;
		return (this.callServer(URL, "getRPCData", CachéAuth, response, function(d) {
			let theData = JSON.stringify({
				"data": d.data
			});
			let resp = JSON.parse(theData).data;
			let params = resp.Params;
			resp.Params = params.map(function(p, idx) {
				if (savedParams) {
					p.Value = savedParams[idx];
				} else {
					p.Value = "";
				}
			});
			resp.Params = params;

			theData = JSON.stringify({
				"data": resp
			});
			return theData;
		}));
	},

	routeProc: function(theData, request, response) {
		const thePath = this.getFilePath(request);
		const routes = {
			"./RPCCancel": function(theData) {
				console.log("Cancel current list of RPC Tests")
			},
			"./OptionList": function(theData) {
				const CachéAuth = decodeURIComponent(theData[1]);
				const theServerName = decodeURIComponent(theData[3]);
				Get.getOptionList(CachéAuth, theServerName, request, response);
			},

			"./RPCListAll": function(theData) {
				const CachéAuth = decodeURIComponent(theData[1]);
				const RunRPCAuthenticated = theData[2];
				const RunRPCNoAuthenticated = theData[3];
				const theServerName = decodeURIComponent(theData[4]);
				Get.getAllRPCs(CachéAuth, theServerName, RunRPCAuthenticated, RunRPCNoAuthenticated, request, response);
			},
			"./RPCList": function(theData) {
				const EncodedFilterText = theData[0]; // We have to encode the RPC Name because some have illegal char in their name
				const CachéAuth = decodeURIComponent(theData[1]);
				const theServerName = decodeURIComponent(theData[3]);
				Get.getRPCList(EncodedFilterText, CachéAuth, theServerName, request, response);
			},
			"./RPCDetail": function(theData) {
				const EncodedFilterText = theData[0]; // We have to encode the RPC Name because some have illegal char in their name
				const CachéAuth = decodeURIComponent(theData[1]);
				const theServerName = decodeURIComponent(theData[3]);
				Get.getRPCData(EncodedFilterText, CachéAuth, theServerName, request, response);
			},
			"default": function() {
				console.log(`Default request processing ${thePath}`)
				Get.readFile(thePath, response);
			}
		};

		(routes[thePath] || routes['default'])(theData);
		// const resp = (routes[thePath] || routes['default'])(theData);
		// return resp;
	},

	process: function(request, response) {
		console.log(`Process incoming GET request ${request.url}`)
		const queryData = url.parse(request.url, true).query;
		const theData = Object.getOwnPropertyNames(queryData);
		this.routeProc(theData, request, response);
	}
}

module.exports = Get;
