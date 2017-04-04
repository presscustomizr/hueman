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
            },

            //On DOM ready, fires the methods passed to the constructor
            //Populates a czrapp.status array allowing us to remotely check the current app state
            ready : function() {
                  var self = this;
                  if ( self.dom_ready && _.isArray( self.dom_ready ) ) {
                        czrapp.status = czrapp.status || [];
                        _.each( self.dom_ready , function( _m_ ) {
                              if ( ! _.isFunction( self[_m_]) ) {
                                    czrapp.status.push( 'Method ' + _m_ + ' was not found and could not be fired on DOM ready.');
                                    return;
                              }
                              try { self[_m_](); } catch( er ){
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
                            'headerSearchToLife',
                            'scrollToTop',
                            'widgetTabs',
                            'commentTabs',
                            'tableStyle',
                            'sidebarToLife',
                            'dropdownMenu',
                            'mobileMenu',
                            'topNavToLife'
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