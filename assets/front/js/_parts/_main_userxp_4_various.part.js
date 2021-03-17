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

        // Removed in march 2020
        // //SMOOTH SCROLL
        // smoothScroll: function() {
        //       if ( HUParams.SmoothScroll && HUParams.SmoothScroll.Enabled )
        //         smoothScroll( HUParams.SmoothScroll.Options );
        // },


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
                                                  $('.search-expand input', '#header').trigger('focus');
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
              $('a#back-to-top').on('click', function() {
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
            $(".comment-tabs li").on('click', function() {
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
              $topbar.on('mouseenter', function() {
                          if ( czrapp.userXP.topNavExpanded() || czrapp.userXP._isMobileScreenSize() )
                            return;
                          _isHoveringInTopBar = true;
                          $topbar.css( {
                                overflow : 'visible',
                                height : 1 == $topbar.find('.nav-wrap').length ? $topbar.find('.nav-wrap').height() : 'auto'
                          });
                    }).on('mouseleave', function() {
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
                    });

                  // added for #956
                  czrapp.$_body.on('touchstart', function() {
                        if ( !$(this).hasClass('is-touch-device') ) {
                              $(this).addClass('is-touch-device');
                        }
                  });

                  // added for #956
                  // czrapp.userXP._isMobileScreenSize() === 'only screen and (max-width: 720px)'
                  var isTouchDeviceWithHorizontalMenu = function() {
                         return !czrapp.userXP._isMobileScreenSize() && czrapp.$_body.hasClass('is-touch-device');
                  };

                  // March 2021
                  // If the menu has children and the children submenu is not opened yet, we don't want to open the link of this menu item
                  // fixes #956
                  $('.nav li').on('click', 'a', function( evt ) {
                        if ( czrapp.userXP._isMobileScreenSize() || !isTouchDeviceWithHorizontalMenu() )
                              return;

                        var $menu_item = $(this).closest('.menu-item');
                        // clean
                        $('.nav li').not($menu_item).removeClass('hu-children-item-opened');

                        $menu_item.children('ul.sub-menu').css( 'opacity', 1 );
                        if ( $menu_item.hasClass('menu-item-has-children') && !$menu_item.hasClass('hu-children-item-opened') ) {
                              evt.preventDefault();
                              $menu_item.addClass('hu-children-item-opened');
                              $menu_item.children('ul.sub-menu').hide().stop().slideDown({
                                    duration : 'fast',
                                    complete : czrapp.userXP.onSlidingCompleteResetCSS
                              });
                        }
                  });

                  //$('.nav ul.sub-menu').hide();
                  $('.nav li').on('mouseenter', function() {
                        if ( czrapp.userXP._isMobileScreenSize() || isTouchDeviceWithHorizontalMenu() )
                              return;
                        $(this).children('ul.sub-menu').hide().stop().slideDown({
                              duration : 'fast',
                              complete : czrapp.userXP.onSlidingCompleteResetCSS
                        })
                        .css( 'opacity', 1 );
                  }).on('mouseleave', function() {
                        if ( czrapp.userXP._isMobileScreenSize() || isTouchDeviceWithHorizontalMenu() )
                              return;
                        $(this).children('ul.sub-menu').stop().css( 'opacity', '' ).slideUp( {
                              duration : 'fast',
                              complete : czrapp.userXP.onSlidingCompleteResetCSS
                        });
                  });
            
              // Allow Tab navigation
              // @fixes https://github.com/presscustomizr/hueman/issues/819
              // Trick => the focusout event is delayed so it occurs after the next focusin
              $('.nav li').on('focusin', 'a', function() {
                    if ( czrapp.userXP._isMobileScreenSize() || isTouchDeviceWithHorizontalMenu() )
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
                        if ( czrapp.userXP._isMobileScreenSize() || isTouchDeviceWithHorizontalMenu() )
                          return;
                        // Clean => collapse any menu in which no item is currently focused
                        if ( $('.nav li').find('.hu-focused').length < 1 ) {
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
        },


        /* Trigger resizes event to make sure header height is properly calculated :
        - when logo image is loaded
        - after a few seconds
        fixes https://github.com/presscustomizr/hueman/issues/839
        /* ------------------------------------ */
        triggerResizeEventsToAjustHeaderHeightOnInit : function() {
              var $logoImg = $('.site-title').find('img');
              // 1 - Always trigger resize
              if ( $logoImg.length > 0 ) {
                    //If the image status is "complete", then trigger the custom event right away, else bind the "load" event
                    //http://stackoverflow.com/questions/1948672/how-to-tell-if-an-image-is-loaded-or-cached-in-jquery
                    if ( $logoImg[0].complete ) {
                          czrapp.$_window.trigger('resize');
                    } else {
                      $logoImg.on('load', function( img ) {
                            czrapp.$_window.trigger('resize');
                      });
                    }
              }

              // Trigger 3 resizes during the 9 first seconds
              var _triggerResize = function( n ) {
                    n = n || 1;
                    if ( n > 3 )
                      return;

                    _.delay( function() {
                          n++;
                          czrapp.$_window.trigger('resize');
                          _triggerResize(n);
                    }, 3000 );
              };
              _triggerResize();
        },
        mayBeLoadFontAwesome : function() {
              jQuery( function() {
                    if ( !HUParams.deferFontAwesome ) {
                        // the class should not have been added if deferFontAwesome not true, but let's make sure it is removed in any case
                        $('body').removeClass('hu-fa-not-loaded');
                        return;
                    }

                    var $candidates = $('[class*=fa-]');
                    if ( $candidates.length < 1 )
                      return;
                    var hasPreloadSupport = function( browser ) {
                        var link = document.createElement('link');
                        var relList = link.relList;
                        if (!relList || !relList.supports)
                          return false;
                        return relList.supports('preload');
                    };

                    // assets/shared/fonts/fa/css/fontawesome-all.min.css?
                    if ( $('head').find( '[href*="font-awesome.min.css"]' ).length < 1 ) {
                        var link = document.createElement('link');

                        link.onload = function() {
                            this.onload=null;
                            // June 2020 => increased delay for https://github.com/presscustomizr/hueman/issues/905
                            // + introduced a CSS class to display empty content in pseudo elements :before and :after used by font awesome while loading the icons
                            _.delay( function() {
                                link.setAttribute('rel', 'stylesheet');
                                $('body').removeClass('hu-fa-not-loaded');
                            }, 500 );
                        };
                        link.setAttribute('href', HUParams.fontAwesomeUrl );
                        link.setAttribute('id', 'hu-font-awesome');
                        link.setAttribute('rel', hasPreloadSupport() ? 'preload' : 'stylesheet' );
                        link.setAttribute('as', 'style');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('media', 'all');
                        document.getElementsByTagName('head')[0].appendChild(link);
                    } else {
                        // this is the case when font-awesome.min.css has been loaded by a third party plugin
                        $('body').removeClass('hu-fa-not-loaded');
                    }

                    // June 2020 for https://github.com/presscustomizr/hueman/issues/907
                    // remove class after 1 second in any case
                    _.delay( function() {
                        $('body').removeClass('hu-fa-not-loaded');
                    }, 1000 );
              });
        },
        // can be fired for for featured posts on home and for gallery post formats
        // March 2020 introduced for https://github.com/presscustomizr/hueman/issues/869
        maybeFireFlexSlider : function() {
              if ( !HUParams.flexSliderNeeded )
                return;
              var _fireWhenFlexReady = function() {
                    // Check if first slider image is loaded, and load flexslider on document ready

                    // FEATURED POSTS ON HOME
                    var $flexForFeaturedPosts = $('#flexslider-featured');
                    if ( $flexForFeaturedPosts.length > 0 ) {
                          var $_firstImage = $flexForFeaturedPosts.find('img').filter(':first'),
                          checkforloaded = setInterval(function() {
                                if ( $_firstImage.length < 1 )
                                  return;
                                var image = $_firstImage.get(0);
                                if ( image.complete || image.readyState == 'complete' || image.readyState == 4 ) {
                                      clearInterval(checkforloaded);
                                      // params documented https://woocommerce.com/flexslider/
                                      $.when( $flexForFeaturedPosts.flexslider({
                                            animation: "slide",
                                            // april 2020 : useCSS was set to false for "Fix iPad flickering issue"
                                            // now set to true otherwise breaks the RTL mode
                                            // fixes : added for https://github.com/presscustomizr/hueman/issues/884
                                            useCSS: true,
                                            //directionNav: true,
                                            controlNav: true,
                                            pauseOnHover: true,
                                            animationSpeed: 400,
                                            smoothHeight: true,
                                            rtl: HUParams.flexSliderOptions.is_rtl,
                                            touch: HUParams.flexSliderOptions.has_touch_support,
                                            slideshow: HUParams.flexSliderOptions.is_slideshow,
                                            slideshowSpeed: HUParams.flexSliderOptions.slideshow_speed
                                      }) ).done( function() {
                                            var $_self = $(this);
                                                _trigger = function( $_self ) {
                                              $_self.trigger('featured-slider-ready');
                                            };
                                            _trigger = _.debounce( _trigger, 100 );
                                            _trigger( $_self );
                                      });
                                }
                          }, 20);
                    }

                    // GALLERY POST FORMAT
                    var $flexForGalleryPostFormat = $('[id*="flexslider-for-gallery-post-format-"]');
                    var $firstImage = $flexForGalleryPostFormat.find('img').filter(':first'),
                        _checkforloaded = setInterval(function() {
                              if ( $firstImage.length < 1 )
                                return;

                              var image = $firstImage.get(0);
                              if ( image.complete || image.readyState == 'complete' || image.readyState == 4 ) {
                                clearInterval(_checkforloaded);
                                $flexForGalleryPostFormat.flexslider({
                                      animation: HUParams.isWPMobile ? 'slide' : 'fade',
                                      rtl: HUParams.flexSliderOptions.is_rtl,
                                      slideshow: true,
                                      directionNav: true,
                                      controlNav: true,
                                      pauseOnHover: true,
                                      slideshowSpeed: 7000,
                                      animationSpeed: 600,
                                      smoothHeight: true,
                                      touch: HUParams.flexSliderOptions.has_touch_support
                                });
                              }
                    }, 20);

              };//_fireWhenFlexReady


              // jquery.flexslider.js is loaded "defer", so let's make sure it's ready before firing it
              // jQuery('body').trigger('hu-flexslider-parsed'); is hardcoded at the bottom of jquery.flexslider.js
              jQuery(function($){
                    if ( 'function' === typeof $.fn.flexslider ) {
                          _fireWhenFlexReady();
                    } else {
                          czrapp.$_window.on('hu-flexslider-parsed', _fireWhenFlexReady );
                    }
              });//jQuery(function($){})
        }

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);