define([
    'jquery',
    'underscore',
    './Apps/ProjectManagement/Views/main'
], function ($, _,ProjectManagementView) {
    var main = {
        init: function () {

        },
        launch_project_management: function (app) {
            var pm_view = new ProjectManagementView();
            SmartBlocks.Methods.render(pm_view.$el);
            pm_view.init(app);
        }
    };

    return main;
});