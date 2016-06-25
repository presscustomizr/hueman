//BASE CONTROL CLASS
//extends api.Control
//define a set of methods, mostly helpers, to extend the base WP control class
//this will become our base constructor for main complex controls
//EARLY SETUP

var CZRBaseControlMths = CZRBaseControlMths || {};

$.extend( CZRBaseControlMths, {

  initialize: function( id, options ) {
          var control = this;
          //add a shortcut to the css properties declared in the php controls
          control.css_attr = _.has( serverControlParams , 'css_attr') ? serverControlParams.css_attr : {};
          api.Control.prototype.initialize.call( control, id, options );
  },

  //@return void()
  refreshPreview : function( obj ) {
          this.previewer.refresh();
  }

});//$.extend//CZRBaseControlMths