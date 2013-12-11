define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/main.html',
    './task_widget'
], function ($, _, Backbone, todolist_tpl, TaskWidget) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "todolist",
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

            var template = _.template(todolist_tpl, {});
            base.$el.html(template);

            base.renderTasks();
        },
        renderTasks: function () {
            var base = this;

            var tasks = SmartBlocks.Blocks.TodoBlock.Data.tasks;

            var tasks_container = base.$el.find('.tasks_list');
            tasks_container.html('');
            for (var k in tasks.models) {
                var task = tasks.models[k];
                var widget = new TaskWidget({
                    model: task
                });
                tasks_container.append(widget.$el);
                widget.init();
            }
        },
        createTask: function () {
            var base = this;
            var input = base.$el.find('.task_name_input');
            if (input.val() != '') {
                var task = new SmartBlocks.Blocks.TodoBlock.Models.Task({
                    name: input.val(),
                    done: false
                });
                task.save();
                SmartBlocks.Blocks.TodoBlock.Data.tasks.add(task);
            }
        },
        registerEvents: function () {
            var base = this;

            SmartBlocks.Blocks.TodoBlock.Data.tasks.on('change', function () {
                base.renderTasks();
            });

            SmartBlocks.Blocks.TodoBlock.Data.tasks.on('add', function () {
                base.renderTasks();
            });

            SmartBlocks.Blocks.TodoBlock.Data.tasks.on('remove', function () {
                base.renderTasks();
            });

            base.$el.delegate('.task_name_input', 'keyup', function (e) {
                if (e.keyCode == 13) {
                    base.createTask();
                }
            });
            base.$el.delegate('.create_task_button', 'click', function () {
                base.createTask();
            });
        }
    });

    return View;
});