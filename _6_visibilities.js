(function (api, $, _) {

  var $_nav_section_container,
      translatedStrings = HUControlParams.translatedStrings || {};


  api.bind( 'ready' , function() {
    api.hu_visibilities = new api.HU_visibilities();
  } );



  api.HU_visibilities = api.Class.extend( {
          controlDeps : {},

          initialize: function() {
                var self = this;
                //store the default control dependencies
                this.controlDeps = _.extend( this.controlDeps, this._getControlDeps() );
                this._setControlVisibilities();
                //favicon note on load and on change(since wp 4.3)
                this._handleFaviconNote();

          },



          //bind all actions to wp.customize ready event
          //map each setting with its dependencies
          _setControlVisibilities : function() {
                var self = this;
                _.map( self.controlDeps , function( opts , setId ) {
                  self._prepare_visibilities( setId, opts );
                });
          },

           /*
          * Main control dependencies object
          */
          _getControlDeps : function() {
                return {
                  'dynamic-styles' : {
                    controls: [
                      'boxed',
                      'font',
                      'container-width',
                      'sidebar-padding',
                      'color-1',
                      'color-2',
                      'color-topbar',
                      'color-header',
                      'color-header-menu',
                      'image-border-radius',
                      'body-background',

                    ],
                    callback : function (to) {
                      return '0' !== to && false !== to && 'off' !== to;
                    },
                  },
                  'blog-heading-enabled' : {
                    controls: [
                      'blog-heading',
                      'blog-subheading'
                    ],
                    callback : function (to) {
                      return '0' !== to && false !== to && 'off' !== to;
                    },
                  },
                  'featured-posts-enabled' : {
                    controls: [
                      'featured-category',
                      'featured-posts-count',
                      'featured-posts-full-content',
                      'featured-slideshow',
                      'featured-slideshow-speed',
                      'featured-posts-include'
                    ],
                    callback : function (to) {
                      return '0' !== to && false !== to && 'off' !== to;
                    },
                  },
                  'featured-slideshow' : {
                    controls: [
                      'featured-slideshow-speed'
                    ],
                    callback : function (to) {
                      return '0' !== to && false !== to && 'off' !== to;
                    },
                  },
                  'about-page' : {
                    controls: [
                      'help-button'
                    ],
                    callback : function (to) {
                      return '0' !== to && false !== to && 'off' !== to;
                    },
                  },
                  //we have to show restrict blog/home posts when
                  //1. show page on front and a page of posts is selected
                  //2, show posts on front
                  'page_for_posts' : {
                     controls: [
                       'tc_blog_restrict_by_cat'
                     ],
                     callback : function (to) {
                       return '0' !== to;
                     },
                  },
                  'show_on_front' : {
                    controls: [
                      'tc_blog_restrict_by_cat'
                    ],
                    callback : function (to) {
                      if ( 'posts' == to )
                        return true;
                      if ( 'page' == to )
                        return '0' !== api( api.hu_build_setId('page_for_posts') ).get() ;
                      return false;
                    },
                  }
                };
          },





          /*****************************************************************************
          * HELPERS
          *****************************************************************************/
          /*
          * find the setId key in the _controlDependencies object
          * get the controls, merge show and hide if needed
          * return an []
          */
          _get_dependants : function( setId ) {
                if ( ! this.controlDeps[setId] )
                  return [];
                var _dependants = this.controlDeps[setId];

                if ( _dependants.show && _dependants.hide )
                  return _.union(_dependants.show.controls , _dependants.hide.controls);
                if ( _dependants.show && ! _dependants.hide )
                  return _dependants.show.controls;
                if ( ! _dependants.show && _dependants.hide )
                  return _dependants.hide.controls;

                return _dependants.controls;
          },

          /*
          * @return string hide or show. default is hide
          */
          _get_visibility_action : function ( setId , depSetId ) {
                if ( ! this.controlDeps[setId] )
                  return 'both';
                var _dependants = this.controlDeps[setId];
                if ( _dependants.show && -1 != _.indexOf( _dependants.show.controls, depSetId ) )
                  return 'show';
                if ( _dependants.hide && -1 != _.indexOf( _dependants.hide.controls, depSetId ) )
                  return 'hide';
                return 'both';
          },


          _get_visibility_cb : function( setId , _action ) {
                if ( ! this.controlDeps[setId] )
                  return;
                var _dependants = this.controlDeps[setId];
                if ( ! _dependants[_action] )
                  return _dependants.callback;
                return (_dependants[_action]).callback;
          },


          _check_cross_dependant : function( setId, depSetId ) {
                if ( ! this.controlDeps[setId] )
                  return true;
                var _dependants = this.controlDeps[setId];
                if ( ! _dependants.cross || ! _dependants.cross[depSetId] )
                  return true;
                var _cross  = _dependants.cross[depSetId],
                    _id     = _cross.master,
                    _cb     = _cross.callback;

                _id = api.hu_build_setId(_id);
                //if _cb returns true => show
                return _cb( api.instance(_id).get() );
              },

          /*
          * @return void
          * show or hide setting according to the dependency + callback pair
          */
          _prepare_visibilities : function( setId, o ) {
                var self = this;
                api( api.hu_build_setId(setId) , function (setting) {
                  var _params = {
                    setting   : setting,
                    setId : setId,
                    controls  : self._get_dependants(setId),
                  };
                  _.map( _params.controls , function( depSetId ) {
                    self._set_single_dependant_control_visibility( depSetId , _params);
                  } );
                });
          },



          _set_single_dependant_control_visibility : function( depSetId , _params ) {
                var self = this;
                api.control( api.hu_build_setId(depSetId) , function (control) {
                  var _visibility = function (to) {
                    var _action   = self._get_visibility_action( _params.setId , depSetId ),
                        _callback = self._get_visibility_cb( _params.setId , _action ),
                        _bool     = false;

                    if ( 'show' == _action && _callback(to, depSetId, _params.setId ) )
                      _bool = true;
                    if ( 'hide' == _action && _callback(to, depSetId, _params.setId ) )
                      _bool = false;
                    if ( 'both' == _action )
                      _bool = _callback(to, depSetId, _params.setId );

                    //check if there are any cross dependencies to look at
                    //_check_cross_dependant return true if there are no cross dependencies.
                    //if cross dependency :
                    //1) return true if we must show, false if not.
                    _bool = self._check_cross_dependant( _params.setId, depSetId ) && _bool;
                    control.container.toggle( _bool );
                  };//_visibility()



                  _visibility( _params.setting.get() );
                  _params.setting.bind( _visibility );
                });
          },



          /**
          * Fired on api ready
          * May change the site_icon description on load
          * May add a callback to site_icon
          * @return void()
          */
          _handleFaviconNote : function() {
                var self = this;
                //do nothing if (||)
                //1) WP version < 4.3 where site icon has been introduced
                //2) User had not defined a favicon
                //3) User has already set WP site icon
                if ( ! api.has('site_icon') || ! api.control('site_icon') || ( api.has(api.hu_build_setId('favicon')) && 0 === + api( api.hu_build_setId('favicon') ).get() ) || + api('site_icon').get() > 0 )
                  return;

                var _oldDes     = api.control('site_icon').params.description;
                    _newDes     = ['<strong>' , translatedStrings.faviconNote || '' , '</strong><br/><br/>' ].join('') + _oldDes;

                //on api ready
                self._printFaviconNote(_newDes );

                //on site icon change
                api('site_icon').callbacks.add( function(to) {
                  if ( +to > 0 ) {
                    //reset the description to default
                    api.control('site_icon').container.find('.description').text(_oldDes);
                    //reset the previous favicon setting
                    if ( api.has( api.hu_build_setId('favicon') ) )
                      api( api.hu_build_setId('favicon') ).set("");
                  }
                  else {
                    self._printFaviconNote(_newDes );
                  }
                });
          },

          //Add a note to the WP control description if user has already defined a favicon
          _printFaviconNote : function( _newDes ) {
                api.control('site_icon').container.find('.description').html(_newDes);
          }
    }
  );//api.Class.extend() //api.HU_visibilities

})( wp.customize, jQuery, _);