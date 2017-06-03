//Vue component to permor the search by id
Vue.component('search-user', {

	data: function () {
		return {
			timeout: null
		};
	},

	methods: {

		search: function (event) {

			clearTimeout(this.timeout);
			this.timeout = setTimeout(function () {
				this.$emit('search-user', event.target.value);
			}.bind(this), 500);

		}

	},

	template: `

		<input class="form-control" placeholder="Type an user ID here" @keyup="search">

	`

});