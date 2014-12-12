var app = app || {};
app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },
    initialize: function() {
        console.log('todo initialized');
    },
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }
});