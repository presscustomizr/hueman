
//extends api.CZRModule
var CZRTextModuleMths = CZRTextModuleMths || {};

$.extend( CZRTextModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRModule.prototype.initialize.call( module, id, options );

          //this module is not sortable
          module.is_sortable = false;

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
  },//initialize

  //extends api.CZRItem
  CZRTextItem : {
          //overrides parent
          setupView : function( item_model ) {

                var item = this,
                    module = this.module;

                item.container = item.renderView( item_model );
                console.log('in SETUP VIEW', item.container);
                if ( _.isUndefined(item.container) || ! item.container.length ) {
                    throw new Error( 'In setupView the Item view has not been rendered : ' + item.id );
                } else {
                    //say it
                    item.embedded.resolve();
                }


                //defer actions on item view embedded
                item.embedded.done( function() {
                        var item_model = item.get() || item.initial_item_model;//could not be set yet
                      //render and setup view content if needed
                        if ( 'pending' == item.contentRendered.state() ) {
                            var $item_content = item.renderViewContent( item_model );
                            if ( ! _.isUndefined($item_content) && false !== $item_content ) {
                              //say it
                              item.contentRendered.resolve();
                            }
                        }
                        //create the collection of inputs if needed
                        if ( ! _.has(item, 'czr_Input') ) {
                          item.setupInputCollection();
                        }
                });
          },
  }

});