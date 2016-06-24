
//extends api.CZRModule
var CZRTextModuleMths = CZRTextModuleMths || {};

$.extend( CZRTextModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
                viewContentTemplateEl : 'czr-module-text-view-content',
          } );

          //console.log(' text module options', options );
          // //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          // module.inputConstructor = api.CZRInput.extend( module.CZRSocialsInputMths || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          module.itemConstructor = api.CZRItem.extend( module.CZRTextItem );

          //declares a default model
          module.defaultItemModel = {
                id : '',
                text : ''
          };

          console.log(' NEW TEXT MODEL : ', options, module.get() );

          //this is a static module. We only have one item
          //init module item if needed.
          if ( _.isEmpty( options.items ) ) {
                var def = _.clone( module.defaultItemModel );
                module.savedItems = [ $.extend( def, { id : module.id } ) ];
          } else {
                module.savedItems = options.items;
          }
  }//initialize
});