var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    initialize: function() {
        console.log('init');
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.render, this);
    },
    render: function() {
        this.$el.html(this.template());
    }
});