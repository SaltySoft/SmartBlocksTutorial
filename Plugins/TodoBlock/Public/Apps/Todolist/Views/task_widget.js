define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/task.html'
], function ($, _, Backbone, task_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "task_widget",
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

            var template = _.template(task_tpl, {
                task: base.model
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('.check_button', 'click', function () {
                base.model.set('done', !base.model.get('done'));
                base.model.save();
            });
        }
    });

    return View;
});