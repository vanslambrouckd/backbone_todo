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
        localStorage: new Backbone.LocalStorage('todos-backbone'),
        remaining: function() {
            return this.filter(function(msg) {
                return msg.get('completed') == false;
            });
        },
        completed: function() {
            //fun.apply(thisArg[, argsArray])
            return this.without.apply(this, this.remaining());
        }
    });

    var msgCollection = new MsgCollection();
    var MsgView = Backbone.View.extend({
        events: {
            'click .toggle': 'toggleDone'
        },
        tagName: 'li',
        className: 'item',
        template: _.template($('#item-template').html()),
        initialize: function() {
            this.model.bind('change', this.render, this);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON())); //toJSON() anders errors!
            console.log(this.model.get('completed'));
            this.$el.toggleClass('done', this.model.get('completed'));
            return this; //nodig voor chain
        },
        toggleDone: function() {
            this.model.set('completed', !this.model.get('completed'));
        }
    });


    var AppView = Backbone.View.extend({
        el: $('#todoapp'),
        statsTemplate: _.template($('#stats-template').html()),
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #toggle-all': 'toggleAllCompleted'
        },
        toggleAllCompleted: function(event) {
            var chkStatus = this.chkToggleAll.checked;

            msgCollection.each(function(msg) {
                msg.set({
                    completed: chkStatus
                });
            });

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
            this.$footer = this.$('#footer');
            this.chkToggleAll = this.$('#toggle-all')[0];
            console.log(this.chkToggleAll);

            this.listenTo(msgCollection, 'add', this.addOne);
            /*
            zorgt dat de reeds ingegven localstorage msgs getoond worden bij page load
            */
            this.listenTo(msgCollection, 'reset', this.addAll);
            this.listenTo(msgCollection, 'all', this.render); //zodat de stats in de footer upgedate worden: luisteren naar alle wijzigingen in de collection
            console.log('appview initialized');
            msgCollection.fetch(); //dit zend een 'reset' event uit, die dan this.addAll oproept (zie hoger)
            this.render();
        },
        addOne: function(msg) {
            var view = new MsgView({
                model: msg
            });
            $('#todo-list').append(view.render().el);
        },
        addAll: function() {
            msgCollection.each(this.addOne);
        },
        render: function() {
            var remaining = msgCollection.remaining().length;
            var completed = msgCollection.completed().length;

            console.log(remaining, completed);
            //var remaining = 0;
            this.$footer.html(this.statsTemplate({
                remaining: remaining,
                completed: completed
            }));
        }
    });

    var appView = new AppView();

    var Item = Backbone.Model.extend({});
    var Coll = Backbone.Collection.extend({
        remaining: function() {
            return this.filter(function(item) {
                return item.get('completed') == false;
            })
        }
    });
});