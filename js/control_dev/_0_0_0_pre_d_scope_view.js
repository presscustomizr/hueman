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
          view.params = options;

          view.el = 'czr-scope-' + view.name;//@todo replace with a css selector based on the scope name

          //EMBED IN THE DOM AND STORES THE $
          view.container = view.embedScopeDialogBox();

          //LISTEN TO DOM EVENTS
          view.listenToScopeSwitch();

          //LISTEN TO MODEL EVENTS
          //How does the view react to model changes ?
          //When active :
          //1) add a green point to the view box
          //2) disable the switch-to icon
          api.czr_scope(view.name).active.callbacks.add(function() { return view.activeStateViewCallbacks.apply(view, arguments ); } );
          api.czr_scope(view.name).dirtyness.callbacks.add(function() { return view.dirtynessViewCallbacks.apply(view, arguments ); } );
          api.czr_scope(view.name).dbValues.callbacks.add(function() { return view.dbValuesViewCallbacks.apply(view, arguments ); } );
          api.czr_scope(view.name).winner.callbacks.add(function() { return view.winnerViewCallbacks.apply(view, arguments ); } );
    },

    activeStateViewCallbacks : function(to, from){
      var view = this;
      view.container.toggleClass('active', to);
      //console.log('in the view : listen for scope state change', this.name, to, from );
      $('.czr-scope-switch',view.container).toggleClass('fa-toggle-on', to).toggleClass('fa-toggle-off', !to);
    },

    dirtynessViewCallbacks : function(to, from) {
      var view = this;
      this.container.toggleClass('dirty', to);
    },

    dbValuesViewCallbacks : function(to, from) {
      this.container.toggleClass('has_db_val', ! _.isEmpty(to) );
    },

    winnerViewCallbacks : function(to, from) {
      this.container.toggleClass('is_winner', ! _.isEmpty(to) );
    },


    /*****************************************************************************
    * DOM : RENDERING AND EVENT LISTENERS
    *****************************************************************************/
    embedScopeDialogBox : function() {
          var view = this;
          //@todo will need to be refreshed on scopes change in the future
          if ( ! $('#customize-header-actions').find('.czr-scope-switcher').length ) {
            throw new Error('The scope switcher wrapper is not printed, the scope view can not be embedded.');
          }
          var $view = $( wp.template('customize-scope')( _.extend(view.params, {el : view.el}) ) );
          $('.czr-scope-switcher', '#customize-header-actions').append($view);
          return $view;
    },

    listenToScopeSwitch : function() {
          var view = this;
          $('.czr-scope-switch', view.container ).on('click keydown', function( e, event_params ) {
              //particular treatment
              if ( api.utils.isKeydownButNotEnterEvent( e ) ) {
                return;
              }
              e.preventDefault(); // Keep this AFTER the key filter above)

              var _new_scope = $(this).closest('.czr-scope').attr('data-scope-id');
              if ( api.czr_scope.has( _new_scope ) ) {
                api.czr_scopeCollection('active').set( _new_scope );
              }
              // var _dyn_type   = $( e.currentTarget).attr('data-dyn-type'),
              //     _new_scope  = _.findWhere( api.czr_scopeCollection('collection').get() , { dyn_type : _dyn_type });

              //api.czr_scopeCollection('active').set( _new_scope );

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