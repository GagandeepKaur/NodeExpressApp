var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines"	: "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about",
        "login"             : "login",
        "register"          : "register",
        "welcome"           : "welcome",
        "logout"            : "home",
        "loginSocial"       : "loginSocial"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    loginSocial: function () {
        if (!this.loginSocialView) {
            this.loginSocialView = new LoginSocialView();
        }
        $('#content').html(this.loginSocialView.el);
        this.headerView.selectMenuItem('login-social-menu');
    },

    welcome: function (id) {
        var userInfo = new UserInfo();
        userInfo.fetch({
            success: function (response, model) {
                $('#content').html(new WelcomeView({model : response}).el);
            }
        });
        this.headerView.selectMenuItem('welcome');
    },

    login: function (id) {
        var userInfo = new UserInfo();
        if (!this.loginView) {
            this.loginView = new LoginView({model : userInfo});
        }
        $('#content').html(this.loginView.el);
        this.headerView.selectMenuItem('login');
    },

    register: function (id) {
        var userInfo = new UserInfo();
        if (!this.registerView) {
            this.registerView = new RegisterView({model : userInfo});
        }
        $('#content').html(this.registerView.el);
        this.headerView.selectMenuItem('register');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView', 'WelcomeView', 'LoginView', 'RegisterView', 'LoginSocialView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});