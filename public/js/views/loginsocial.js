window.LoginSocialView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html();
        return this;
    }

});