/*
 * This file is part of the Sulu CMF.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define(['services/sulumedia/collection-manager'], function(CollectionManager) {

    'use strict';

    var namespace = 'sulu.collection-add.',

        defaults = {
            parent: null,
            instanceName: '',
        },

        constants = {
            newFormSelector: '#collection-new'
        },

        /**
         * raised when the overlay get closed
         * @event sulu.media-edit.closed
         */
        CLOSED = function() {
            return createEventName.call(this, 'closed');
        },

        /**
         * raised when component is initialized
         * @event sulu.media-edit.closed
         */
        INITIALIZED = function() {
            return createEventName.call(this, 'initialized');
        },

        /** returns normalized event names */
        createEventName = function(postFix) {
            return namespace + (this.options.instanceName ? this.options.instanceName + '.' : '') + postFix;
        };

    return {

        templates: [
            '/admin/media/template/collection/new'
        ],

        /**
         * Initializes the collections list
         */
        initialize: function() {
            // extend defaults with options
            this.options = this.sandbox.util.extend(true, {}, defaults, this.options);

            this.openOverlay();
            this.sandbox.emit(INITIALIZED.call(this));
        },

        /**
         * Opens a overlay for a new collection
         */
        openOverlay: function() {
            var $container = this.sandbox.dom.createElement('<div class="overlay-element"/>');
            this.sandbox.dom.append(this.$el, $container);

            this.$overlayContent = this.renderTemplate('/admin/media/template/collection/new');

            this.sandbox.once('husky.overlay.add-collection.opened', function() {
                this.sandbox.start(constants.newFormSelector);
                this.sandbox.form.create(constants.newFormSelector);
            }.bind(this));

            this.sandbox.start([
                {
                    name: 'overlay@husky',
                    options: {
                        el: $container,
                        title: this.sandbox.translate('sulu.media.add-collection'),
                        instanceName: 'add-collection',
                        data: this.$overlayContent,
                        okCallback: this.addCollection.bind(this),
                        cancelCallback: function() {
                            this.sandbox.stop();
                        }.bind(this),
                        openOnStart: true,
                        removeOnClose: true
                    }
                }
            ]);
        },

        /**
         * Adds a new collection the the list
         * @returns {Boolean} returns false if a new and unsafed collection exists
         */
        addCollection: function() {
            if (this.sandbox.form.validate(constants.newFormSelector)) {
                var collection = this.sandbox.form.getData(constants.newFormSelector);
                collection.parent = this.options.parent;
                collection.locale = this.options.locale;

                CollectionManager.save(collection).then(function(collection) {
                    this.sandbox.emit('sulu.media.collection-create.created', collection)
                    this.sandbox.stop();
                }.bind(this)).fail(function() {
                        this.sandbox.stop();
                    }.bind(this)
                );
            } else {
                return false;
            }
        },

        destroy: function() {
            this.sandbox.emit(CLOSED.call(this));
        }
    };
});
