var czrapp = czrapp || {};
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
                  this.isReady = $.Deferred();
            },

            //On DOM ready, fires the methods passed to the constructor
            //Populates a czrapp.status array allowing us to remotely check the current app state
            ready : function() {
                  var self = this;
                  if ( self.dom_ready && _.isArray( self.dom_ready ) ) {
                        czrapp.status = czrapp.status || [];
                        _.each( self.dom_ready , function( _m_ ) {
                              if ( ! _.isFunction( _m_ ) && ! _.isFunction( self[_m_]) ) {
                                    czrapp.status.push( 'Method ' + _m_ + ' was not found and could not be fired on DOM ready.');
                                    return;
                              }
                              try { ( _.isFunction( _m_ ) ? _m_ : self[_m_] ).call( self ); } catch( er ){
                                    czrapp.status.push( [ 'NOK', self.id + '::' + _m_, _.isString( er ) ? czrapp._truncate( er ) : er ].join( ' => ') );
                                    return;
                              }
                        });
                  }
                  this.isReady.resolve();
            }
      });

      czrapp.Base           = czrapp.Root.extend( czrapp.methods.Base );

      //is resolved on 'czrapp-ready', which is triggered when
      //1) the initial map method has been instantiated
      //2) all methods have been fired on DOM ready;
      czrapp.ready          = $.Deferred();
      czrapp.bind( 'czrapp-ready', function() {
            czrapp.ready.resolve();
      });

      //SERVER MOBILE USER AGENT
      czrapp.isMobileUserAgent = new czrapp.Value( false );
      //This ajax requests solves the problem of knowing if wp_is_mobile() in a front js script, when the website is using a cache plugin
      //without a cache plugin, we could localize the wp_is_mobile() boolean
      //with a cache plugin, we need to always get a fresh answer from the server
      //falls back on HUParams.isWPMobile ( which can be cached, so not fully reliable )
      czrapp.browserAgentSet = $.Deferred( function() {
            var _dfd = this;
            czrapp.doAjax( { action: "hu_wp_is_mobile" } )
                  .always( function( _r_ ) {
                        czrapp.isMobileUserAgent( ( ! _r_.success || _.isUndefined( _r_.data.is_mobile ) ) ? ( '1' == HUParams.isWPMobile ) : _r_.data.is_mobile );
                        _dfd.resolve( czrapp.isMobileUserAgent() );
                  });
            //always auto resolve after 1.5s if the server is too slow.
            _.delay( function() {
                if ( 'pending' == _dfd.state() )
                  _dfd.resolve( false );
            }, 1500 );
      });

      //THE DEFAULT MAP
      //Other methods can be hooked. @see czrapp.customMap
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
                            'headerSearchToLife',
                            'scrollToTop',
                            'widgetTabs',
                            'commentTabs',
                            'tableStyle',
                            //the sidebar can be set to life properly once we know, from the server, if we display a mobile device or not.
                            function() {
                                  var self = this;
                                  czrapp.browserAgentSet.done( function() {
                                        self.sidebarToLife();
                                  });
                            },
                            'dropdownMenu',
                            'mobileMenu',
                            'topNavToLife',
                            'mayBePrintWelcomeNote'
                      ]
                }
      };//map

      //Instantiates
      var _instantianteAndFireOnDomReady = function( newMap, previousMap, isInitial ) {
            if ( ! _.isObject( newMap ) )
              return;
            _.each( newMap, function( params, name ) {
                  //skip if already instantiated or invalid params
                  if ( czrapp[ name ] || ! _.isObject( params ) )
                    return;

                  params = _.extend(
                        {
                              ctor : {},//should extend czrapp.Base with custom methods
                              ready : [],//a list of method to execute on dom ready,
                              options : {}//can be used to pass a set of initial params to set to the constructors
                        },
                        params
                  );

                  //the constructor has 2 mandatory params : id and dom_ready methods
                  var ctorOptions = _.extend(
                      {
                          id : name,
                          dom_ready : params.ready || []
                      },
                      params.options
                  );

                  try { czrapp[ name ] = new params.ctor( ctorOptions ); }
                  catch( er ) {
                        czrapp.errorLog( 'Error when loading ' + name + ' | ' + er );
                  }
            });

            //Fire on DOM ready
            $(function ($) {
                  _.each( newMap, function( params, name ) {
                        //bail if already fired
                        if ( czrapp[ name ] && czrapp[ name ].isReady && 'resolved' == czrapp[ name ].isReady.state() )
                          return;
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
                  //trigger czrapp-ready when the default map has been instantiated
                  czrapp.trigger( isInitial ? 'czrapp-ready' : 'czrapp-updated' );
            });
      };//_instantianteAndFireOnDomReady()

      //instantiates the default map
      //@param : new map, previous map, isInitial bool
      _instantianteAndFireOnDomReady( appMap, null, true );

      //instantiate additional classes on demand
      //EXAMPLE IN THE PRO HEADER SLIDER PHP TMPL :
      //instantiate on first run, then on the following runs, call fire statically
      // var _do = function() {
      //       if ( czrapp.proHeaderSlid ) {
      //             czrapp.proHeaderSlid.fire( args );
      //       } else {
      //             var _map = $.extend( true, {}, czrapp.customMap() );
      //             _map = $.extend( _map, {
      //                   proHeaderSlid : {
      //                         ctor : czrapp.Base.extend( czrapp.methods.ProHeaderSlid ),
      //                         ready : [ 'fire' ],
      //                         options : args
      //                   }
      //             });
      //             //this is listened to in xfire.js
      //             czrapp.customMap( _map );
      //       }
      // };
      // if ( ! _.isUndefined( czrapp ) && czrapp.ready ) {
      //       if ( 'resolved' == czrapp.ready.state() ) {
      //             _do();
      //       } else {
      //             czrapp.ready.done( _do );
      //       }
      // }
      czrapp.customMap = new czrapp.Value( {} );
      czrapp.customMap.bind( _instantianteAndFireOnDomReady );//<=THE CUSTOM MAP IS LISTENED TO HERE

})( czrapp, jQuery, _ );