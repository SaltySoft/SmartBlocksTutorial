define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/details.html',
    './task_widget'
], function ($, _, Backbone, details_tpl, TaskWidget) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "project_details",
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

            var template = _.template(details_tpl, {
                project: base.model
            });
            base.$el.html(template);
            base.renderTasks();
        },
        renderTasks: function () {
            var base = this;
            var tasks_list = base.$el.find('.tasks_list');
            var tasks = base.model.getTasks();
            tasks_list.html('');
            for (var k in tasks.models) {
                var task = tasks.models[k];
                var widget = new TaskWidget({
                    model: task
                });
                tasks_list.append(widget.$el);
                widget.init();
            }
            tasks_list.append('<div class="clearer"></div>');
        },
        createTask: function () {
            var base = this;
            var $elt = base.$el.find('.task_name_input');

            var task = new SmartBlocks.Blocks.TodoBlock.Models.Task({
                name: $elt.val(),
                done: false
            });
            task.save({}, {
                success: function () {

                    base.model.save({}, {
                        success: function () {
                            base.model.addTask(task);
                            base.renderTasks();
                        }
                    });
                }
            });
            SmartBlocks.Blocks.TodoBlock.Data.tasks.add(task);
            $elt.val('');
        },
        registerEvents: function () {
            var base = this;
            base.$el.delegate('.task_name_input', 'keyup', function (e) {
                if (e.keyCode == 13) {
                    base.createTask();
                }
            });

            SmartBlocks.Blocks.TodoBlock.Data.tasks.on('add', function () {
                base.renderTasks();
            });
            SmartBlocks.Blocks.TodoBlock.Data.tasks.on('add', function () {
                base.renderTasks();
            });

        }
    });

    return View;
});