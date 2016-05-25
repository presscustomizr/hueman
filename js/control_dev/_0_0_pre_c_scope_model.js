(function (api, $, _) {
  /*****************************************************************************
  * THE SCOPE MODEL
  *****************************************************************************/
  // 'level'         => '_all_',
  // 'dyn_type'    => 'option',
  // 'opt_name'    => HU_THEME_OPTIONS,
  // 'is_default'  => true,
  // 'is_winner'   => false
  api.CZR_scopeModel = api.Class.extend( {
    initialize: function( name, options ) {
          var scope = this;
          scope.options = options;
          //write the options as properties, name is included
          $.extend( scope, options || {} );

          //Make it alive with various Values
          scope.winner      = new api.Value(); //is this scope the one that will be applied on front end in the current context?
          scope.priority    = new api.Value(); //shall this scope always win or respect the default scopes priority
          scope.active      = new api.Value(); //active, inactive. Are we currently customizing this scope ?
          scope.dirtyness   = new api.Value(); //true or false : has this scope been customized ?

          //setting values are stored in :
          scope.dbValues    = new api.Value();
          scope.dirtyValues = new api.Value();//stores the current customized value.
    },


    //this scope model is instantiated at this point.
    ready : function() {
          var scope = this;
          //INSTANTIATE THE SCOPE VIEW : EMBED AND SET DOM ALIVE
          scope.view = new api.CZR_scopeView( name, scope.options );

          //LISTEN TO ACTIVE
          scope.active.callbacks.add(function() { return scope.activeStateModelCallbacks.apply(scope, arguments ); } );

          //LISTEN TO DIRTYNESS
          scope.dirtyValues.callbacks.add( function(to){
            //set the model dirtyness boolean state value
            scope.dirtyness.set( ! _.isEmpty(to) );
          });

          //init the values
          scope.dirtyValues.set({});
          scope.dbValues.set( _.isEmpty(scope.db) ? {} : scope.db );
          scope.active.set( scope.is_default );
          scope.dirtyness.set( false );
          scope.winner.set( scope.is_winner );
    },


    /*****************************************************************************
    * VALUES CALLBACKS
    *****************************************************************************/
    activeStateModelCallbacks : function(to){
          var scope = this;

          //when becoming inactive
          //store the dirtyValues
          // if ( ! to ) {
          //   scope.storeDirtyness();
          //   return;
          // }

          //When becoming active :
            //1) fetch the option if needed
            //2) update the setting values

          //What are the setting values ?
          //when switching to a new scope, we need to re-build a complete set of values from :
            //1) values saved in the database (only some)
            //2) values already made dirty in the customizer(only some)
            //3) default values(all)

          //=> fetch the values from the db. on done(), build the full set and update all eligible settings values
          //How to build the full set ?
            //If not global, local for ex. :
            //1) check if scope.dbValues() is _dirty (has not been set yet), and if so, attempt to fetch the values from the db and populate it
            //2) then check the dirtyness state of this scope. If it's dirty (has been customized), then incomplete_set = $.extend( dbValues, dirtyValues );
            //3) then $.extend( initialglobalvalues, incomplete_set ) to get the full set of option.
            //IMPORTANT : if dbValues have to be fetched, always wait for the done() ajax, because asynchronous.

            //if the current scope is 'global'
            //=> build the full set with $.extend( initialglobalvalues, dirtyValues )


    },


    storeDirtyness : function() {
          var scope = this;
          scope.dirtyValues.set( scope.getDirties() );
    },


    getDirties : function() {
          var scope = this,
              _dirtyCustomized = {};
          //populate with the current scope settings dirtyValues
          api.each( function ( value, key ) {
            if ( value._dirty ) {
              var _k = key.replace(serverControlParams.themeOptions, '').replace(/[|]/gi, '' );
              _dirtyCustomized[ _k ] = { value : value(), dirty : value._dirty };
            }
          } );
          return _dirtyCustomized;
    },



    setSettingsValue : function() {
          //TEST UPDATE DYNAMIC STYLE CHECKBOX ON SWITCH
          if ( 'trans' == to.dyn_type ) {
            api('hu_theme_options[dynamic-styles]').set(true);
            //api('hu_theme_options[dynamic-styles]').set(23);
            $('input[type=checkbox]', api.control('hu_theme_options[dynamic-styles]').container ).iCheck('update');
          }

          //TEST UPDATE FONT SELECT ON SWITCH
          if ( 'trans' == to.dyn_type ) {
            api('hu_theme_options[font]').set('raleway');
            //api('hu_theme_options[dynamic-styles]').set(23);
            $('select[data-customize-setting-link]', api.control('hu_theme_options[font]').container ).selecter('destroy').selecter();
          }

          var _img_id = 'trans' == to.dyn_type ? 23 : 25;
          //TEST UPDATE LOGO ON SWITCH
          api.control('hu_theme_options[custom-logo]').container.remove();

          api.control.remove('hu_theme_options[custom-logo]');

          var _constructor = api.controlConstructor['czr_cropped_image'];
          var _data = api.settings.controls['hu_theme_options[custom-logo]'];
          api('hu_theme_options[custom-logo]').set(_img_id);

          //add the control when the new image has been fetched asynchronously.
          wp.media.attachment( _img_id ).fetch().done( function() {
            _data.attachment = this.attributes;
            api.control.add(
            'hu_theme_options[custom-logo]',
              new _constructor('hu_theme_options[custom-logo]', { params : _data, previewer :api.previewer })
            );
          } );

    },





    /////////////////////////
    //AJAX STUFFS
    ////////////////////////
    //if the current scope is global, then get it from the settings
          // if ( serverControlParams.themeOptions == scope.opt_name ) {
          //   return api.czr_scopeBase.getGlobalSettingVal();
          // }

          // //@uses wp.ajax. See wp.ajax.send() in `wp-includes/js/wp-util.js`.
          // var _options = '',
          //     _query = {
          //       data : {
          //         action : serverControlParams.optionAjaxAction,//theme dependant
          //         opt_name: scope.opt_name,
          //         dyn_type: scope.dyn_type,
          //         stylesheet : api.settings.theme.stylesheet
          //       }
          //     };

          // console.log('before ajax send request : ', scope.name, scope, to , serverControlParams.themeOptions, scope.opt_name );

          // wp.ajax.send( _query ).done( function( resp ){
          //   _options = resp;
          //   console.log('AJAX RESPONSE IN DONE() : ', resp);
          // });
    getDBOptions : function( opt_name, dyn_type ) {
          //if the requested opt set is global, then get it from the settings
          if ( serverControlParams.themeOptions == opt_name ) {
            return api.czr_scopeBase.getGlobalSettingVal();
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
    },
  });//api.Class.extend()


})( wp.customize , jQuery, _);