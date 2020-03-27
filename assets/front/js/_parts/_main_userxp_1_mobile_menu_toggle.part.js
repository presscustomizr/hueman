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
              //data-menu-id should be unique. Are not synchronized with the actual menu css # id attribute
              $('.nav-container').each( function( _index ) {
                    if ( ! _.isString( $(this).attr( 'data-menu-id' ) ) )
                      return;

                    var $container      = $(this),
                        is_scrollable   = _.isString( $(this).attr( 'data-menu-scrollable' ) ) && "false" == $(this).attr( 'data-menu-scrollable' ) ? false : true,
                        _candidateId    = $container.attr( 'data-menu-id' ),
                        ctor;

                    if ( self.mobileMenu.has( _candidateId ) )
                      return;

                    var $navWrap = $container.find( '.nav-wrap' );
                    // if ( 1 != $navWrap.length ) {
                    //       czrapp.errorLog( 'Mobile menu : missing .nav-wrap for menu-id : ' + _candidateId );
                    // }
                    var button_selectors = '.nav-toggle, .ham__navbar-toggler, .ham__navbar-toggler-two',
                        $button = $container.find( button_selectors );
                    // if ( 1 != $button.length ) {
                    //       czrapp.errorLog( 'Mobile menu : missing container for menu-id : ' + _candidateId );
                    // }
                    //A mobile menu candidate should have a wrapper and a button selector
                    if ( 1 == $navWrap.length && 1 == $button.length ) {
                          ctor = czrapp.Value.extend( self.MobileCTOR );
                          //do instantiate
                          self.mobileMenu.add( _candidateId, new ctor( _candidateId, {
                                container : $container,
                                menu_wrapper : $navWrap,
                                button : $button,
                                button_selectors : button_selectors,
                                is_scrollable : is_scrollable
                          }));
                    }
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
                    mobMenu( 'collapsed' ).button
                        .toggleClass( 'collapsed', true )
                        .toggleClass( 'active', false )
                        .attr('aria-expanded', false );

                    //react on state change
                    //@return a deferred
                    //=> in a scenario of menu expanded and scroll down, allow us to nicely run the sequence of animation:
                    //1) menu collapse
                    //2) animate up
                    mobMenu.bind( function( state ) {
                          return $.Deferred( function() {
                                var dfd = this;
                                //Always close the search bar before doing anything else
                                czrapp.userXP.headerSearchExpanded( false ).done( function() {
                                      mobMenu._toggleMobileMenu()
                                            .done( function( state ){
                                                  //remove classes that modify the appearance of the button
                                                  //=> needed for mobile devices because the focus is not automatically removed
                                                  mobMenu.button.toggleClass( 'hovering', 'expanded' == state ).toggleClass( 'focusing', 'expanded' == state );
                                                  dfd.resolve();
                                            });
                                });
                          }).promise();
                    }, { deferred : true } );


                    //Listen to user actions
                    czrapp.setupDOMListeners(
                          [
                                {
                                      trigger   : 'mousedown focusin keydown',
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

                    //maybe init mobile submenu expand on click, on mobile button first click
                    if ( czrapp.localized.mobileSubmenuExpandOnClick ) {
                          //add specific class to this mobile menu which tells its submenus have to be expanded on click (purpose: style)
                          mobMenu.menu_wrapper.addClass( 'submenu-click-expand' );
                          czrapp.setupDOMListeners(
                                [
                                      {
                                            trigger   : 'mousedown focusin keydown',
                                            selector  : mobMenu.button_selectors,
                                            actions   : function() {
                                                  var mobMenu = this;
                                                  mobMenu._collapsibleSubmenu();
                                            },
                                            once      : true
                                      }
                                ],//actions to execute
                                { dom_el: mobMenu.container },//dom scope
                                mobMenu //instance where to look for the cb methods
                          );
                    }
                    //listen to czrapp events
                    //Collapse on resize
                    czrapp.userXP.isResizing.bind( function( is_resizing ) {
                          if ( ! is_resizing )
                            return;
                          mobMenu( 'collapsed' );
                    });

                    //when clicking on a menu item, always collapse the menu
                    //@fixes https://github.com/presscustomizr/hueman/issues/830
                    $(  mobMenu.container )
                          .on( 'mouseup', '.menu-item a', function(evt) {
                                if ( ! czrapp.userXP._isMobileScreenSize() )
                                  return;
                                // Hack to fix the issue => [mobile menu] clicking on an anchor link that has child submenu should unfold the submenu
                                // see https://github.com/presscustomizr/hueman/issues/857
                                if ( '#' === $(this).attr('href') )
                                  return;
                                evt.preventDefault();
                                evt.stopPropagation();
                                mobMenu( 'collapsed');
                          });

              },

              //@return dfd promise()
              //react on mobMenu( 'collapsed' or 'expanded' )
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
                                duration : 300,
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
                                      czrapp.userXP.onSlidingCompleteResetCSS($(this).toggleClass( 'expanded', expand ));

                                      dfd.resolve( expand );
                                }
                          } );
                    });
                    return dfd.promise();
              },
              //twentyseventeen inspired
              _collapsibleSubmenu : function() {
                    var mobMenu     = this;

                    var EVENT_KEY   = '.hu.submenu',
                        Event       = {
                          SHOW     : 'show' + EVENT_KEY,
                          HIDE     : 'hide' + EVENT_KEY,
                          CLICK    : 'mousedown' + EVENT_KEY,
                          FOCUSIN  : 'focusin' + EVENT_KEY,
                          FOCUSOUT : 'focusout' + EVENT_KEY
                        },
                        Classname   = {
                          DD_TOGGLE_ON_CLICK    : 'submenu-click-expand',
                          SHOWN                 : 'expanded',
                          DD_TOGGLE             : 'hu-dropdown-toggle',
                          DD_TOGGLE_WRAPPER     : 'hu-dropdown-toggle-wrapper',
                          SCREEN_READER         : 'screen-reader-text',

                        },
                        Selector    = {
                          DD_TOGGLE_PARENT      : '.menu-item-has-children, .page_item_has_children',
                          CURRENT_ITEM_ANCESTOR : '.current-menu-ancestor',
                          SUBMENU               : '.sub-menu'
                        },
                        // Add dropdown toggle that displays child menu items.
                        dropdownToggle        = $( '<button />', { 'class': Classname.DD_TOGGLE, 'aria-expanded': false })
                                                .append( czrapp.localized.submenuTogglerIcon )
                                                .append( $( '<span />', { 'class': Classname.SCREEN_READER, text: czrapp.localized.i18n.collapsibleExpand } ) ),
                        dropdownToggleWrapper = $( '<span />', { 'class': Classname.DD_TOGGLE_WRAPPER })
                                                .append( dropdownToggle );

                    //add dropdown toggler button to each submenu parent item (li)
                    mobMenu.menu_wrapper.find( Selector.DD_TOGGLE_PARENT ).children('a').after( dropdownToggleWrapper );

                    // Set the active submenu dropdown toggle button initial state.
                    mobMenu.menu_wrapper.find( Selector.CURRENT_ITEM_ANCESTOR +'>.'+ Classname.DD_TOGGLE_WRAPPER +' .'+ Classname.DD_TOGGLE )
                      .addClass( Classname.SHOWN )
                      .attr( 'aria-expanded', 'true' )
                      .find( '.'+Classname.SCREEN_READER )
                        .text( czrapp.localized.i18n.collapsibleCollapse );

                    // Set the active submenu initial state.
                    mobMenu.menu_wrapper.find( Selector.CURRENT_ITEM_ANCESTOR +'>'+ Selector.SUBMENU ).addClass( Classname.SHOWN );
                    mobMenu.menu_wrapper.find( Selector.CURRENT_ITEM_ANCESTOR ).addClass( Classname.SHOWN );

                    $(  mobMenu.menu_wrapper )
                        //when clicking on a menu item whose href is just a "#", let's emulate a click on the caret dropdown
                        .on( Event.CLICK, 'a[href="#"]', function(evt) {
                              if ( ! czrapp.userXP._isMobileScreenSize() )
                                return;

                              evt.preventDefault();
                              evt.stopPropagation();
                              $(this).next('.'+Classname.DD_TOGGLE_WRAPPER).find('.'+Classname.DD_TOGGLE).trigger( Event.CLICK );
                        })
                        //when clicking on the toggle button
                        //1) trigger the appropriate "internal" event: hide or show
                        //2) maybe collapse all other open submenus within this menu
                        .on( Event.CLICK, '.'+Classname.DD_TOGGLE, function( e ) {
                              e.preventDefault();

                              var $_this = $( this );
                              $_this.trigger( $_this.closest( Selector.DD_TOGGLE_PARENT ).hasClass( Classname.SHOWN ) ? Event.HIDE: Event.SHOW  );

                              //close other submenus
                              _clearMenus( mobMenu, $_this );
                        })
                        //when the hide/show event is triggered
                        //1) toggle the toggle parent menu item (li) expanded class
                        //2) expand/collapse the submenu(ul)
                        //2.1) on expansion/collapse completed change aria attribute and screenreader text
                        //2.2) toggle the subemnu (ul.sub-menu) expanded class
                        //2.3) clear any inline CSS applied by the slideDown/slideUp jQuery functions : the visibility is completely handled via CSS (expanded class)
                        //     we use the aforementioned method only for the animations
                        .on( Event.SHOW+' '+Event.HIDE, '.'+Classname.DD_TOGGLE, function( e ) {
                              var $_this = $( this );

                              $_this.closest( Selector.DD_TOGGLE_PARENT ).toggleClass( Classname.SHOWN );

                              $_this.closest('.'+Classname.DD_TOGGLE_WRAPPER).next( Selector.SUBMENU )
                                .stop()[Event.SHOW == e.type + '.' + e.namespace  ? 'slideDown' : 'slideUp']( {
                                    duration: 300,
                                    complete: function() {
                                      var _to_expand =  'false' === $_this.attr( 'aria-expanded' );
                                          $submenu   = $(this);

                                      $_this.attr( 'aria-expanded', _to_expand )
                                            .find( '.'+Classname.SCREEN_READER )
                                                .text( _to_expand ? czrapp.localized.i18n.collapsibleCollapse : czrapp.localized.i18n.collapsibleExpand );

                                      $submenu.toggleClass( Classname.SHOWN );
                                      czrapp.userXP.onSlidingCompleteResetCSS($submenu);
                                    }
                                });
                        })

                        // Keyboard navigation ( August 2019 )
                        // https://github.com/presscustomizr/hueman/issues/819
                        //when focusin on a menu item whose href is just a "#", let's emulate a click on the caret dropdown
                        .on( Event.FOCUSIN, 'a[href="#"]', function(evt) {
                              if ( ! czrapp.userXP._isMobileScreenSize() )
                                    return;

                              evt.preventDefault();
                              evt.stopPropagation();
                              $(this).next('.'+Classname.DD_TOGGLE_WRAPPER).find('.'+Classname.DD_TOGGLE).trigger( Event.FOCUSIN );
                        })
                        .on( Event.FOCUSOUT, 'a[href="#"]', function(evt) {
                              if ( ! czrapp.userXP._isMobileScreenSize() )
                                    return;
                              evt.preventDefault();
                              evt.stopPropagation();
                              _.delay( function() {
                                    $(this).next('.'+Classname.DD_TOGGLE_WRAPPER).find('.'+Classname.DD_TOGGLE).trigger( Event.FOCUSOUT );
                              }, 250 );
                        })
                        //when focusin on the toggle button
                        //1) trigger the appropriate "internal" event: hide or show
                        //2) maybe collapse all other open submenus within this menu
                        .on( Event.FOCUSIN, '.'+Classname.DD_TOGGLE, function( e ) {
                              e.preventDefault();

                              var $_this = $( this );
                              $_this.trigger( Event.SHOW );
                              //close other submenus
                              //_clearMenus( mobMenu, $_this );
                        })
                        .on( Event.FOCUSIN, function( evt ) {
                              evt.preventDefault();
                              if ( $(evt.target).length > 0 ) {
                                    $(evt.target).addClass( 'hu-mm-focused');
                              }
                        })
                        .on( Event.FOCUSOUT,function( evt ) {
                              evt.preventDefault();

                              var $_this = $( this );
                              _.delay( function() {
                                    if ( $(evt.target).length > 0 ) {
                                          $(evt.target).removeClass( 'hu-mm-focused');
                                    }
                                    if ( mobMenu.container.find('.hu-mm-focused').length < 1 ) {
                                          mobMenu( 'collapsed');
                                    }
                              }, 200 );

                        });

                    //bs dropdown inspired
                    var _clearMenus = function( mobMenu, $_toggle ) {
                      var _parentsToNotClear = $.makeArray( $_toggle.parents( Selector.DD_TOGGLE_PARENT ) ),
                          _toggles           = $.makeArray( $( '.'+Classname.DD_TOGGLE, mobMenu.menu_wrapper ) );

                      for (var i = 0; i < _toggles.length; i++) {
                           var _parent = $(_toggles[i]).closest( Selector.DD_TOGGLE_PARENT )[0];

                           if (!$(_parent).hasClass( Classname.SHOWN ) || $.inArray(_parent, _parentsToNotClear ) > -1 ){
                              continue;
                           }

                          $(_toggles[i]).trigger( Event.HIDE );
                      }
                    };

              }
        }//MobileCTOR

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);