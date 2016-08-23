
//extends api.CZRModule
var CZRTextModuleMths = CZRTextModuleMths || {};

$.extend( CZRTextModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
                itemInputList : 'czr-module-text-view-content',
          } );

          //declares a default model
          module.defaultItemModel = {
                id : '',
                text : ''
          };
  }//initialize
});