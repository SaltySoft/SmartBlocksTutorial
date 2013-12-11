define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/homepage_template1.html',
    'text!../Templates/homepage_template2.html'
], function ($, _, Backbone, htpl1, htpl2) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "homepage",
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
            if (SmartBlocks.current_user.get('id')) {
                var template = _.template(htpl2, {});
                base.$el.html(template);
            } else {
                var template = _.template(htpl1, {});
                base.$el.html(template);
            }
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('.login_form', 'submit', function () {
                var i_username = base.$el.find('.login_username_input');
                var i_password = base.$el.find('.login_password_input');

                $.ajax({
                    url: '/Users/login',
                    method: 'post',
                    data: {
                        'name': i_username.val(),
                        'password': i_password.val()
                    },
                    success: function (response, status) {
                        if (response.message == 'logged') {
                            window.location.reload();
                        } else {
                            base.$el.find('.login_error').html('We could not log you in');
                        }
                    }
                });
            });

            base.$el.delegate('.subscribe_form', 'submit', function () {
                var i_username = base.$el.find('.subscribe_username_input');
                var i_password = base.$el.find('.subscribe_password_input');
                var i_password2 = base.$el.find('.subscribe_password2_input');
                var i_email = base.$el.find('.subscribe_email_input');
                var i_firstname = base.$el.find('.subscribe_firstname_input');
                var i_lastname = base.$el.find('.subscribe_lastname_input');

                if (i_password.val() === i_password2.val()) {
                    $.ajax({
                        url: '/Users/create',
                        method: 'post',
                        data: {
                            'name': i_username.val(),
                            'password': i_password.val(),
                            'email': i_email.val(),
                            'firstname': i_firstname.val(),
                            'lastname': i_lastname.val()
                        },
                        success: function (response, status) {
                            if (response.id) {
                                window.location.reload();
                            } else {
                                base.$el.find('.login_error').html('We could not log you in');
                            }
                        }
                    });
                }
            });
        }
    });

    return View;
});