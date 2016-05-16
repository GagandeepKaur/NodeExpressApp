window.WelcomeView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    bindings: {
    	'#username': 'username'
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        this.stickit();
        return this;
    }

});