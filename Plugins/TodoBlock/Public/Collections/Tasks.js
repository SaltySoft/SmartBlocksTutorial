define([
    'jquery',
    'underscore',
    'backbone',
    'TodoBlock/Models/Task.js'
], function ($, _, Backbone, Task) {
    var Collection = Backbone.Collection.extend({
        model: Task,
        url: "/TodoBlock/Tasks"
    });

    return Collection;
});