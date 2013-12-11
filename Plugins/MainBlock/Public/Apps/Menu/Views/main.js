define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/menu_template.html'
], function ($, _, Backbone, menu_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "top_menu",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(menu_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('.logout_button', 'click', function () {
                $.ajax({
                    url: '/Users/logout',
                    success: function (response, status) {
                        if (response.message === 'logged out') {
                            window.location.reload();
                        }
                    }
                });
            });
        }
    });

    return View;
});