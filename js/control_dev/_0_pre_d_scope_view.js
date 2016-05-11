(function (api, $, _) {
  /*****************************************************************************
  * THE SCOPE VIEW
  *****************************************************************************/
  //instantiated on scope model ready
  api.CZR_scopeView = api.Class.extend( {
    initialize: function( name, options ) {
          var view = this;
          //write the options as properties, name is included
          $.extend( view, options || {} );

          view.el = '';//@todo replace with a css selector based on the scope name

          //EMBED IN THE DOM AND STORES THE $
          view.container = view.embedDialogBox();

          //LISTEN TO DOM EVENTS
          //view.listenToScopeSwitch(to)

          //LISTEN TO MODEL EVENTS
          //How does the view react to model changes ?
          //When active :
          //1) add a green point to the view box
          //2) disable the switch-to icon
          api.czr_scope(view.name).active.callbacks.add(function() { return view.activeStateViewCallbacks.apply(view, arguments ); } );
    },

    activeStateViewCallbacks : function(to, from){
      console.log('in the view : listen for scope state change', this.name, to, from );
    },


    /*****************************************************************************
    * DOM : RENDERING AND EVENT LISTENERS
    *****************************************************************************/
    embedDialogBox : function() {
          //@todo will need to be refreshed on scopes change in the future
          if ( $('#customize-header-actions').find('.czr-scope-switcher').length )
            return this;

          $('#customize-header-actions').append(
            $('<div/>', {
              class:'czr-scope-switcher',
              html:'<span data-dyn-type="trans" class="czr-local-scope button">This page</span> <span data-dyn-type="option" class="czr-global-scope button">Global</span>'
            })
          );
          return this;//@todo : shall return the $(element)
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
    },

    /*****************************************************************************
    * HELPERS
    *****************************************************************************/
    getEl : function() {
          var view = this;
          return $( view.el, '#customize-header-actions');
    }
  });//api.Class.extend()


})( wp.customize , jQuery, _);