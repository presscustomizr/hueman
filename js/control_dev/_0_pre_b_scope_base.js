(function (api, $, _) {
  // HOW DOES THIS WORK ?
  //CZR_scopeBase listens to scope collection changes
  // 1) instantiate new models (CZR_scopeModel), remove old ones and their view
  // 2) sets each scope models active scope state changes


  // CZR_scopeModel
  // 1) instantiate, the scope view (CZR_scopeView)
  // 2) listens to the active state
  //   => store dirtyness on switch
  //   => fetch the db values, build the full set of values ( db + dirties + default) and update the settings

  // CZR_scopeView
  // 1) renders the view
  // 2) listens to model active state
  //   => change the view display elements
  // 3) listen to DOM interactions and set scope values : state, priority

  // @todo in the view, return the $() element to store the view.container

  /*****************************************************************************
  * THE SCOPE BASE OBJECT
  *****************************************************************************/
  api.bind( 'ready' , function() {
    if ( serverControlParams.isCtxEnabled ) {
      api.czr_scopeBase = new api.CZR_scopeBase();
    }
  } );

  api.CZR_scopeBase = api.Class.extend( {
    globalSettingVal : {},//will store the global setting val. Populated on init.

    initialize: function() {
          var self = this;
          //store the initial state of the global option
          this.initialGlobalSettingVal = this.getGlobalSettingVal();

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
          api.czr_scopeCollection('collection').callbacks.add( function() { return self.initScopeModels.apply(self, arguments ); } );

          //REACT TO ACTIVE SCOPE UPDATE
          api.czr_scopeCollection('active').callbacks.add( function() { return self.setScopeStates.apply(self, arguments ); } );
    },

    //setup the czr_scopeCollection('collection') callbacks
    //fired in initialize
    initScopeModels : function(to, from) {
          var self = this;
          to = to || {};
          from = from || {};

          //destroy the previous scopes views and models
          //Instantiate the scopes collection
          _.map( from, function( data , name ) {
            //remove the view DOM el
            api.czr_scope(name).view.container.remove();
            //remove the model from the collection
            api.czr_scope(name).remove();
          });


          //Instantiate the scopes collection
          _.map( to, function( data , name ) {
            api.czr_scope.add( name, new api.CZR_scopeModel( name, _.extend( data, {name : name} ) ) );
            //fire this right after instantiation for the views (we need the model instances in the views)
            api.czr_scope(name).ready();
          });

          //set the defaut scope as active as global
          api.czr_scopeCollection('active').set( self.getActiveScopeOnInit(to) );
    },//listenToScopeCollection()


    //fired in initialize
    setScopeStates : function(to, from) {
          var self = this;
          //set the to and from scope state on init and switch
          if ( ! _.isUndefined(from) && api.czr_scope.has(from) )
            api.czr_scope(from).active.set(false);
          else if ( ! _.isUndefined(from) )
            throw new Error('listenToActiveScope : previous scope does not exist in the collection');

          if ( ! _.isUndefined(to) && api.czr_scope.has(to) )
            api.czr_scope(to).active.set(true);
          else
            throw new Error('listenToActiveScope : requested scope ' + to + ' does not exist in the collection');
    },



    /*****************************************************************************
    * HELPERS
    *****************************************************************************/
    //@return the
    getActiveScopeOnInit : function(collection) {
          _def = _.findWhere(collection, {is_default : true }).name;
          return ! _.isUndefined(_def) ? _def : 'global';
    },


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
        }
  });//api.Class.extend()


})( wp.customize , jQuery, _);