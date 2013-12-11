define([
    'jquery',
    'underscore',
    'backbone',
    '../Models/Project.js'
], function ($, _, Backbone, Project) {
    var Collection = Backbone.Collection.extend({
        model: Project,
        url: "/ProjectBlock/Projects"
    });

    return Collection;
});