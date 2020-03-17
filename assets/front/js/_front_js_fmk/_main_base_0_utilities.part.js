var czrapp = czrapp || {};

/*************************
* JS LOG VARIOUS UTILITIES
*************************/
(function($, czrapp) {
      //Utility : print a js log on frontd
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

      //@return [] for console method
      //@bgCol @textCol are hex colors
      //@arguments : the original console arguments
      var _prettyPrintLog = function( args ) {
            var _defaults = {
                  bgCol : '#5ed1f5',
                  textCol : '#000',
                  consoleArguments : []
            };
            args = _.extend( _defaults, args );

            var _toArr = Array.from( args.consoleArguments ),
                _truncate = function( string ){
                      if ( ! _.isString( string ) )
                        return '';
                      return string.length > 300 ? string.substr( 0, 299 ) + '...' : string;
                };

            //if the array to print is not composed exclusively of strings, then let's stringify it
            //else join(' ')
            if ( ! _.isEmpty( _.filter( _toArr, function( it ) { return ! _.isString( it ); } ) ) ) {
                  _toArr =  JSON.stringify( _toArr.join(' ') );
            } else {
                  _toArr = _toArr.join(' ');
            }
            return [
                  '%c ' + _truncate( _toArr ),
                  [ 'background:' + args.bgCol, 'color:' + args.textCol, 'display: block;' ].join(';')
            ];
      };

      var _wrapLogInsideTags = function( title, msg, bgColor ) {
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;
            if ( czrapp.localized.isDevMode ) {
                  if ( _.isUndefined( msg ) ) {
                        console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ '<' + title + '>' ] } ) );
                  } else {
                        console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ '<' + title + '>' ] } ) );
                        console.log( msg );
                        console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ '</' + title + '>' ] } ) );
                  }
            } else {
                  console.log.apply( console, _prettyPrintLog( { bgCol : bgColor, textCol : '#000', consoleArguments : [ title ] } ) );
            }
      };

      //Dev mode aware and IE compatible czrapp.consoleLog()
      czrapp.consoleLog = function() {
            if ( ! czrapp.localized.isDevMode )
              return;
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;
            console.log.apply( console, _prettyPrintLog( { consoleArguments : arguments } ) );
            console.log( 'Unstyled console message : ', arguments );
      };

      czrapp.errorLog = function() {
            //fix for IE, because console is only defined when in F12 debugging mode in IE
            if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
              return;

            console.log.apply( console, _prettyPrintLog( { bgCol : '#ffd5a0', textCol : '#000', consoleArguments : arguments } ) );
            // if ( czrapp.localized.isDevMode ) {
            //       console.log( 'Unstyled error message : ', arguments );
            // }
      };


      czrapp.errare = function( title, msg ) { _wrapLogInsideTags( title, msg, '#ffd5a0' ); };
      czrapp.infoLog = function( title, msg ) { _wrapLogInsideTags( title, msg, '#5ed1f5' ); };

      //encapsulates a WordPress ajax request in a normalize method
      //@param queryParams = {}
      czrapp.doAjax = function( queryParams ) {
            //do we have a queryParams ?
            queryParams = queryParams || ( _.isObject( queryParams ) ? queryParams : {} );

            var ajaxUrl = queryParams.ajaxUrl || czrapp.localized.ajaxUrl,//the ajaxUrl can be specified when invoking doAjax
                nonce = czrapp.localized.frontNonce,//{ 'id' => 'HuFrontNonce', 'handle' => wp_create_nonce( 'hu-front-nonce' ) },
                dfd = $.Deferred(),
                _query_ = _.extend( {
                            action : '',
                            withNonce : false
                      },
                      queryParams
                );

            // HTTP ajaxurl when site is HTTPS causes Access-Control-Allow-Origin failure in Desktop and iOS Safari
            if ( "https:" == document.location.protocol ) {
                  ajaxUrl = ajaxUrl.replace( "http://", "https://" );
            }

            //check if we're good
            if ( _.isEmpty( _query_.action ) || ! _.isString( _query_.action ) ) {
                  czrapp.errorLog( 'czrapp.doAjax : unproper action provided' );
                  return dfd.resolve().promise();
            }
            //setup nonce
            //Note : the nonce might be checked server side ( not in all cases, only when writing in db )  with check_ajax_referer( 'hu-front-nonce', 'HuFrontNonce' )
            _query_[ nonce.id ] = nonce.handle;
            if ( ! _.isObject( nonce ) || _.isUndefined( nonce.id ) || _.isUndefined( nonce.handle ) ) {
                  czrapp.errorLog( 'czrapp.doAjax : unproper nonce' );
                  return dfd.resolve().promise();
            }

            $.post( ajaxUrl, _query_ )
                  .done( function( _r ) {
                        // Check if the user is logged out.
                        if ( '0' === _r ||  '-1' === _r || false === _r.success ) {
                              czrapp.errare( 'czrapp.doAjax : done ajax error for action : ' + _query_.action , _r );
                              dfd.reject( _r );
                        }
                        dfd.resolve( _r );
                  })
                  .fail( function( _r ) {
                        czrapp.errare( 'czrapp.doAjax : failed ajax error for : ' + _query_.action, _r );
                        dfd.reject( _r );
                  });
                  //.always( function( _r ) { dfd.resolve( _r ); });
            return dfd.promise();
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
              //       once : false
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
                    var once = _event.once ? _event.once : false;

                    //LISTEN TO THE DOM => USES EVENT DELEGATION
                    args.dom_el[ once ? 'one' : 'on' ]( _event.trigger , _event.selector, function( e, event_params ) {
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
})(jQuery, czrapp);