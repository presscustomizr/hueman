
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
                singleModuleWrapper : 'czr-single-module-wrapper',
                ruModuleEl : 'czr-ru-module-sektion-content',
                viewTemplateEl : 'czr-ru-module-item-view',
                viewContentTemplateEl : 'czr-module-text-view-content',
          } );

          //console.log(' text module options', options );
          // //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          // module.inputConstructor = api.CZRInput.extend( module.CZRSocialsInputMths || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          module.itemConstructor = api.CZRItem.extend( module.CZRTextItem || {} );

          //declares a default model
          module.defaultItemModel = {
                id : '',
                text : ''
          };

          console.log(' NEW TEXT MODEL : ', options, module.get(), module._initNewItem( module.defaultItemModel ) );

          //this is a static module. We only have one item
          //init module item if needed.
          if ( _.isEmpty( options.items ) ) {
                var def = _.clone( module.defaultItemModel );
                module.savedItems = [ $.extend( def, { id : module.id } ) ];
          } else {
                module.savedItems = options.items;
          }

          module.container = module.renderModuleWrapper();
          if ( false !== module.container.length ) {
              //say it
              module.embedded.resolve();
          }

          //console.log('text module.savedItems', module.savedItems );
          module.ready();
  },//initialize


  renderModuleWrapper : function() {
          //=> an array of objects
        var module = this;

        //has this module view already been rendered?
        if ( 'resolved' == module.embedded.state() )
          return module.container;

         //do we have view template script?
        if ( 0 === $( '#tmpl-' + module.singleModuleWrapper ).length ) {
          throw new Error('No template for module ' + module.id + '. The template script id should be : #tmpl-' + module.singleModuleWrapper );
        }

        var module_wrapper_tmpl = wp.template( module.singleModuleWrapper ),
            tmpl_data = {
                id : module.id,
                type : module.module_type
            },
            $_module_el = $(  module_wrapper_tmpl( tmpl_data ) );
        //append the module wrapper to the column
        $( '.czr-module-collection-wrapper' , module._getColumn().container).append( $_module_el );

        //then append the ru module template
        var mod_content_wrapper_tmpl = wp.template( module.ruModuleEl ),
            $_mod_content_wrapper = $(  mod_content_wrapper_tmpl( tmpl_data ) );

        $( '.czr-mod-content', $_module_el).append( $_mod_content_wrapper );

        return $_module_el;
  },


  _getColumn : function() {
          var module = this,
              main_sektion_module_instance = module.control.syncSektionModule.get();

          return main_sektion_module_instance.czr_Column( module.column_id );
  },

  _getSektion : function() {

  },

  //extends api.CZRItem
  CZRTextItem : {
          //overrides parent
          setupView : function( item_model ) {
                var item = this,
                    module = this.module;

                item.container = item.renderView( item_model );
                if ( _.isUndefined(item.container) || ! item.container.length ) {
                    throw new Error( 'In setupView the Item view has not been rendered : ' + item.id );
                } else {
                    //say it
                    item.embedded.resolve();
                }


                //defer actions on item view embedded
                item.embedded.done( function() {
                        var item_model = item.get() || item.initial_item_model;//could not be set yet
                        console.log('item_model', item_model);
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
