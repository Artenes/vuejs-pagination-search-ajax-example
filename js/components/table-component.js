//Component to display the user data
Vue.component('result-table', {

	props: ['users', 'pagination', 'loading'],

	computed: {

		isAtFirstPage: function() {
			return this.pagination.page == 1;
		},

		isAtLastPage: function() {
			return this.pagination.page == this.pagination.total_pages;
		},

		hasUsers: function() {
			return this.users.length > 0;
		}

	},

	methods: {

		isCurrentPage: function(page) {
			return page == this.pagination.page;	
		},

		next: function() {
			var nextPage = this.pagination.page + 1;
			this.goToPage(nextPage);
		},

		previous: function() {
			var previousPage = this.pagination.page - 1;
			this.goToPage(previousPage);
		},

		first: function() {
			this.goToPage(1);
		},

		last: function() {
			this.goToPage(this.pagination.total_pages);
		},

		goToPage: function(page) {

			if (page <= 0 || page > this.pagination.total_pages || page == this.pagination.page)
				return false;

			this.$emit('go-to-page', page);

		}

	},

	template: `

		<table class="table" v-bind:class="{ loading: loading }" v-if="hasUsers">

			<thead>
				<th>ID</th>
				<th>First name</th>
				<th>Last name</th>
			</thead>

			<tbody>
				<tr v-for="user in users">
					<td>{{ user.id }}</td>
					<td>{{ user.first_name }}</td>
					<td>{{ user.last_name }}</td>
				</tr>
			</tbody>

			<tfoot>
				<nav v-show="pagination.page">
				  <ul class="pagination">
				    <li v-bind:class="{ disabled: isAtFirstPage }">
				      <a href="#" @click="first">
				        <span>&laquo;&laquo;</span>
				      </a>
				    </li>
				    <li v-bind:class="{ disabled: isAtFirstPage }">
				      <a href="#" @click="previous">
				        <span>&laquo;</span>
				      </a>
				    </li>
				    <template v-for="page in pagination.total_pages">
				    	<li v-bind:class="{ active: isCurrentPage(page) }">
				    		<a href="#" @click="goToPage(page)">
				    			{{ page }}
				    		</a>
				    	</li>
				    </template>
				    <li v-bind:class="{ disabled: isAtLastPage }">
				      <a href="#" @click="next">
				        <span>&raquo;</span>
				      </a>
				    </li>
				    <li v-bind:class="{ disabled: isAtLastPage }">
				      <a href="#" @click="last">
				        <span>&raquo;&raquo;</span>
				      </a>
				    </li>
				  </ul>
				</nav>
			</tfoot>

		</table>
		<div class="alert alert-warning" v-else>No users found</div>

	`
});