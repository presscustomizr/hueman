
//extends api.Value
var CZRColumnMths = CZRColumnMths || {};

//extends api.Value
//a column is instanciated with the typical set of options :
// id : column.id,
// initial_column_model : column_model,
// sektion : sekItem,
// module : sekItem.item_module.id,
// control : sekItem.item_module.control.id,
// is_added_by_user : is_added_by_user || false
$.extend( CZRColumnMths , {
    initialize: function( name, options ) {
          var column = this;
          api.Value.prototype.initialize.call( column, null, options );

          //write the options as properties, name is included
          $.extend( column, options || {} );

          column.embedded = $.Deferred();

          //set the instance value
          column.set( column.initial_column_model );

          //defer the column rendering when the parent sektion content is rendered
          column.sektion.contentRendered.done(function() {
                column.container = column.render();
                //say it
                column.embedded.resolve();
                //react to column collection changes
                column.callbacks.add( function() { return column.columnReact.apply(column, arguments ); } );
          });

          ////////////////////////////////////////////////////
          /// COLUM DOM EVENT MAP
          ////////////////////////////////////////////////////
          column.column_event_map = [
                //add new element : open the dialog box
                {
                  trigger   : 'click keydown',
                  selector  : [ '.d-new-module' ],
                  name      : 'add_new_module',
                  actions   : ['addModule'],
                },
          ];//module.module_event_map

          column.embedded.done(function() {
                console.log('column.container', column.container);
                //Setup the column event listeners
                api.CZR_Helpers.setupDOMListeners(
                    column.column_event_map,//actions to execute
                    { dom_el : column.container },//dom scope
                    column//instance where to look for the cb methods
                );
          });
    },

    //fired on parent section contentRendered.done()
    render : function() {
          var column   = this;
          $view     = $( wp.template('czr-sektion-column')( {id: column.id}) );
          $view.appendTo( $('.czr-column-wrapper', column.sektion.container ) );
          return $view;
    },

    //cb of column.callbacks.add()
    //the job is this callback is to inform the parent sektion collection that something happened
    //typically, a module has been added
    columnReact : function( to ,from ) {
          this.sektion.updateColumnCollection( {column : to });
    },


    //fired on DOM user action
    //=> in the future, the element to instantiate will be stored in a pre element Value(), just like the pre Item idea
    addModule : function( obj  ) {
          console.log('in add Module');
          var _current_module_collection = api('hu_theme_options[module-collection]').get() || [];

          var column = this,
              element = {
                id : 'text_module_' + ( _current_module_collection.length + 1 ),//@todo => unique module id generator, based on the module collection
                module_type : 'czr_text_module',
                column : column.id,
                sektion : column.sektion
          };

          api.control('hu_theme_options[module-collection]').instantiateModule( element, {}, true ); //element, constructor, added_by_user
    }

});//$.extend