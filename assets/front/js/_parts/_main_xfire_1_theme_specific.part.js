var czrapp = czrapp || {};
//@global HUParams
/************************************************
* LET'S DANCE
*************************************************/
( function ( czrapp, $, _ ) {
      //adds the server params to the app now
      czrapp.localized = HUParams || {};

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

      //set the observable value
      //listened to by _instantianteAndFireOnDomReady = function( newMap, previousMap, isInitial )
      czrapp.appMap( appMap , true );//true for isInitial map

})( czrapp, jQuery, _ );