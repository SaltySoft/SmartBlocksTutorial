define([
    'jquery',
    'underscore',
    './Apps/Todolist/Views/main'
], function ($, _, TodolistView) {
    var main = {
        init: function () {

        },
        launch_todolist: function () {
            var todolist = new TodolistView();
            SmartBlocks.Methods.render(todolist.$el);
            todolist.init();
        }
    };

    return main;
});