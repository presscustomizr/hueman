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
  * ADD SOME HELPERS AND PROPERTIES TO THE ALWAYS ACCESSIBLE API OBJECT.
  *****************************************************************************/
  api.czr_getDocSearchLink = function( text ) {
    text = ! _.isString(text) ? '' : text;
    var _searchtext = text.replace( / /g, '+'),
        _url = [ serverControlParams.docURL, 'search?query=', _searchtext ].join('');
    return [
      '<a href="' + _url + '" title="' + serverControlParams.translatedStrings.readDocumentation + '" target="_blank">',
      ' ',
      '<span class="fa fa-question-circle-o"></span>'
    ].join('');
  };


  api.czr_wp_builtin_settings = [
    'page_for_posts',
    'show_on_front',
    'blogname',
    'blogdescription'
  ];

  /*
  * @return string
  * simple helper to build the setting id name
  */
  api.czr_build_setId = function ( name ) {
    if ( _.has( api.czr_wp_builtin_settings, name ) )
      return name;
    return -1 == name.indexOf( serverControlParams.themeOptions ) ? [ serverControlParams.themeOptions +'[' , name  , ']' ].join('') : name;
  };

  //@return bool
  //@uses api.czr_partials
  api.czr_has_part_refresh = function( setId ) {
    if ( ! _.has( api, 'czr_partials')  )
      return;
    return  _.contains( _.map( api.czr_partials.get(), function( partial, key ) {
      return _.contains( partial.settings, setId );
    }), true );
  };

  //react to a ctx change
  //api.czr_wp_conditionals.callbacks.add( function( e, o) {
    //console.log('the wp conditionals have been updated', e, o );
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
var CZRBaseControlMethods = CZRBaseControlMethods || {};

(function (api, $, _) {
  $.extend( CZRBaseControlMethods, {

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

  });//$.extend//CZRBaseControlMethods
})( wp.customize , jQuery, _);