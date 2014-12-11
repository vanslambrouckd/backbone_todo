var app = app || {};
app.AppView = Backbone.View.extend({
	el: "#todoapp",
	initialize: function() {
		console.log(app);
		app.Todos.fetch();
	},
	render: function() {

	}
});