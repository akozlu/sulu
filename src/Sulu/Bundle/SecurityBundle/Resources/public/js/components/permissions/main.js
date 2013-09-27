/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART Webservices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define(['mvc/relationalstore'], function(RelationalStore) {

    'use strict';

    var sandbox,
        idDelete,

    // callback for deleting a role after confirming
        delSubmit = function() {
            sandbox.emit('husky.dialog.hide');
            sandbox.emit('husky.header.button-state', 'loading-delete-button');

            RelationalStore.reset();

            // delete

            unbindDialogListener();
        },

    // callback for aborting the deletion of a role
        hideDialog = function() {
            sandbox.emit('husky.dialog.hide');
            unbindDialogListener();
        },

    // binds the listeners to the dialog box
        bindDialogListener = function() {
            sandbox.on('husky.dialog.submit', delSubmit);
            sandbox.on('husky.dialog.cancel', hideDialog);
        },

    // unbind the listeners of the dialog box
        unbindDialogListener = function() {
            sandbox.off('husky.dialog.submit', delSubmit);
            sandbox.off('husky.dialog.cancel', hideDialog);
        };

    return {

        name: 'Sulu Contact Permissions',

        initialize: function() {
            sandbox = this.sandbox;

            if (this.options.display === 'form') {
                this.renderForm();
            }

            this.bindCustomEvents();
        },

        bindCustomEvents: function() {

            sandbox.on('sulu.permissions.load', function(data) {
                this.load(data);
            }.bind(this));


            sandbox.on('sulu.permissions.save', function(data) {
                this.save(data);
            }.bind(this));

            sandbox.on('sulu.permissions.delete', function(id) {
                this.del(id);
            }.bind(this));
        },

        // saves the data, which is thrown together with a sulu.roles.save event
        save: function(data) {
            sandbox.emit('husky.header.button-state', 'loading-save-button');

            RelationalStore.reset();

//            var role = new Role(data);
//            role.save(null, {
//                success: function() {
//                    sandbox.emit('sulu.router.navigate', 'settings/roles');
//                },
//                error: function() {
//                    sandbox.emit('sulu.dialog.error.show', 'An error occured during saving the role!');
//                    sandbox.emit('husky.header.button-state', 'standard');
//                }
//            });
        },

        // deletes the role with the id thrown with the sulu.role.delete event
        del: function(id) {
            idDelete = id;

            // show dialog and call delete only when user confirms
            sandbox.emit('sulu.dialog.confirmation.show', {
                content: {
                    title: 'Be careful!',
                    content: [
                        '<p>',
                        'This operation you are about to do will delete data. <br /> This is not undoable!',
                        '</p>',
                        '<p>',
                        ' Please think about it and accept or decline.',
                        '</p>'
                    ].join('')
                },
                footer: {
                    buttonCancelText: 'Don\'t do it',
                    buttonSubmitText: 'Do it, I understand'
                }
            });

            bindDialogListener();
        },

        renderForm: function() {
//            var role = new Role();

            var component = {
                name: 'permissions/components/form@sulusecurity',
                options: {
                    el: this.options.el
//                    data: role.defaults()
                }
            };

            if (!!this.options.id) {
//                role.set({id: this.options.id});
//                role.fetch({
//                    success: function(model) {
//                        component.options.data = model.toJSON();
//                        component.options.data.permissions = convertPermissionsFromBinary(
//                            model.get('permissions').toJSON() // add non-used contexts
//                        );
//                        sandbox.start([component]);
//                    }
//                });
//            } else {
                sandbox.start([component]);
            }
        }
    };
});