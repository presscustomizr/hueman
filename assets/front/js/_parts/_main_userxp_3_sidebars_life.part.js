var czrapp = czrapp || {};

/************************************************
* USER EXPERIENCE SUB CLASS
*************************************************/
(function($, czrapp) {
  var _methods =  {
        /*  Sidebar stick and collapse
        /* ------------------------------------ */
        sidebarLife : function() {
              var self = this;
              self.sidebars = new czrapp.Values();
              // //Before stickifying :
              // // - is the main content section's height > to sidebar's height ?
              // // => if one or two sidebars height is > to content section's height, once the sidebar sticky ( and fixed ), we will lose the initial content height
              // // => we need to store the initial content section height and update it on resize + sroll, and then always use this value in the various computations
              // self.mainContentHeight = new czrapp.Value( 1 == czrapp.$_mainContent.length ? czrapp.$_mainContent.outerHeight() : 0 );
              // var _updateH = function() {
              //     //czrapp._printLog('IS RESIZING ?' + is_resizing );
              //     self.mainContentHeight( 1 == czrapp.$_mainContent.length ? czrapp.$_mainContent.outerHeight() : 0 );
              // };
              // //the content height has to be updated no only on resize, but also on scroll => there might be content printed with a delay (like smart loaded imgs )
              // czrapp.userXP.isResizing.bind( _updateH );
              // czrapp.userXP.isScrolling .bind( _updateH );

              //DOM aware sidebar instantiation
              $( '.s1, .s2', '#wrapper .main' ).each( function( index ) {
                    if ( 1 != $(this).length )
                      return;

                    var $container = $(this),
                        _id = $container.hasClass('s1') ? 's1' : 's2',
                        _position = $container.attr( 'data-position'),
                        ctor;

                    if ( ! _.isString( _position ) ) {
                          throw new Error( 'Missing sidebar position for ' + s1 );
                    }

                    ctor = czrapp.Value.extend( self.SidebarCTOR );

                    //do instantiate
                    self.sidebars.add( _id, new ctor( _id, {
                          container : $container,
                          position : _position,//can take left, middle-left, middle-right, right
                          extended_width : 's1' == _id ? 340 : 260//<= hard coded in the base CSS, could be made dynamic in the future
                    }));
              });//$( '.s1, .s2', '#wrapper' ).each()
        },


        SidebarCTOR : {
              //constructor params :
              //{
              // container : $container,
              // position : _position, <= get from data-position attribute, mandatory
              // extended_width : 's1' == _id ? '340px' : '260px'
              //}
              initialize : function( id, options ) {
                    var sidebar = this;
                    //assign the id
                    sidebar.id = id;

                    //write the options as properties
                    $.extend( sidebar, options || {} );

                    sidebar.button_selectors = '.sidebar-toggle';
                    sidebar.button = sidebar.container.find( sidebar.button_selectors );

                    czrapp.Value.prototype.initialize.call( sidebar, null, options );

                    //store the animation state
                    sidebar.animating = new czrapp.Value( false );

                    //set initial state
                    sidebar( 'collapsed' );

                    //Listen to sidebar state ( expandability )
                    //$('body').addClass( id +'-collapse').addClass( id +'-collapse');
                    //the deferred promise() returned value is only here to allow sequential actions in the future
                    //like, expand and then do this or that
                    sidebar.bind( function( state ) {
                          return $.Deferred( function() {
                                var dfd = this;
                                sidebar._toggleSidebar()
                                      .done( function( state ){
                                            sidebar.button.toggleClass( 'hovering', 'expanded' == state );
                                            dfd.resolve();
                                      });
                          }).promise();
                    }, { deferred : true } );


                    //animate : make sure we restrict actions when : 'only screen and (min-width: 480px) and (max-width: 1200px)'
                    sidebar.validate = function( value ) {
                          return sidebar._isExpandable() ? value : 'collapsed';
                    };

                    //Listen to user actions
                    czrapp.setupDOMListeners(
                          [
                                {
                                      trigger   : 'click keydown',
                                      selector  : sidebar.button_selectors,
                                      actions   : function() {
                                            var sidebar = this;
                                            //collapse the other expanded
                                            czrapp.userXP.sidebars.each( function( _sb_ ) {
                                                _sb_( _sb_.id == sidebar.id ? _sb_() : 'collapsed' );
                                            });
                                            //toggle expansion of this one
                                            sidebar( 'collapsed' == sidebar() ? 'expanded' : 'collapsed' );
                                      }
                                },
                                {
                                      trigger   : 'mouseenter',
                                      selector  : sidebar.button_selectors,
                                      actions   : function() {
                                            this.button.addClass( 'hovering' );
                                      }

                                },
                                {
                                      trigger   : 'mouseleave',
                                      selector  : sidebar.button_selectors,
                                      actions   : function() {
                                            this.button.removeClass( 'hovering' );
                                      }

                                }
                          ],//actions to execute
                          { dom_el: sidebar.container },//dom scope
                          sidebar //instance where to look for the cb methods
                    );

                    //listen to czrapp events
                    //Collapse on resize
                    czrapp.userXP.isResizing.bind( function( is_resizing ) {
                          //czrapp._printLog('IS RESIZING ?' + is_resizing );
                          sidebar( is_resizing  ? 'collapsed' : sidebar() );
                    });

                    //listen to browser scroll event
                    //STICKIFY
                    czrapp.$_window.scroll( function() {
                          //true === matchMedia( 'only screen and (min-width: 480px)' ).matches
                          if ( ! sidebar._isStickyfiable() )
                            return;
                          //if ( 's1' == sidebar.id )
                            sidebar._stickify();
                    });


                    //Listen to stickify state
                    sidebar.isSticky = sidebar.isSticky || new czrapp.Value( false );
                    // sidebar.isSticky.bind( function( sticky ) {
                    //       $.when( sidebar.container.toggleClass( 'sticky', sticky ) ).done( function() {
                    //             sidebar._translateSbContent();
                    //       });

                    //       //sidebar._mayBeTranslateIfExpandedSticky();
                    //       // if ( ! sticky )
                    //       //   return;
                    //       //console.log('SIDEBAR ' + sidebar.id + ' STICKS ? ', sticky );
                    // });

                    //Listen to sticky menu
                    czrapp.userXP.stickyMenuDown.bind( function( down ) {
                          czrapp.userXP.sidebars.each( function( _sb_ ) {
                                _sb_._translateSbContent( down );
                          });
                    });
              },//initialize


              //translate content vertically
              _translateSbContent : function( stickyMenuDown ) {
                    stickyMenuDown = stickyMenuDown || czrapp.userXP.stickyMenuDown();
                    var sidebar = this,
                        translateYUp = 0,
                        translateYDown = 0,
                        _translate = '';

                    //Handle the specific case of user logged in ( wpadmin bar length not false ) and previewing website with a mobile device < 600 px
                    //=> @media screen and (max-width: 600px)
                    // admin-bar.css?ver=4.7.3:1097
                    // #wpadminbar {
                    //     position: absolute;
                    // }
                    if (  sidebar.isSticky() ) {
                          if ( 1 == czrapp.$_wpadminbar.length ) {
                                translateYUp = translateYUp + czrapp.$_wpadminbar.outerHeight();
                                translateYDown = translateYDown + czrapp.$_wpadminbar.outerHeight();
                          }
                          if ( stickyMenuDown && _.isFunction( window.matchMedia ) && ! matchMedia( 'screen and (max-width: 600px)' ).matches ) {
                                translateYUp = translateYUp + 50;
                          }
                    }

                    _translate = ( stickyMenuDown && sidebar.isSticky() ) ? 'translate(0px, ' + translateYUp + 'px)' : 'translate(0px, ' + translateYDown + 'px)';

                    sidebar.container.find('.sidebar-content, .sidebar-toggle').css({
                          //transform: 'up' == args.direction ? 'translate3d(0px, -' + _height + 'px, 0px)' : 'translate3d(0px, 0px, 0px)'
                          '-webkit-transform': _translate,   /* Safari and Chrome */
                          '-moz-transform': _translate,       /* Firefox */
                          '-ms-transform': _translate,        /* IE 9 */
                          '-o-transform': _translate,         /* Opera */
                          transform: _translate
                    });
              },

              //if sidebar is expanded when sticky, it needs to be be translated X
              //Fired when toggle sidebar and stickyness state changes
              //If the sidebar is sticky, let's setup an x translation
              _mayBeTranslateIfExpandedSticky : function() {
                    var sidebar = this,
                        expanded = 'expanded' == sidebar(),
                        _transX = sidebar.extended_width - 50,
                        _translate;

                    //Set Horizontal left position when 'fixed'
                    switch( sidebar.position ) {
                          case 'right' :
                              _transX = -_transX;
                          break;
                          case 'middle-right' :
                              _transX = -_transX;
                          break;
                          case 'middle-left' :
                          case 'left' :
                              _transX = 0;
                          break;
                    }

                    //don't do if already translated
                    // if ( sidebar.isSticky() && expanded && sidebar.isXTranslated() )
                    //   return;
                    _transX = expanded ? _transX : - _transX;
                    _translate = 'translate(' + _transX + 'px, 0px)';

                    sidebar.container.css({
                          width : expanded ? sidebar.extended_width + 'px' : '50px',
                          '-webkit-transform': _translate,   /* Safari and Chrome */
                          '-moz-transform': _translate,       /* Firefox */
                          '-ms-transform': _translate,        /* IE 9 */
                          '-o-transform': _translate,         /* Opera */
                          transform: _translate
                    });
              },//_mayBeTranslateIfExpandedSticky


              //@return a string '' or number + 'px'
              _getXLeftOffset : function() {
                    var sidebar = this,
                        expanded = 'expanded' == sidebar(),
                        $mainWrapper = $('.main', '#wrapper'),
                        $mainContent = $mainWrapper.find('.content'),
                        xFixedOffset = '';

                    if ( ! sidebar.isSticky() )
                      return '';
                    //Set Horizontal left position when 'fixed'
                    switch( sidebar.position ) {
                          case 'left' :
                              xFixedOffset = $mainWrapper.offset().left;
                          break;
                          case 'middle-left' :
                              //xFixedOffset = czrapp.userXP.sidebars('s1').container.width() + $mainWrapper.offset().left;
                              console.log( );
                              xFixedOffset = ( 'expanded' == czrapp.userXP.sidebars('s1')() ?  50 : czrapp.userXP.sidebars('s1').container.width() ) + $mainWrapper.offset().left;
                          break;
                          case 'middle-right' :
                              xFixedOffset = $mainWrapper.offset().left + $mainContent.width();
                              xFixedOffset = expanded ? xFixedOffset - sidebar.container.width() + 50 : xFixedOffset;
                          break;
                          case 'right' :
                              xFixedOffset = $mainWrapper.offset().left + $mainWrapper.width() - sidebar.container.width();
                          break;
                    }
                    return _.isEmpty( xFixedOffset ) ? xFixedOffset : xFixedOffset + 'px';
              },

              //invoked in a scenario of sidebar expanded in mobile view : toggle and scroll
              //@return number
              _getExpandedHeight : function() {
                    var sb = this,
                        _winHeight = czrapp.$_window.height(),
                        _sbHeight = this.container.find('.sidebar-content').height(),
                        _maxColHeight = sb._getMaxColumnHeight();

                    //When the sidebar is sticky and expanded
                    if ( sb.isSticky() ) {
                          //if sticky we want the height to be the part that we see from top to bottom of the viewport
                          return czrapp.$_mainWrapper.offset().top + czrapp.$_mainWrapper.find('.content').outerHeight() - sb.container.offset().top;
                    } else {
                          //return _winHeight > _sbHeight ? _winHeight : _sbHeight;
                          //if not sticky, then make sure we are not smaller than the viewport's height
                          return Math.max( _winHeight, _sbHeight > _maxColHeight ? _maxColHeight : _sbHeight );
                    }


              },

              //@return number
              _getMaxColumnHeight : function() {
                    var _hs = [];
                    //loop on the sb instances to get their container height
                    //skip the sb sticky and expanded => those will inherit the height of the content or the other sb
                    czrapp.userXP.sidebars.each( function( _sb_ ) {
                          if ( ! _sb_.isSticky() && 'expanded' != _sb_() ) {
                                _hs.push( _sb_.container.outerHeight() );
                          }
                    });
                    $('.content', '#wrapper .main').each( function() {
                          if ( 1 == $(this).length )
                            _hs.push( $(this).outerHeight() );
                    });
                    return Math.max.apply(null, _hs );
              },

              //@react to sidebar() state change
              //state agnostic method
              //its job is to expand or collapse depending on the current instance state
              //@return promise()
              _toggleSidebar : function() {
                    var sidebar = this,
                        expanded = 'expanded' == sidebar();
                    return $.Deferred( function() {
                          var _dfd_ = this;
                          ( function() {
                                return $.Deferred( function() {
                                      var _dfd = this;

                                      sidebar.animating( true );

                                      sidebar.container
                                          .toggleClass( 'expanding', expanded )
                                          .toggleClass( 'collapsing', ! expanded );

                                      //If the sidebar is sticky, we need to translate it while setting the width
                                      if ( sidebar.isSticky() ) {
                                          var _transX,
                                              _translate;

                                          //Set Horizontal left position when 'fixed'
                                          switch( sidebar.position ) {
                                                case 'right' :
                                                case 'middle-right' :
                                                    _transX = - ( sidebar.extended_width - 50 );
                                                break;
                                                case 'middle-left' :
                                                case 'left' :
                                                    _transX = 0;
                                                break;
                                          }

                                          _transX = expanded ? _transX : - _transX;
                                          _translate = 'translate(' + _transX + 'px, 0px)';

                                          sidebar.container.css({
                                                width : expanded ? sidebar.extended_width + 'px' : '50px',
                                                height : expanded ? sidebar._getExpandedHeight() + 'px' : sidebar.container.height() + 'px',
                                                '-webkit-transform': _translate,   /* Safari and Chrome */
                                                '-moz-transform': _translate,       /* Firefox */
                                                '-ms-transform': _translate,        /* IE 9 */
                                                '-o-transform': _translate,         /* Opera */
                                                transform: _translate
                                          });
                                      } else {
                                          sidebar.container.css({
                                                width : expanded ? sidebar.extended_width + 'px' : '50px',
                                          });
                                      }
                                      sidebar.container.find('.sidebar-content').css('opacity', expanded ? 0 : 1 );
                                      sidebar.container.find('.icon-sidebar-toggle').css('opacity', 0);

                                      _.delay( function() {
                                            _dfd.resolve();
                                      }, 350 );//transition: width .35s ease-in-out;
                                }).promise();
                          })().done( function() {
                                sidebar.container.toggleClass( 'expanded', expanded ).toggleClass('collapsed', ! expanded );
                                sidebar.container
                                      .removeClass( 'expanding')
                                      .removeClass( 'collapsing')
                                      .css({
                                            width : expanded ? sidebar.extended_width + 'px' : '',
                                            //height : expanded ? sidebar.container.find('.sidebar-content').outerHeight() + 'px' : '',
                                            height : expanded ? sidebar._getExpandedHeight() + 'px' : '',//<= recalculate it here if a scroll has occured during expansion
                                            left : sidebar._getXLeftOffset(),//<= '' or number + 'px'
                                            '-webkit-transform': '',   /* Safari and Chrome */
                                            '-moz-transform': '',       /* Firefox */
                                            '-ms-transform': '',        /* IE 9 */
                                            '-o-transform': '',         /* Opera */
                                            transform: ''
                                      });

                                //adjust offset top if expanded when sticky and close to bottom:
                                //sidebar._stickify();

                                sidebar.container.find('.icon-sidebar-toggle').css('opacity', 1);

                                //sidebar content
                                sidebar.container.find('.sidebar-content')
                                    .css({
                                          opacity : 1,
                                          height : expanded ? 'calc( 100% - 60px )' : ''//<= 60px is the height of the toggle arrow bar
                                    });
                                sidebar.animating( false );
                                _dfd_.resolve();
                          });
                    }).promise();
              },//toggleSidebar


              //react on $(window).scroll()
              //can be called to ajust offset top
              //@return void()
              _stickify : function() {
                    var sidebar = this,
                        $window = czrapp.$_window,
                        $mainWrapper = czrapp.$_mainWrapper,//$('.main', '#wrapper'),
                        $mainContent = czrapp.$_mainContent;// $mainWrapper.find('.content'),

                    if ( 1 != $mainWrapper.length || 1 != $mainContent.length )
                      return;

                    // console.log('$mainWrapper.outerHeight()', $mainWrapper.outerHeight() );

                    // console.log('MAX COL HEIGHT ?', sidebar._getMaxColumnHeight() );
                    // console.log('sidebar height', sidebar.container.outerHeight() );
                    // For contentBottomToTop, we use the maximum column height value
                    // => we can be in a collapsed scenario where a sidebar's height will become higher than the content column height when expanded.
                    var sbHeight            = sidebar.container.outerHeight(),
                        contentBottomToTop  = $mainWrapper.offset().top + sidebar._getMaxColumnHeight(),
                        topOfTemplate       = $mainWrapper.offset().top,
                        topSpacing          = 0,//_setTopSpacing();
                        scrollTop           = $window.scrollTop(),
                        startStickingY      = $mainWrapper.offset().top,
                        stopStickingY       = contentBottomToTop - ( sbHeight + topSpacing ),
                        expanded            = 'expanded' == sidebar();


                    if ( stopStickingY < 0 )
                      return;

                    //When the sidebar is expanded ( can only happen below 1200px viewport ), ot it has to be sticky
                    //=> in this case, we skip this check with ! expanded
                    if ( scrollTop >= stopStickingY && ! expanded ) {
                          sidebar.container
                              //.offset( { top: $mainWrapper.offset().top } )
                              .css({
                                position : '',
                                top : '',
                                left : '',
                                right : '',
                                'margin-left' : '',
                                'margin-right' : '',
                                'padding-bottom' : '',
                                height : ''
                          });
                          sidebar.container.removeClass( 'sticky' );
                          //the top value can be negative in this case, if the sidebar is content is higher than the sidebar which is higher than the viewport
                          sidebar.container.offset( { top: contentBottomToTop - sbHeight } );

                          //czrapp._printLog('THREE : scrollTop > stopStickingY');
                          sidebar.isSticky( false );
                    } else if ( scrollTop >= $mainWrapper.offset().top ) {
                          //The sidebar can be expanded, in this case, its height will be adapted on scroll
                          //We are sticky now
                          sidebar.isSticky( true );
                          $.when( sidebar.container.addClass( 'sticky' ) ).done( function() {
                                sidebar._translateSbContent();
                          });
                          sidebar.container.css({
                                //position : 'fixed',
                                top : '0px',
                                height : expanded ? sidebar._getExpandedHeight() + 'px' : '',
                                left : sidebar._getXLeftOffset(),//<= depdendant of the sidebar position : left, middle-left, middle-right, right
                                'margin-left' : 0,
                                'margin-right' : 0,
                                'padding-bottom' : expanded ? 0 : '',
                          });

                          //czrapp._printLog('STYLE ? ' + sidebar.container.attr( 'style' ) );
                          //czrapp._printLog('TWO STICKY : scrollTop >= $mainWrapper.offset().top ' + scrollTop );
                    } else if( scrollTop < startStickingY ) {
                          //sidebar.container.removeClass('sticky');
                          $.when( sidebar.container.removeClass('sticky') ).done( function() {
                                sidebar._translateSbContent();
                          });
                          sidebar.container
                              //.offset( { top: $mainWrapper.offset().top } )
                              .css({
                                    position : '',
                                    top : '',
                                    left : '',
                                    right : '',
                                    'margin-left' : '',
                                    'margin-right' : '',
                                    'padding-bottom' : '',
                                    height : ''
                              });
                          //czrapp._printLog('ONE : scrollTop < sidebar.container.offset().top');
                          sidebar.isSticky( false );
                    }
              },//stickify


              //@return bool
              _isExpandable : function() {
                    return _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (min-width: 480px) and (max-width: 1200px)' ).matches;
              },

              _isStickyfiable : function() {
                    return _.isFunction( window.matchMedia ) && matchMedia( 'only screen and (min-width: 480px)' ).matches;
              }
        },//SidebarCTOR

  };//_methods{}

  czrapp.methods.UserXP = czrapp.methods.UserXP || {};
  $.extend( czrapp.methods.UserXP , _methods );

})(jQuery, czrapp);