//extends api.CZRBaseControl
var CZRStaticMethods = CZRStaticMethods || {};
(function (api, $, _) {

  $.extend( CZRStaticMethods , {
    initialize: function( id, options ) {
          var control = this;
          api.CZRBaseControl.prototype.initialize.call( control, id, options );

          ////////////////////////////////////////////////////
          /// SET UP THE MODEL (DB OPTION) AS AN OBSERVABLE VALUE
          ////////////////////////////////////////////////////
          control.czr_Model = new api.Value();

          //the model is a collection of sub models, each one has its view element.
          control.czr_subModel = new api.Values();

          control.defaultModel = {};

    },//initialize


    ready: function() {
          var control  = this;
          api.bind( 'ready', function() {
            if ( _.isEmpty(control.defaultModel) || _.isUndefined(control.defaultModel) ) {
              throw new Error('No default model found in multi input control ' + control.id + '. Aborting');
            }
            //sets the model value on api ready
            //=> triggers the control rendering + DOM LISTENERS
            control.czr_Model.set( _.extend( control.defaultModel, api(control.id).get() ) );

            //control.setupDOMListeners( control.control_event_map , { dom_el : control.container } );
            control.renderView();

            //creates the subModels based on the rendered items
            $( '.'+control.css_attr.sub_set_wrapper, control.container).each( function(_index) {
              var _id = $(this).find('[data-type]').attr('data-type') || 'sub_set_' + _index;

              control.czr_subModel.add(_id, new control.CZR_subModel( _id, {
                id : _id,
                value : $(this).find('[data-type]').val(),
                container : $(this),
                control : control
              } ) );
            });

            //listens and reacts to the model changes
            control.czr_Model.callbacks.add(function(to, from) {
              api(control.id).set(to);
            });
          });
    }

  });//$.extend

})( wp.customize, jQuery, _);
