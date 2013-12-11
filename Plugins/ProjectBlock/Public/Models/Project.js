define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default: {

        },
        parse: function (response) {

            var tasks_array = response.tasks;
            var tasks = new SmartBlocks.Blocks.TodoBlock.Collections.Tasks();
            for (var k in tasks_array) {
                var task = SmartBlocks.Blocks.TodoBlock.Data.tasks.get(tasks_array.id);
                if (task) {
                    tasks.add(task);
                }
            }
            response.tasks = tasks;


            return response;
        },
        urlRoot: "/ProjectBlock/Projects"
    });
    return Model;
});