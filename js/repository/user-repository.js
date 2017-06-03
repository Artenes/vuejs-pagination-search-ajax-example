//Repository to retrieve user data
var userRepo = {

	url: 'https://reqres.in/api/users',

	client: axios, //http client instance, loaded in another file

	get: function(callback) {

		this.client.get(this.url).then(function (response) {

			callback(response.data.data, this.extractPagination(response.data));

		}.bind(this));
		
	},

	getByPage: function(page, callback) {

		this.client.get(this.url, {params: {page: page}}).then(function (response) {

			callback(response.data.data, this.extractPagination(response.data));

		}.bind(this));

	},

	searchById: function(id, callback) {

		this.client.get(this.url + '/' + id).then(function (response) {

			callback([response.data.data]);

		}).catch(function (error) {

			callback([]);

		});

	},

	extractPagination: function(response) {

		return {
			page: parseInt(response.page),
			per_page: parseInt(response.per_page),
			total: parseInt(response.total),
			total_pages: parseInt(response.total_pages)
		};

	}

};