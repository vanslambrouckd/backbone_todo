var app = app || {};

$(function() {
    //new app.AppView();

    var ENTER_KEY = 13;

    var Msg = Backbone.Model.extend({
        defaults: {
            title: 'david',
            completed: false
        }
        /*
        initialize: function() {
            if (!this.get('title')) {
                this.set('title', defaults.title);
            }
        }
        */
    });


    var MsgCollection = Backbone.Collection.extend({
        model: Msg,
        localStorage: new Backbone.LocalStorage('todos-backbone')
    });

    var msgCollection = new MsgCollection();
    var MsgView = Backbone.View.extend({
        tagName: 'li',
        className: 'item',
        template: _.template($('#item-template').html()),
        initialize: function() {
            this.model.bind('change', this.render, this);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON())); //toJSON() anders errors!
            return this; //nodig voor chain
        }
    });


    var AppView = Backbone.View.extend({
        el: $('#todoapp'),
        events: {
            'keypress #new-todo': 'createOnEnter'
        },
        createOnEnter: function(event) {

            if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
                return;
            }

            console.log(this.$input.val());
            //Backbone.Collection.create => create model within a collection
            msgCollection.create({
                title: this.$input.val()
            });
            this.$input.val('');
        },
        initialize: function() {
            this.$input = this.$('#new-todo');

            this.listenTo(msgCollection, 'add', this.addOne);
            /*
            zorgt dat de reeds ingegven localstorage msgs getoond worden bij page load
            */
            this.listenTo(msgCollection, 'reset', this.addAll);
            console.log('appview initialized');
            msgCollection.fetch(); //dit zend een 'reset' event uit, die dan this.addAll oproept (zie hoger)
        },
        addOne: function(msg) {
            console.log('msg', msg);
            var view = new MsgView({
                model: msg
            });
            $('#todo-list').append(view.render().el);
        },
        addAll: function() {
            msgCollection.each(this.addOne);
        },
        render: function() {}
    });

    var appView = new AppView();
});