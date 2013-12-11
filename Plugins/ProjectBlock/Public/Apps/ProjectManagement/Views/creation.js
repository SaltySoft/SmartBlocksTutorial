define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/creation.html'
], function ($, _, Backbone, creation_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "project_creation",
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

            var template = _.template(creation_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('form', 'submit', function () {
                var name_input = base.$el.find('.project_name_input');
                var description_input = base.$el.find('');
                var project = new SmartBlocks.Blocks.ProjectBlock.Models.Project({
                    name: name_input.val(),
                    description:description_input.val()
                });
                base.$el.find('.loading').show();
                project.save({}, {
                    success: function () {
                        window.location = '#ProjectManagement/show/' + project.get('id');
                    }
                });
                SmartBlocks.Blocks.ProjectBlock.Data.projects.add(project);

            });
        }
    });

    return View;
});