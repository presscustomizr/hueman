//@global HUParams
var czrapp = czrapp || {};

(function($, czrapp) {
  //short name for the slice method from the built-in Array js prototype
  //used to handle the event methods
  var slice = Array.prototype.slice;

  $.extend( czrapp, {
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
      _instance.emit(methods);

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
        $_tcHeader       : $('.tc-header'),
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


    //Dev mode aware and IE compatible consoleLog()
    consoleLog : function() {
      //fix for IE, because console is only defined when in F12 debugging mode in IE
      if ( ( _.isUndefined( console ) && typeof window.console.log != 'function' ) || ! HUParams.isDevMode )
        return;
      console.log.apply( console, arguments );
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

      czrapp.trigger('czrapp-ready', this);
    }//loadCzr

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
              var $this = $(this);
              $this.next().children('.alx-tab').stop(true,true).hide()
              .siblings( $this.find('a').attr('href') ).show();
              $this.children('li').first().addClass('active').stop(true,true).show();
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

          $('.s1 .sidebar-toggle').click(function(){
            $('body').toggleClass('s1-collapse').toggleClass('s1-expand');
            if ($('body').is('.s2-expand')) {
              $('body').toggleClass('s2-expand').toggleClass('s2-collapse');
            }
          });
          $('.s2 .sidebar-toggle').click(function(){
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


        /*  Mobile menu smooth toggle height
        /* ------------------------------------ */
        mobileMenu : function() {
          $('.nav-toggle').on('click', function() {
            slide($('.nav-wrap .nav', $(this).parent()));
          });

          function slide(content) {
            var wrapper = content.parent();
            var contentHeight = content.outerHeight(true);
            var wrapperHeight = wrapper.height();

            wrapper.toggleClass('expand');
            if (wrapper.hasClass('expand')) {
            setTimeout(function() {
              wrapper.addClass('transition').css('height', contentHeight);
            }, 10);
          }
          else {
            setTimeout(function() {
              wrapper.css('height', wrapperHeight);
              setTimeout(function() {
              wrapper.addClass('transition').css('height', 0);
              }, 10);
            }, 10);
          }

          wrapper.one('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function() {
            if(wrapper.hasClass('open')) {
              wrapper.removeClass('transition').css('height', 'auto');
            }
          });
          }
        },






















        //Helpers
        //Check if the passed element(s) contains an iframe
        //@return list of containers
        //@param $_elements = mixed
        _has_iframe : function ( $_elements ) {
          var that = this,
              to_return = [];
          _.map( $_elements, function( $_el, container ){
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
  var toLoad = {
    BrowserDetect : [],
    Czr_Plugins : [
        'imgSmartLoad',
        'extLinks',
        'parallax'
    ],
    Czr_UserExperience : [
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
    ],
  };
  czrapp.cacheProp().emitCustomEvents().loadCzr(toLoad);
});
