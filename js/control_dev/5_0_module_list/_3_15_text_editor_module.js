//extends api.CZRDynModule

var CZRTextEditorModuleMths = CZRTextEditorModuleMths || {};

$.extend( CZRTextEditorModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRModule.prototype.initialize.call( module, id, options );

          //this module is not sortable
          module.is_sortable = false;

          //extend the module with new template Selectors
          $.extend( module, {
                singleModuleWrapper : 'czr-single-module-wrapper',
                viewTemplateEl : 'czr-module-item-view',
                viewContentTemplateEl : 'czr-module-text_editor-view-content',
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

          //this is a static module. We only have one item
          module.savedItems = _.isEmpty( options.items ) ? [ module._initNewItem( module.defaultItemModel ) ] : options.items;
 
          module.embedded = $.Deferred();
          
          var module_wrapper_tmpl = wp.template( module.singleModuleWrapper ),
            tmpl_data = {
                id : module.id,
                type : module.module_type
            };

          var $_module_el = $(  module_wrapper_tmpl( tmpl_data ) );

          api.section( module.control.section() ).expanded.bind(function(to) {

            if ( ! to || ! _.isEmpty( module.get() ) )
              return;

            if ( false !== module.container.length ) {
              //say it*/
              module.container.append( $_module_el );
              module.embedded.resolve();
            }

            module.ready();
          });
  },//initialize




  CZRTextEditorInputMths : {
  },//CZRTextEditorsInputMths



  CZRTextEditorItem : {

  },
});