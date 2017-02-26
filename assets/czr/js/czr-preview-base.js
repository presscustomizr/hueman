
( function( api, $, _ ) {
  $( function() {
        api.preview.bind( 'sync', function( events ) {
              api.preview.send( 'czr-skopes-synced', {
                    czr_skopes : _wpCustomizeSettings.czr_skopes || [],
                    isChangesetDirty : _wpCustomizeSettings.isChangesetDirty || false,
                    skopeGlobalDBOpt : _wpCustomizeSettings.skopeGlobalDBOpt || [],
              } );
        });
  });
  wp.customize.bind( 'preview-ready', function() {
        wp.customize.preview.bind('edit_sek', function(o) {
              if ( ! _.has( o, 'id') || ! $('[data-sek-id="' + o.id +'"]').length )
                return;
              $('html, body').animate({
                    scrollTop : $('[data-sek-id="' + o.id +'"]').offset().top - 50
              }, 'slow');
        });

        wp.customize.preview.bind('start_hovering_sek', function(o) {
              if ( ! _.has( o, 'id') || ! $('[data-sek-id="' + o.id +'"]').length )
                return;
              var $_sek = $('[data-sek-id="' + o.id +'"]'),
                  _width = $_sek.outerWidth(),
                  _height = $_sek.outerHeight();
              $_sek.closest('.czr-sektion').find('.czr-hover-placeholder').each( function(){ $(this).remove(); } );
              $.when( $_sek.append( $( '<div/>', {
                    class : 'czr-hover-placeholder',
                    style : 'width:' + _width +'px;height:' + _height +'px;line-height:' + _height +'px;',
                    html : '<i class="material-icons">create</i>'
                })
              ) ).done( function() {
                    $('.czr-hover-placeholder').css('opacity', 1).fitText( 0.3, { minFontSize: '50px', maxFontSize: '100px' } );
              });
        });

        wp.customize.preview.bind('stop_hovering_sek', function(o) {
              if ( ! _.has( o, 'id') || ! $('[data-sek-id="' + o.id +'"]').length )
                return;

              var $_sek = $('[data-sek-id="' + o.id +'"]');
              $.when( $_sek.find('.czr-hover-placeholder').fadeOut(200) ).done( function() {$_sek.find('.czr-hover-placeholder').remove(); });
        });
        wp.customize.preview.bind('edit_module', function(o) {
              if ( ! _.has( o, 'id') || ! $('[data-module-id="' + o.id +'"]').length )
                return;
              $('html, body').animate({
                    scrollTop : $('[data-module-id="' + o.id +'"]').offset().top - 50
              }, 'slow');
        });

        wp.customize.preview.bind('start_hovering_module', function(o) {
              if ( ! _.has( o, 'id') || ! $('[data-module-id="' + o.id +'"]').length )
                return;
              var $_module = $('[data-module-id="' + o.id +'"]'),
                  _width = $_module.outerWidth(),
                  _height = $_module.outerHeight();
              $_module.closest('.czr-sektion').find('.czr-hover-placeholder').each( function(){ $(this).remove(); } );
              $.when( $_module.append( $( '<div/>', {
                    class : 'czr-hover-placeholder',
                    style : 'width:' + _width +'px;height:' + _height +'px;line-height:' + _height +'px;',
                    html : '<i class="material-icons">create</i>'
                })
              ) ).done( function() {
                    $('.czr-hover-placeholder').css('opacity', 1).fitText( 0.3, { minFontSize: '50px', maxFontSize: '100px' } );
              });
        });

        wp.customize.preview.bind('stop_hovering_module', function(o) {
              if ( ! _.has( o, 'id') || ! $('[data-module-id="' + o.id +'"]').length )
                return;

              var $_module = $('[data-module-id="' + o.id +'"]');
              $.when( $_module.find('.czr-hover-placeholder').fadeOut(200) ).done( function() {$_module.find('.czr-hover-placeholder').remove(); });
        });
  });
  if ( CZRPreviewParams && ! CZRPreviewParams.preview_ready_event_exists ) {
        api.czr_preview = new api.CZR_preview();
  }
  else {
        api.bind( 'preview-ready', function(){
              api.preview.bind( 'active', function() {
                    api.czr_preview = new api.CZR_preview();
              });
        });
  }
  api.CZR_preview = api.Class.extend( {
        setting_cbs : {},
        subsetting_cbs : {},//nested sub settings
        input_cbs : {},
        _wp_sets : CZRPreviewParams.wpBuiltinSettings || [],
        _theme_options_name : CZRPreviewParams.themeOptions,
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
            api.preview.send( 'houston-widget-settings',
                  _.extend( _wpWidgetCustomizerPreviewSettings,
                        {
                              availableWidgetLocations : _.values( api.settings.availableWidgetLocations )
                        }
                  )
            );
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
              if ( _.contains( self._wp_sets, name ) )
                return name;
              return -1 == name.indexOf( self._theme_options_name) ? [ self._theme_options_name + '[' , name  , ']' ].join('') : name;
        },

        _get_option_name : function(name) {
              var self = this;
              return name.replace(/\[|\]/g, '').replace(self._theme_options_name, '');
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
  });//api.Class.extend

} )( wp.customize, jQuery, _ );