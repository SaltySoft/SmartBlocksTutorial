define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/main.html',
    './listing',
    './details',
    './creation'
], function ($, _, Backbone, top_tpl, ListingView, DetailsView, CreationView) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "project_management",
        initialize: function () {
            var base = this;
        },
        init: function (app) {
            var base = this;

            base.render();
            base.registerEvents();

            app.initRoutes({
                '': function () {
                    base.renderListing();
                },
                'show/:id': function (id) {
                    var project = SmartBlocks.Blocks.ProjectBlock.Data.projects.get(id);
                    if (project) {
                        base.renderDetails(project);
                    } else {
                        window.history.back();
                    }
                },
                'new': function () {
                    base.renderCreation();
                }
            });
        },
        render: function () {
            var base = this;

            var template = _.template(top_tpl, {});
            base.$el.html(template);
        },
        renderListing: function () {
            var base = this;

            var view = new ListingView();
            base.$el.find('.subapp').html(view.$el);
            view.init();
        },
        renderCreation: function () {
            var base = this;

            var view = new CreationView();
            base.$el.find('.subapp').html(view.$el);
            view.init();
        },
        renderDetails: function (project) {
            var base = this;

            var view = new DetailsView({
                model: project
            });
            base.$el.find('.subapp').html(view.$el);
            view.init();
        },
        registerEvents: function () {
            var base = this;


        }
    });

    return View;
});