//@global HUParams
var czrapp = czrapp || {};

/*************************
* JS LOG UTILITIES
*************************/
(function($, czrapp) {
      //Utility : print a js log on front
      czrapp._printLog = function( log ) {
            var _render = function() {
                  return $.Deferred( function() {
                        var dfd = this;
                        $.when( $('#footer').before( $('<div/>', { id : "bulklog" }) ) ).done( function() {
                              $('#bulklog').css({
                                    position: 'fixed',
                                    'z-index': '99999',
                                    'font-size': '0.8em',
                                    color: '#000',
                                    padding: '5%',
                                    width: '90%',
                                    height: '20%',
                                    overflow: 'hidden',
                                    bottom: '0',
                                    left: '0',
                                    background: 'yellow'
                              });

                              dfd.resolve();
                        });
                  }).promise();
                },
                _print = function() {
                      $('#bulklog').prepend('<p>' + czrapp._prettyfy( { consoleArguments : [ log ], prettyfy : false } ) + '</p>');
                };

            if ( 1 != $('#bulk-log').length ) {
                _render().done( _print );
            } else {
                _print();
            }
      };


      czrapp._truncate = function( string , length ){
            length = length || 150;
            if ( ! _.isString( string ) )
              return '';
            return string.length > length ? string.substr( 0, length - 1 ) : string;
      };

      //CONSOLE / ERROR LOG
      //@return [] for console method
      //@bgCol @textCol are hex colors
      //@arguments : the original console arguments
      czrapp._prettyfy = function( args ) {
            var _defaults = {
                  bgCol : '#5ed1f5',
                  textCol : '#000',
                  consoleArguments : [],
                  prettyfy : true
            };
            args = _.extend( _defaults, args );

            var _toArr = Array.from( args.consoleArguments );

            //if the array to print is not composed exclusively of strings, then let's stringify it
            //else join()
            if ( ! _.isEmpty( _.filter( _toArr, function( it ) { return ! _.isString( it ); } ) ) ) {
                  _toArr =  JSON.stringify( _toArr );
            } else {
                  _toArr = _toArr.join(' ');
            }
            if ( args.prettyfy )
              return [
                    '%c ' + czrapp._truncate( _toArr ),
                    [ 'background:' + args.bgCol, 'color:' + args.textCol, 'display: block;' ].join(';')
              ];
            else
              return czrapp._truncate( _toArr );
      };

      //Dev mode aware and IE compatible api.consoleLog()
      czrapp.consoleLog = function() {
            if ( ! czrapp.localized.isDevMode )
              return;
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;

            console.log.apply( console, czrapp._prettyfy( { consoleArguments : arguments } ) );
      };

      czrapp.errorLog = function() {
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;

            console.log.apply( console, czrapp._prettyfy( { bgCol : '#ffd5a0', textCol : '#000', consoleArguments : arguments } ) );
      };
})(jQuery, czrapp);








/*************************
* ADD DOM LISTENER UTILITY
*************************/
(function($, czrapp) {

      /**
       * Return whether the supplied Event object is for a keydown event but not the Enter key.
       *
       * @since 4.1.0
       *
       * @param {jQuery.Event} event
       * @returns {boolean}
       */
      czrapp.isKeydownButNotEnterEvent = function ( event ) {
        return ( 'keydown' === event.type && 13 !== event.which );
      };

      //@args = {model : model, dom_el : $_view_el, refreshed : _refreshed }
      czrapp.setupDOMListeners = function( event_map , args, instance ) {
              var _defaultArgs = {
                        model : {},
                        dom_el : {}
                  };

              if ( _.isUndefined( instance ) || ! _.isObject( instance ) ) {
                    czrapp.errorLog( 'setupDomListeners : instance should be an object', args );
                    return;
              }
              //event_map : are we good ?
              if ( ! _.isArray( event_map ) ) {
                    czrapp.errorLog( 'setupDomListeners : event_map should be an array', args );
                    return;
              }

              //args : are we good ?
              if ( ! _.isObject( args ) ) {
                    czrapp.errorLog( 'setupDomListeners : args should be an object', event_map );
                    return;
              }

              args = _.extend( _defaultArgs, args );
              // => we need an existing dom element
              if ( ! ( args.dom_el instanceof jQuery ) || 1 != args.dom_el.length ) {
                    czrapp.errorLog( 'setupDomListeners : dom element should be an existing dom element', args );
                    return;
              }

              //loop on the event map and map the relevant callbacks by event name
              // @param _event :
              //{
              //       trigger : '',
              //       selector : '',
              //       name : '',
              //       actions : ''
              // },
              _.map( event_map , function( _event ) {
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          czrapp.errorLog( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    //Are we good ?
                    if ( ! _.isString( _event.selector ) || _.isEmpty( _event.selector ) ) {
                          czrapp.errorLog( 'setupDOMListeners : selector must be a string not empty. Aborting setup of action(s) : ' + _event.actions.join(',') );
                          return;
                    }

                    //LISTEN TO THE DOM => USES EVENT DELEGATION
                    args.dom_el.on( _event.trigger , _event.selector, function( e, event_params ) {
                          //stop propagation to ancestors modules, typically a sektion
                          e.stopPropagation();
                          //particular treatment
                          if ( czrapp.isKeydownButNotEnterEvent( e ) ) {
                            return;
                          }
                          e.preventDefault(); // Keep this AFTER the key filter above

                          //It is important to deconnect the original object from its source
                          //=> because we will extend it when used as params for the action chain execution
                          var actionsParams = $.extend( true, {}, args );

                          //always get the latest model from the collection
                          if ( _.has( actionsParams, 'model') && _.has( actionsParams.model, 'id') ) {
                                if ( _.has( instance, 'get' ) )
                                  actionsParams.model = instance();
                                else
                                  actionsParams.model = instance.getModel( actionsParams.model.id );
                          }

                          //always add the event obj to the passed args
                          //+ the dom event
                          $.extend( actionsParams, { event : _event, dom_event : e } );

                          //add the event param => useful for triggered event
                          $.extend( actionsParams, event_params );

                          //SETUP THE EMITTERS
                          //inform the container that something has happened
                          //pass the model and the current dom_el
                          //the model is always passed as parameter
                          if ( ! _.has( actionsParams, 'event' ) || ! _.has( actionsParams.event, 'actions' ) ) {
                                czrapp.errorLog( 'executeEventActionChain : missing obj.event or obj.event.actions' );
                                return;
                          }
                          try { czrapp.executeEventActionChain( actionsParams, instance ); } catch( er ) {
                                czrapp.errorLog( 'In setupDOMListeners : problem when trying to fire actions : ' + actionsParams.event.actions );
                                czrapp.errorLog( 'Error : ' + er );
                          }
                    });//.on()
              });//_.map()
      };//setupDomListeners



      //GENERIC METHOD TO SETUP EVENT LISTENER
      //NOTE : the args.event must alway be defined
      czrapp.executeEventActionChain = function( args, instance ) {
              //if the actions param is a anonymous function, fire it and stop there
              if ( 'function' === typeof( args.event.actions ) )
                return args.event.actions.call( instance, args );

              //execute the various actions required
              //first normalizes the provided actions into an array of callback methods
              //then loop on the array and fire each cb if exists
              if ( ! _.isArray( args.event.actions ) )
                args.event.actions = [ args.event.actions ];

              //if one of the callbacks returns false, then we break the loop
              //=> allows us to stop a chain of callbacks if a condition is not met
              var _break = false;
              _.map( args.event.actions, function( _cb ) {
                    if ( _break )
                      return;

                    if ( 'function' != typeof( instance[ _cb ] ) ) {
                          throw new Error( 'executeEventActionChain : the action : ' + _cb + ' has not been found when firing event : ' + args.event.selector );
                    }

                    //Allow other actions to be bound before action and after
                    //
                    //=> we don't want the event in the object here => we use the one in the event map if set
                    //=> otherwise will loop infinitely because triggering always the same cb from args.event.actions[_cb]
                    //=> the dom element shall be get from the passed args and fall back to the controler container.
                    var $_dom_el = ( _.has(args, 'dom_el') && -1 != args.dom_el.length ) ? args.dom_el : false;
                    if ( ! $_dom_el ) {
                          czrapp.errorLog( 'missing dom element');
                          return;
                    }
                    $_dom_el.trigger( 'before_' + _cb, _.omit( args, 'event' ) );

                    //executes the _cb and stores the result in a local var
                    var _cb_return = instance[ _cb ].call( instance, args );
                    //shall we stop the action chain here ?
                    if ( false === _cb_return )
                      _break = true;

                    //allow other actions to be bound after
                    $_dom_el.trigger( 'after_' + _cb, _.omit( args, 'event' ) );
              });//_.map
      };
})(jQuery, czrapp);//@global HUParams
var czrapp = czrapp || {};
czrapp.methods = {};

(function( HUParams, $ ){
      var ctor, inherits, slice = Array.prototype.slice;

      // Shared empty constructor function to aid in prototype-chain creation.
      ctor = function() {};

      /**
       * Helper function to correctly set up the prototype chain, for subclasses.
       * Similar to `goog.inherits`, but uses a hash of prototype properties and
       * class properties to be extended.
       *
       * @param  object parent      Parent class constructor to inherit from.
       * @param  object protoProps  Properties to apply to the prototype for use as class instance properties.
       * @param  object staticProps Properties to apply directly to the class constructor.
       * @return child              The subclassed constructor.
       */
      inherits = function( parent, protoProps, staticProps ) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call `super()`.
        if ( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
          child = protoProps.constructor;
        } else {
          child = function() {
            // Storing the result `super()` before returning the value
            // prevents a bug in Opera where, if the constructor returns
            // a function, Opera will reject the return value in favor of
            // the original object. This causes all sorts of trouble.
            var result = parent.apply( this, arguments );
            return result;
          };
        }

        // Inherit class (static) properties from parent.
        $.extend( child, parent );

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype  = parent.prototype;
        child.prototype = new ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if ( protoProps )
          $.extend( child.prototype, protoProps );

        // Add static properties to the constructor function, if supplied.
        if ( staticProps )
          $.extend( child, staticProps );

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;

        return child;
      };

      /**
       * Base class for object inheritance.
       */
      czrapp.Class = function( applicator, argsArray, options ) {
        var magic, args = arguments;

        if ( applicator && argsArray && czrapp.Class.applicator === applicator ) {
          args = argsArray;
          $.extend( this, options || {} );
        }

        magic = this;

        /*
         * If the class has a method called "instance",
         * the return value from the class' constructor will be a function that
         * calls the "instance" method.
         *
         * It is also an object that has properties and methods inside it.
         */
        if ( this.instance ) {
          magic = function() {
            return magic.instance.apply( magic, arguments );
          };

          $.extend( magic, this );
        }

        magic.initialize.apply( magic, args );
        return magic;
      };

      /**
       * Creates a subclass of the class.
       *
       * @param  object protoProps  Properties to apply to the prototype.
       * @param  object staticProps Properties to apply directly to the class.
       * @return child              The subclass.
       */
      czrapp.Class.extend = function( protoProps, classProps ) {
        var child = inherits( this, protoProps, classProps );
        child.extend = this.extend;
        return child;
      };

      czrapp.Class.applicator = {};

      /**
       * Initialize a class instance.
       *
       * Override this function in a subclass as needed.
       */
      czrapp.Class.prototype.initialize = function() {};

      /*
       * Checks whether a given instance extended a constructor.
       *
       * The magic surrounding the instance parameter causes the instanceof
       * keyword to return inaccurate results; it defaults to the function's
       * prototype instead of the constructor chain. Hence this function.
       */
      czrapp.Class.prototype.extended = function( constructor ) {
        var proto = this;

        while ( typeof proto.constructor !== 'undefined' ) {
          if ( proto.constructor === constructor )
            return true;
          if ( typeof proto.constructor.__super__ === 'undefined' )
            return false;
          proto = proto.constructor.__super__;
        }
        return false;
      };

      /**
       * An events manager object, offering the ability to bind to and trigger events.
       *
       * Used as a mixin.
       */
      czrapp.Events = {
        trigger: function( id ) {
          if ( this.topics && this.topics[ id ] )
            this.topics[ id ].fireWith( this, slice.call( arguments, 1 ) );
          return this;
        },

        bind: function( id ) {
          this.topics = this.topics || {};
          this.topics[ id ] = this.topics[ id ] || $.Callbacks();
          this.topics[ id ].add.apply( this.topics[ id ], slice.call( arguments, 1 ) );
          return this;
        },

        unbind: function( id ) {
          if ( this.topics && this.topics[ id ] )
            this.topics[ id ].remove.apply( this.topics[ id ], slice.call( arguments, 1 ) );
          return this;
        }
      };

      /**
       * Observable values that support two-way binding.
       *
       * @constructor
       */
      czrapp.Value = czrapp.Class.extend({
        /**
         * @param {mixed}  initial The initial value.
         * @param {object} options
         */
        initialize: function( initial, options ) {
          this._value = initial; // @todo: potentially change this to a this.set() call.
          this.callbacks = $.Callbacks();
          this._dirty = false;

          $.extend( this, options || {} );

          this.set = $.proxy( this.set, this );
        },

        /*
         * Magic. Returns a function that will become the instance.
         * Set to null to prevent the instance from extending a function.
         */
        instance: function() {
          return arguments.length ? this.set.apply( this, arguments ) : this.get();
        },

        /**
         * Get the value.
         *
         * @return {mixed}
         */
        get: function() {
          return this._value;
        },

        /**
         * Set the value and trigger all bound callbacks.
         *
         * @param {object} to New value.
         */
        set: function( to, o ) {
              var from = this._value, dfd = $.Deferred(), self = this, _promises = [];

              to = this._setter.apply( this, arguments );
              to = this.validate( to );
              args = _.extend( { silent : false }, _.isObject( o ) ? o : {} );

              // Bail if the sanitized value is null or unchanged.
              if ( null === to || _.isEqual( from, to ) ) {
                    return dfd.resolveWith( self, [ to, from, o ] ).promise();
              }

              this._value = to;
              this._dirty = true;
              if ( true === args.silent ) {
                    return dfd.resolveWith( self, [ to, from, o ] ).promise();
              }

              if ( this._deferreds ) {
                    _.each( self._deferreds, function( _prom ) {
                          _promises.push( _prom.apply( null, [ to, from, o ] ) );
                    });

                    $.when.apply( null, _promises )
                          .fail( function() { api.errorLog( 'A deferred callback failed in api.Value::set()'); })
                          .then( function() {
                                self.callbacks.fireWith( self, [ to, from, o ] );
                                dfd.resolveWith( self, [ to, from, o ] );
                          });
              } else {
                    this.callbacks.fireWith( this, [ to, from, o ] );
                    return dfd.resolveWith( self, [ to, from, o ] ).promise( self );
              }
              return dfd.promise( self );
        },

        /*****************************************************************************
        * A SILENT SET METHOD :
        * => keep the dirtyness param unchanged
        * => stores the api state before callback calls, and reset it after
        * => add an object param to the callback to inform that this is a silent process
        * , this is typically used in the overridden api.Setting.preview method
        *****************************************************************************/
        //@param to : the new value to set
        //@param dirtyness : the current dirtyness status of this setting in the skope
        silent_set : function( to, dirtyness ) {
              var from = this._value,
                  _save_state = api.state('saved')();

              to = this._setter.apply( this, arguments );
              to = this.validate( to );

              // Bail if the sanitized value is null or unchanged.
              if ( null === to || _.isEqual( from, to ) ) {
                return this;
              }

              this._value = to;
              this._dirty = ( _.isUndefined( dirtyness ) || ! _.isBoolean( dirtyness ) ) ? this._dirty : dirtyness;

              this.callbacks.fireWith( this, [ to, from, { silent : true } ] );
              //reset the api state to its value before the callback call
              api.state('saved')( _save_state );
              return this;
        },

        _setter: function( to ) {
          return to;
        },

        setter: function( callback ) {
          var from = this.get();
          this._setter = callback;
          // Temporarily clear value so setter can decide if it's valid.
          this._value = null;
          this.set( from );
          return this;
        },

        resetSetter: function() {
          this._setter = this.constructor.prototype._setter;
          this.set( this.get() );
          return this;
        },

        validate: function( value ) {
          return value;
        },

        /**
         * Bind a function to be invoked whenever the value changes.
         *
         * @param {...Function} A function, or multiple functions, to add to the callback stack.
         */
        //allows us to specify a list of callbacks + a { deferred : true } param
        //if deferred is found and true, then the callback(s) are added in a list of deferred
        //@see how this deferred list is used in api.Value.prototype.set()
        bind: function() {
            //find an object in the argument
            var self = this,
                _isDeferred = false,
                _cbs = [];

            $.each( arguments, function( _key, _arg ) {
                  if ( ! _isDeferred )
                    _isDeferred = _.isObject( _arg  ) && _arg.deferred;
                  if ( _.isFunction( _arg ) )
                    _cbs.push( _arg );
            });

            if ( _isDeferred ) {
                  self._deferreds = self._deferreds || [];
                  _.each( _cbs, function( _cb ) {
                        if ( ! _.contains( _cb, self._deferreds ) )
                          self._deferreds.push( _cb );
                  });
            } else {
                  //original method
                  self.callbacks.add.apply( self.callbacks, arguments );
            }
            return this;
        },

        /**
         * Unbind a previously bound function.
         *
         * @param {...Function} A function, or multiple functions, to remove from the callback stack.
         */
        unbind: function() {
          this.callbacks.remove.apply( this.callbacks, arguments );
          return this;
        },

        // link: function() { // values*
        //   var set = this.set;
        //   $.each( arguments, function() {
        //     this.bind( set );
        //   });
        //   return this;
        // },

        // unlink: function() { // values*
        //   var set = this.set;
        //   $.each( arguments, function() {
        //     this.unbind( set );
        //   });
        //   return this;
        // },

        // sync: function() { // values*
        //   var that = this;
        //   $.each( arguments, function() {
        //     that.link( this );
        //     this.link( that );
        //   });
        //   return this;
        // },

        // unsync: function() { // values*
        //   var that = this;
        //   $.each( arguments, function() {
        //     that.unlink( this );
        //     this.unlink( that );
        //   });
        //   return this;
        // }
      });

      /**
       * A collection of observable values.
       *
       * @constructor
       * @augments wp.customize.Class
       * @mixes wp.customize.Events
       */
      czrapp.Values = czrapp.Class.extend({

        /**
         * The default constructor for items of the collection.
         *
         * @type {object}
         */
        defaultConstructor: czrapp.Value,

        initialize: function( options ) {
          $.extend( this, options || {} );

          this._value = {};
          this._deferreds = {};
        },

        /**
         * Get the instance of an item from the collection if only ID is specified.
         *
         * If more than one argument is supplied, all are expected to be IDs and
         * the last to be a function callback that will be invoked when the requested
         * items are available.
         *
         * @see {czrapp.Values.when}
         *
         * @param  {string}   id ID of the item.
         * @param  {...}         Zero or more IDs of items to wait for and a callback
         *                       function to invoke when they're available. Optional.
         * @return {mixed}    The item instance if only one ID was supplied.
         *                    A Deferred Promise object if a callback function is supplied.
         */
        instance: function( id ) {
          if ( arguments.length === 1 )
            return this.value( id );

          return this.when.apply( this, arguments );
        },

        /**
         * Get the instance of an item.
         *
         * @param  {string} id The ID of the item.
         * @return {[type]}    [description]
         */
        value: function( id ) {
          return this._value[ id ];
        },

        /**
         * Whether the collection has an item with the given ID.
         *
         * @param  {string}  id The ID of the item to look for.
         * @return {Boolean}
         */
        has: function( id ) {
          return typeof this._value[ id ] !== 'undefined';
        },

        /**
         * Add an item to the collection.
         *
         * @param {string} id    The ID of the item.
         * @param {mixed}  value The item instance.
         * @return {mixed} The new item's instance.
         */
        add: function( id, value ) {
          if ( this.has( id ) )
            return this.value( id );

          this._value[ id ] = value;
          value.parent = this;

          // Propagate a 'change' event on an item up to the collection.
          if ( value.extended( czrapp.Value ) )
            value.bind( this._change );

          this.trigger( 'add', value );

          // If a deferred object exists for this item,
          // resolve it.
          if ( this._deferreds[ id ] )
            this._deferreds[ id ].resolve();

          return this._value[ id ];
        },

        /**
         * Create a new item of the collection using the collection's default constructor
         * and store it in the collection.
         *
         * @param  {string} id    The ID of the item.
         * @param  {mixed}  value Any extra arguments are passed into the item's initialize method.
         * @return {mixed}  The new item's instance.
         */
        create: function( id ) {
          return this.add( id, new this.defaultConstructor( czrapp.Class.applicator, slice.call( arguments, 1 ) ) );
        },

        /**
         * Iterate over all items in the collection invoking the provided callback.
         *
         * @param  {Function} callback Function to invoke.
         * @param  {object}   context  Object context to invoke the function with. Optional.
         */
        each: function( callback, context ) {
          context = typeof context === 'undefined' ? this : context;

          $.each( this._value, function( key, obj ) {
            callback.call( context, obj, key );
          });
        },

        /**
         * Remove an item from the collection.
         *
         * @param  {string} id The ID of the item to remove.
         */
        remove: function( id ) {
          var value;

          if ( this.has( id ) ) {
            value = this.value( id );
            this.trigger( 'remove', value );
            if ( value.extended( czrapp.Value ) )
              value.unbind( this._change );
            delete value.parent;
          }

          delete this._value[ id ];
          delete this._deferreds[ id ];
        },

        /**
         * Runs a callback once all requested values exist.
         *
         * when( ids*, [callback] );
         *
         * For example:
         *     when( id1, id2, id3, function( value1, value2, value3 ) {} );
         *
         * @returns $.Deferred.promise();
         */
        when: function() {
          var self = this,
            ids  = slice.call( arguments ),
            dfd  = $.Deferred();

          // If the last argument is a callback, bind it to .done()
          if ( $.isFunction( ids[ ids.length - 1 ] ) )
            dfd.done( ids.pop() );

          /*
           * Create a stack of deferred objects for each item that is not
           * yet available, and invoke the supplied callback when they are.
           */
          $.when.apply( $, $.map( ids, function( id ) {
            if ( self.has( id ) )
              return;

            /*
             * The requested item is not available yet, create a deferred
             * object to resolve when it becomes available.
             */
            return self._deferreds[ id ] || $.Deferred();
          })).done( function() {
            var values = $.map( ids, function( id ) {
                return self( id );
              });

            // If a value is missing, we've used at least one expired deferred.
            // Call Values.when again to generate a new deferred.
            if ( values.length !== ids.length ) {
              // ids.push( callback );
              self.when.apply( self, ids ).done( function() {
                dfd.resolveWith( self, values );
              });
              return;
            }

            dfd.resolveWith( self, values );
          });

          return dfd.promise();
        },

        /**
         * A helper function to propagate a 'change' event from an item
         * to the collection itself.
         */
        _change: function() {
          this.parent.trigger( 'change', this );
        }
      });

      // Create a global events bus on the Customizer.
      $.extend( czrapp.Values.prototype, czrapp.Events );

})( HUParams, jQuery );//@global HUParams
var czrapp = czrapp || {};
/*************************
* ADD BASE CLASS METHODS
*************************/
(function($, czrapp) {
      var _methods = {
            /**
            * Cache properties on Dom Ready
            * @return {[type]} [description]
            */
            cacheProp : function() {
                  var self = this;
                  $.extend( czrapp, {
                        //cache various jQuery el in czrapp obj
                        $_window         : $(window),
                        $_html           : $('html'),
                        $_body           : $('body'),
                        $_header         : $('#header'),
                        $_wpadminbar     : $('#wpadminbar'),
                        $_mainWrapper    : $('.main', '#wrapper'),
                        $_mainContent    : $('.main', '#wrapper').find('.content'),

                        //various properties definition
                        is_responsive    : self.isResponsive(),//store the initial responsive state of the window
                        current_device   : self.getDevice()//store the initial device
                  });
            },

            //bool
            isResponsive : function() {
                  return $(window).width() <= 979 - 15;
            },

            //@return string of current device
            getDevice : function() {
                  var _devices = {
                        desktop : 979 - 15,
                        tablet : 767 - 15,
                        smartphone : 480 - 15
                      },
                      _current_device = 'desktop',
                      $_window = czrapp.$_window || $(window);

                  _.map( _devices, function( max_width, _dev ){
                    if ( $_window.width() <= max_width )
                      _current_device = _dev;
                  } );
                  return _current_device;
            },

            emit : function( cbs, args ) {
                  cbs = _.isArray(cbs) ? cbs : [cbs];
                  var self = this;
                  _.map( cbs, function(cb) {
                        if ( 'function' == typeof(self[cb]) ) {
                              args = 'undefined' == typeof( args ) ? Array() : args ;
                              self[cb].apply(self, args );
                              czrapp.trigger( cb, _.object( _.keys(args), args ) );
                        }
                  });//_.map
            },

            triggerSimpleLoad : function( $_imgs ) {
                  if ( 0 === $_imgs.length )
                    return;

                  $_imgs.map( function( _ind, _img ) {
                    $(_img).load( function () {
                      $(_img).trigger('simple_load');
                    });//end load
                    if ( $(_img)[0] && $(_img)[0].complete )
                      $(_img).load();
                  } );//end map
            },//end of fn

            isUserLogged     : function() {
                  return czrapp.$_body.hasClass('logged-in') || 0 !== czrapp.$_wpadminbar.length;
            },

            isSelectorAllowed : function( $_el, skip_selectors, requested_sel_type ) {
                  var sel_type = 'ids' == requested_sel_type ? 'id' : 'class',
                  _selsToSkip   = skip_selectors[requested_sel_type];

                  //check if option is well formed
                  if ( 'object' != typeof(skip_selectors) || ! skip_selectors[requested_sel_type] || ! $.isArray( skip_selectors[requested_sel_type] ) || 0 === skip_selectors[requested_sel_type].length )
                    return true;

                  //has a forbidden parent?
                  if ( $_el.parents( _selsToSkip.map( function( _sel ){ return 'id' == sel_type ? '#' + _sel : '.' + _sel; } ).join(',') ).length > 0 )
                    return false;

                  //has requested sel ?
                  if ( ! $_el.attr( sel_type ) )
                    return true;

                  var _elSels       = $_el.attr( sel_type ).split(' '),
                      _filtered     = _elSels.filter( function(classe) { return -1 != $.inArray( classe , _selsToSkip ) ;});

                  //check if the filtered selectors array with the non authorized selectors is empty or not
                  //if empty => all selectors are allowed
                  //if not, at least one is not allowed
                  return 0 === _filtered.length;
            },



            _isMobile : function() {
                  return ( _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (max-width: 720px)' ).matches ) || ( this._isCustomizing() && 'desktop' != this.previewDevice() );
            },

            _isCustomizing : function() {
                  return czrapp.$_body.hasClass('is-customizing') || ( 'undefined' !== typeof wp && 'undefined' !== typeof wp.customize );
            },

            //Helpers
            //Check if the passed element(s) contains an iframe
            //@return list of containers
            //@param $_elements = mixed
            _has_iframe : function ( $_elements ) {
                  var that = this,
                      to_return = [];
                  _.each( $_elements, function( $_el, container ){
                        if ( $_el.length > 0 && $_el.find('IFRAME').length > 0 )
                          to_return.push(container);
                  });
                  return to_return;
            },
      };//_methods{}

      czrapp.methods.Base = czrapp.methods.Base || {};
      $.extend( czrapp.methods.Base , _methods );//$.extend

})(jQuery, czrapp);/***************************
* ADD BROWSER DETECT METHODS
****************************/
(function($, czrapp) {
  var _methods =  {
    addBrowserClassToBody : function() {
          // Chrome is Webkit, but Webkit is also Safari. If browser = ie + strips out the .0 suffix
          if ( $.browser.chrome )
              czrapp.$_body.addClass("chrome");
          else if ( $.browser.webkit )
              czrapp.$_body.addClass("safari");
          if ( $.browser.mozilla )
              czrapp.$_body.addClass("mozilla");
          else if ( $.browser.msie || '8.0' === $.browser.version || '9.0' === $.browser.version || '10.0' === $.browser.version || '11.0' === $.browser.version )
              czrapp.$_body.addClass("ie").addClass("ie" + $.browser.version.replace(/[.0]/g, ''));

          //Adds version if browser = ie
          if ( czrapp.$_body.hasClass("ie") )
              czrapp.$_body.addClass($.browser.version);
    }
  };//_methods{}
  czrapp.methods.BrowserDetect = czrapp.methods.BrowserDetect || {};
  $.extend( czrapp.methods.BrowserDetect , _methods );

})(jQuery, czrapp);
var czrapp = czrapp || {};
/***************************
* ADD JQUERY PLUGINS METHODS
****************************/
(function( $, czrapp ) {
  var _methods = {
    //IMG SMART LOAD
    //.article-container covers all post / page content : single and list
    //__before_main_wrapper covers the single post thumbnail case
    //.widget-front handles the featured pages
    imgSmartLoad : function() {
          var smartLoadEnabled = 1 == HUParams.imgSmartLoadEnabled,
              //Default selectors for where are : $( '.article-container, .__before_main_wrapper, .widget-front' ).find('img');
              _where           = HUParams.imgSmartLoadOpts.parentSelectors.join();

          //Smart-Load images
          //imgSmartLoad plugin will trigger the smartload event when the img will be loaded
          //the centerImages plugin will react to this event centering them
          if (  smartLoadEnabled ) {
                $( _where ).imgSmartLoad(
                  _.size( HUParams.imgSmartLoadOpts.opts ) > 0 ? HUParams.imgSmartLoadOpts.opts : {}
                );
          }

          //If the centerAllImg is on we have to ensure imgs will be centered when simple loaded,
          //for this purpose we have to trigger the simple-load on:
          //1) imgs which have been excluded from the smartloading if enabled
          //2) all the images in the default 'where' if the smartloading isn't enaled
          //simple-load event on holders needs to be triggered with a certain delay otherwise holders will be misplaced (centering)
          if ( 1 == HUParams.centerAllImg ) {
                var self                   = this,
                    $_to_center            = smartLoadEnabled ?
                       $( _.filter( $( _where ).find('img'), function( img ) {
                          return $(img).is(HUParams.imgSmartLoadOpts.opts.excludeImg.join());
                        }) ): //filter
                        $( _where ).find('img');
                    $_to_center_with_delay = $( _.filter( $_to_center, function( img ) {
                        return $(img).hasClass('tc-holder-img');
                    }) );

                //imgs to center with delay
                setTimeout( function(){
                      self.triggerSimpleLoad( $_to_center_with_delay );
                }, 300 );
                //all other imgs to center
                self.triggerSimpleLoad( $_to_center );
          }
    },


    //FIRE EXT LINKS PLUGIN
    //May be add (check if activated by user) external class + target="_blank" to relevant links
    //images are excluded by default
    //links inside post/page content
    extLinks : function() {
          if ( ! HUParams.extLinksStyle && ! HUParams.extLinksTargetExt )
            return;
          $('a' , '.post-inner .entry').extLinks({
                addIcon : HUParams.extLinksStyle,
                iconClassName : 'hu-external',
                newTab : HUParams.extLinksTargetExt,
                skipSelectors : _.isObject(HUParams.extLinksSkipSelectors) ? HUParams.extLinksSkipSelectors : {}
          });
    },

    parallax : function() {
          $( '.parallax-item' ).czrParallax();
    },
  };//_methods{}

  czrapp.methods.JQPlugins = czrapp.methods.JQPlugins || {};
  $.extend( czrapp.methods.JQPlugins = {} , _methods );

})(jQuery, czrapp);
var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
      setupUIListeners : function() {
            var self = this;
            //declare and store the main user xp properties and obervable values
            this.windowWidth            = new czrapp.Value( czrapp.$_window.width() );
            this.isScrolling            = new czrapp.Value( false );
            this.isResizing             = new czrapp.Value( false );
            this.scrollPosition         = new czrapp.Value( czrapp.$_window.scrollTop() );
            this.scrollDirection        = new czrapp.Value('down');
            self.previewDevice          = new czrapp.Value( 'desktop' );

            //PREVIEWED DEVICE ?
            //Listen to the customizer previewed device
            if ( self._isCustomizing() ) {
                  var _setPreviewedDevice = function() {
                        wp.customize.preview.bind( 'previewed-device', function( device ) {
                              self.previewDevice( device );
                        });
                  };
                  if ( wp.customize.preview ) {
                      _setPreviewedDevice();
                  } else {
                        wp.customize.bind( 'preview-ready', function() {
                              _setPreviewedDevice();
                        });
                  }
            }

            //ABSTRACTION LAYER
            //listen to windowWidth
            self.windowWidth.bind( function( to, from ) {
                  //Always bail if is not "real" resize.
                  //=> Resize events can be triggered when scrolling on mobile devices, whitout actually resizing the screen
                  self.isResizing( self._isMobile ? Math.abs( from - to ) > 2 : Math.abs( from - to ) > 0 );
                  clearTimeout( $.data( this, 'resizeTimer') );
                  $.data( this, 'resizeTimer', setTimeout(function() {
                        self.isResizing( false );
                  }, 50 ) );
            });

            //"real" horizontal resize reaction : refreshed every 50 ms
            self.isResizing.bind( function( is_resizing ) {
                  czrapp.$_body.toggleClass( 'is-resizing', is_resizing );
            });

            //react when scrolling status change
            //=> auto set it self to false after a while
            this.isScrolling.bind( function( to, from ) {
                  //self.scrollPosition( czrapp.$_window.scrollTop() );
                  czrapp.$_body.toggleClass( 'is-scrolling', to );
                  if ( ! to ) {
                        czrapp.trigger( 'scrolling-finished' );
                  }
            });


            //scroll position is set when scrolling
            this.scrollPosition.bind( function( to, from ) {
                  //handle scrolling classes
                  czrapp.$_body.toggleClass( 'is-scrolled', to > 100 );
                  if ( to <= 50 ) {
                        czrapp.trigger( 'page-scrolled-top', {} );
                  }
                  self.scrollDirection( to >= from ? 'down' : 'up' );
            });


            //BROWSER LAYER : RESIZE AND SCROLL
            //listen to user DOM actions
            czrapp.$_window.resize( _.throttle( function( ev ) { self.windowWidth( czrapp.$_window.width() ); }, 10 ) );
            czrapp.$_window.scroll( _.throttle( function() {
                  self.isScrolling( true );
                  //self.previousScrollPosition = self.scrollPosition() || czrapp.$_window.scrollTop();
                  self.scrollPosition( czrapp.$_window.scrollTop() );
                  clearTimeout( $.data( this, 'scrollTimer') );
                  $.data( this, 'scrollTimer', setTimeout(function() {
                        self.isScrolling( false );
                  }, 100 ) );
            }, 10 ) );

      }
  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {

        mobileMenu : function() {
              var self = this;
              self.mobileMenu = new czrapp.Values();

              //Instantiate the menu candidates
              //data-menu-id should be unique. Are not synchronized with the actua menu css # id attribute
              $('.nav-container').each( function( _index ) {
                    if ( ! _.isString( $(this).attr( 'data-menu-id' ) ) )
                      return;

                    var $container      = $(this),
                        is_scrollable   = _.isString( $(this).attr( 'data-menu-scrollable' ) ) && "false" == $(this).attr( 'data-menu-scrollable' ) ? false : true,
                        _id             = $container.attr( 'data-menu-id' ),
                        ctor;

                    if ( self.mobileMenu.has( _id ) )
                      return;

                    var $navWrap = $container.find( '.nav-wrap' );
                    if ( 1 != $navWrap.length ) {
                          czrapp.errorLog( 'Mobile menu : misssing .nav-wrap for menu-id : ' + _id );
                    }
                    var button_selectors = '.nav-toggle, .ham__navbar-toggler, .ham__navbar-toggler-two',
                        $button = $container.find( button_selectors );
                    if ( 1 != $button.length ) {
                          czrapp.errorLog( 'Mobile menu : misssing container for menu-id : ' + _id );
                    }
                    ctor = czrapp.Value.extend( self.MobileCTOR );
                    //do instantiate
                    self.mobileMenu.add( _id, new ctor( _id, {
                          container : $container,
                          menu_wrapper : $navWrap,
                          button : $button,
                          button_selectors : button_selectors,
                          is_scrollable : is_scrollable
                    }));
              });
        },


        //CTOR for each mobile menu Value
        MobileCTOR : {
              //@param constructor_options :
              // {
              //  container : $container,
              //  menu_wrapper : $navWrap,
              //  button : $button,
              //  button_selectors : '.nav-toggle, .ham__navbar-toggler, .ham__navbar-toggler-two'
              // }
              initialize: function( mobile_id, constructor_options ) {
                    var mobMenu = this;
                    czrapp.Value.prototype.initialize.call( mobMenu, null, constructor_options );

                    //write the options as properties
                    $.extend( mobMenu, constructor_options || {} );

                    //set initial state
                    mobMenu( 'collapsed' );

                    //react on state change
                    //@return a deferred
                    //=> in a scenario of menu expanded and scroll down, allow us to nicely run the sequence of animation:
                    //1) menu collapse
                    //2) animate up
                    mobMenu.bind( function( state ) {
                          return $.Deferred( function() {
                                var dfd = this;
                                mobMenu._toggleMobileMenu()
                                      .done( function( state ){
                                            //remove classes that modify the appearance of the button
                                            //=> needed for mobile devices because the focus is not automatically removed
                                            mobMenu.button.toggleClass( 'hovering', 'expanded' == state ).toggleClass( 'focusing', 'expanded' == state );
                                            dfd.resolve();
                                      });
                          }).promise();
                    }, { deferred : true } );

                    //Listen to user actions
                    czrapp.setupDOMListeners(
                          [
                                {
                                      trigger   : 'click keydown',
                                      selector  : mobMenu.button_selectors,
                                      actions   : function() {
                                            var mobMenu = this;
                                            mobMenu( 'collapsed' == mobMenu() ? 'expanded' : 'collapsed' );
                                      }
                                },
                                {
                                      trigger   : 'mouseenter',
                                      selector  : mobMenu.button_selectors,
                                      actions   : function() {
                                            this.button.addClass( 'hovering' );
                                      }

                                },
                                {
                                      trigger   : 'mouseleave',
                                      selector  : mobMenu.button_selectors,
                                      actions   : function() {
                                            this.button.removeClass( 'hovering' );
                                      }

                                }
                          ],//actions to execute
                          { dom_el: mobMenu.container },//dom scope
                          mobMenu //instance where to look for the cb methods
                    );

                    //listen to czrapp events
                    //Collapse on resize
                    czrapp.userXP.isResizing.bind( function( is_resizing ) {
                          if ( ! is_resizing )
                            return;
                          mobMenu( 'collapsed' );
                    });
              },

              //@return dfd promise()
              _toggleMobileMenu : function()  {
                    var mobMenu = this,
                        expand = 'expanded' == mobMenu(),
                        dfd = $.Deferred();

                    //Set the button dom state
                    mobMenu.button
                        .toggleClass( 'collapsed', ! expand )
                        .toggleClass( 'active', expand )
                        .attr('aria-expanded', expand );

                    $.when( mobMenu.menu_wrapper.toggleClass( 'expanded', expand ) ).done( function() {
                          var $navWrap = $(this);
                          $navWrap.find('.nav').stop()[ ! expand ? 'slideUp' : 'slideDown' ]( {
                                duration : 350,
                                complete : function() {
                                      //makes it scrollable ( currently true for all menu but the footer )
                                      //scrollable is set in the DOM with data-menu-scrollable
                                      if ( mobMenu.is_scrollable ) {
                                            var _winHeight = 'undefined' === typeof window.innerHeight ? window.innerHeight : czrapp.$_window.height(),
                                                _visibleHeight = _winHeight - $navWrap.offset().top + czrapp.$_window.scrollTop();
                                            $navWrap.css( {
                                                  'max-height' : expand ? _visibleHeight : '',
                                                  'overflow' : 'auto'
                                            });
                                      }
                                      dfd.resolve( expand );
                                }
                          } );
                    });
                    return dfd.promise();
              }
        }//MobileCTOR

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {

        /*-----------------------------------------------------
        * MAIN
        ------------------------------------------------------*/
        stickify : function() {
              var self = this;
              this.menuWrapper            = false;
              this.stickyMenuDown         = new czrapp.Value( '_not_set_' );
              this.stickyHeaderThreshold  = 50;
              this.currentStickySelector  = new czrapp.Value( '' );//<= will be set on init and on resize
              this.hasStickyCandidate     = new czrapp.Value( false );
              this.stickyHeaderAnimating  = new czrapp.Value( false );

              //// SETUP LISTENERS ////
              //react to current sticky selector
              this.currentStickySelector.bind( function( to, from ) {
                      if ( ! _.isEmpty( to ) ) {
                            //cache the menu wrapper now
                            self.menuWrapper = czrapp.$_header.find( to );
                            self.hasStickyCandidate( 1 == self.menuWrapper.length );
                            //make sure we have the transition class in any cases
                            // + Always set the header height on dom ready
                            //=> will prevent any wrong value being assigned if menu is expanded before scrolling
                            czrapp.$_header.css( { 'height' : czrapp.$_header.height() }).addClass( 'fixed-header-on' );
                      } else {
                            czrapp.$_header.css( { 'height' : '' }).removeClass( 'fixed-header-on' );
                            self.stickyMenuDown( false );
                            self.menuWrapper = false;
                            self.hasStickyCandidate( false );
                      }
              });

              //animate based on scroll position
              this.scrollPosition.bind( function( to, from ) {
                    //Set up only when scroll up is significant => avoid revealing the menu for minor scroll up actions on mobile devices
                    if ( Math.abs( to - from ) <= 5 )
                      return;
                    self.stickyMenuDown( to < from );
              });


              //czrapp.bind( 'page-scrolled-top', _mayBeresetTopPosition );
              czrapp.bind( 'scrolling-finished', function() {
                    if ( 'up' == self.scrollDirection() )
                      self._mayBeresetTopPosition();
              });

              //animate : make sure we don't hide the menu when too close from top
              self.stickyMenuDown.validate = function( value ) {
                    if ( self.scrollPosition() < self.stickyHeaderThreshold && ! value ) {
                          if ( ! self.isScrolling() ) {
                                //print a message when attempt to programmatically hide the menu
                                czrapp.errorLog('Menu too close from top to be moved up');
                          }
                          return self.stickyMenuDown();
                    } else {
                          return value;
                    }
              };

              self.stickyMenuDown.bind( function( to, from, args ){
                    if ( ! _.isBoolean( to ) ) {
                          return $.Deferred( function() { return this.resolve().promise(); } );
                    }

                    args = _.extend(
                          {
                                direction : to ? 'down' : 'up',
                                force : false,
                                menu_wrapper : self.menuWrapper,
                                fast : false
                          },
                          args || {}
                    );
                    return self._animate( { direction : args.direction, force : args.force, menu_wrapper : args.menu_wrapper, fast : args.fast } );
              }, { deferred : true } );


              /*-----------------------------------------------------
              * (real) RESIZE EVENT : refreshed every 50 ms
              ------------------------------------------------------*/
              self.isResizing.bind( function( is_resizing ) {
                    // if ( ! is_resizing )
                    //   return;
                    //reset the current sticky selector
                    self._setStickySelector();

                    self.stickyMenuDown( self.scrollPosition() < self.stickyHeaderThreshold ,  { fast : true } ).done( function() {
                          czrapp.$_header.css( 'height' , '' ).removeClass( 'fixed-header-on' );
                          if ( self.hasStickyCandidate() ) {
                                czrapp.$_header.css( 'height' , czrapp.$_header.height() ).addClass( 'fixed-header-on' );
                          }
                    });

                    //Adjust padding top if desktop sticky
                    if ( ! self._isMobile() ) {
                          self._adjustDesktopTopNavPaddingTop();
                    } else {
                          $('.full-width.topbar-enabled #header').css( 'padding-top', '' );
                          //Make sure the transform property is reset when swithing from desktop to mobile on resize
                          self._mayBeresetTopPosition();
                    }
              } );//resize();


              /*-----------------------------------------------------
              * INITIAL ACTIONS
              ------------------------------------------------------*/
              //Set initial sticky selector
              self._setStickySelector();


              //set fixed-header-on if is desktop because menu is already set to fixed position, we want to have the animation from the start
              // + Adjust padding top if desktop sticky
              if ( ! self._isMobile() ) {
                    self._adjustDesktopTopNavPaddingTop();
              }

        },//stickify






        /*-----------------------------------------------------
        * STICKIFY HELPERS
        ------------------------------------------------------*/
        //@return void()
        //Is fired on first load and on resize
        //set the currentStickySelector observable Value()
        _setStickySelector : function() {
              var self = this,
                  stickyCandidatesMap = {
                        'only screen and (max-width: 719px)' : 'mobile-sticky',
                        'only screen and (min-width: 720px)' : 'desktop-sticky'
                  },
                  _match_ = false;

              // self.currentStickySelector = self.currentStickySelector || new czrapp.Value('');
              _.each( stickyCandidatesMap, function( _selector, _layout ) {
                    if ( _.isFunction( window.matchMedia ) && matchMedia( _layout ).matches ) {
                          _match_ = [ '.nav-container', _selector ].join('.');
                    }
              });
              self.currentStickySelector( _match_ );
        },


        //This is specific to Hueman
        _adjustDesktopTopNavPaddingTop : function() {
              var self = this;
              if ( self._isMobile() )
                  return;
              if ( self.hasStickyCandidate() ) {
                    $('.full-width.topbar-enabled #header').css( 'padding-top', czrapp.$_header.find( self.currentStickySelector() ).outerHeight() );
              }
        },

        //RESET MOBILE HEADER TOP POSITION
        //@return void()
        //Make sure the header is visible when close to the top
        //Fired on each 'scrolling-finished' <=> user has not scrolled during 250 ms
        //+ 'up' == self.scrollDirection()
        _mayBeresetTopPosition : function() {
              var  self = this, $menu_wrapper = self.menuWrapper;
              //Bail if we are scrolling up
              if ( 'up' != self.scrollDirection() )
                return;
              //Bail if no menu wrapper
              //Or if we are already after the threshold
              //Or if we are scrolling down
              if ( ! $menu_wrapper.length )
                return;

              if ( self.scrollPosition() >= self.stickyHeaderThreshold )
                return;

              if ( ! self._isMobile() ) {
                  self._adjustDesktopTopNavPaddingTop();
              }

              //Always add this class => make sure the transition is smooth
              //czrapp.$_header.addClass( 'fixed-header-on' );
              self.stickyMenuDown( true, { force : true, fast : true } ).done( function() {
                    self.stickyHeaderAnimating( true );
                    ( function() {
                          return $.Deferred( function() {
                              var dfd = this;
                              _.delay( function() {
                                    if ( 'up' == self.scrollDirection() && self.scrollPosition() < 10) {
                                          $menu_wrapper.css({
                                                '-webkit-transform': '',   /* Safari and Chrome */
                                                '-moz-transform': '',       /* Firefox */
                                                '-ms-transform': '',        /* IE 9 */
                                                '-o-transform': '',         /* Opera */
                                                transform: ''
                                          });
                                    }
                                    self.stickyHeaderAnimating( false );
                                    dfd.resolve();
                              }, 10 );
                          }).promise();
                    } )().done( function() { });
              });
        },


        //args = { direction : up / down , force : false, menu_wrapper : $ element, fast : false }
        _animate : function( args ) {
              args = _.extend(
                    {
                          direction : 'down',
                          force : false,
                          menu_wrapper : {},
                          fast : false
                    },
                    args || {}
              );
              var dfd = $.Deferred(),
                  self = this,
                  $menu_wrapper = ! args.menu_wrapper.length ? czrapp.$_header.find( self.currentStickySelector() ) : args.menu_wrapper,
                  _startPosition = self.scrollPosition(),
                  _endPosition = _startPosition;

              //Bail here if we are still animating or if we don't have a menu element
              if ( ! $menu_wrapper.length )
                return;

              if ( ! czrapp.$_header.hasClass( 'fixed-header-on' ) ) {
                    czrapp.$_header.addClass( 'fixed-header-on' );
              }
              var _do = function() {
                    var translateYUp = $menu_wrapper.outerHeight(),
                        translateYDown = 0,
                        _translate;

                    if ( args.fast ) {
                          $menu_wrapper.addClass('fast');
                    }
                    //Handle the specific case of user logged in ( wpadmin bar length not false ) and previewing website with a mobile device < 600 px
                    //=> @media screen and (max-width: 600px)
                    // admin-bar.css?ver=4.7.3:1097
                    // #wpadminbar {
                    //     position: absolute;
                    // }
                    if ( _.isFunction( window.matchMedia ) && matchMedia( 'screen and (max-width: 600px)' ).matches && 1 == czrapp.$_wpadminbar.length ) {
                          //translateYUp = translateYUp + czrapp.$_wpadminbar.outerHeight();
                          translateYDown = translateYDown - $menu_wrapper.outerHeight();
                    }
                    _translate = 'up' == args.direction ? 'translate(0px, -' + translateYUp + 'px)' : 'translate(0px, -' + translateYDown + 'px)';
                    self.stickyHeaderAnimating( true );
                    self.stickyHeaderAnimationDirection = args.direction;
                    $menu_wrapper.toggleClass( 'sticky-visible', 'down' == args.direction );

                    $menu_wrapper.css({
                          //transform: 'up' == args.direction ? 'translate3d(0px, -' + _height + 'px, 0px)' : 'translate3d(0px, 0px, 0px)'
                          '-webkit-transform': _translate,   /* Safari and Chrome */
                          '-moz-transform': _translate,       /* Firefox */
                          '-ms-transform': _translate,        /* IE 9 */
                          '-o-transform': _translate,         /* Opera */
                          transform: _translate
                    });

                    _.delay( function() {
                          //Say it ain't so
                          self.stickyHeaderAnimating( false );
                          if ( args.fast ) {
                                $menu_wrapper.removeClass('fast');
                          }
                          dfd.resolve();
                    }, args.fast ? 100 : 350 );
              };//_do

              _.delay( function() {
                    //Is the menu expanded ?
                    var sticky_menu_id = _.isString( $menu_wrapper.attr('data-menu-id') ) ? $menu_wrapper.attr('data-menu-id') : '';
                    if ( czrapp.userXP.mobileMenu.has( sticky_menu_id ) ) {
                          czrapp.userXP.mobileMenu( sticky_menu_id )( 'collapsed' ).done( function() {
                                _do();
                          });
                    } else {
                          _do();
                    }
              }, 50 );
              return dfd.promise();
        }
  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        /*  Sidebar stick and collapse
        /* ------------------------------------ */
        //What does sidebarLife ?
        //Its job is to listen to both user actions and czrapp events and react :
        //1) toggle sidebar expansion/collapse on user click, on resize
        //2) make sidebars stick on user scroll
        //3) translate vertically when czrapp sticky menu (desktop or mobile) gets animated
        //
        //For performance reasons, the scroll event is bound with a minimal and throttled ( 10 ms ) function that does extremely simple maths.
        //=> the scroll action modifies each sidebar stickyness state independently ( @see _setStickyness method ). Then this state is listened to in each sb instance.
        //Each sb is an observable instance, holding various observable state values.
        //
        //A sidebar instance can take two states : expanded or collapsed : czrapp.sidebars('s1')() = 'collapsed' or 'expanded'
        //Each sidebar instance holds a stickyness state that can take 3 values :
        // 'top' ( before main wrapper), => the sidebar scroll like the page
        // 'between' ( after main wrapper but before the bottom break point, this is when the sidebar position is 'fixed'), => the sidebar is fixed
        // 'bottom' ( after bottom break point ) => the sidebar scroll again like the page
        //
        //Each sidebar is instantiated with a set of properties written as 'data-...' selectors
        //
        //Due to the specificity of the Hueman theme sidebars, which are expandable and candidates to various positionning option ( like content right + 2 sidebars left ), the fixed left positionning is a bit complex to calculate and is highly tied to the CSS part
        //=> @see how the negative margin are defined in particular.
        //
        //Browser Hack : transitionning to a fixed position is not well handled by ios devices @see => https://stanko.github.io/ios-safari-scoll-position-fixed/ */
        //That's why we add the translateZ(0px) dynamically in js and statically in the css
        //
        // We can stickify if :
        // the user option is checked : 'sidebar-sticky'
        // we have a mainWrapper and a mainContent container. //$('.main', '#wrapper') && $('.main', '#wrapper').find('.content')
        // the viewport is wider than 480px
        sidebarLife : function() {
              var self = this;
              self.sidebars = new czrapp.Values();
              self.sidebars.stickyness = new czrapp.Value( {} );

              //@param state = { s1 : state, s2 : state }
              //Listen to the global stickyness state to set the oveflow of the main content.
              //=> the goal here is to avoid the sidebar content being displayed outside of the main wrapper container when scrolled after top and expanded
              //=> the overflow must be reset in all other case, if not it will hide the social tooltips on tops when hovering the social links
              //Each sb stickyness can take the following state : 'top', 'bottom', 'between'
              self.sidebars.stickyness.bind( function( state ) {
                    var _isAfterTop = true;
                    self.sidebars.each( function( _sb_ ) {
                        _isAfterTop = 'top' != _sb_.stickyness() && _isAfterTop;
                    });
                    czrapp.$_mainWrapper.css({ overflow : _isAfterTop ? 'hidden' : '' });
              });

              //DOM aware sidebar instantiation
              $( '.s1, .s2', '#wrapper .main' ).each( function( index ) {
                    if ( 1 != $(this).length )
                      return;

                    var $container = $(this),
                        _id = $container.attr( 'data-sb-id'),
                        _position = $container.attr( 'data-position'),
                        _userLayout = $container.attr( 'data-layout'),
                        ctor;

                    if ( ! _.isString( _position ) || ! _.isString( _userLayout ) || ! _.isString( _id ) ) {
                          throw new Error( 'Missing id, position or layout for sidebar ' + _id );
                    }

                    ctor = czrapp.Value.extend( self.SidebarCTOR );

                    //do instantiate
                    self.sidebars.add( _id, new ctor( _id, {
                          container : $container,
                          position : _position,//can take left, middle-left, middle-right, right
                          layout : _userLayout,//can take : col-2cr, co-2cl, col-3cr, col-3cm, col-3cl
                          extended_width : 's1' == _id ? 340 : 260//<= hard coded in the base CSS, could be made dynamic in the future
                    }));
              });//$( '.s1, .s2', '#wrapper' ).each()

              //HEADER STICKY MENU REACT
              //Listen to sticky menu => translate the sb vertically
              //=> we listen to animating instead of stickyMenuDown which returns a promise when animation is done, with a 350ms delay
              czrapp.ready.then( function() {
                    if ( _.isUndefined( HUParams.isSidebarSticky ) || ! HUParams.isSidebarSticky  )
                      return;
                    czrapp.userXP.stickyHeaderAnimating.bind( function( animating ) {
                          self.sidebars.each( function( _sb_ ) {
                                _sb_._translateSbContent( czrapp.userXP.stickyMenuDown() );
                          });
                    });
              });

        },


        SidebarCTOR : {
              //constructor params :
              //{
              // container : $container,
              // position : _position, <= get from data-position attribute, mandatory
              // layout : col-3cm, col-3cr, etc...
              // extended_width : 's1' == _id ? '340px' : '260px'
              //}
              initialize : function( id, options ) {
                    if ( ! $.isReady ) {
                          throw new Error( 'Sidebars must be instantiated on DOM ready' );
                    }
                    var sb = this;
                    /////////////////////////////////////////////////////////////////////////
                    /// SETUP PROPERTIES AND OBSERVABLE OBJECTS
                    //assign the id
                    sb.id = id;

                    //write the options as properties
                    $.extend( sb, options || {} );

                    sb.button_selectors = '.sidebar-toggle';
                    sb.button = sb.container.find( sb.button_selectors );

                    czrapp.Value.prototype.initialize.call( sb, null, options );

                    //declare an observable sticky state
                    sb.stickyness = new czrapp.Value();//<= will be set to a string on scroll : 'top', 'between', 'bottom'

                    //store the animation state
                    sb.animating = new czrapp.Value( false );

                    //store the max column height
                    //=> will be updated on dom ready (now), resize, stickify, sidebar expansion
                    sb.maxColumnHeight = new czrapp.Value( sb._getMaxColumnHeight() );


                    /////////////////////////////////////////////////////////////////////////
                    /// SETUP USER ACTIONS LISTENERS
                    //Listen to user actions
                    czrapp.setupDOMListeners(
                          [
                                {
                                      trigger   : 'click keydown',
                                      selector  : sb.button_selectors,
                                      actions   : function() {
                                            var sb = this;
                                            //collapse the other expanded
                                            czrapp.userXP.sidebars.each( function( _sb_ ) {
                                                _sb_( _sb_.id == sb.id ? _sb_() : 'collapsed' );
                                            });
                                            //toggle expansion of this one
                                            sb( 'collapsed' == sb() ? 'expanded' : 'collapsed' );
                                      }
                                },
                                {
                                      trigger   : 'mouseenter',
                                      selector  : sb.button_selectors,
                                      actions   : function() {
                                            this.button.addClass( 'hovering' );
                                      }

                                },
                                {
                                      trigger   : 'mouseleave',
                                      selector  : sb.button_selectors,
                                      actions   : function() {
                                            this.button.removeClass( 'hovering' );
                                      }

                                }
                          ],//actions to execute
                          { dom_el: sb.container },//dom scope
                          sb //instance where to look for the cb methods
                    );


                    /////////////////////////////////////////////////////////////////////////
                    /// INITIAL ACTIONS
                    //set initial sidebar state
                    sb( 'collapsed' );

                    //PREPARE THE SIDEBAR CONTAINER
                    //When a dom element position changes to 'fixed' positioning, ios devices needs the element to be handled faster by the GPU
                    //=> adding translateZ(0) to the element fixes the problem
                    sb.container.css({
                          '-webkit-transform': 'translateZ(0)',    //Safari and Chrome
                          '-moz-transform': 'translateZ(0)',       /* Firefox */
                          '-ms-transform': 'translateZ(0)',        /* IE 9 */
                          '-o-transform': 'translateZ(0)',         /* Opera */
                          transform: 'translateZ(0)'
                    });


                    /////////////////////////////////////////////////////////////////////////
                    /// APP EVENTS
                    //SIDEBAR REACT
                    //Listen to sidebar state ( expandability )
                    //$('body').addClass( id +'-collapse').addClass( id +'-collapse');
                    //the deferred promise() returned value is only here to allow sequential actions in the future
                    //like, expand and then do this or that
                    sb.bind( function( state ) {
                          return $.Deferred( function() {
                                var dfd = this;
                                sb._toggleSidebar()
                                      .done( function( state ){
                                            sb.button.toggleClass( 'hovering', 'expanded' == state );
                                            dfd.resolve();
                                      });
                          }).promise();
                    }, { deferred : true } );


                    //Validate the sb change
                    //animate : make sure we restrict actions when : 'only screen and (min-width: 480px) and (max-width: 1200px)'
                    sb.validate = function( value ) {
                          return this._isExpandable() ? value : 'collapsed';
                    };

                    //STICKY STATE REACT
                    //Listen to stickify state
                    //@param : 'top', 'bottom', 'between'
                    sb.stickyness.bind( function( to, from ) {
                          //Inform the global stickyness of the change
                          _stckness = $.extend( {}, true, _.isObject( czrapp.userXP.sidebars.stickyness() ) ? czrapp.userXP.sidebars.stickyness() : {} );
                          _stckness[ sb.id ] = to;
                          czrapp.userXP.sidebars.stickyness( _stckness );

                          sb._stickify( to  );
                    });


                    //MAX COLUMN HEIGHT REACT
                    //=> refresh the stickyness state here with new maths
                    sb.maxColumnHeight.bind( function() {
                          if ( sb._isStickyfiable() ) {
                                sb._setStickyness();
                          }
                    });

                    /////////////////////////////////////////////////////////////////////////
                    /// BROWSER EVENTS
                    //Set the stickyness state on scroll
                    if ( sb._isStickyfiable() ) {
                          czrapp.$_window.scroll( _.throttle( function() {
                                sb._setStickyness();
                          }, 10 ) );//window.scroll() throttled
                    }

                    //RESIZE
                    //Collapse on resize
                    czrapp.userXP.windowWidth.bind( function( width ) {
                          //update the max column height
                          sb.maxColumnHeight( sb._getMaxColumnHeight() );

                          sb( 'collapsed' ).done( function() {
                                sb._stickify();
                          });
                    });
              },//initialize


              //@return void()
              //update the stickyness state according to the current scroll position and columns height
              _setStickyness : function() {
                    var sb = this;
                    //true === matchMedia( 'only screen and (min-width: 480px)' ).matches
                    if ( ! sb._isStickyfiable() )
                      return;
                    // For contentBottomToTop, we use the maximum column height value
                    // => we can be in a collapsed scenario where a sidebar's height will become higher than the content column height when expanded.
                    var startStickingY      = czrapp.$_mainWrapper.offset().top,
                        contentBottomToTop  = startStickingY + sb.maxColumnHeight(),//sb._getMaxColumnHeight()
                        topSpacing          = 0,//_setTopSpacing();
                        scrollTop           = czrapp.$_window.scrollTop(),
                        stopStickingY       = contentBottomToTop - ( sb.container.outerHeight() + topSpacing );


                    if ( stopStickingY < 0 )
                      return;

                    //When the sidebar is expanded ( can only happen below 1200px viewport ), ot it has to be sticky
                    //=> in this case, we skip this check with ! expanded
                    sb.stickyness( ( function() {
                          if ( scrollTop >= stopStickingY ) {
                                // //the top value can be negative in this case, if the sidebar is content is higher than the sidebar which is higher than the viewport
                                return 'bottom';
                          } else if ( scrollTop >= startStickingY ) {
                                //The sidebar can be expanded, in this case, its height will be adapted on scroll
                                //We are sticky now
                                return 'between';
                          } else if( scrollTop < startStickingY ) {
                                return 'top';
                          }
                    })() );
              },

              //react on stickyness() changes
              //can be called to ajust offset top
              //@return void()
              //@param stickyness : top, between, bottom
              _stickify : function( stickyness ) {
                    var sb = this;
                    if ( ! sb._isStickyfiable() )
                      return;
                    stickyness = stickyness ||  sb.stickyness();

                    //update the max column height
                    sb.maxColumnHeight( sb._getMaxColumnHeight(), { silent : true } );//<= we update it silently here to avoid infinite looping => the maxColumnHeight always triggers a _stickify action in other contexts

                    // For contentBottomToTop, we use the maximum column height value
                    // => we can be in a collapsed scenario where a sidebar's height will become higher than the content column height when expanded.
                    var contentBottomToTop  = czrapp.$_mainWrapper.offset().top + sb.maxColumnHeight(),
                        expanded            = 'expanded' == sb();

                    switch( stickyness ) {
                          case 'top' :
                                sb.container.removeClass('sticky');

                                sb._translateSbContent();
                                // $.when( sb.container.removeClass('sticky') ).done( function() {
                                //       sb._translateSbContent();
                                // });
                                sb.container
                                    //.offset( { top: $mainWrapper.offset().top } )
                                    .css({
                                          position : '',
                                          top : '',
                                          left : '',
                                          right : '',
                                          'margin-left' : '',
                                          'margin-right' : '',
                                          'padding-bottom' : '',
                                          height : ''
                                    });
                                //console.log('ONE : scrollTop < sb.container.offset().top');
                          break;

                          case 'between' :
                                sb.container.addClass( 'sticky' );
                                sb._translateSbContent();
                                // $.when( sb.container.addClass( 'sticky' ) ).done( function() {
                                //       sb._translateSbContent();
                                // });
                                sb.container.css({
                                      position : 'fixed',
                                      top : '0px',
                                      //height : expanded ? sb._getExpandedHeight() + 'px' : '',
                                      left : sb._getStickyXOffset(),//<= depdendant of the sidebar position : left, middle-left, middle-right, right
                                      // 'margin-left' : 0,
                                      // 'margin-right' : 0,
                                      'padding-bottom' : expanded ? 0 : '',
                                });

                                //czrapp._printLog('STYLE ? ' + sb.container.attr( 'style' ) );
                                //console.log('TWO STICKY : scrollTop >= $mainWrapper.offset().top ' );
                          break;

                          case 'bottom' :
                                sb.container.removeClass( 'sticky' );
                                sb.container
                                    //.offset( { top: $mainWrapper.offset().top } )
                                    .css({
                                      position : '',
                                      top : '',
                                      left : '',
                                      right : '',
                                      'margin-left' : '',
                                      'margin-right' : '',
                                      'padding-bottom' : '',
                                      height : ''
                                });

                                //the top value can be negative in this case, if the sidebar is content is higher than the sidebar which is higher than the viewport
                                sb.container.offset( { top: contentBottomToTop - sb.container.outerHeight() } );

                                sb._translateSbContent();

                                //console.log('THREE : scrollTop > stopStickingY');
                          break;
                    }//switch()
              },//stickify


              //@react to sb() state change
              //state agnostic method
              //its job is to expand or collapse depending on the current instance state
              //@return promise()
              _toggleSidebar : function() {
                    var sb = this,
                        expanded = 'expanded' == sb();
                    return $.Deferred( function() {
                          var _dfd_ = this;

                          var _transX,
                              _marginRight,
                              _marginLeft,
                              _translate;
                          ( function() {
                                return $.Deferred( function() {
                                      var _dfd = this;

                                      sb.animating( true );
                                      czrapp.$_body
                                          .toggleClass('sidebar-expanded', expanded )
                                          .toggleClass('sidebar-expanding', expanded )
                                          .toggleClass('sidebar-collapsing', ! expanded );
                                      sb.container
                                          .toggleClass( 'expanding', expanded )
                                          .toggleClass( 'collapsing', ! expanded );

                                      //PREPARE SB CONTAINER CSS
                                      //If the sidebar is sticky, we need to translate it while setting the width
                                      //Set Horizontal left position when 'fixed'
                                      switch( sb.position ) {
                                            case 'right' :
                                                _transX = - ( sb.extended_width - 50 );
                                                if ( 'col-3cl' == sb.layout ) {
                                                    _marginRight = expanded ? - sb.extended_width - 50 : -100;
                                                } else {
                                                    _marginRight = expanded ? - sb.extended_width : -50;
                                                }
                                            break;
                                            case 'middle-right' :
                                                _transX = - ( sb.extended_width - 50 );
                                                _marginRight = expanded ? - sb.extended_width  : -50;
                                                // if ( 'col-3cl' == sb.layout ) {
                                                //     _marginLeft = expanded ? - sb.extended_width - 50 : -100;
                                                // } else {

                                                // }
                                            break;
                                            case 'middle-left' :
                                                _transX = sb.extended_width - 50;
                                                _marginLeft = expanded ? - sb.extended_width : -50;
                                            break;
                                            case 'left' :
                                                _transX = sb.extended_width - 50;
                                                if ( 'col-3cr' == sb.layout ) {
                                                    _marginLeft = expanded ? - sb.extended_width - 50 : -100;
                                                } else {
                                                    _marginLeft = expanded ? - sb.extended_width : -50;
                                                }
                                            break;
                                      }

                                      _transX = expanded ? _transX : 0;
                                      _translate = 'translate3d(' + _transX + 'px,0px,0px)';

                                      //APPLY SB CONTAINER CSS
                                      sb.container.css({
                                            width : expanded ? sb.extended_width + 'px' : '50px',
                                            'margin-right' : _.isEmpty( _marginRight + '' ) ? '' : _marginRight + 'px',
                                            'margin-left' : _.isEmpty( _marginLeft + '' ) ? '' : _marginLeft + 'px',
                                            height : expanded ? sb._getExpandedHeight() + 'px' : sb.container.height() + 'px',
                                            '-webkit-transform': _translate,   /* Safari and Chrome */
                                            '-moz-transform': _translate,       /* Firefox */
                                            '-ms-transform': _translate,        /* IE 9 */
                                            '-o-transform': _translate,         /* Opera */
                                            transform: _translate
                                      });

                                      czrapp.$_mainContent.css({
                                            '-webkit-transform': _translate,   /* Safari and Chrome */
                                            '-moz-transform': _translate,       /* Firefox */
                                            '-ms-transform': _translate,        /* IE 9 */
                                            '-o-transform': _translate,         /* Opera */
                                            transform: _translate,
                                      });

                                      //OPACITY
                                      sb.container.find('.sidebar-content').css('opacity', expanded ? 0 : 1 );
                                      sb.container.find('.icon-sidebar-toggle').css('opacity', 0);

                                      //DO
                                      _.delay( function() {
                                            _dfd.resolve();
                                      }, 350 );//transition: width .35s ease-in-out;
                                }).promise();
                          })().done( function() {
                                sb.container.toggleClass( 'expanded', expanded ).toggleClass('collapsed', ! expanded );
                                sb.container
                                      .removeClass( 'expanding')
                                      .removeClass( 'collapsing')
                                      .css({
                                            width : expanded ? sb.extended_width + 'px' : '',
                                            'margin-right' : '',
                                            'margin-left' : '',
                                            height : '',
                                      });

                                //END SIDEBAR ANIMATION + CLEAN CLASSES
                                sb.container.find('.icon-sidebar-toggle').css('opacity', 1);

                                //sidebar content
                                sb.container.find('.sidebar-content')
                                    .css({
                                          opacity : '',
                                          //height : expanded ? 'calc( 100% - 60px )' : ''//<= 60px is the height of the toggle arrow bar
                                    });
                                sb.animating( false );
                                //Clean body classes
                                czrapp.$_body.removeClass('sidebar-expanding').removeClass('sidebar-collapsing');


                                //PUSH THE CONTENT ON THE LEFT OR ON THE RIGHT
                                ( function() {
                                      return $.Deferred( function() {
                                            var _dfd = this,
                                                _pushDirection = -1 == sb.position.indexOf( 'right' ) ? 'right' : 'left';
                                            //Make sure the content column looks good when pushed left or right
                                            czrapp.$_mainContent.css({ width: expanded ? 'calc( 100% - ' + ( Math.abs( _transX ) - 1 ) + 'px )' : ''} );
                                            czrapp.$_mainContent.css( 'padding-' + _pushDirection , expanded ? ( Math.abs( _transX ) - 1 ) : '' );
                                            _.delay( function() {
                                                  _dfd.resolve();
                                            }, 350 );//transition: transform, .35s ease;
                                      }).promise();
                                } )().done( function() {
                                      //update the max column height
                                      sb.maxColumnHeight( sb._getMaxColumnHeight() );

                                      //adjust offset top if expanded when sticky and close to bottom:
                                      if ( sb._isStickyfiable() ) {
                                            sb._setStickyness();
                                      }
                                      _dfd_.resolve();
                                });
                          });
                    }).promise();
              },//toggleSidebar



              //translate content vertically to follow the sticky menu animation
              _translateSbContent : function( stickyMenuDown ) {
                    stickyMenuDown = stickyMenuDown || czrapp.userXP.stickyMenuDown();
                    var sb = this,
                        translateYUp = 0,
                        translateYDown = 0,
                        _translate = '';

                    //Handle the specific case of user logged in ( wpadmin bar length not false ) and previewing website with a mobile device < 600 px
                    //=> @media screen and (max-width: 600px)
                    // admin-bar.css?ver=4.7.3:1097
                    // #wpadminbar {
                    //     position: absolute;
                    // }
                    if ( 'between' == sb.stickyness() ) {
                          if ( 1 == czrapp.$_wpadminbar.length ) {
                                translateYUp = translateYUp + czrapp.$_wpadminbar.outerHeight();
                                translateYDown = translateYDown + czrapp.$_wpadminbar.outerHeight();
                          }
                          if ( stickyMenuDown && _.isFunction( window.matchMedia ) && ! matchMedia( 'screen and (max-width: 600px)' ).matches ) {
                                translateYUp = translateYUp + 50;
                          }
                    }

                    _translate = ( stickyMenuDown && 'between' == sb.stickyness() ) ? 'translate(0px, ' + translateYUp + 'px)' : 'translate(0px, ' + translateYDown + 'px)';

                    sb.container.find('.sidebar-content, .sidebar-toggle').css({
                          //transform: 'up' == args.direction ? 'translate3d(0px, -' + _height + 'px, 0px)' : 'translate3d(0px, 0px, 0px)'
                          '-webkit-transform': _translate,   /* Safari and Chrome */
                          '-moz-transform': _translate,       /* Firefox */
                          '-ms-transform': _translate,        /* IE 9 */
                          '-o-transform': _translate,         /* Opera */
                          transform: _translate
                    });
              },



              //@return a string '' or number + 'px'
              //invoked when sb is sticky
              //only used when sticky;
              _getStickyXOffset : function() {
                    var sb = this,
                        expanded = 'expanded' == sb(),
                        $mainWrapper = $('.main', '#wrapper'),
                        $mainContent = $mainWrapper.find('.content'),
                        xFixedOffset = '';

                    if ( 'between' != sb.stickyness() )
                      return '';

                    //Set Horizontal left position when 'fixed'
                    switch( sb.position ) {
                          case 'left' :
                              if ( expanded ) {
                                    xFixedOffset = $mainWrapper.offset().left + 50;
                              } else {
                                    xFixedOffset = $mainWrapper.offset().left + sb.container.width();
                              }
                              if ( 'col-3cr' == sb.layout ) {
                                    if ( expanded ) {
                                          xFixedOffset = $mainWrapper.offset().left + czrapp.userXP.sidebars('s2').container.width() + 50;
                                    } else {
                                          xFixedOffset = '';
                                    }
                              }
                          break;
                          case 'middle-left' :
                              xFixedOffset = czrapp.userXP.sidebars('s1').container.width() + $mainWrapper.offset().left + 50;
                              if ( 'col-3cr' == sb.layout ) {
                                    if ( expanded ) {
                                    } else {
                                          xFixedOffset = '';
                                    }
                              }
                          break;
                          case 'middle-right' :
                              xFixedOffset = $mainWrapper.offset().left + $mainContent.outerWidth();
                          break;
                          case 'right' :
                              if ( expanded ) {
                                    xFixedOffset = $mainWrapper.offset().left + $mainWrapper.outerWidth() - 50;
                              } else {
                                    xFixedOffset = $mainWrapper.offset().left + $mainWrapper.outerWidth() - sb.container.width();
                              }
                          break;
                    }
                    return _.isEmpty( xFixedOffset ) ? xFixedOffset : xFixedOffset + 'px';
              },

              //invoked in a scenario of sidebar expanded in mobile view : toggle and scroll
              //@return number
              _getExpandedHeight : function() {
                    var sb = this,
                        _winHeight = czrapp.$_window.height(),
                        _sbHeight = this.container.find('.sidebar-content').height(),
                        _maxColHeight = sb.maxColumnHeight();

                    //When the sidebar is sticky and expanded
                    if ( 'between' == sb.stickyness() ) {
                          //if sticky we want the height to be the part that we see from top to bottom of the viewport
                          return czrapp.$_mainWrapper.offset().top + czrapp.$_mainWrapper.find('.content').outerHeight() - sb.container.offset().top;
                    } else {
                          //return _winHeight > _sbHeight ? _winHeight : _sbHeight;
                          //if not sticky, then make sure we are not smaller than the viewport's height
                          return Math.max( _winHeight, _sbHeight > _maxColHeight ? _maxColHeight : _sbHeight );
                    }
                    return Math.max( _winHeight, _sbHeight > _maxColHeight ? _maxColHeight : _sbHeight );


              },

              //@return number
              _getMaxColumnHeight : function() {
                    var _hs = [];
                    //loop on the sb instances to get their container height
                    //skip the sb sticky and expanded => those will inherit the height of the content or the other sb
                    czrapp.userXP.sidebars.each( function( _sb_ ) {
                          _hs.push( _sb_.container.outerHeight() );
                    });
                    $('.content', '#wrapper .main').each( function() {
                          if ( 1 == $(this).length )
                            _hs.push( $(this).outerHeight() );
                    });
                    return Math.max.apply(null, _hs );
              },


              //@return bool
              _isExpandable : function() {
                    return _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (min-width: 480px) and (max-width: 1200px)' ).matches;
              },

              // We can stickify if :
              // the user option is checked
              // we have a mainWrapper and a mainContent container. //$('.main', '#wrapper') && $('.main', '#wrapper').find('.content')
              // the viewport is wider than 480px
              _isStickyfiable : function() {
                    return HUParams.isSidebarSticky &&
                    1 == czrapp.$_mainWrapper.length &&
                    1 == czrapp.$_mainContent.length &&
                    _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (min-width: 480px)' ).matches;
              }
        },//SidebarCTOR

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        //outline firefox fix, see https://github.com/presscustomizr/customizr/issues/538
        outline: function() {
              if ( czrapp.$_body.hasClass( 'mozilla' ) && 'function' == typeof( tcOutline ) )
              tcOutline();
        },

        //SMOOTH SCROLL
        smoothScroll: function() {
              if ( HUParams.SmoothScroll && HUParams.SmoothScroll.Enabled )
                smoothScroll( HUParams.SmoothScroll.Options );
        },





        /*  Toggle header search
        /* ------------------------------------ */
        toggleHeaderSearch : function() {
              $('.toggle-search').click(function(){
                    $('.toggle-search').toggleClass('active');
                    $('.search-expand').fadeToggle(250);
                    setTimeout(function(){
                          $('.search-expand input').focus();
                    }, 300);
              });
        },

        /*  Scroll to top
        /* ------------------------------------ */
        scrollToTop : function() {
              $('a#back-to-top').click(function() {
                    $('html, body').animate({scrollTop:0},'slow');
                    return false;
              });
        },


        /*  Tabs widget
        /* ------------------------------------ */
        widgetTabs : function() {
            var $tabsNav       = $('.alx-tabs-nav'),
              $tabsNavLis    = $tabsNav.children('li'),
              $tabsContainer = $('.alx-tabs-container');

            $tabsNav.each(function() {
                  var $_el = $(this);
                  $_el
                      .next()
                      .children('.alx-tab')
                      .stop(true,true)
                      .hide()
                      .siblings( $_el.find('a').attr('href') ).show();

                  $_el.children('li').first().addClass('active').stop(true,true).show();
            });

            $tabsNavLis.on('click', function(e) {
                  var $this = $(this);

                  $this.siblings().removeClass('active').end()
                  .addClass('active');

                  $this.parent().next().children('.alx-tab').stop(true,true).hide()
                  .siblings( $this.find('a').attr('href') ).fadeIn();
                  e.preventDefault();
            }).children( window.location.hash ? 'a[href="' + window.location.hash + '"]' : 'a:first' ).trigger('click');
        },

        /*  Comments / pingbacks tabs
        /* ------------------------------------ */
        commentTabs : function() {
            $(".comment-tabs li").click(function() {
                $(".comment-tabs li").removeClass('active');
                $(this).addClass("active");
                $(".comment-tab").hide();
                var selected_tab = $(this).find("a").attr("href");
                $(selected_tab).fadeIn();
                return false;
            });
        },


        /*  Table odd row class
        /* ------------------------------------ */
        tableStyle : function() {
              $('table tr:odd').addClass('alt');
        },


        /*  Dropdown menu animation
        /* ------------------------------------ */
        dropdownMenu : function() {
              $('.nav ul.sub-menu').hide();
              $('.nav li').hover(
                    function() {
                          $(this).children('ul.sub-menu').slideDown('fast');
                    },
                    function() {
                          $(this).children('ul.sub-menu').hide();
                    }
              );
        }

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);var czrapp = czrapp || {};
//@global HUParams
/************************************************
* LET'S DANCE
*************************************************/
( function ( czrapp, $, _ ) {
      //adds the server params to the app now
      czrapp.localized = HUParams || {};

      //add the events manager object to the root
      $.extend( czrapp, czrapp.Events );

      //defines a Root class
      //=> adds the constructor options : { id : ctor name, dom_ready : params.ready || [] }
      //=> declares a ready() methods, fired on dom ready
      czrapp.Root           = czrapp.Class.extend( {
            initialize : function( options ) {
                  $.extend( this, options || {} );
            },

            //On DOM ready, fires the methods passed to the constructor
            //Populates a czrapp.status array allowing us to remotely check the current app state
            ready : function() {
                  var self = this;
                  if ( self.dom_ready && _.isArray( self.dom_ready ) ) {
                        czrapp.status = czrapp.status || [];
                        _.each( self.dom_ready , function( _m_ ) {
                              if ( ! _.isFunction( self[_m_]) )
                                return;

                              try{ self[_m_](); } catch( er ){
                                    czrapp.status.push( [ 'NOK', self.id + '::' + _m_, _.isString( er ) ? czrapp._truncate( er ) : er ].join( ' => ') );
                                    return;
                              }
                        });
                  }
            }
      });

      czrapp.Base           = czrapp.Root.extend( czrapp.methods.Base );

      czrapp.ready          = $.Deferred();

      czrapp.bind( 'czrapp-ready', function() {
            czrapp.consoleLog('front js ready');
            czrapp.ready.resolve();
      });

      var appMap = {
                base : {
                      ctor : czrapp.Base,
                      ready : [
                            'cacheProp'
                      ]
                },
                browserDetect : {
                      ctor : czrapp.Base.extend( czrapp.methods.BrowserDetect ),
                      ready : [ 'addBrowserClassToBody' ]
                },
                jqPlugins : {
                      ctor : czrapp.Base.extend( czrapp.methods.JQPlugins ),
                      ready : [
                            'imgSmartLoad',
                            'extLinks',
                            'parallax'
                      ]
                },
                userXP : {
                      ctor : czrapp.Base.extend( czrapp.methods.UserXP ),
                      ready : [
                            'setupUIListeners',//<=setup observables values used in various UX modules

                            'stickify',
                            'outline',
                            'smoothScroll',
                            'toggleHeaderSearch',
                            'scrollToTop',
                            'widgetTabs',
                            'commentTabs',
                            'tableStyle',
                            'sidebarLife',
                            'dropdownMenu',
                            'mobileMenu'
                      ]
                }
      };//map

      //Instantiates
      _.each( appMap, function( params, name ) {
            if ( _.isObject( params ) ) {
                  try { czrapp[ name ] = new params.ctor( { id : name, dom_ready : params.ready || [] } ); }
                  catch( er ) {
                        czrapp.errorLog( 'Error when loading ' + name + ' | ' + er );
                  }
            }
      });


      //Fire on DOM ready
      $(function ($) {
            _.each( appMap, function( params, name ) {
                  if ( _.isObject( czrapp[ name ] ) && _.isFunction( czrapp[ name ].ready ) ) {
                        czrapp[ name ].ready();
                  }
            });
            czrapp.status = czrapp.status || 'OK';
            if ( _.isArray( czrapp.status ) ) {
                  _.each( czrapp.status, function( error ) {
                        czrapp.errorLog( error );
                  });
            }
            czrapp.trigger( 'czrapp-ready');
      });
})( czrapp, jQuery, _ );