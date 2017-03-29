var czrapp = czrapp || {};

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

})(jQuery, czrapp);