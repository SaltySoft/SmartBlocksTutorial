define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/listing.html',
    './project_widget'
], function ($, _, Backbone, listing_tpl, ProjectWidget) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "project_listing",
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

            var template = _.template(listing_tpl, {});
            base.$el.html(template);
            base.renderProjects();
        },
        renderProjects: function () {
            var base = this;
            var projects = SmartBlocks.Blocks.ProjectBlock.Data.projects;

            var container = base.$el.find('.project_list');

            container.html('');
            for (var k in projects.models) {
                var project = projects.models[k];
                var widget = new ProjectWidget({
                    model: project
                });
                container.append(widget.$el);
                widget.init();
            }

        },
        registerEvents: function () {
            var base = this;
            SmartBlocks.Blocks.ProjectBlock.Data.projects.on("add", function () {
                base.renderProjects();
            });
            SmartBlocks.Blocks.ProjectBlock.Data.projects.on("remove", function () {
                base.renderProjects();
            });
        }
    });

    return View;
});