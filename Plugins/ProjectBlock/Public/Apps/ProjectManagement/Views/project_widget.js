define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/project_widget.html'
], function ($, _, Backbone, project_widget_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "project_widget",
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
            var template = _.template(project_widget_tpl, {
                project: base.model
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
            base.$el.delegate('.delete_link', 'click', function () {
                base.model.destroy();

            });
        }
    });

    return View;
});