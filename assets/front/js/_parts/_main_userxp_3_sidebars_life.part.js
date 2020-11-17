var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        /*  Sidebar stick and collapse
        /* ------------------------------------ */
        //What does sidebarToLife ?
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
        // the user option is checked : 'desktop-sticky-sb'
        // we have a mainWrapper and a mainContent container. //$('.main', '#wrapper') && $('.main', '#wrapper').find('.content')
        // the viewport is wider than 480px
        //
        // Losing stickyfiability ( on resize when going < 480 px ) will trigger a stickyness reset of the css class and style attributes for the sidebar.
        sidebarToLife : function() {
              var self = this;
              self.sidebars = new czrapp.Values();

              /////////////////////////////////////////////////////////////////////////
              /// APP EVENTS REACT
              //MAX COLUMN HEIGHT
              //store the max column height
              //=> will be updated on dom ready (now), resize, stickify, sidebar expansion
              self.maxColumnHeight = new czrapp.Value( self._getMaxColumnHeight() );
              //=> refresh the stickyness state here with new maths
              self.maxColumnHeight.bind( function(to) {
                    self.sidebars.each( function( _sb_ ) {
                          if ( _sb_.isStickyfiable() ) {
                                _sb_._setStickyness();
                          }
                    });
              });




              //STICKYNESS
              //If user has checked the option to have the sticky sidebars either on mobile devices or desktops,
              //we need to know if the current device is a mobile.
              //We can get this information from the server by passing wp_is_mobile() as a localized param
              //But in the case of website using a cache plugin, we need to use a dynamic js way to do it
              //Because the localized HUParams.isWPMobile can be cached, so not fully reliable
              //That's where the 'js-mobile-detect' option is here to help
              //If 'js-mobile-detect' is checked, the mobile-detect.min.js script is loaded and create a md global object
              //@see https://github.com/hgoebl/mobile-detect.js
              czrapp.isMobileUserAgent = new czrapp.Value( '1' == HUParams.isWPMobile );

              if ( ! _.isUndefined( window.MobileDetect ) && _.isFunction( window.MobileDetect ) ) { // <= is js-mobile-detect option checked ?
                    var _md = new MobileDetect(window.navigator.userAgent);
                    czrapp.isMobileUserAgent( ! _.isNull( _md.mobile() ) );
              }


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

              //HEADER STICKY MENU REACT
              //Listen to sticky menu => translate the sb vertically
              //=> we listen to animating instead of stickyMenuDown which returns a promise when animation is done, with a 350ms delay
              czrapp.ready.then( function() {
                    czrapp.userXP.stickyHeaderAnimating.bind( function( animating ) {
                          if ( ! self._isStickyOptionOn() )
                              return;
                          self.sidebars.each( function( _sb_ ) {
                                _sb_._translateSbContent( czrapp.userXP.stickyMenuDown() );
                          });
                    });
              });


              /////////////////////////////////////////////////////////////////////////
              /// BROWSER EVENTS REACT
              /// SCROLL
              //Set the stickyness state on scroll
              czrapp.$_window.on('scroll', _.throttle( function() {
                    //this check is added here because the _isStickyOptionOn() relies on a asynchronous ajax check for isMobileUserAgent()
                    if ( ! self._isStickyOptionOn() )
                      return;

                    self.sidebars.each( function( _sb_ ) {
                          if ( _sb_.isStickyfiable() ) {
                                _sb_._setStickyness();
                          }
                    });
              }, 10 ) );//window.scroll() throttled

              //SLOW THROTTLED SCROLL LISTENER TO SET THE MAX COLUMS HEIGHT AND STICKIFY WHEN EXPANDED
              //Whithout this listener, the max column height might not be refreshed on time ( )
              //=> Adresses the potential problems of
              czrapp.$_window.on('scroll', _.throttle( function() {
                    czrapp.userXP.maxColumnHeight( czrapp.userXP._getMaxColumnHeight() );

                    //always refresh live when expanded
                    self.sidebars.each( function( _sb_ ) {
                          if ( _sb_.isStickyfiable() && 'expanded' == _sb_() ) {
                                _sb_._stickify();
                          }
                    });
              }, 300 ) );//window.scroll() throttled

              //RESIZE
              //Collapse on resize
              czrapp.userXP.windowWidth.bind( function( width ) {
                    //update the max column height
                    czrapp.userXP.maxColumnHeight( czrapp.userXP._getMaxColumnHeight() );

                    //update the stickyfiability of each sb
                    //stickify if needed
                    self.sidebars.each( function( _sb_ ) {
                          _sb_.isStickyfiable( _sb_._isStickyfiable() );
                          _sb_( 'collapsed' ).done( function() {
                                _sb_._stickify();
                          });
                    });
              });



              /////////////////////////////////////////////////////////////////////////
              /// DOM aware sidebar instantiation
              $( '.s1, .s2', '#wrapper .main' ).each( function( index ) {
                    //make sure that the element with s1 class is a sidebar by checking the data-attr
                    if ( ! _.isString( $(this).attr( 'data-sb-id') ) || _.isEmpty( $(this).attr( 'data-sb-id') ) )
                      return;

                    var $container = $(this),
                        _id = $container.attr( 'data-sb-id'),
                        _position = $container.attr( 'data-position'),
                        _userLayout = $container.attr( 'data-layout'),
                        ctor;

                    if ( ! _.isString( _position ) || ! _.isString( _userLayout ) || ! _.isString( _id ) ) {
                          throw new Error( 'Missing id, position or layout for sidebar ' + _id );
                    }

                    if ( 1 != $container.find('.sidebar-content').length || 1 != $container.find('.sidebar-toggle').length ) {
                          throw new Error( 'Missing content or toggle button for sidebar ' + _id );
                    }
                    ctor = czrapp.Value.extend( self.SidebarCTOR );

                    //do instantiate
                    self.sidebars.add( _id, new ctor( _id, {
                          container : $container,
                          position : _position,//can take left, middle-left, middle-right, right
                          layout : _userLayout,//can take : col-2cr, co-2cl, col-3cr, col-3cm, col-3cl
                          extended_width : 's1' == _id ? HUParams.sidebarOneWidth : HUParams.sidebarTwoWidth//<= hard coded in the base CSS, could be made dynamic in the future
                    }));
              });//$( '.s1, .s2', '#wrapper' ).each()

        },


        /*  UTILITIES
        /* ------------------------------------ */
        //@return bool
        // => tells us if the user checked the sticky option for mobiles
        _isUserStickyOnMobiles : function() {
            if ( HUParams.sbStickyUserSettings && _.isObject( HUParams.sbStickyUserSettings ) ) {
                var _dbOpt = _.extend( { mobile : false }, HUParams.sbStickyUserSettings );
                return _dbOpt.mobile || false;
            } else {
              return false;
            }
        },
        //@return bool
        // => tells us if the user checked the sticky option for desktops
        _isUserStickyOnDesktops : function() {
            if ( HUParams.sbStickyUserSettings && _.isObject( HUParams.sbStickyUserSettings ) ) {
                var _dbOpt = _.extend( { desktop : false }, HUParams.sbStickyUserSettings );
                return _dbOpt.desktop || false;
            } else {
              return false;
            }
        },

        //@return bool
        //HUParams.sbStickyUserSettings = { desktop : bool, mobile : bool }
        //We need to combine the user option with the wp_is_mobile() boolean
        //wp_is_mobile() must be always get from the server asynchronously and saved in czrapp.isMobileUserAgent()
        // => Because a localized hardcoded param could be cached by a plugin.
        //=> fixes https://github.com/presscustomizr/hueman/issues/470
        _isStickyOptionOn : function() {
              var _isMobileScreenSize = false, self = this;
              if ( self._isUserStickyOnMobiles() || self._isUserStickyOnDesktops() ) {
                    _isMobileScreenSize = czrapp.isMobileUserAgent() ? true : czrapp.userXP._isMobileScreenSize();
                    return _isMobileScreenSize ? self._isUserStickyOnMobiles() : self._isUserStickyOnDesktops();
              } else {
                    return false;
              }
        },

        //@return number
        _getMaxColumnHeight : function() {
              var _hs = [];
              //loop on the sb instances to get their container height
              //skip the sb sticky and expanded => those will inherit the height of the content or the other sb
              czrapp.userXP.sidebars.each( function( _sb_ ) {
                    _hs.push( _sb_._getVisibleHeight() );
              });
              $('.content', '#wrapper .main').each( function() {
                    if ( 1 == $(this).length )
                      _hs.push( $(this).outerHeight() );
              });
              return Math.max.apply(null, _hs );
        },



        /*  SB Constructor
        /* ------------------------------------ */
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
                    /// SETUP PROPERTIES AND OBSERVABLE VALUES
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
                    //store the styckifiability : updated on resize
                    //=> depends of self._isStickyOptionOn(), existence of content wrapper, and media width should be > 480px
                    sb.isStickyfiable = new czrapp.Value( sb._isStickyfiable() );

                    /////////////////////////////////////////////////////////////////////////
                    /// SETUP USER ACTIONS LISTENERS
                    //Listen to user actions
                    czrapp.setupDOMListeners(
                          [
                                {
                                      trigger   : 'focusin mousedown keydown',
                                      selector  : sb.button_selectors,
                                      actions   : function() {
                                            var sb = this;
                                            //collapse the other expanded
                                            czrapp.userXP.sidebars.each( function( _sb_ ) {
                                                _sb_( _sb_.id == sb.id ? _sb_() : 'collapsed' );
                                            });
                                            //toggle expansion of this one
                                            sb( 'collapsed' == sb() ? 'expanded' : 'collapsed' ).done( function() {
                                                sb._stickify();
                                            });
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

                          //skip the sticky state 'between' if the sb is the highest column
                          var _state = to;
                          if ( sb._isHighestColumn() && 'between' == _state ) {
                                switch( from ) {
                                      case 'top' :
                                          _state = 'bottom';
                                      break;
                                      case 'bottom' :
                                          _state = 'top';
                                      break;
                                }
                          }
                          sb._stickify( _state );
                    });

                    //STICKYFIABILITY REACT
                    //=> reset stickyness css added to sb if becoming not stickyfiable on resize
                    sb.isStickyfiable.bind( function( isStickyfiable ) {
                          if ( ! isStickyfiable )
                            sb._resetStickyness();
                    });
              },//initialize





              /////////////////////////////////////////////////////////////////////////
              /// STICKYNESS
              /////////////////////////////////////////////////////////////////////////
              //@return void()
              //update the stickyness state sb.stickyness() according to the current scroll position and columns height
              //the stickyness can take three states : top, between and bottom
              _setStickyness : function() {
                    var sb = this;
                    //true === matchMedia( 'only screen and (min-width: 480px)' ).matches
                    if ( ! sb.isStickyfiable() )
                      return;
                    // For contentBottomToTop, we use the maximum column height value
                    // => we can be in a collapsed scenario where a sidebar's height will become higher than the content column height when expanded.
                    var startStickingY      = czrapp.$_mainWrapper.offset().top,
                        contentBottomToTop  = startStickingY + czrapp.userXP.maxColumnHeight(),//czrapp.userXP._getMaxColumnHeight()
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

              //mostly designed to react on stickyness() changes
              // but can be called statically to ajust offset top
              //@return void()
              //@param stickyness : top, between, bottom
              _stickify : function( stickyness ) {
                    var sb = this;
                    if ( ! sb.isStickyfiable() )
                      return;
                    stickyness = stickyness ||  sb.stickyness();

                    //update the max column height
                    czrapp.userXP.maxColumnHeight( czrapp.userXP._getMaxColumnHeight(), { silent : true } );//<= we update it silently here to avoid infinite looping => the maxColumnHeight always triggers a _stickify action in other contexts

                    // For contentBottomToTop, we use the maximum column height value
                    // => we can be in a collapsed scenario where a sidebar's height will become higher than the content column height when expanded.
                    var contentBottomToTop  = czrapp.$_mainWrapper.offset().top + czrapp.userXP.maxColumnHeight(),
                        expanded            = 'expanded' == sb();

                    switch( stickyness ) {
                          case 'top' :
                                sb._resetStickyness();//remove sticky class and dynamic style
                                //console.log('ONE : scrollTop < sb.container.offset().top');
                          break;

                          case 'between' :
                                sb.container.addClass( 'sticky' );
                                // $.when( sb.container.addClass( 'sticky' ) ).done( function() {
                                //       sb._translateSbContent();
                                // });
                                sb._translateSbContent();

                                if ( ! expanded ) {
                                    sb.container.css({
                                          position : 'fixed',
                                          top : '0px',
                                          //'min-height' : expanded ? czrapp.$_window.height() : '',
                                          height : expanded ? Math.max( sb._getInnerHeight(), czrapp.$_window.height() ) + 'px' : '',
                                          left : sb._getStickyXOffset(),//<= depdendant of the sidebar position : left, middle-left, middle-right, right
                                          // 'margin-left' : 0,
                                          // 'margin-right' : 0,
                                          'padding-bottom' : expanded ? 0 : '',
                                    });
                                } else {
                                    sb._resetStickyness();
                                }

                                //czrapp._printLog('STYLE ? ' + sb.container.attr( 'style' ) );
                                //console.log('TWO STICKY : scrollTop >= $mainWrapper.offset().top ' );
                          break;

                          case 'bottom' :
                                sb._resetStickyness();//remove sticky class and dynamic style
                                //the top value can be negative in this case, if the sidebar is content is higher than the sidebar which is higher than the viewport
                                if ( ! sb._isHighestColumn() ) {
                                      sb.container.offset( { top: contentBottomToTop - sb.container.outerHeight() } );
                                }
                                //console.log('THREE : scrollTop > stopStickingY');
                          break;
                    }//switch()
              },//stickify








              /////////////////////////////////////////////////////////////////////////
              /// EXPANSION / COLLAPSE
              /////////////////////////////////////////////////////////////////////////
              //@react to sb() state change
              //its job is to dumbly  expand or collapse according to the current instance state
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
                                      sb.container.find('.sidebar-toggle-arrows').css('opacity', 0);

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
                                            height : expanded ? sb._getExpandedHeight() + 'px' : '',
                                            //height : '',
                                            //'min-height' : expanded ? czrapp.$_window.height() : '',
                                      });

                                //END SIDEBAR ANIMATION + CLEAN CLASSES
                                sb.container.find('.sidebar-toggle-arrows').css('opacity', 1);

                                //sidebar content
                                sb.container.find('.sidebar-content')
                                    .css({
                                          opacity : '',
                                          //height : expanded ? 'calc( 100% - 60px )' : ''//<= 60px is the height of the toggle arrow bar
                                    });
                                sb.animating( false );
                                //Clean body classes
                                czrapp.$_body.removeClass('sidebar-expanding').removeClass('sidebar-collapsing');

                                //update the max column height
                                czrapp.userXP.maxColumnHeight( czrapp.userXP._getMaxColumnHeight() );

                                //adjust offset top if expanded when sticky and close to bottom:
                                if ( sb.isStickyfiable() ) {
                                      sb._setStickyness();
                                }

                                if ( expanded ) {
                                      //in hueman pro, the header can be fixed if user has choosen the full width slider header
                                      var $_scrollTopEl = 1 == $('#ha-large-header').length ? $('#ha-large-header') : czrapp.$_header;
                                      $('html, body').animate({
                                              scrollTop: $_scrollTopEl.height()
                                        }, {
                                            duration: 'slow',
                                            complete : function() {
                                                _dfd_.resolve();
                                            }
                                        });
                                } else {
                                  _dfd_.resolve();
                                }



                                //PUSH THE CONTENT ON THE LEFT OR ON THE RIGHT
                                // ( function() {
                                //       return $.Deferred( function() {
                                //             var _dfd = this,
                                //                 _pushDirection = -1 == sb.position.indexOf( 'right' ) ? 'right' : 'left';
                                //             //Make sure the content column looks good when pushed left or right
                                //             czrapp.$_mainContent.css({ width: expanded ? 'calc( 100% - ' + ( Math.abs( _transX ) - 1 ) + 'px )' : ''} );
                                //             czrapp.$_mainContent.css( 'padding-' + _pushDirection , expanded ? ( Math.abs( _transX ) - 1 ) : '' );
                                //             _.delay( function() {
                                //                   _dfd.resolve();
                                //             }, 350 );//transition: transform, .35s ease;
                                //       }).promise();
                                // } )().done( function() {
                                //       //update the max column height
                                //       czrapp.userXP.maxColumnHeight( czrapp.userXP._getMaxColumnHeight() );

                                //       //adjust offset top if expanded when sticky and close to bottom:
                                //       if ( sb.isStickyfiable() ) {
                                //             sb._setStickyness();
                                //       }
                                //       _dfd_.resolve();
                                // });
                          });
                    }).promise();
              },//toggleSidebar








              /////////////////////////////////////////////////////////////////////////
              /// HELPERS FOR STICKYNESS AND EXPANSION
              /////////////////////////////////////////////////////////////////////////
              //@return void()
              //reset style and class that turn the sidebar sticky
              _resetStickyness : function() {
                    var sb = this;
                    sb.container.removeClass('sticky');
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
                              'min-height' : ''
                        });
                        if ( 'expanded' != sb() ) {
                              sb.container.css( 'height' , '' );
                        }
                    sb._translateSbContent();
              },

              //translate content vertically to follow the sticky menu animation
              //skip if this sidebar is the highest column
              //@return void()
              _translateSbContent : function( stickyMenuDown ) {
                    if ( this._isHighestColumn() )
                      return;
                    stickyMenuDown = stickyMenuDown || czrapp.userXP.stickyMenuDown();
                    var sb = this,
                        translateYUp = 0,
                        translateYDown = 0,
                        _translate = '',
                        _stickyMenuWrapper = czrapp.userXP.stickyMenuWrapper,//@stored dynamically in userXP stickify
                        _stickyMenuHeight = 1 == _stickyMenuWrapper.length ? _stickyMenuWrapper.height() : 50;

                    //Handle the specific case of user logged in ( wpadmin bar length not false ) and previewing website with a mobile device < 600 px
                    //=> @media screen and (max-width: 600px)
                    // admin-bar.css?ver=4.7.3:1097
                    // #wpadminbar {
                    //     position: absolute;
                    // }
                    if ( 'between' == sb.stickyness() ) {
                          if ( 1 == czrapp.$_wpadminbar.length && czrapp.userXP.hasStickyCandidate() ) {
                                translateYUp = translateYUp + czrapp.$_wpadminbar.outerHeight();
                                translateYDown = translateYDown + czrapp.$_wpadminbar.outerHeight();
                          }
                          // if ( stickyMenuDown && _.isFunction( window.matchMedia ) && ! matchMedia( 'screen and (max-width: 600px)' ).matches ) {
                          //       translateYUp = translateYUp + _stickyMenuHeight;
                          // }
                          if ( stickyMenuDown && czrapp.userXP.hasStickyCandidate() ) {
                                translateYUp = translateYUp + _stickyMenuHeight;
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
              //called before and after expansion
              //@return number
              _getExpandedHeight : function() {
                    var sb = this,
                        _winHeight = czrapp.$_window.height(),
                        _contentBottomToTop = czrapp.$_mainWrapper.offset().top + czrapp.$_mainWrapper.find('.content').outerHeight() - sb.container.offset().top,
                        _maxColHeight = czrapp.userXP.maxColumnHeight();
                    // //When the sidebar is sticky and expanded
                    // if ( 'between' == sb.stickyness() ) {
                    //       //if sticky and close to bottom we want the height to be the part that we see from top to bottom of the viewport
                    //       return Math.max( _winHeight, sb._getInnerHeight() );//_contentBottomToTop < _winHeight ? _contentBottomToTop : Math.max( _winHeight, sb._getInnerHeight() );
                    // } else {
                    //       //return _winHeight > _sbHeight ? _winHeight : _sbHeight;
                    //       //if not sticky, then make sure we are not smaller than the viewport's height
                    //       //return Math.max( _winHeight, _sbHeight > _maxColHeight ? _maxColHeight : _sbHeight );
                    //       return Math.max( _winHeight, sb._getInnerHeight() );
                    // }
                    return Math.max( _winHeight, sb._getInnerHeight() );
                    //return Math.max( _winHeight, _sbHeight > _maxColHeight ? _maxColHeight : _sbHeight );


              },

              //@return bool
              _isExpandable : function() {
                    return _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (min-width: 480px) and (max-width: 1200px)' ).matches;
              },

              // We can stickify if :
              // the user option is checked
              // we have a mainWrapper and a mainContent container. //$('.main', '#wrapper') && $('.main', '#wrapper').find('.content')
              // the viewport is wider than 480px
              // @return bool
              _isStickyfiable : function() {
                    return czrapp.userXP._isStickyOptionOn() &&
                    1 == czrapp.$_mainWrapper.length &&
                    1 == czrapp.$_mainContent.length &&
                    _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (min-width: 480px)' ).matches;
              },

              //@return bool
              _isHighestColumn : function() {
                    return czrapp.userXP.maxColumnHeight() == this._getInnerHeight();
              },

              //@return number
              _getInnerHeight : function() {
                    return this.container.find('.sidebar-content').height() + this.container.find('.sidebar-toggle').height();
              },

              //@return number
              _getVisibleHeight : function() {
                    return 'expanded' == this() ? this._getInnerHeight() : this.container.height();
              }
        }//SidebarCTOR
  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);