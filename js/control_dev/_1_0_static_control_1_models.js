//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};
(function (api, $, _) {

  $.extend( CZRStaticMethods , {

    //////////////////////////////////////////////////
    /// MODEL
    //////////////////////////////////////////////////
    //fired after a input change is detected
    updateModel : function( obj ) {

      //get the changed property and val
      //=> all html input have data-type attribute corresponding to the ones stored in the model
      var control           = this,
          $_changed_input   = $(obj.dom_event.currentTarget, obj.dom_el ),
          _changed_prop     = $_changed_input.attr('data-type'),
          _new_val          = $( $_changed_input, obj.dom_el ).val(),
          _current_model    = control.czr_Model.get(),
          _new_model        = _.clone( _current_model );//initialize it to the current value

      console.log('NEW MODEL', _changed_prop, _current_model, _new_model, _.isObject(_new_model) );
      //make sure the _new_model is an object and is not empty
      _new_model =  ( ! _.isObject(_new_model) || _.isEmpty(_new_model) ) ? {} : _new_model;

      //set the new val to the changed property
      _new_model[_changed_prop] = _new_val;

      control.czr_Model.set(_new_model);

      //say it to the current view
      control.doActions(
        _changed_prop + ':changed',
        obj.dom_el,
        { model : _new_model }
      );
    }

  });//$.extend

})( wp.customize, jQuery, _);
