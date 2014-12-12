var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#todoapp',
    events: {
        'keypress #new-todo': 'createOnEnter'
    },
    initialize: function() {
        //app.Todos.fetch();
        this.input = this.$('#new-todo')
        console.log(app.todosList.length);
        this.listenTo(app.todosList, 'add', this.addOne);
    },
    addOne: function(todo) {
        console.log('todo', todo);
        var view = new app.TodoView({
            model: todo
        });
        //this.$('#todo-list').append(view.render().el);
    },
    newAttributes: function() {
        return {
            title: this.input.val().trim(),
            order: app.todosList.nextOrder(),
            done: false
        };
    },
    nextOrder: function() {},
    createOnEnter: function(event) {
        if (event.keyCode != 13) return;
        if (!this.input.val().trim()) return;
        app.todosList.create(this.newAttributes());
    },
    render: function() {}
});