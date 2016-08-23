//extends api.CZRDynModule

var CZRTextEditorModuleMths = CZRTextEditorModuleMths || {};

$.extend( CZRTextEditorModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
                itemInputList : 'czr-module-text_editor-item-content'
          } );

          //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          module.inputConstructor = api.CZRInput.extend( module.CZRTextEditorInputMths || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          module.itemConstructor = api.CZRItem.extend( module.CZRTextEditorItem || {} );

          //declares a default model
          this.defaultItemModel   = {
            id : '',
            text: ''
          };

          // api.section( module.control.section() ).expanded.bind(function(to) {

          //   // if ( false !== module.container.length ) {
          //   //   //say it*/
          //   //   module.container.append( $_module_el );
          //   //   module.embedded.resolve();
          //   // }

          //   if ( 'resolved' == module.isReady.state() )
          //     return;

          //   module.ready();
          // });
  },//initialize




  CZRTextEditorInputMths : {
  },//CZRTextEditorsInputMths



  CZRTextEditorItem : {

  },
});