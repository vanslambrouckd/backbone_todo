var app = app || {};
var TodoList = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone'),
    initialize: function() {
        this.on('add', function(todo) {
            console.log('todo added');
        });
    },
    nextOrder: function() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    }
});

app.todosList = new TodoList();
app.todosList.push(new app.Todo({
    title: 'todo1'
}));
