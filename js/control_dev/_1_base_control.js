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