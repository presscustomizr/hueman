(function (api, $, _) {
  /*****************************************************************************
  * THE SCOPE MODEL
  *****************************************************************************/

  api.CZR_scopeModel = api.Class.extend( {
    initialize: function( name, options ) {

      var scope = this;

      //write the options as properties, name is included
      $.extend( scope, options || {} );

      //Make it observable with various Values
      scope.applied = new api.Value(); //is this scope the one that will be applied on front end in the current context?
      scope.priority = new api.Value(); //shall this scope always win or respect the default scopes priority
      scope.active = new api.Value(); //active, inactive. Are we currently customizing this scope ?
      scope.dirty = new api.Value(); //true or false : has this scope been customized ?
      scope.customizedValues = new api.Value();//stores the current customized value.

      //Setup listeners
      scope.active.callbacks.add(function(to){
        if ( ! to )
          return;

        //Do we need to populate the customizedValues ?
        if ( _.isEmpty(scope.customizedValues.get() ) ) {
            var _options = scope.getDBOptions( to.opt_name, to.dyn_type );

            //populate
            var _customizedValues = _.map( _options, function( val, key )  {
              return {
                key : { value : val, dirty : false }
              }
            });
        }

        scope.customizedValues.set( _customizedValues )


        //set this scope as the active one
      });

      //init the values
      scope.customizedValues.set({});
      scope.active.set( scope.is_default );
      scope.dirty.set( false );
      scope.applied.set( scope.is_winner );


      //populate the active
    },


    populateCustomizedValues: function() {

    },

    getDBOptions : function( opt_name, dyn_type ) {
      //if the requested opt set is global, then get it from the settings
      if ( serverControlParams.themeOptions == opt_name ) {
        return api.czr_scopeBase.globalSettingVal;
      }

      //@uses wp.ajax. See wp.ajax.send() in `wp-includes/js/wp-util.js`.
      var _options = '',
          _query = {
            data : {
              action : serverControlParams.optionAjaxAction,//theme dependant
              opt_name: opt_name,
              dyn_type: dyn_type,
              stylesheet : api.settings.theme.stylesheet
            }
          };

      wp.ajax.send( _query ).done( function( resp ){
        _options = resp;
      });
      return _options;
    }

  });//api.Class.extend()


})( wp.customize , jQuery, _);