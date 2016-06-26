//extends api.Value
//options:
  // id : item.id,
  // item_model : item,
  // defaultItemModel : module.defaultItemModel,
  // module : module,
  // is_added_by_user : is_added_by_user || false
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  //creates the inputs based on the rendered items
  setupInputCollection : function() {
        var item = this,
            module = item.module;

        //INPUTS => Setup as soon as the view content is rendered
        //the item is a collection of inputs, each one has its own view module.
        item.czr_Input = new api.Values();

        //this can be overriden by extended classes to add and overrides methods
        item.inputConstructor = module.inputConstructor;

        if ( _.isEmpty(item.defaultItemModel) || _.isUndefined(item.defaultItemModel) ) {
          throw new Error('No default model found in item ' + item.id + '. Aborting');
        }

        //prepare and sets the item value on api ready
        //=> triggers the module rendering + DOM LISTENERS
        var initial_item_model = item.initial_item_model;

        if ( ! _.isObject(initial_item_model) )
          initial_item_model = item.defaultItemModel;
        else
          initial_item_model = $.extend( item.defaultItemModel, initial_item_model );

        var input_collection = {};

        //creates the inputs based on the rendered items
        $( '.'+module.control.css_attr.sub_set_wrapper, item.container).each( function( _index ) {
              if ( ! $(this).find('[data-type]').length ) {
                  console.log('No data-type found in the input wrapper index : ' + _index + ' in item : '+ item.id );
                  return;
              }
              var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index,
                  _value = _.has( initial_item_model, _id) ? initial_item_model[_id] : '';

              item.czr_Input.add( _id, new item.inputConstructor( _id, {
                    id : _id,
                    type : $(this).attr('data-input-type'),
                    input_value : _value,
                    container : $(this),
                    item : item,
                    module : module
              } ) );
              //populate the collection
              input_collection[_id] = _value;
        });//each

        //say it
        item.trigger('input_collection_populated', $.extend( initial_item_model, input_collection ));
  },

  removeInputCollection : function() {
        var item = this;
        item.czr_Input.each( function( input ) {
            console.log('remove input', input.id, item.czr_Input(input.id) );
            item.czr_Input.remove( input.id );
            console.log('input removed ?', item.czr_Input(input.id) );
        });
  }


});//$.extend