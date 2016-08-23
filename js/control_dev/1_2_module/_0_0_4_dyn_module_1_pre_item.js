//MULTI CONTROL CLASS
//extends api.CZRBaseControl
//
//Setup the collection of items
//renders the control view
//Listen to items collection changes and update the control setting

var CZRDynModuleMths = CZRDynModuleMths || {};

$.extend( CZRDynModuleMths, {
  // updatePreModel : function(obj) {
  //       //get the changed property and val
  //       //=> all html input have data-type attribute corresponding to the ones stored in the item
  //       var control           = this,
  //           $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
  //           _changed_prop     = $_changed_input.attr('data-type'),
  //           _new_val          = $( $_changed_input, obj.dom_el ).val(),
  //           _new_item        = _.clone(control.czr_preItem('item').get());//initialize it to the current value

  //       //make sure the title has not been emptied. If so, replace it with the default title.
  //       if ( 'title' == _changed_prop && _.isEmpty(_new_val) ) {
  //         _defaultModel = control.getDefaultModel();
  //         _new_val = _defaultModel.title;
  //       }

  //       _new_item[_changed_prop] = _new_val;

  //       //set the new val to preItem Value()
  //       control.czr_preItem('item').set(_new_item);

  //       control.doActions(
  //         'pre_item:' + _changed_prop + ':changed',
  //         control.container,
  //         { item : _new_item, dom_el : $('.' + control.css_attr.pre_add_item_content, control.container ) }
  //       );
  // }

});//$.extend//CZRBaseControlMths