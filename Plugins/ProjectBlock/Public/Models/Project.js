define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default: {

        },
        getTasks: function () {
            var base = this;
            var tasks_array = base.get('tasks');
            var tasks = new SmartBlocks.Blocks.TodoBlock.Collections.Tasks();
            for (var k in tasks_array) {
                var task = SmartBlocks.Blocks.TodoBlock.Data.tasks.get(tasks_array[k].id);
                if (task) {
                    tasks.add(task);
                } else {
                    task = new SmartBlocks.Blocks.TodoBlock.Models.Task(tasks_array[k]);
                    tasks.add(task);
                    SmartBlocks.Blocks.TodoBlock.Data.tasks.add(task);
                }
            }
            return tasks;
        },
        addTask: function (task) {
            var base = this;
            base.get('tasks').push(task.attributes);
        },
        urlRoot: "/ProjectBlock/Projects"
    });
    return Model;
});