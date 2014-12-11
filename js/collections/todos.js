var app = app || {};
var TodosList = Backbone.Collection.extend({
	model: app.Todo,
	localStorage: new Backbone.LocalStorage('todos-backbone');
});