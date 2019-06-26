const HeaderBar   = require("./templates/header.js");
const SideNav     = require("./templates/sidenav.js");
const MainContent = require("./templates/main.js");

export default {
	name: "App",
	components: {
		HeaderBar, SideNav, MainContent
	},
	data: function() {
		return {
		};
	},

	created: function() {
	},

	methods: {
	},


	template: `
		<div class="container-fluid h-100 d-flex flex-column">
			<HeaderBar></HeaderBar>
			<div class="row h-100 mb-3">
				<SideNav></SideNav>
				<MainContent></MainContent>
			</div>
		    <div class="row" style="background-color: green;"> <h1 class="center">VistA Audit Metadata Query</h1> </div>
		</div>
	`
};
