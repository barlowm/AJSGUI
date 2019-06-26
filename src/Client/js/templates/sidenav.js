export default {
	name: "SideNav",
	components: {
	},
	props: [ ],
	data: function() {
		return {
			 HideNavBar: false
		}
 	},

	methods: {
		toggleSideBar: function() {
console.log("Click...", this.HideNavBar);
this.HideNavBar = !this.HideNavBar;
		},

		mouseOver: function(){
			this.active = !this.active;
			console.log("Over");
		},

		togglepassword: function() {

		},

		Credentials: function(id, value) {

		}
	},

	template: `
	<div class="col-md-3">
		<div class="row h-100">
			<div class="col-md-12">
				<div  class="card h-100 rounded-lg" style="background: #white">
					<nav class="navbar navbar-inverse visible-xs p-2">
						<h2>Logo</h2>
						<ul class="nav nav-pills nav-stacked">
							<li><a href="#section1">Dashboard</a></li>


// <input class="form-control" id="date" type="text" placeholder="yyyy-MM-dd" title="format : yyyy-MM-dd"/>


							<li><a href="#section2">Age</a></li>
							<li><a href="#section3">Gender</a></li>
							<li><a href="#section3">Geo</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
	`,

	style: `
	.active : { backgroundColor: red;}
	`

};

