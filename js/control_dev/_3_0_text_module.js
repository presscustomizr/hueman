
//extends api.CZRModule
var CZRTextModuleMths = CZRTextModuleMths || {};

$.extend( CZRTextModuleMths, {
  initialize: function( id, options ) {
          var module = this;
          //run the parent initialize
          api.CZRModule.prototype.initialize.call( module, id, options );

          //extend the module with new template Selectors
          $.extend( module, {
                singleModuleWrapper : 'czr-single-module-wrapper',
                viewTemplateEl : 'czr-module-text-item-view',
                viewContentTemplateEl : 'czr-module-text-view-content',
          } );

          console.log(' text module options', options );
          // //EXTEND THE DEFAULT CONSTRUCTORS FOR INPUT
          // module.inputConstructor = api.CZRInput.extend( module.CZRSocialsInputMths || {} );
          //EXTEND THE DEFAULT CONSTRUCTORS FOR MONOMODEL
          module.itemConstructor = api.CZRItem.extend( module.CZRTextItem || {} );

          //declares a default model
          module.defaultItemModel = {
                id : '',
                text : ''
          };

          //this is a static module. We only have one item
          module.savedItems = _.isEmpty( options.items ) ? [ module._initNewItem( module.defaultItemModel ) ] : options.items;

          //embed : define a container, store the embed state, fire the render method
          module.embedded = $.Deferred();
          module.container = module.renderModuleWrapper();
          if ( false !== module.container.length ) {
              //say it
              module.embedded.resolve();
          }

          console.log('text module.savedItems', module.savedItems );
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
          throw new Error('No template for item ' + item.id + '. The template script id should be : #tmpl-' + module.singleModuleWrapper );
        }

        var module_wrapper_tmpl = wp.template( module.singleModuleWrapper ),
            tmpl_data = {
                id : module.id,
                type : module.type
            };

        var $_module_el = $(  module_wrapper_tmpl( tmpl_data ) );
        //append the module wrapper to the column
        $( '.czr-static-module-wrapper' , module._getColumn().container).append( $_module_el );

        return $_module_el;
  },


  ready : function() {
          var module = this;

          module.populateItemCollection();

          //listen to module change
          module.callbacks.add( function() { return module.moduleReact.apply(module, arguments ); } );
  },


  _getColumn : function() {
          var module = this;
          return module.sektion.czr_Column(module.column);
  },

  _getSektion : function() {

  },


  CZRTextItem : {
          //overrides parent
          setupView : function( item_model ) {
                var item = this,
                    module = this.item_module;

                item.container = item.renderView( item_model );
                if ( _.isUndefined(item.container) || ! item.container.length ) {
                    throw new Error( 'In setupView the Item view has not been rendered : ' + item.id );
                } else {
                    //say it
                    item.embedded.resolve();
                }


                //defer actions on item view embedded
                item.embedded.done( function() {
                      //add a listener on view state change
                      //=> view content rendering + takes care of input instantation
                      item.czr_View.callbacks.add( function() { return item.setupViewStateListeners.apply(item, arguments ); } );

                      //we don't need to hide the item, there's only one.
                      item.setViewVisibility( {}, true );
                });
          },


  }

});
