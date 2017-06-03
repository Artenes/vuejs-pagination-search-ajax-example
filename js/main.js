//Main Vue instace that will manage all the work
new Vue({

	el: "#app",

	data: {
		loading: false,
		users: [],
		pagination: {},
		repo: userRepo //The user repo comes from another js file
	},

	mounted: function () {

		this.toggleLoad();
		this.repo.get(function (users, pagination) {
			this.setData(users, pagination);
			this.toggleLoad();
		}.bind(this));

	},

	methods: {

		goToPage: function(page){

			this.toggleLoad();
			this.repo.getByPage(page, function (users, pagination) {
				this.setData(users, pagination);
				this.toggleLoad();
			}.bind(this));

		},

		searchUser: function(id){

			this.toggleLoad();

			if (id) {
				this.repo.searchById(id, function (users) {
					this.setData(users, {});
					this.toggleLoad();
				}.bind(this));
			} else {
				this.repo.get(function (users, pagination) {
					this.setData(users, pagination);
					this.toggleLoad();
				}.bind(this));
			}

		},

		toggleLoad: function() {
			this.loading = !this.loading;
		},

		setData: function(users, pagination) {
			this.users = users;
			this.pagination = pagination;
		}

	}

});

//When the page is being loaded, a loading gif is displayed
//When everything is done, we will hide this loading gif
window.onload = function() {

	document.getElementById("app").classList.remove("loading");

}