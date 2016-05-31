//BASE CONTROL CLASS
//extends api.Control
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP

var CZRBaseControlMethods = CZRBaseControlMethods || {};

$.extend( CZRBaseControlMethods, {

  initialize: function( id, options ) {
          var control = this;
          api.Control.prototype.initialize.call( control, id, options );

          //add a shortcut to the css properties declared in the php controls
          control.css_attr = _.has( serverControlParams , 'css_attr') ? serverControlParams.css_attr : {};

          //extend the control with new template Selectors
          $.extend( control, {
            viewTemplateEl : 'customize-control-' + options.params.type + '-view',
            viewContentTemplateEl : 'customize-control-' + options.params.type + '-view-content',
          } );
  },

  //////////////////////////////////////////////////
  /// HELPERS
  //////////////////////////////////////////////////
  _capitalize : function( string ) {
          if( ! _.isString(string) )
            return string;
          return string.charAt(0).toUpperCase() + string.slice(1);
  },

  _truncate : function( string, n, useWordBoundary ){
          if ( _.isUndefined(string) )
            return '';
          var isTooLong = string.length > n,
              s_ = isTooLong ? string.substr(0,n-1) : string;
              s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
          return  isTooLong ? s_ + '...' : s_;
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

  //@return void()
  refreshPreview : function( obj ) {
          this.previewer.refresh();
  }

});//$.extend//CZRBaseControlMethods