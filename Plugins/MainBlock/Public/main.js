define([
    'jquery',
    'underscore',
    './Apps/Homepage/Views/main'
], function ($, _, HomepageView) {
    var main = {
        init: function () {

        },
        launch_homepage: function () {
            var view = new HomepageView();
            SmartBlocks.Methods.render(view.$el);
            view.init();
        }
    };

    return main;
});