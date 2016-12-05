/**
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 * Things like site title, description, and background color changes
 */
( function( api, $, _ ) {

  //HOW DOES THE PREVIEW POST MESSAGE REFRESH WORKS ?
  //the control panel sends message with the postMessage jQuery method
  //@see the send method of the Messenger Class
  //this.previewer.send( 'setting', [ this.id, this() ] );

  //the previewer listens to message send to the preview window
  //@see receive method in the Messenger Class in customize-base
  //$( window ).on( 'message', function(e, o) { console.log(e, o) })
  //$( window ).on( 'message', this.receive );
  //On reception an event is triggered with the setting.id as name and the message.data as args
  //That's why it's possible to use api.bind( setting.id, callback(data) );

  //TEST
  // $( window ).on( 'message', function(e, o) {
  //   console.log('ON MESSAGE', e, o);
  // });

  //TEST => access any setting change with the setting event
  // wp.customize.bind( 'preview-ready', function() {
  //   wp.customize.preview.bind('setting', function(e, o) {
  //     console.log('ON SETTING', e, o);
  //   });
  // });


  /////////////// SEND SKOPES
  $( function() {
        api.preview.bind( 'sync', function( events ) {
              api.preview.send( 'czr-skopes-synced', {
                    czr_skopes : _wpCustomizeSettings.czr_skopes || [],
                    isChangesetDirty : _wpCustomizeSettings.isChangesetDirty || false,
                    skopeGlobalDBOpt : _wpCustomizeSettings.skopeGlobalDBOpt || [],
              } );
        });
  });

  /////////////// SETUP MODULES ACTIONS ON PREVIEW READY
  wp.customize.bind( 'preview-ready', function() {
        //SEKTIONS
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

              //remove all previous hover placeholder from sektion
              $_sek.closest('.czr-sektion').find('.czr-hover-placeholder').each( function(){ $(this).remove(); } );

              //apply placeholder
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




        //MODULES
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

              //remove all previous hover placeholder from sektion
              $_module.closest('.czr-sektion').find('.czr-hover-placeholder').each( function(){ $(this).remove(); } );

              //apply placeholder
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







  /////////////// SEND UPDATED SERVER SIDE DATA TO THE PANEL
  /////////////// SET REACTIONS ON PANEL SETTING CHANGES
  //////////////////////////////////////////////////////////
  if ( CZRPreviewParams && ! CZRPreviewParams.preview_ready_event_exists ) {
        api.czr_preview = new api.CZR_preview();
  }
  else {
        api.bind( 'preview-ready', function(){
              //Talk with the panel when he informs us that the current preview frame is 'active'.
              //We could also use the 'sync' event, just before 'active'.
              api.preview.bind( 'active', function() {
                    api.czr_preview = new api.CZR_preview();
              });
        });
  }

  //FIRED ON API 'preview-ready'
  api.CZR_preview = api.Class.extend( {
        setting_cbs : {},
        subsetting_cbs : {},//nested sub settings
        _wp_sets : CZRPreviewParams.wpBuiltinSettings || [],
        _theme_options_name : CZRPreviewParams.themeOptions,
        initialize: function() {
              var self = this;
              //store the default control dependencies
              this.setting_cbs = _.extend( self.setting_cbs, self.getSettingCbs() );
              this.subsetting_cbs = _.extend( self.subsetting_cbs, self.getSubSettingCbs() );
              this.syncData();
              //api.trigger('czr-preview-ready');

              this.addCbs();
              //Remove this class if it's still there
              //=> added since changeset update, WP 4.7
              $( 'body' ).removeClass( 'wp-customizer-unloading' );
        },
        getSettingCbs : function() { return {}; },
        getSubSettingCbs : function() { return {}; },
        syncData : function() {
          //send infos to panel
            api.preview.send( 'czr-wp-conditional-ready', api.settings.czr_wp_conditionals );
            api.preview.send( 'houston-widget-settings',
                  _.extend( _wpWidgetCustomizerPreviewSettings,
                        {
                              availableWidgetLocations : _.values( api.settings.availableWidgetLocations )
                        }
                  )
            );
            api.preview.send(
                  'czr-partial-refresh',
                  typeof( undefined ) === typeof( _customizePartialRefreshExports ) ? {} : _customizePartialRefreshExports.partials
            );

            //TEST
            //console.log('_wpCustomizeSettings', _wpCustomizeSettings, _wpCustomizeSettings.activeSections );
            //console.log('_wpWidgetCustomizerPreviewSettings', _wpWidgetCustomizerPreviewSettings);
            //console.log(' _customizePartialRefreshExports',  _customizePartialRefreshExports);
            //console.log(' IN PREVIEW : ', _wpCustomizeSettings );
        },

        addCbs : function() {
              var self = this;
              _.each( self.setting_cbs, function( _cb, _setId ) {
                    if ( ! api.has( self._build_setId(_setId) ) )
                      return;
                    api( self._build_setId(_setId) ).bind( self.setting_cbs[_setId] );
              } );


              //obj is : {
              // set_id : this.id,
              // model_id : obj.model.id,
              // changed_prop : _changed,
              // value : obj.model[_changed]
              // }
              api.preview.bind( 'sub_setting', function(obj) {
                    //first get the "nude" option name
                    var _opt_name = self._get_option_name( obj.set_id );

                    //do we have custom callbacks for this subsetting ?
                    if ( ! _.has(self.subsetting_cbs, _opt_name) )
                      return;

                    //do we have a custom callback for this model id ?
                    if ( ! _.has( self.subsetting_cbs[_opt_name], obj.changed_prop ) )
                      return;

                    //execute the cb
                    self.subsetting_cbs[_opt_name][obj.changed_prop]( obj );
              });
        },

        /******************************************
        * HELPERS
        ******************************************/
        /*
        * @return string
        * simple helper to build the setting id name if not a builtin wp setting id
        */
        _build_setId : function ( name ) {
              var self = this;
              //is wp built in ?
              if ( _.contains( self._wp_sets, name ) )
                return name;
              //else
              return -1 == name.indexOf( self._theme_options_name) ? [ self._theme_options_name + '[' , name  , ']' ].join('') : name;
        },

        _get_option_name : function(name) {
              var self = this;
              return name.replace(/\[|\]/g, '').replace(self._theme_options_name, '');
        },



        /*
        * @return boolean
        */
        _is_external : function( _href  ) {
              //EXT LINKS HELPERS
              // var _url_comp     = (location.host).split('.'),
              //   _nakedDomain  = new RegExp( _url_comp[1] + "." + _url_comp[2] );
              //gets main domain and extension, no matter if it is a n level sub domain
              //works also with localhost or numeric urls
              var _thisHref = $.trim( _href ),
                  _main_domain = (location.host).split('.').slice(-2).join('.'),
                  _reg = new RegExp( _main_domain );

              if ( _thisHref !== '' && _thisHref != '#' && _isValidURL( _thisHref ) )
                return ! _reg.test( _thisHref );
              return;
        },

        /*
        * @return boolean
        */
        _isValidURL : function(_url){
              //var _pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
              var _pattern = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
              return _pattern.test( _url );
        }
  });//api.Class.extend

} )( wp.customize, jQuery, _ );