define([
    'jquery',
    'underscore',
    './Apps/Menu/Views/main',
    './Apps/Homepage/Views/main'
], function ($, _, MenuView, HomepageView) {
    var main = {
        init: function () {
            var menu_view = new MenuView();
            $('body').prepend(menu_view.$el);
            menu_view.init();
        },
        launch_homepage: function () {
            var view = new HomepageView();
            SmartBlocks.Methods.render(view.$el);
            view.init();
        }
    };

    return main;
});