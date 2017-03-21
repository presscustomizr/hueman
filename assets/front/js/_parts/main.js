//@global HUParams
var czrapp = czrapp || {};

(function($, czrapp) {
        //short name for the slice method from the built-in Array js prototype
        //used to handle the event methods
        var slice = Array.prototype.slice;

        $.extend( czrapp, {
            ready            : $.Deferred(),
            instances        : {},//will store all subclasses instances
            methods          : {},//will store all subclasses methods

            //parent class constructor
            Base : function() {},

            _inherits : function( classname ) {
                  //add the class to the czrapp and sets the parent this to it
                  czrapp[classname] = function() {
                    czrapp.Base.call(this);
                  };

                  //set the classical prototype chaining with inheritance
                  czrapp[classname].prototype = Object.create( czrapp.Base.prototype );
                  czrapp[classname].prototype.constructor = czrapp[classname];
                  return czrapp;
            },


            _instanciates : function( classname) {
                  czrapp.instances[classname] = czrapp.instances[classname] || new czrapp[classname]();
                  return czrapp;
            },


            /**
             * [_init description]
             * @param  {[type]} classname string
             * @param  {[type]} methods   array of methods
             * @return {[type]} czrapp object
             */
            _init : function(classname, methods) {
                  var _instance = czrapp.instances[classname] || false;
                  if ( ! _instance )
                    return;

                  //always fire the init method if exists
                  if ( _instance.init )
                    _instance.init();

                  //fire the array of methods on load
                  _instance.emit( methods );

                  //return czrapp for chaining
                  return czrapp;
            },

            //extend a classname prototype with a set of methods
            _addMethods : function(classname) {
                  $.extend( czrapp[classname].prototype , czrapp._getMethods(classname) );
                  return czrapp;
            },

            _getMethods : function(classname) {
                 return czrapp.methods[classname] || {};
            },


            /**
            * Cache properties on Dom Ready
            * @return {[type]} [description]
            */
            cacheProp : function() {
                  $.extend( czrapp, {
                        //cache various jQuery el in czrapp obj
                        $_window         : $(window),
                        $_html           : $('html'),
                        $_body           : $('body'),
                        $_header         : $('#header'),
                        $_wpadminbar     : $('#wpadminbar'),

                        //various properties definition
                        localized        : HUParams || {},
                        is_responsive    : this.isResponsive(),//store the initial responsive state of the window
                        current_device   : this.getDevice()//store the initial device
                  });
                  return czrapp;
            },


            /***************************************************************************
            * CUSTOM EVENTS
            * tc-resize
            ****************************************************************************/
            emitCustomEvents : function() {
                  var that = this;
                  /*-----------------------------------------------------
                  -> CUSTOM RESIZE EVENT
                  ------------------------------------------------------*/
                  czrapp.$_window.resize( function(e) {
                        var $_windowWidth     = czrapp.$_window.width(),
                            _current          = czrapp.current_device,//<= stored on last resize event or on load
                            //15 pixels adjustement to avoid replacement before real responsive width
                            _to               = that.getDevice();

                        //updates width dependant properties
                        czrapp.is_responsive  = that.isResponsive();
                        czrapp.current_device = _to;
                        czrapp.$_body.trigger( 'tc-resize', { current : _current, to : _to} );
                  } );//resize();

                  return czrapp;
            },


            //bool
            isResponsive : function() {
                  return $(window).width() <= 979 - 15;
            },

            //@return string of current device
            getDevice : function() {
                  var _devices = {
                        desktop : 979 - 15,
                        tablet : 767 - 15,
                        smartphone : 480 - 15
                      },
                      _current_device = 'desktop',
                      $_window = czrapp.$_window || $(window);

                  _.map( _devices, function( max_width, _dev ){
                    if ( $_window.width() <= max_width )
                      _current_device = _dev;
                  } );
                  return _current_device;
            },


            //@return bool
            isSelectorAllowed : function( $_el, skip_selectors, requested_sel_type ) {
                  var sel_type = 'ids' == requested_sel_type ? 'id' : 'class',
                  _selsToSkip   = skip_selectors[requested_sel_type];

                  //check if option is well formed
                  if ( 'object' != typeof(skip_selectors) || ! skip_selectors[requested_sel_type] || ! $.isArray( skip_selectors[requested_sel_type] ) || 0 === skip_selectors[requested_sel_type].length )
                    return true;

                  //has a forbidden parent?
                  if ( $_el.parents( _selsToSkip.map( function( _sel ){ return 'id' == sel_type ? '#' + _sel : '.' + _sel; } ).join(',') ).length > 0 )
                    return false;

                  //has requested sel ?
                  if ( ! $_el.attr( sel_type ) )
                    return true;

                  var _elSels       = $_el.attr( sel_type ).split(' '),
                      _filtered     = _elSels.filter( function(classe) { return -1 != $.inArray( classe , _selsToSkip ) ;});

                  //check if the filtered selectors array with the non authorized selectors is empty or not
                  //if empty => all selectors are allowed
                  //if not, at least one is not allowed
                  return 0 === _filtered.length;
            },

            /***************************************************************************
            * Event methods, offering the ability to bind to and trigger events.
            * Inspired from the customize-base.js event manager object
            * @uses slice method, alias of Array.prototype.slice
            ****************************************************************************/
            trigger: function( id ) {
                  if ( this.topics && this.topics[ id ] )
                    this.topics[ id ].fireWith( this, slice.call( arguments, 1 ) );
                  return this;
            },

            bind: function( id ) {
                  this.topics = this.topics || {};
                  this.topics[ id ] = this.topics[ id ] || $.Callbacks();
                  this.topics[ id ].add.apply( this.topics[ id ], slice.call( arguments, 1 ) );
                  return this;
            },

            unbind: function( id ) {
                  if ( this.topics && this.topics[ id ] )
                    this.topics[ id ].remove.apply( this.topics[ id ], slice.call( arguments, 1 ) );
                  return this;
            },


            /**
             * Load the various { constructor [methods] }
             *
             * Constructors and methods can be disabled by passing a localized var HUParams._disabled (with the hook 'tc_disabled_front_js_parts' )
             * Ex : add_filter('tc_disabled_front_js_parts', function() {
             *   return array('Czr_Plugins' => array() , 'Czr_Slider' => array('addSwipeSupport') );
             * });
             * => will disabled all Czr_Plugin class (with all its methods) + will disabled the addSwipeSupport method from the Czr_Slider class
             * @todo : check the classes dependencies and may be add a check if ( ! method_exits() )
             *
             * @param  {[type]} args [description]
             * @return {[type]}      [description]
             */
            loadCzr : function( args ) {
                    var that = this,
                        _disabled = that.localized._disabled || {};

                    _.each( args, function( methods, key ) {
                          //normalize methods into an array if string
                          methods = 'string' == typeof(methods) ? [methods] : methods;

                          //key is the constructor
                          //check if the constructor has been disabled => empty array of methods
                          if ( that.localized._disabled[key] && _.isEmpty(that.localized._disabled[key]) )
                            return;

                          if ( that.localized._disabled[key] && ! _.isEmpty(that.localized._disabled[key]) ) {
                                var _to_remove = that.localized._disabled[key];
                                _to_remove = 'string' == typeof(_to_remove) ? [_to_remove] : _to_remove;
                                methods = _.difference( methods, _to_remove );
                          }
                          //chain various treatments
                          czrapp._inherits(key)._instanciates(key)._addMethods(key)._init(key, methods);
                    });//_.each()

                    this.ready.resolve();
                    czrapp.trigger('czrapp-ready', this);
            },//loadCzr


            //CONSOLE / ERROR LOG
            //@return [] for console method
            //@bgCol @textCol are hex colors
            //@arguments : the original console arguments
            _prettyPrintLog : function( args ) {
                  var _defaults = {
                        bgCol : '#5ed1f5',
                        textCol : '#000',
                        consoleArguments : []
                  };
                  args = _.extend( _defaults, args );

                  var _toArr = Array.from( args.consoleArguments ),
                      _truncate = function( string ){
                            if ( ! _.isString( string ) )
                              return '';
                            return string.length > 150 ? string.substr( 0, 149 ) : string;
                      };

                  //if the array to print is not composed exclusively of strings, then let's stringify it
                  //else join()
                  if ( ! _.isEmpty( _.filter( _toArr, function( it ) { return ! _.isString( it ); } ) ) ) {
                        _toArr =  JSON.stringify( _toArr );
                  } else {
                        _toArr = _toArr.join(' ');
                  }
                  return [
                        '%c ' + _truncate( _toArr ),
                        [ 'background:' + args.bgCol, 'color:' + args.textCol, 'display: block;' ].join(';')
                  ];
            },

            //Dev mode aware and IE compatible api.consoleLog()
            consoleLog : function() {
                  if ( ! czrapp.localized.isDevMode )
                    return;
                  //fix for IE, because console is only defined when in F12 debugging mode in IE
                  if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
                    return;

                  console.log.apply( console, czrapp._prettyPrintLog( { consoleArguments : arguments } ) );
            },

            errorLog : function() {
                  //fix for IE, because console is only defined when in F12 debugging mode in IE
                  if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) )
                    return;

                  console.log.apply( console, czrapp._prettyPrintLog( { bgCol : '#ffd5a0', textCol : '#000', consoleArguments : arguments } ) );
            }

      });//extend
})(jQuery, czrapp);



/*************************
* ADD BASE CLASS METHODS
*************************/
(function($, czrapp) {
      var _methods = {
            emit : function( cbs, args ) {
                  cbs = _.isArray(cbs) ? cbs : [cbs];
                  var self = this;
                  _.map( cbs, function(cb) {
                        if ( 'function' == typeof(self[cb]) ) {
                              args = 'undefined' == typeof( args ) ? Array() : args ;
                              self[cb].apply(self, args );
                              czrapp.trigger( cb, _.object( _.keys(args), args ) );
                        }
                  });//_.map
            },

            triggerSimpleLoad : function( $_imgs ) {
                  if ( 0 === $_imgs.length )
                    return;

                  $_imgs.map( function( _ind, _img ) {
                    $(_img).load( function () {
                      $(_img).trigger('simple_load');
                    });//end load
                    if ( $(_img)[0] && $(_img)[0].complete )
                      $(_img).load();
                  } );//end map
            },//end of fn

            isUserLogged     : function() {
                  return czrapp.$_body.hasClass('logged-in') || 0 !== czrapp.$_wpadminbar.length;
            },

            isCustomizing    : function() {
                  return czrapp.$_body.hasClass('is-customizing');
            },
            getDevice : function() {
                  return czrapp.getDevice();
            },
            isReponsive : function() {
                  return czrapp.isReponsive();
            },
            isSelectorAllowed: function( $_el, skip_selectors, requested_sel_type ) {
                  return czrapp.isSelectorAllowed( $_el, skip_selectors, requested_sel_type );
            }

      };//_methods{}

      $.extend( czrapp.Base.prototype, _methods );//$.extend

})(jQuery, czrapp);
/***************************
* ADD BROWSER DETECT METHODS
****************************/
(function($, czrapp) {
  var _methods =  {
    init : function() {
      // Chrome is Webkit, but Webkit is also Safari. If browser = ie + strips out the .0 suffix
      if ( $.browser.chrome )
          czrapp.$_body.addClass("chrome");
      else if ( $.browser.webkit )
          czrapp.$_body.addClass("safari");
      if ( $.browser.mozilla )
          czrapp.$_body.addClass("mozilla");
      else if ( $.browser.msie || '8.0' === $.browser.version || '9.0' === $.browser.version || '10.0' === $.browser.version || '11.0' === $.browser.version )
          czrapp.$_body.addClass("ie").addClass("ie" + $.browser.version.replace(/[.0]/g, ''));

      //Adds version if browser = ie
      if ( czrapp.$_body.hasClass("ie") )
          czrapp.$_body.addClass($.browser.version);
    }
  };//_methods{}

  $.extend( czrapp.methods.BrowserDetect = {} , _methods );

})(jQuery, czrapp);
var czrapp = czrapp || {};
/***************************
* ADD JQUERY PLUGINS METHODS
****************************/
(function($, czrapp) {
  var _methods = {
    //IMG SMART LOAD
    //.article-container covers all post / page content : single and list
    //__before_main_wrapper covers the single post thumbnail case
    //.widget-front handles the featured pages
    imgSmartLoad : function() {
      var smartLoadEnabled = 1 == HUParams.imgSmartLoadEnabled,
          //Default selectors for where are : $( '.article-container, .__before_main_wrapper, .widget-front' ).find('img');
          _where           = HUParams.imgSmartLoadOpts.parentSelectors.join();

      //Smart-Load images
      //imgSmartLoad plugin will trigger the smartload event when the img will be loaded
      //the centerImages plugin will react to this event centering them
      if (  smartLoadEnabled )
        $( _where ).imgSmartLoad(
          _.size( HUParams.imgSmartLoadOpts.opts ) > 0 ? HUParams.imgSmartLoadOpts.opts : {}
        );

      //If the centerAllImg is on we have to ensure imgs will be centered when simple loaded,
      //for this purpose we have to trigger the simple-load on:
      //1) imgs which have been excluded from the smartloading if enabled
      //2) all the images in the default 'where' if the smartloading isn't enaled
      //simple-load event on holders needs to be triggered with a certain delay otherwise holders will be misplaced (centering)
      if ( 1 == HUParams.centerAllImg ) {
        var self                   = this,
            $_to_center            = smartLoadEnabled ?
               $( _.filter( $( _where ).find('img'), function( img ) {
                  return $(img).is(HUParams.imgSmartLoadOpts.opts.excludeImg.join());
                }) ): //filter
                $( _where ).find('img');
            $_to_center_with_delay = $( _.filter( $_to_center, function( img ) {
                return $(img).hasClass('tc-holder-img');
            }) );

        //imgs to center with delay
        setTimeout( function(){
          self.triggerSimpleLoad( $_to_center_with_delay );
        }, 300 );
        //all other imgs to center
        self.triggerSimpleLoad( $_to_center );
      }
    },


    //FIRE EXT LINKS PLUGIN
    //May be add (check if activated by user) external class + target="_blank" to relevant links
    //images are excluded by default
    //links inside post/page content
    extLinks : function() {
      if ( ! HUParams.extLinksStyle && ! HUParams.extLinksTargetExt )
        return;
      $('a' , '.post-inner .entry').extLinks({
          addIcon : HUParams.extLinksStyle,
          iconClassName : 'hu-external',
          newTab : HUParams.extLinksTargetExt,
          skipSelectors : _.isObject(HUParams.extLinksSkipSelectors) ? HUParams.extLinksSkipSelectors : {}
      });
    },

    parallax : function() {
      $( '.parallax-item' ).czrParallax();
    },
  };//_methods{}

  $.extend( czrapp.methods.Czr_Plugins = {} , _methods );

})(jQuery, czrapp);
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
                    if ( self.scrollPosition >= self.stickyHeaderThreshold || 'up' != self.scrollDirection )
                      return;

                    if ( ! self._isMobile() ) {
                        self._adjustDesktopTopNavPaddingTop();
                    }

                    $menu_wrapper.addClass('fast');
                    self._animate( { direction : 'down', silent : true } ).done( function() {
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
                                    }, 50 );
                                }).promise();
                          } )().done( function() {
                                $menu_wrapper.removeClass('fast');
                                if ( self._isMobile() ) {
                                      czrapp.$_header.removeClass( 'fixed-header-on' );
                                }
                          });
                    });
              };

              //czrapp.bind( 'header-animation-done', _mayBeresetTopPosition );
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

              } );//resize();

              /*-----------------------------------------------------
              * SCROLL EVENT
              ------------------------------------------------------*/
              czrapp.$_window.scroll( function() {
                    //handle scrolling classes
                    czrapp.$_body.toggleClass( 'is-scrolled', self.scrollPosition > 10 );
                    if ( self.scrollPosition <= 10 ) {
                          czrapp.trigger( 'page-scrolled-top', {} );
                    }

                    czrapp.$_body.addClass('is-scrolling');
                    clearTimeout( $.data( this, 'scrollTimer') );
                    $.data(this, 'scrollTimer', setTimeout(function() {
                          czrapp.$_body.removeClass('is-scrolling');
                          czrapp.trigger( 'scrolling-finished' );
                    }, 250));

                    self.scrollDirection = self.scrollPosition <= czrapp.$_window.scrollTop() ? 'down' : 'up';
                    self.scrollPosition = czrapp.$_window.scrollTop();

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
              });
        },//stickify



        //Privates
        _stickifyHeader : function() {
              var self = this, $menu_wrapper;
              self.stickyMenuDown = _.isUndefined( self.stickyMenuDown ) ? false : self.stickyMenuDown;
              self.stickyHeaderAnimating = _.isUndefined( self.stickyHeaderAnimating ) ? false : self.stickyHeaderAnimating;

              $menu_wrapper = self.menuWrapper;
              if ( ! $menu_wrapper.length ) {
                    czrapp.consoleLog( '_stickifyHeader : no menu wrapper to animate.' );
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

        //args = { direction : up / down , silent : false, menu_wrapper : $ element }
        _animate : function( args ) {
              args = _.extend(
                    {
                          direction : 'down',
                          silent : false,
                          menu_wrapper : {}
                    },
                    args || {}
              );
              var dfd = $.Deferred(),
                  self = this,
                  $menu_wrapper = ! args.menu_wrapper.length ? czrapp.$_header.find( self.currentStickySelector ) : args.menu_wrapper;

              //Bail here if we are still animating or if we don't have a menu element
              if ( self.stickyHeaderAnimating || ! $menu_wrapper.length ) {
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
                    _translate = 'up' == args.direction ? 'translate(0px, -' + translateYUp + 'px' : 'translate(0px, -' + translateYDown + 'px)';
                    self.stickyHeaderAnimating = self.scrollDirection;
                    self.stickyHeaderAnimationDirection = args.direction;
                    $menu_wrapper.toggleClass( 'sticky-visible', 'down' == args.direction );

                    $menu_wrapper.css({
                          //transform: 'up' == args.direction ? 'translate3d(0px, -' + _height + 'px, 0px)' : 'translate3d(0px, 0px, 0px)'
                          transform: _translate,
                          '-o-transform': _translate,         /* Opera */
                          '-ms-transform': _translate,        /* IE 9 */
                          '-moz-transform': _translate,       /* Firefox */
                          '-webkit-transform': _translate   /* Safari and Chrome */
                    });

                    _.delay( function() {
                          //Say it ain't so
                          self.stickyHeaderAnimating = false;
                          if ( ! args.silent ) {
                              czrapp.trigger( 'header-animation-done', { menu_wrapper : $menu_wrapper } );
                          }
                          dfd.resolve();
                    }, 350 );
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
var czrapp = czrapp || {};

/************************************************
* LET'S DANCE
*************************************************/
jQuery(function ($) {
      czrapp
            .cacheProp()
            .loadCzr( {
                  BrowserDetect : [],
                  Czr_Plugins : [
                        'imgSmartLoad',
                        'extLinks',
                        'parallax'
                  ],
                  Czr_UserExperience : [
                        'stickify',
                        'outline',
                        'smoothScroll',
                        'toggleHeaderSearch',
                        'scrollToTop',
                        'widgetTabs',
                        'commentTabs',
                        'tableStyle',
                        'sidebarCollapse',
                        'dropdownMenu',
                        'mobileMenu'
                  ]
            } );
});
