//extends api.Value
//options:
  // item_id : item.id,
  // item_model : item,
  // defaultItemModel : module.defaultItemModel,
  // item_module : module,
  // is_added_by_user : is_added_by_user || false
var CZRItemMths = CZRItemMths || {};
$.extend( CZRItemMths , {
  //creates the inputs based on the rendered items
  setupInputCollection : function() {
        var item = this,
            module = item.item_module;

        //INPUTS => Setup as soon as the view content is rendered
        //the item is a collection of inputs, each one has its own view module.
        item.czr_Input = new api.Values();

        //this can be overriden by extended classes to add and overrides methods
        item.inputConstructor = module.inputConstructor;

        if ( _.isEmpty(item.defaultItemModel) || _.isUndefined(item.defaultItemModel) ) {
          throw new Error('No default model found in item ' + item.item_id + '. Aborting');
        }

        //prepare and sets the item value on api ready
        //=> triggers the module rendering + DOM LISTENERS
        var initial_input_values = item.initial_input_values;

        if ( ! _.isObject(initial_input_values) )
          initial_input_values = item.defaultItemModel;
        else
          initial_input_values = $.extend( item.defaultItemModel, initial_input_values );

        var input_collection = {};

        //creates the inputs based on the rendered items
        $( '.'+module.control.css_attr.sub_set_wrapper, item.container).each( function(_index) {

              var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index,
                  _value = _.has( initial_input_values, _id) ? initial_input_values[_id] : '';

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
        item.trigger('input_collection_populated', $.extend( initial_input_values, input_collection ));
  }


});//$.extend