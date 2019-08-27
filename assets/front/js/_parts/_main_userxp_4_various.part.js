var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        fittext : function() {
            //if the 'fittext' option is not checked, we don't have a fitTextMap
            if ( ! _.isObject( HUParams.fitTextMap ) )
              return;

            var _userBodyFontSize = _.isNumber( HUParams.userFontSize ) && HUParams.userFontSize * 1 > 0 ? HUParams.userFontSize : 16,
                _fitTextMap = HUParams.fitTextMap,
                _fitTextCompression = HUParams.fitTextCompression;

            if (_.size( _fitTextMap ) < 1 ) {
                czrapp.errorLog( 'Unable to apply fittext params, wrong HUParams.fitTextMap.');
                return;
            }

            //Fittextmap looks like:
            // 'fitTextMap'      => array(
            //     'single_post_title' => array(
            //         'selectors' => '.single .post-title',
            //         'minEm'     => 1.375,
            //         'maxEm'     => 2.62
            //     ),
            //     'page_title' => array(
            //         'selectors' => '.page-title h1',
            //         'minEm'     => 1,
            //         'maxEm'     => 1.3
            //     ),
            //     'entry' => array(
            //          'selectors' => '.entry',
            //          'minEm'     => 0.9375,
            //          'maxEm'     => 1.125,
            //          'compression' => 2.5 <= a specific compression rate can be set individually
            // ),
            // )
            _.each( _fitTextMap, function( data, key ) {
                  //Are we well formed ?
                  if ( ! _.isObject( data ) )
                    return;
                  data = _.extend( {
                        selectors : '',
                        minEm : 1,
                        maxEm : 1
                  }, data );
                  //Do we have node(s) for the selector(s)
                  if ( 1 > $( data.selectors ).length )
                    return;
                  var _compressionRatio = ( data.compression && _.isNumber( data.compression ) ) ? data.compression : _.isNumber( _fitTextCompression ) ? _fitTextCompression : 1.5;
                  $( data.selectors ).fitText( _compressionRatio, {
                      minFontSize : ( Math.round( data.minEm * _userBodyFontSize * 100) / 100 ) + 'px',
                      maxFontSize : ( Math.round( data.maxEm * _userBodyFontSize * 100) / 100 ) + 'px'
                  } ).addClass( 'fittexted_for_' + key );
            });

            //$('.entry').fitText( 3, { minFontSize: '10px', maxFontSize: '40px' });
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
                          display : ( ( $topbarNavWrap.height() > 60 || force ) && ! czrapp.userXP._isMobileScreenSize() ) ? 'inline-block' : ''
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
                                trigger   : 'mousedown keydown',
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

              // Allow tab navigation, see https://github.com/presscustomizr/hueman/issues/819
              $( _sel, '#header' ).on('focusin', function( evt ) {
                    self.headerSearchExpanded( true );
              });
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

              //When the topnav is collapsed, some menu items may be hidden because of the fixed height and overflow hidden
              //let's expand the topnav if not already manually expanded by the user.
              //As long as we are hovering, it won't collapse.
              //After 1 second without hovering in, it will collapse
              $('#nav-topbar.desktop-sticky').hover(
                    function() {
                          if ( czrapp.userXP.topNavExpanded() || czrapp.userXP._isMobileScreenSize() )
                            return;
                          _isHoveringInTopBar = true;
                          $topbar.css( {
                                overflow : 'visible',
                                height : 1 == $topbar.find('.nav-wrap').length ? $topbar.find('.nav-wrap').height() : 'auto'
                          });
                    },
                    function() {
                          if ( czrapp.userXP.topNavExpanded() || czrapp.userXP._isMobileScreenSize() )
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
              //$('.nav ul.sub-menu').hide();
              $('.nav li').hover(
                    function() {
                          if ( czrapp.userXP._isMobileScreenSize() )
                            return;
                          $(this).children('ul.sub-menu').hide().stop().slideDown({
                                  duration : 'fast',
                                  complete : czrapp.userXP.onSlidingCompleteResetCSS
                          })
                          .css( 'opacity', 1 );
                    },
                    function() {
                          if ( czrapp.userXP._isMobileScreenSize() )
                            return;
                          $(this).children('ul.sub-menu').stop().css( 'opacity', '' ).slideUp( {
                                  duration : 'fast',
                                  complete : czrapp.userXP.onSlidingCompleteResetCSS
                          });
                    }
              );

              // Allow Tab navigation
              // @fixes https://github.com/presscustomizr/hueman/issues/819
              // Trick => the focusout event is delayed so it occurs after the next focusin
              $('.nav li').on('focusin', 'a', function() {

                    if ( czrapp.userXP._isMobileScreenSize() )
                      return;

                    $(this).addClass('hu-focused');
                    $(this).closest('.nav li').children('ul.sub-menu').hide().stop().slideDown({
                            duration : 'fast'
                    })
                    .css( 'opacity', 1 );

              });
              $('.nav li').on('focusout', 'a', function() {
                    var $el = $(this);
                    _.delay( function() {
                        $el.removeClass('hu-focused');
                        if ( czrapp.userXP._isMobileScreenSize() )
                          return;

                        // Clean => collapse any menu in which no item is currently focused
                        if ( $('.nav li').find('.hu-focused').length > 0 ) {
                              $('.nav li').each( function() {
                                    $(this).children('ul.sub-menu').stop().css( 'opacity', '' ).slideUp( {
                                            duration : 'fast'
                                    });
                              });
                        }

                        // if a child is currently focused, don't close
                        if( $el.closest('.nav li').children('ul.sub-menu').find('.hu-focused').length < 1 ) {
                              $el.closest('.nav li').children('ul.sub-menu').stop().css( 'opacity', '' ).slideUp( {
                                      duration : 'fast'
                              });
                        }
                    }, 250 );
              });
        },




        /*  Gutenberg fine alignfull cover image width fine tuning
        /* ------------------------------------ */
        gutenbergAlignfull : function() {
              // check if there's at least an alignfull in a full-width layout with no sidebars
              // the cover image block has been renamed cover. @see https://github.com/WordPress/gutenberg/pull/10659
              // but posts created with the former cover-image block will still use the wp-block-cover-image class
              var _isPage                        = czrapp.$_body.hasClass( 'page' ),
                  _isSingle                      = czrapp.$_body.hasClass( 'single' ),
                  _coverImageSelector            = '.full-width.col-1c .alignfull[class*=wp-block-cover]',
                  _alignFullSelector             = '.full-width.col-1c .alignfull[class*=wp-block-]',
                  _alignTableSelector            = [
                                        '.boxed .themeform .wp-block-table.alignfull',
                                        '.boxed .themeform .wp-block-table.alignwide',
                                        '.full-width.col-1c .themeform .wp-block-table.alignwide'
                                      ],
                  _coverWParallaxImageSelector   = _coverImageSelector + '.has-parallax',
                  _classParallaxTreatmentApplied = 'hu-alignfull-p',
                  _styleId                       = 'hu-gutenberg-alignfull',
                  $_refWidthElement              = czrapp.$_body,
                  $_refContainedWidthElement     = $( 'section.content', $_refWidthElement );

              //allowed only in singular
              if ( ! ( _isPage || _isSingle ) ) {
                    return;
              }

              if ( _isSingle ) {
                    _coverImageSelector = '.single' + _coverImageSelector;
                    _alignFullSelector  = '.single' + _alignFullSelector;
                    _alignTableSelector = '.single' + _alignTableSelector.join(',.single');
              } else {
                    _coverImageSelector = '.page' + _coverImageSelector;
                    _alignFullSelector  = '.page' + _alignFullSelector;
                    _alignTableSelector = '.page' + _alignTableSelector.join(',.page');
              }

              if ( $( _alignFullSelector ).length > 0 ) {
                    _add_alignelement_style( $_refWidthElement, _alignFullSelector, 'hu-gb-alignfull' );
                    if ( $(_coverWParallaxImageSelector).length > 0 ) {
                          _add_parallax_treatment_style();
                    }
                    czrapp.userXP.windowWidth.bind( function() {
                          _add_alignelement_style( $_refWidthElement, _alignFullSelector, 'hu-gb-alignfull' );
                          _add_parallax_treatment_style();
                    });
              }
              if ( $( _alignTableSelector ).length > 0 ) {
                    _add_alignelement_style( $_refContainedWidthElement, _alignTableSelector, 'hu-gb-aligntable' );
                    czrapp.userXP.windowWidth.bind( function() {
                          _add_alignelement_style( $_refContainedWidthElement, _alignTableSelector, 'hu-gb-aligntable' );
                    });
              }
              function _add_parallax_treatment_style() {
                    $( _coverWParallaxImageSelector ).each(function() {
                          $(this)
                                .css( 'left', '' )
                                .css( 'left', -1 * $(this).offset().left )
                                .addClass(_classParallaxTreatmentApplied);
                    });
              }
              function _add_alignelement_style( $_refElement, _selector, _styleId ) {
                    var newElementWidth = $_refElement[0].getBoundingClientRect().width,
                        $_style         = $( 'head #' + _styleId );

                    if ( 1 > $_style.length ) {
                          $_style = $('<style />', { 'id' : _styleId });
                          $( 'head' ).append( $_style );
                          $_style = $( 'head #' + _styleId );
                    }
                    $_style.html( _selector + '{width:'+ newElementWidth +'px}' );
              }
        }

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);