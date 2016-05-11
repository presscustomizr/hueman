(function (api, $, _) {
  /*****************************************************************************
  * THE SCOPE COLLECTION
  *****************************************************************************/
  api.bind( 'ready' , function() {
    api.czr_scopeBase = new api.CZR_scopeBase();
  } );

  api.CZR_scopeBase = api.Class.extend( {
    globalSettingVal : {},//will store the global setting val. Populated on init.

    initialize: function() {
          var self = this;
          this.globalSettingVal = this.getGlobalSettingVal();

          //WHAT IS A SCOPE ?
          //A scope is an object describing a set of options for a given customization scope
          //It is constructed by the czr_scopeModel constructor
          //it has a model with the following properties
          // - a name : 'global', 'all_posts'
          // - a corresponding database option name
          // - a database option type (dyn_type)
          // - a customization status : active, inactive. Are we currently customizing this scope ?
          // - a priority status that can be forced
          // - an applied status => is this scope the one that will be applied on front end in the current context?
          //  => this status depends on :
          //      1) a default priority local (post id ) > global specific (all posts) > global (default options)
          //      2) a user decision : a priority can be forced. For example who is the winner when two categories have been customized ?
          // - a dirtyness status : has this scope been customized ?
          // - a set of values, each one having a dirtyness state => the  : { optname#2 : { value : ..., _dirty : bool }, optname#2 : {...}, ...  }
          //
          // It is rendered with a view which includes DOM listeners.
          // Users can :
          //  - customize each scope separately,
          //  - force a priority
          //  - reset a scope set of option
          //  - copy the values of one scope to another
          //
          //  What is the default scope ?
          //  - 'global' when accessing the customizer from appearance > customize
          //  - 'local' when customizing from the front end, or an edit screen : post (post, cpt, page, attachment), tax term, user
          //
          //  What are the options eligibile for the scope customization ?
          //  - the scope customization can be applied to all theme settings 'hu_theme_options'. The option not eligible have been flagged 'no-scope' when registered server side.
          //  - the WP built-in settings like blogname, site-icon,... are also eligible
          //  - all other settings like menu, widgets, sidebars are excluded for the moment.
          //
          //  On init, the default scope is set as active.
          //  if the default scope is not 'global', then the switch to the relevant scope is triggered and the eligible settings values are updated "silently"
          //  the dirties are stored in each scope models when the user customize
          //
          //
          //  On scope switch,
          //  1) the values of the dirty values of the current scope are stored in the model
          //  2) the values of the new scope are fetched from the db if they have not been yet.
          //  3) all eligible settings are updated with the new values.
          //  4) if the new scope has no dirty value yet, the saved state is reset.


          //SCOPE COLLECTION LISTENER
          //setup the callbacks of the scope collection update
          //on init and on preview change : the collection of scopes is populated with new scopes
          //=> instanciate the relevant scope object + render them
          this.listenToScopeCollection();


          //REACT TO ACTIVE SCOPE UPDATE
          this.listenToActiveScope();
    },

    //setup the czr_scopeCollection('collection') callbacks
    //fired in initialize
    listenToScopeCollection : function() {
          var self = this;
          //REACT TO SCOPE UPDATE : embed or refresh dialog when the scopes have been updated
          api.czr_scopeCollection('collection').callbacks.add( function(to, from) {

              //Create Scopes
              _.map( to, function( data , name ) {
                api.czr_scope.add(
                  name,
                  new api.CZR_scopeModel( name, _.extend( data, {name : name} ) )
                );
              });


              //DOM ACTIONS
              self.embedDialogBox( to ).listenToScopeSwitch(to);

              console.log('BEFORE',  api.czr_scopeCollection('active').get() );
              //set the active scope as global
              api.czr_scopeCollection('active').set( to.global );
              console.log('AFTER',  api.czr_scopeCollection('active').get() );
          });
    },//listenToScopeCollection()


    //fired in initialize
    listenToActiveScope : function() {
          var self = this;
          api.czr_scopeCollection('active').callbacks.add( function(to, from) {

              self.setScopeSwitcherButtonActive(to.dyn_type);

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


          });
    },


    /*****************************************************************************
    * HELPERS
    *****************************************************************************/
    getGlobalSettingVal : function() {
      var _vals = {};
      //parse the current eligible scope settings and write an setting val object
      api.each( function ( value, key ) {
        //only the current theme options are eligible
        if ( -1 == key.indexOf(serverControlParams.themeOptions) )
          return;
        var _k = key.replace(serverControlParams.themeOptions, '').replace(/[|]/gi, '' );
        _vals[_k] = { value : value(), dirty : value._dirty };
      });
      return _vals;
    },






    /*****************************************************************************
    * DOM : RENDERING AND EVENT LISTENERS
    *****************************************************************************/
    embedDialogBox : function(scopes) {
          //@todo will need to be refreshed on scopes change in the future
          if ( $('#customize-header-actions').find('.czr-scope-switcher').length )
            return this;

          $('#customize-header-actions').append(
            $('<div/>', {
              class:'czr-scope-switcher',
              html:'<span data-dyn-type="trans" class="czr-local-scope button">This page</span> <span data-dyn-type="option" class="czr-global-scope button">Global</span>'
            })
          );
          return this;
    },

    listenToScopeSwitch : function() {
          $('.czr-scope-switcher .button', '#customize-header-actions').on('click keydown', function( e, event_params ) {
              //particular treatment
              if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                return;
              }
              e.preventDefault(); // Keep this AFTER the key filter above)

              var _dyn_type   = $( e.currentTarget).attr('data-dyn-type'),
                  _new_scope  = _.findWhere( api.czr_scopeCollection('collection').get() , { dyn_type : _dyn_type });

              api.czr_scopeCollection('active').set( _new_scope );

          });//.on()
    },

    setScopeSwitcherButtonActive : function( dyn_type ) {
          $('.button', '.czr-scope-switcher').each( function( ind ) {
            $(this).toggleClass( 'active', dyn_type == $(this).attr('data-dyn-type') );
          });
    }
  });//api.Class.extend()


})( wp.customize , jQuery, _);