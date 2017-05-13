var czrapp = czrapp || {};

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


        /*  Toggle topnav expand
        /* ------------------------------------ */
        topNavToLife : function() {
              var self = this,
                  _sel = '.topbar-toggle-down',
                  $topbar = $('#nav-topbar.desktop-sticky'),
                  $topbarNavWrap = $topbar.find('.nav-wrap');

              self.topNavExpanded = new czrapp.Value( false );
              if ( 1 != $('#nav-topbar.desktop-sticky').length || 1 != $('#nav-topbar.desktop-sticky').find('.nav-wrap').length )
                return;

              //Shall we reveal the toggle arrow ?
              // If not mobile :
              //=> on init, on resize and each time the menu is expanded remotely by the app
              var _mayBeToggleArrow = function( force ) {
                    $( _sel, $topbar ).css( {
                          display : ( ( $topbarNavWrap.height() > 60 || force ) && ! czrapp.userXP._isMobile() ) ? 'inline-block' : ''
                    } );
              };
              var _updateMaxWidth = function() {
                    $topbar.css( { 'max-width' : czrapp.$_window.width() } );
              };

              //reveal arrow on init, on resize
              //update max width on init, on resize
              _.delay( _mayBeToggleArrow, 100 );
              _updateMaxWidth();
              czrapp.userXP.windowWidth.bind( function() {
                    //always update the max-width on resize
                    _updateMaxWidth();
                    //always update the toglle arraow on resize
                    _mayBeToggleArrow();
                    czrapp.userXP.topNavExpanded( false );
              });

              //listen to app event
              //the callback returns a promise to allow sequential actions
              self.topNavExpanded.bind( function( exp, from, params ) {
                    params = _.extend( { height : 0 }, params || {} );
                    return $.Deferred( function() {
                          var _dfd = this,
                              _expandHeight = Math.max( $topbarNavWrap.height(), params.height );

                          //always reveal the arrow when expanding
                          _mayBeToggleArrow( exp );

                          //always collapse the header search
                          czrapp.userXP.headerSearchExpanded( false ).done( function() {
                                $.when( $( '#header' ).toggleClass( 'topbar-expanded', exp ) ).done( function() {
                                      $( _sel, $topbar ).find('i[data-toggle="' + ( exp ? 'down' : 'up' ) + '"]').css( { opacity : 0 });

                                      $topbar.css({
                                            height : exp ? _expandHeight + 'px' : '50px',
                                            overflow : exp ? 'visible' : ''
                                      });
                                      _.delay( function() {
                                            $( _sel, $topbar ).find('i[data-toggle="' + ( exp ? 'down' : 'up' ) + '"]').css( { display :'none' });
                                            $( _sel, $topbar ).find('i[data-toggle="' + ( exp ? 'up' : 'down' ) + '"]').css({ display :'inline-block' , opacity : exp ? 1 : '' });
                                            _dfd.resolve();
                                            if ( ! exp ) {
                                                  _mayBeToggleArrow();
                                                  czrapp.trigger('topbar-collapsed');//<= will be listened to by the sticky menu to maybe adjust the top padding
                                            }
                                      }, 250 );//transition: height 0.35s ease-in-out;
                                });
                          });
                    }).promise();
              }, { deferred : true } );

              //listen to user actions
              czrapp.setupDOMListeners(
                    [
                          {
                                trigger   : 'click keydown',
                                selector  : _sel,
                                actions   : function() {
                                      czrapp.userXP.topNavExpanded( ! czrapp.userXP.topNavExpanded() );
                                }
                          },
                    ],//actions to execute
                    { dom_el: $('#header') },//dom scope
                    czrapp.userXP //instance where to look for the cb methods
              );

              //collapse on menu animation
              if ( czrapp.userXP.stickyHeaderAnimating ) {
                    czrapp.userXP.stickyHeaderAnimating.bind( function( animating ) {
                          czrapp.userXP.topNavExpanded( false );
                    });
              }
        },



        /*  Toggle header search
        /* ------------------------------------ */
        //@return void()
        headerSearchToLife : function() {
              var self = this,
                  _sel = '.toggle-search',
                  $topbar = $('#nav-topbar.desktop-sticky');

              self.headerSearchExpanded = new czrapp.Value( false );
              //listen to app event
              //the callback returns a promise to allow sequential actions, typically when collapsing the nav menu
              self.headerSearchExpanded.bind( function( exp ) {
                    return $.Deferred( function() {
                          var _dfd = this;
                          $.when( $( _sel, '#header' ).toggleClass( 'active', exp ) ).done( function() {
                                if ( exp ) {
                                      $topbar.css( {
                                            overflow : ! exp ? '' : 'visible',
                                            height : czrapp.userXP.topNavExpanded() ? ( 1 == $topbar.find('.nav-wrap').length ? $topbar.find('.nav-wrap').height() : 'auto' ) : ''
                                      });
                                }
                                $('.search-expand', '#header').stop()[ ! exp ? 'slideUp' : 'slideDown' ]( {
                                      duration : 250,
                                      complete : function() {
                                            if ( exp ) {
                                                  $('.search-expand input', '#header').focus();
                                            } else {
                                                  $topbar.css( { overflow : '' } );
                                                  if ( ! czrapp.userXP.topNavExpanded() ) {
                                                       $topbar.css( { height : '' });
                                                  }
                                            }
                                            _dfd.resolve();
                                      }
                                } );
                          });
                    }).promise();
              }, { deferred : true } );

              //listen to user actions
              czrapp.setupDOMListeners(
                    [
                          {
                                trigger   : 'click keydown',
                                selector  : _sel,
                                actions   : function() {
                                      czrapp.userXP.headerSearchExpanded( ! czrapp.userXP.headerSearchExpanded() );
                                }
                          },
                    ],//actions to execute
                    { dom_el: $('#header') },//dom scope
                    czrapp.userXP //instance where to look for the cb methods
              );

              //collapse on resize
              czrapp.userXP.windowWidth.bind( function() {
                    self.headerSearchExpanded( false );
              });

              //collapse on menu animation
              if ( czrapp.userXP.stickyHeaderAnimating ) {
                    czrapp.userXP.stickyHeaderAnimating.bind( function( animating ) {
                          self.headerSearchExpanded( false );
                    });
              }
        },//toggleHeaderSearch


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
              var self = this,
                  $topbar = $('#nav-topbar.desktop-sticky'),
                  _isHoveringInTopBar = false;

              //We the topnav is collapsed, some menu items may be hidden because of the fixed height and overflow hidden
              //let's expand the topnav if not already manually expanded by the user.
              //As long as we are hovering, it won't collapse.
              //After 1 second without hovering in, it will collapse
              $('#nav-topbar.desktop-sticky').hover(
                    function() {
                          if ( czrapp.userXP.topNavExpanded() || czrapp.userXP._isMobile() )
                            return;
                          _isHoveringInTopBar = true;
                          $topbar.css( {
                                overflow : 'visible',
                                height : 1 == $topbar.find('.nav-wrap').length ? $topbar.find('.nav-wrap').height() : 'auto'
                          });
                    },
                    function() {
                          if ( czrapp.userXP.topNavExpanded() || czrapp.userXP._isMobile() )
                            return;
                          _isHoveringInTopBar = false;
                          _.delay( function() {
                                if ( _isHoveringInTopBar )
                                  return;
                                if ( ! czrapp.userXP.topNavExpanded() && ! czrapp.userXP.headerSearchExpanded() ) {
                                      $topbar.css( { overflow : '', height : '' } );
                                      //after height animation, we might be on top here, so let's trigger this event, listened to by the sticky menu to ajust padding top
                                      _.delay( function() {
                                            czrapp.trigger('topbar-collapsed');
                                      }, 400 );
                                }
                          }, 1000 );
                    }
              );
              $('.nav ul.sub-menu').hide();
              $('.nav li').hover(
                    function() {
                          if ( czrapp.userXP._isMobile() )
                            return;
                          $(this).children('ul.sub-menu').stop().slideDown('fast').css( 'opacity', 1 );
                    },
                    function() {
                          if ( czrapp.userXP._isMobile() )
                            return;
                          $(this).children('ul.sub-menu').stop().css( 'opacity', '' ).slideUp( {
                                duration : 'fast',
                                complete : function() {
                                      $(this).hide();
                                }
                          });
                    }
              );
        }

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);