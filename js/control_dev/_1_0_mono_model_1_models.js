//extends api.CZRBaseControl
var CZRMonoModelMethods = CZRMonoModelMethods || {};

  $.extend( CZRMonoModelMethods , {
    //The idea is to send only the currently modified model instead of the entire collection
    //the entire collection is sent anyway on api(setId).set( value ), and accessible in the preview via api(setId).bind( fn( to) )
    _sendModel : function( to, from ) {
          var monoModel = this,
              control = monoModel.model_control,
              _changed_props = [];

          //which property(ies) has(ve) changed ?
          _.each( from, function( _val, _key ) {
                if ( _val != to[_key] )
                  _changed_props.push(_key);
          });

          _.each( _changed_props, function( _prop) {
                control.previewer.send( 'sub_setting', {
                      set_id : control.id,
                      model_id : to.id,
                      changed_prop : _prop,
                      value : to[_prop]
                });

                //add a hook here
                control.doActions('after_sendModel', $view, { model : to , dom_el: monoModel.container, changed_prop : _prop } );
          });
    }


  });//$.extend

