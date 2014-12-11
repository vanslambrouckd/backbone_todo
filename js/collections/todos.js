var app = app || {};
var TodoList = Backbone.Collection.extend({
	model: app.Todo,
	localStorage: new Backbone.LocalStorage('todos-backbone')
});

app.Todos = new TodoList();