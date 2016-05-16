window.RegisterView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    bindings: {
    	'#username': 'username',
        '#password': 'password'
    },
    events: {
        'click .save': 'save'
    },
    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        this.stickit();
        return this;
    },
    save: function () {
        console.log('Before add user');
        this.model.save(null, {
            success: function (repsonse, model) {
                console.log('saved user');
            },
            error: function() {
                console.log('error while saving user');
            }
        });
    }

});