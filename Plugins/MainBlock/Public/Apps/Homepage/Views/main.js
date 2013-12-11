define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/homepage_template1.html',
    'text!../Templates/homepage_template2.html'
], function ($, _, Backbone, htpl1, htpl2) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "homepage",
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
            if (SmartBlocks.current_user.get('id')) {
                var template = _.template(htpl1, {});
                base.$el.html(template);
            } else {
                var template = _.template(htpl2, {});
                base.$el.html(template);
            }
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});