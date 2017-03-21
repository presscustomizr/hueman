var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        init : function() {
              this.timer = 0;
              this.increment = 1;//used to wait a little bit after the first user scroll actions to trigger the timer
        },//init



        /*  Mobile menu
        /* ------------------------------------ */
        //HELPERS
        //@return void()
        //Is fired on first load and on resize
        _setStickySelector : function() {
              var self = this,
                  stickyCandidatesMap = {
                    'only screen and (max-width: 719px)' : 'mobile-sticky',
                    'only screen and (min-width: 720px)' : 'desktop-sticky'
                  };

              self.currentStickySelector = '';
              _.each( stickyCandidatesMap, function( _selector, _layout ) {
                    if ( _.isFunction( window.matchMedia ) && matchMedia( _layout ).matches ) {
                          self.currentStickySelector = [ '.nav-container', _selector ].join('.');
                    }
              });
              //cache the menu wrapper now
              self.menuWrapper = czrapp.$_header.find( self.currentStickySelector );
        },

        _hasStickyCandidate : function() {
              var self = this;
              return 1 == $( self.currentStickySelector ).length;
        },

        _isMobile : function() {
              return ( _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (max-width: 720px)' ).matches ) || ( this._isCustomizing() && 'desktop' != this.previewDevice );
        },

        _isCustomizing : function() {
              return 'undefined' !== typeof wp && 'undefined' !== typeof wp.customize;
        },

        //This is specific to Hueman
        _adjustDesktopTopNavPaddingTop : function() {
              var self = this;
              if ( self._isMobile() )
                  return;
              if ( self._hasStickyCandidate() ) {
                    $('.full-width.topbar-enabled #header').css( 'padding-top', czrapp.$_header.find( self.currentStickySelector ).outerHeight() );
              }
        },

        //MAIN
        stickify : function() {
              var self = this;
              self.scrollPosition = czrapp.$_window.scrollTop();
              self.scrollDirection = 'down';
              self.stickyHeaderThreshold = 50;
              self.currentStickySelector = '';//<= will be set on init and on resize

              //RESET MOBILE HEADER TOP POSITION
              //@return void()
              //Make sure the header is visible when close to the top
              //Fired on each 'scrolling-finished' <=> user has not scrolled during 250 ms
              var _mayBeresetTopPosition = function() {
                    var  $menu_wrapper = self.menuWrapper;
                    //Bail if no menu wrapper
                    //Or if we are already after the threshold
                    //Or if we are scrolling down
                    if ( ! $menu_wrapper.length )
                      return;

                    if ( self.scrollPosition >= self.stickyHeaderThreshold )
                      return;

                    if ( ! self._isMobile() ) {
                        self._adjustDesktopTopNavPaddingTop();
                    }

                    //Always add this class => make sure the transition is smooth
                    czrapp.$_header.addClass( 'fixed-header-on' );
                    $menu_wrapper.addClass('fast');
                    self._animate( { direction : 'down', force : true, fast : true } ).done( function() {
                          self.stickyHeaderAnimating = true;
                          ( function() {
                                return $.Deferred( function() {
                                    var dfd = this;
                                    _.delay( function() {
                                          if ( 'up' == self.scrollDirection && self.scrollPosition < 10) {
                                                $menu_wrapper.css({
                                                      '-webkit-transform': '',   /* Safari and Chrome */
                                                      '-moz-transform': '',       /* Firefox */
                                                      '-ms-transform': '',        /* IE 9 */
                                                      '-o-transform': '',         /* Opera */
                                                      transform: ''
                                                });
                                          }
                                          self.stickyMenuDown = true;
                                          self.stickyHeaderAnimating = false;
                                          dfd.resolve();
                                    }, 10 );
                                }).promise();
                          } )().done( function() {
                                $menu_wrapper.removeClass('fast');
                                // if ( 'up' == self.scrollDirection && self.scrollPosition < 10) {
                                //       $menu_wrapper.css({
                                //             '-webkit-transform': '',   /* Safari and Chrome */
                                //             '-moz-transform': '',       /* Firefox */
                                //             '-ms-transform': '',        /* IE 9 */
                                //             '-o-transform': '',         /* Opera */
                                //             transform: ''
                                //       });
                                // }
                                if ( self._isMobile() ) {
                                      czrapp.$_header.removeClass( 'fixed-header-on' );
                                }
                          });
                    });
              };

              //czrapp.bind( 'page-scrolled-top', _mayBeresetTopPosition );
              czrapp.bind( 'scrolling-finished', _mayBeresetTopPosition );

              /*-----------------------------------------------------
              * INITIAL ACTIONS
              ------------------------------------------------------*/
              //Listen to the customizer previewed device
              self.previewDevice = false;
              if ( self._isCustomizing() ) {
                    var _setPreviewedDevice = function() {
                          wp.customize.preview.bind( 'previewed-device', function( device ) {
                                self.previewDevice = device;
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

              //Set initial sticky selector
              self._setStickySelector();

              //set fixed-header-on is is desktop because menu is already set to fixed position, we want to have the animation from the start
              // + Adjust padding top if desktop sticky
              if ( ! self._isMobile() ) {
                    czrapp.$_header.addClass( 'fixed-header-on' );
                    self._adjustDesktopTopNavPaddingTop();
              }

              //Always set the header height on dom ready
              //=> will prevent any wrong value being assigned if menu is expanded before scrolling
              if ( self._hasStickyCandidate() ) {
                    czrapp.$_header.css( { 'height' : czrapp.$_header.height() });
              }

              /*-----------------------------------------------------
              * RESIZE EVENT
              ------------------------------------------------------*/

              czrapp.$_window.resize( function( ev ) {
                    //Always bail if is scrolling => resize events can be triggered on when scrolling on mobile devices, whitout actually resizing the screen
                    if ( self.isCrolling )
                      return;

                    self._setStickySelector();
                    //re-cache menu wrapper
                    self.menuWrapper = czrapp.$_header.find( self.currentStickySelector );
                    czrapp.$_header.removeClass( 'fixed-header-on' );
                    czrapp.$_header.css( 'height' , '' );
                    if ( self._hasStickyCandidate() ) {
                          czrapp.$_header.css( 'height' , czrapp.$_header.height() );
                    } else {
                          self.stickyMenuDown = false;
                    }

                    //Adjust padding top if desktop sticky
                    if ( ! self._isMobile() ) {
                          self._adjustDesktopTopNavPaddingTop();
                    } else {
                          $('.full-width.topbar-enabled #header').css( 'padding-top', '' );
                    }

                    //if the menu is expanded let's collapse it
                    //is the menu expanded ?
                    var $navWrap = self.menuWrapper.find('.nav-wrap');
                    if ( 1 == $navWrap.length && $navWrap.hasClass( 'expanded' ) ) {
                          self._toggleMobileMenu( {
                                navWrap : $navWrap,//$ element
                                expand : false
                          });
                    }

              } );//resize();

              /*-----------------------------------------------------
              * SCROLL EVENT
              ------------------------------------------------------*/
              czrapp.$_window.scroll( function() {
                    self.previousScrollPosition = self.scrollPosition || czrapp.$_window.scrollTop();
                    self.scrollPosition = czrapp.$_window.scrollTop();

                    //handle scrolling classes
                    czrapp.$_body.toggleClass( 'is-scrolled', self.scrollPosition > 100 );
                    if ( self.scrollPosition <= 50 ) {
                        czrapp.trigger( 'page-scrolled-top', {} );
                    }

                    var _maybeStickify = function() {
                          //Fire if we have a candidate with a menu wrapper inside it
                          if ( self._hasStickyCandidate() && 1 == self.menuWrapper.length ) {

                                //If the page is freshly loaded, let's wait a few milliseconds
                                if ( _.isUndefined( self.stickyMenuDown ) ) {
                                      czrapp.$_header.css( 'height' , czrapp.$_header.height() );
                                      _.delay( function() {
                                            self._stickifyHeader();
                                      }, 200 );
                                } else {
                                      self._stickifyHeader();
                                }
                                //self._stickifyHeader();
                          }
                    };

                    czrapp.$_body.addClass('is-scrolling');
                    self.isCrolling = true;
                    clearTimeout( $.data( this, 'scrollTimer') );
                    $.data( this, 'scrollTimer', setTimeout(function() {
                          czrapp.$_body.removeClass('is-scrolling');
                          self.isCrolling = false;
                          self.previousScrollPosition = self.scrollPosition || czrapp.$_window.scrollTop();
                          self.scrollPosition = czrapp.$_window.scrollTop();
                          czrapp.trigger( 'scrolling-finished' );
                    }, 250));


                    if ( _.isUndefined( self.stickyTimer ) || 'resolved' == self.stickyTimer.state() ) {
                          self.stickyTimer = $.Deferred();
                          ( function() {
                                return $.Deferred( function() {
                                      var dfd = this;
                                      _.delay( function() {
                                            dfd.resolve();
                                      }, 50 );
                                }).promise();
                          })().done( function() {
                                self.scrollDirection = self.scrollPosition >= self.previousScrollPosition ? 'down' : 'up';
                                if ( 'up' == self.scrollDirection && ( Math.abs( self.scrollPosition - self.previousScrollPosition ) > 1 ) )
                                  _maybeStickify();
                                else if ( 'down' == self.scrollDirection && ( Math.abs( self.scrollPosition - self.previousScrollPosition ) > 1 ) )
                                  _maybeStickify();

                                self.stickyTimer.resolve();
                          });
                    }

                    self.scrollDirection = self.scrollPosition >= self.previousScrollPosition ? 'down' : 'up';
              });
        },//stickify



        //Privates
        //Fired on each scroll event
        _stickifyHeader : function() {
              var self = this, $menu_wrapper;
              self.stickyMenuDown = _.isUndefined( self.stickyMenuDown ) ? false : self.stickyMenuDown;
              self.stickyHeaderAnimating = _.isUndefined( self.stickyHeaderAnimating ) ? false : self.stickyHeaderAnimating;

              $menu_wrapper = self.menuWrapper;

              if ( ! $menu_wrapper.length || self.stickyHeaderAnimating ) {
                    //czrapp.consoleLog( '_stickifyHeader : no menu wrapper to animate.' );
                    return;
              }

              switch ( self.scrollDirection ) {
                    case 'up' :
                          if ( this.scrollPosition > self.stickyHeaderThreshold && ! czrapp.$_header.hasClass( 'fixed-header-on' ) ) {
                              czrapp.$_header.addClass( 'fixed-header-on' );
                          }

                          if ( ! self.stickyMenuDown ) {
                                self._animate( { direction : 'down', menu_wrapper : $menu_wrapper } ).done( function() {
                                      self.stickyMenuDown = true;
                                });
                          } else {
                                //if the menu is expanded let's collapse it
                                //is the menu expanded ?
                                var $navWrap = $menu_wrapper.find('.nav-wrap');
                                if ( 1 == $navWrap.length && $navWrap.hasClass( 'expanded' ) ) {
                                      self._toggleMobileMenu( {
                                            navWrap : $navWrap,//$ element
                                            expand : false
                                      });
                                }
                          }
                    break;
                    case 'down' :
                          if ( self.stickyMenuDown && this.scrollPosition > self.stickyHeaderThreshold ) {
                                self._animate( { direction : 'up', menu_wrapper : $menu_wrapper } ).done( function() {
                                      //first scroll down
                                      //$_header.removeClass( 'fixed-header-on' );
                                      self.stickyMenuDown = false;
                                });
                          } else if ( this.scrollPosition > self.stickyHeaderThreshold && ( ! self._isMobile() || ! czrapp.$_header.hasClass( 'fixed-header-on' ) ) ) {
                                self._animate( { direction : 'up', menu_wrapper : $menu_wrapper } ).done( function() {
                                      //first scroll down
                                      //$_header.removeClass( 'fixed-header-on' );
                                      self.stickyMenuDown = false;
                                      czrapp.$_header.addClass( 'fixed-header-on' );
                                });
                          }
                    break;
              }
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
                  $menu_wrapper = ! args.menu_wrapper.length ? czrapp.$_header.find( self.currentStickySelector ) : args.menu_wrapper;

              //Bail here if we are still animating or if we don't have a menu element
              if ( ! $menu_wrapper.length )
                return;

              if ( ! args.force && self.stickyHeaderAnimating ) {
                    return dfd.resolve().promise();
              }

              var _do = function() {
                    var translateYUp = $menu_wrapper.outerHeight(),
                        translateYDown = 0,
                        _translate;

                    //Handle the specific case of user logged in ( wpadmin bar length not false ) and previewing website with a mobile device < 600 px
                    //=> @media screen and (max-width: 600px)
                    // admin-bar.css?ver=4.7.3:1097
                    // #wpadminbar {
                    //     position: absolute;
                    // }
                    if ( _.isFunction( window.matchMedia ) && matchMedia( 'screen and (max-width: 600px)' ).matches && 1 == czrapp.$_wpadminbar.length ) {
                          translateYUp = translateYUp + czrapp.$_wpadminbar.outerHeight();
                          translateYDown = translateYDown + czrapp.$_wpadminbar.outerHeight();
                    }
                    _translate = 'up' == args.direction ? 'translate(0px, -' + translateYUp + 'px)' : 'translate(0px, -' + translateYDown + 'px)';
                    self.stickyHeaderAnimating = self.scrollDirection;
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
                          self.stickyHeaderAnimating = false;
                          dfd.resolve();
                    }, args.fast ? 100 : 350 );
              };//_do

              _.delay( function() {
                    //is the menu expanded ?
                    var $navWrap = $menu_wrapper.find('.nav-wrap');
                    if ( 1 == $navWrap.length && $navWrap.hasClass('expanded') ) {
                          self._toggleMobileMenu( {
                                navWrap : $navWrap,//$ element
                                expand : false
                          }).done( function() {
                                _do();
                          });
                    } else {
                          _do();
                    }

              }, 50 );
              return dfd.promise();
        },












        /*  Mobile menu smooth toggle height
        /* ------------------------------------ */
        mobileMenu : function() {
              var self = this;
              $('.nav-toggle, .ham__navbar-toggler, .ham__navbar-toggler-two', '.nav-container' )
                    .on( 'click keydown', function( ev ) {
                          ev.preventDefault();
                          var $button = $(this),
                              $navWrap = $(this).siblings('.nav-wrap'),
                              isExpanded;
                          if ( ! $navWrap.length || ! $navWrap.find('.nav').length ) {
                                czrapp.errorLog( 'Error when toggling the mobile menu' );
                          } else {
                                isExpanded = $navWrap.hasClass( 'expanded' );
                                self._toggleMobileMenu( {
                                      button : $button,// $ element
                                      navWrap : $navWrap,//$ element
                                      expand : ! isExpanded
                                });
                          }
                    })
                    .hover( function() {
                          $(this).addClass('hovering');
                    }, function() {
                          $(this).removeClass('hovering');
                    })
                    .focus( function() {
                          $(this).addClass('focusing');
                    }, function() {
                          $(this).removeClass('focusing');
                    });
        },



        //args {
        //  $button : $element
        //  $navWrap : $element
        //  expand : bool
        //}
        _toggleMobileMenu : function( args )  {
              args = _.extend(
                    {
                          button : {},// $ element
                          navWrap : {},//$ element
                          expand : true
                    },
                    args || {}
              );

              var $navWrap = args.navWrap,
                  $button = args.button,
                  expand = args.expand,
                  self = this,
                  dfd = $.Deferred();

              if ( ! $navWrap.length || ! $navWrap.find('.nav').length  ) {
                    czrapp.errorLog( 'Error when toggling the mobile menu : no nav wrap element' );
                    return dfd.resolve().promise();
              }

              $button = ! $button.length ? $navWrap.siblings('.nav-toggle, .ham__navbar-toggler, .ham__navbar-toggler-two') : $button;

              if ( 1 !== $button.length ) {
                    czrapp.errorLog( 'Error when toggling the mobile menu : no button element' );
                    return dfd.resolve().promise();
              }

              //Set the button dom state
              $button
                  .toggleClass( 'collapsed', ! expand )
                  .toggleClass( 'active', expand )
                  .attr('aria-expanded', expand );



              $.when( $navWrap.toggleClass( 'expanded', expand ) ).done( function() {
                    $(this).find('.nav').stop()[ ! expand ? 'slideUp' : 'slideDown' ]( {
                          duration : 350,
                          complete : function() {
                                //makes it scrollable if not footer
                                if ( 1 == $button.parent( '#nav-footer').length )
                                  return;
                                var _winHeight = 'undefined' === typeof window.innerHeight ? window.innerHeight : czrapp.$_window.height(),
                                    _visibleHeight = _winHeight - $navWrap.offset().top + czrapp.$_window.scrollTop();
                                $navWrap.css( {
                                      'max-height' : expand ? _visibleHeight : '',
                                      'overflow' : 'auto'
                                });
                                //Make sure we reset the height of the header
                                // if ( ! expand ) {
                                //     czrapp.$_header.css( 'height' , '' );
                                //     if ( self._hasStickyCandidate() ) {
                                //           czrapp.$_header.css( 'height' , czrapp.$_header.height() );
                                //     }
                                // }
                                dfd.resolve();
                          }
                    } );
              });
              return dfd.promise();
        },



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


        /*  Sidebar collapse
        /* ------------------------------------ */
        sidebarCollapse : function() {
              $('body').addClass('s1-collapse');
              $('body').addClass('s2-collapse');

              $('.s1 .sidebar-toggle').click( function(){
                    $('body').toggleClass('s1-collapse').toggleClass('s1-expand');
                    if ($('body').is('.s2-expand')) {
                          $('body').toggleClass('s2-expand').toggleClass('s2-collapse');
                    }
              });
              $('.s2 .sidebar-toggle').click( function(){
                    $('body').toggleClass('s2-collapse').toggleClass('s2-expand');
                    if ($('body').is('.s1-expand')) {
                          $('body').toggleClass('s1-expand').toggleClass('s1-collapse');
                    }
              });
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
      }

  };//_methods{}

  czrapp.methods.Czr_UserExperience = {};
  $.extend( czrapp.methods.Czr_UserExperience , _methods );

})(jQuery, czrapp);
