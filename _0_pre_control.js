(function (api, $, _) {
  //FIX FOR CONTROL VISIBILITY LOST ON PREVIEW REFRESH #1
  //This solves the problem of control visiblity settings being lost on preview refresh since WP 4.3
  //this overrides the wp method only for the control instances
  //it check if there's been a customizations
  //=> args.unchanged is true for all cases, for example when api.previewer.loading and the preview send 'ready'created during the frame synchronisation
  api.Control.prototype.onChangeActive = function ( active, args ) {
    if ( args.unchanged )
      return;
    if ( this.container[0] && ! $.contains( document, this.container[0] ) ) {
      // jQuery.fn.slideUp is not hiding an element if it is not in the DOM
      this.container.toggle( active );
      if ( args.completeCallback ) {
        args.completeCallback();
      }
    } else if ( active ) {
      this.container.slideDown( args.duration, args.completeCallback );
    } else {
      this.container.slideUp( args.duration, args.completeCallback );
    }
  };


   /* monkey patch for the content height set */
  //wp.customize.Section is not available before wp 4.1
  if ( 'function' == typeof api.Section ) {
    // backup the original function
    var _original_section_initialize = api.Section.prototype.initialize;
    api.Section.prototype.initialize = function( id, options ) {
      //call the original constructor
      _original_section_initialize.apply( this, [id, options] );
      var section = this;

      this.expanded.callbacks.add( function( _expanded ) {
        if ( ! _expanded )
          return;

      var container = section.container.closest( '.wp-full-overlay-sidebar-content' ),
            content = section.container.find( '.accordion-section-content' );
        //content resizing to the container height
        _resizeContentHeight = function() {
          content.css( 'height', container.innerHeight() );
      };
        _resizeContentHeight();
        //this is set to off in the original expand callback if 'expanded' is false
        $( window ).on( 'resize.customizer-section', _.debounce( _resizeContentHeight, 110 ) );
      });
    };
  }
  /* end monkey patch */





  /*****************************************************************************
  * CAPTURE PREVIEW INFORMATIONS ON REFRESH + REACT TO THEM
  *****************************************************************************/
  /* CONTEXT */
  var contx = new api.Values();
  contx.create('current');
  api.contx = contx;

  /* SIDEBAR INSIGHTS */
  var sidebar_insights = new api.Values();
  sidebar_insights.create('candidates');//will store the sidebar candidates on preview refresh
  sidebar_insights.create('actives');//will record the refreshed active list of active sidebars sent from the preview
  sidebar_insights.create('inactives');
  sidebar_insights.create('registered');
  sidebar_insights.create('available_locations');

  api.sidebar_insights = sidebar_insights;

  //backup the original intialize
  var _old_initialize = api.PreviewFrame.prototype.initialize;

  //captures some values on preview refresh
  //@todo there must be a simpler way...
  //=> using api.previewer.deferred.active.done() works on the first load but not after. The instance is not the same ?
  api.PreviewFrame.prototype.initialize = function( params, options ) {
    _old_initialize.call( this, params, options );

    //observe widget settings changes
    this.bind('houston-widget-settings', function(data) {
        //get the difference
        var _candidates = _.filter( data.registeredSidebars, function( sb ) {
          return ! _.findWhere( _wpCustomizeWidgetsSettings.registeredSidebars, { id: sb.id } );
        });

        var _inactives = _.filter( data.registeredSidebars, function( sb ) {
          return ! _.has( data.renderedSidebars, sb.id );
        });

        _inactives = _.map( _inactives, function(obj) {
          return obj.id;
        });

        var _registered = _.map( data.registeredSidebars, function(obj) {
          return obj.id;
        });

        api.sidebar_insights('actives').set( data.renderedSidebars );
        api.sidebar_insights('inactives').set( _inactives );
        api.sidebar_insights('registered').set( _registered );
        api.sidebar_insights('candidates').set( _candidates );
        api.sidebar_insights('available_locations').set( data.availableWidgetLocations );//built server side
    });


    this.bind( 'context-ready', function(data ) {
      api.contx('current').set( data );
    });

  };//initialize

  /*****************************************************************************
  * ADD SOME HELPERS AND PROPERTIES TO THE ALWAYS ACCESSIBLE API OBJECT.
  *****************************************************************************/
  api.hu_getDocSearchLink = function( text ) {
    text = ! _.isString(text) ? '' : text;
    var _searchtext = text.replace( / /g, '+'),
        _url = [ serverControlParams.docURL, 'search?query=', _searchtext ].join('');
    return [
      '<a href="' + _url + '" title="' + serverControlParams.translatedStrings.readDocumentation + '" target="_blank">',
      ' ',
      '<span class="fa fa-question-circle-o"></span>'
    ].join('');
  };


  api.hu_wp_builtin_settings = [
    'page_for_posts',
    'show_on_front',
    'blogname',
    'blogdescription'
  ];

  /*
  * @return string
  * simple helper to build the setting id name
  */
  api.hu_build_setId = function ( name ) {
    if ( _.has( api.hu_wp_builtin_settings, name ) )
      return name;
    return -1 == name.indexOf( serverControlParams.themeOptions ) ? [ serverControlParams.themeOptions +'[' , name  , ']' ].join('') : name;
  };

  //react to a contx change
  //api.contx('current').callbacks.add( function( e, o) {
    //console.log('the contx has been updated', e, o );
  //});

  // $( window ).on( 'message', function( e, o) {
  //   console.log('WHAT ARE WE LISTENING TO?', e, o );
  // });
})( wp.customize , jQuery, _);











/*****************************************************************************
* BASE CONTROL CLASS
*****************************************************************************/
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP
var HUBaseControlMethods = HUBaseControlMethods || {};

(function (api, $, _) {
  $.extend( HUBaseControlMethods, {

    initialize: function( id, options ) {
      var control = this;
      api.Control.prototype.initialize.call( control, id, options );

      //add a shortcut to the css properties declared in the php controls
      this.css_attr = _.has( options.params , 'css_attr') ? options.params.css_attr : {};

      //extend the control with new template Selectors
      $.extend( control, {
        viewTemplateEl : 'customize-control-' + options.params.type + '-view',
        viewContentTemplateEl : 'customize-control-' + options.params.type + '-view-content',
      } );
    },

    //called before rendering a view
    //can be overriden to set a specific view template depending on the model properties
    //@return string
    getTemplateEl : function( type, model ) {
      var control = this, _el;
      switch(type) {
        case 'view' :
          _el = control.viewTemplateEl;
          break;
        case 'view-content' :
          _el = control.viewContentTemplateEl;
          break;
      }
      if ( _.isEmpty(_el) ) {
        console.log('No valid template has been found in getTemplateEl()');
      } else {
        return _el;
      }
    },

    //adds action to an existing event map
    //@event map = [ {event1}, {event2}, ... ]
    //@new_event = {  trigger   : event name , actions   : [ 'cb1', 'cb2', ... ] }
    addActions : function( event_map, new_events ) {
      new_event_map = _.clone( this[event_map] );
      this[event_map] = _.union( new_event_map, ! _.isArray(new_events) ? [new_events] : new_events );
    },

    doActions : function( action, $dom_el, obj ) {
      $dom_el.trigger( action, obj );
    },

    //@return void()
    refreshPreview : function( obj ) {
      this.previewer.refresh();
    },


    _capitalize : function( string ) {
      if( ! _.isString(string) )
        return string;
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    _truncate : function( string, n, useWordBoundary ){
      var isTooLong = string.length > n,
          s_ = isTooLong ? string.substr(0,n-1) : string;
          s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
      return  isTooLong ? s_ + '...' : s_;
    }

  });//$.extend//HUBaseControlMethods
})( wp.customize , jQuery, _);