
( function( api, $, _ ) {
        wp.customize.bind( 'preview-ready', function() {
        });// 'preview-ready'




        if ( serverPreviewParams && ! serverPreviewParams.preview_ready_event_exists ) {
              try { api.czr_preview = new api.CZR_preview(); } catch( _er_ ) {
                    console.log( "new api.CZR_preview() => error => ", _er_ );
              }
        }
        else {
              api.bind( 'preview-ready', function(){
                    api.preview.bind( 'active', function() {
                          try { api.czr_preview = new api.CZR_preview(); } catch( _er_ ) {
                                console.log( "new api.CZR_preview() => error => ", _er_ );
                          }
                    });
              });
        }

        var czrPreviewConstructor = {
              setting_cbs : {},
              subsetting_cbs : {},//nested sub settings
              input_cbs : {},
              initialize: function() {
                    var self = this;
                    this.pre_setting_cbs = _.extend( self.pre_setting_cbs, self.getPreSettingCbs() );
                    this.setting_cbs      = _.extend( self.setting_cbs, self.getSettingCbs() );
                    this.subsetting_cbs   = _.extend( self.subsetting_cbs, self.getSubSettingCbs() );
                    this.input_cbs        = _.extend( self.input_cbs, self.getInputCbs() );

                    this.syncData();

                    this.addCbs();
                    $( 'body' ).removeClass( 'wp-customizer-unloading' );
              },
              getPreSettingCbs : function() { return {}; },
              getSettingCbs : function() { return {}; },
              getSubSettingCbs : function() { return {}; },
              getInputCbs : function() { return {}; },
              syncData : function() {
                  api.preview.send( 'czr-query-data-ready', api.settings.czr_wpQueryInfos );
                  api.preview.send(
                        'czr-partial-refresh-data',
                        typeof( undefined ) === typeof( _customizePartialRefreshExports ) ? {} : _customizePartialRefreshExports.partials
                  );
              },

              addCbs : function() {
                    var self = this;
                    api.preview.bind( 'pre_setting', function( args ) {
                          args = args || {};
                          var _setId = args.set_id;
                          if ( ! api.has( self._build_setId( _setId ) ) )
                            return;
                          var _opt_name = self._get_option_name( args.set_id );
                          if ( ! _.has( self.pre_setting_cbs, _opt_name ) || ! _.isFunction( self.pre_setting_cbs[ _opt_name ] ) )
                            return;
                          self.pre_setting_cbs[ _opt_name ]( args );
                    });
                    _.each( self.setting_cbs, function( _cb, _setId ) {
                          if ( ! api.has( self._build_setId( _setId ) ) )
                            return;
                          if ( _.isFunction( self.setting_cbs[ _setId ] ) ) {
                                api( self._build_setId(_setId) ).bind( self.setting_cbs[ _setId ] );
                          }
                    } );
                    api.preview.bind( 'sub_setting', function( args ) {
                          var _opt_name = self._get_option_name( args.set_id );
                          if ( ! _.has(self.subsetting_cbs, _opt_name) )
                            return;
                          if ( ! _.has( self.subsetting_cbs[ _opt_name ], args.changed_prop ) )
                            return;
                          self.subsetting_cbs[ _opt_name ][ args.changed_prop ]( args );
                    });
                    api.preview.bind( 'czr_input', function( args ) {
                          var _defaults = {
                                set_id : '',
                                module_id : '',
                                item_id : '',
                                input_id : '',
                                value : null
                          };
                          args = _.extend ( _defaults, args );
                          var _opt_name = self._get_option_name( args.set_id );
                          if ( ! _.has( self.input_cbs, _opt_name ) )
                            return;
                          if ( ! _.has( self.input_cbs[ _opt_name ], args.input_id ) )
                            return;
                          self.input_cbs[ _opt_name ][ args.input_id ]( args );
                    });
                    api.selectiveRefresh.bind( 'partial-content-rendered', function( params ) {
                            if ( ! _.has( params, 'partial' ) || ! _.has( params.partial, 'id' ) )
                              return;
                            var _shortOptName = params.partial.id;
                            api.preview.send( 'czr-partial-refresh-done', { set_id : self._build_setId( params.partial.id ) } );
                    });
              },
              _build_setId : function ( name ) {
                    var self = this;
                    if ( _.isEmpty( window.themeServerPreviewParams ) )
                      return name;
                    if ( ! _.isArray( themeServerPreviewParams.wpBuiltinSettings ) || _.contains( themeServerPreviewParams.wpBuiltinSettings, name ) )
                      return name;

                    var themeOptionsPrefix = themeServerPreviewParams.themeOptionsPrefix;
                    if ( _.isEmpty( themeOptionsPrefix ) )
                      return name;

                    return -1 == name.indexOf( themeOptionsPrefix ) ? [ themeOptionsPrefix + '[' , name  , ']' ].join('') : name;
              },

              _get_option_name : function( name ) {
                    if ( _.isEmpty( window.themeServerPreviewParams ) )
                      return name;

                    var themeOptionsPrefix = themeServerPreviewParams.themeOptionsPrefix;
                    if ( _.isEmpty( themeOptionsPrefix ) )
                      return name;

                    var self = this;
                    return name.replace(/\[|\]/g, '').replace( themeOptionsPrefix, '');
              },
              _is_external : function( _href  ) {
                    var _thisHref = $.trim( _href ),
                        _main_domain = (location.host).split('.').slice(-2).join('.'),
                        _reg = new RegExp( _main_domain );

                    if ( _thisHref !== '' && _thisHref != '#' && _isValidURL( _thisHref ) )
                      return ! _reg.test( _thisHref );
                    return;
              },
              _isValidURL : function(_url){
                    var _pattern = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                    return _pattern.test( _url );
              }
        };//czrPreviewConstructor

        api.CZR_preview = api.Class.extend( czrPreviewConstructor );


} )( wp.customize, jQuery, _ );