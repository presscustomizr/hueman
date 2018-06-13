//global themeServerPreviewParams
(function (api, $, _ ) {
      var $_body    = $( 'body' ),
          setting_cbs = api.CZR_preview.prototype.setting_cbs || {},
          input_cbs = api.CZR_preview.prototype.input_cbs || {},
          _settingsCbsExtend = {},
          _inputCbsExtend = {};

      _inputCbsExtend = {
            'social-links' : {
                  'social-size' : function( data ) {
                        if ( ! _.isObject( data ) || _.isUndefined( data.value ) || ! $('li a', '.social-links').length )
                          return;
                        $('li a', '.social-links').css( 'font-size', data.value + 'px');
                  },
                  'social-color' : function( data ) {
                        if ( ! _.isObject( data ) || _.isUndefined( data.value ) || _.isUndefined( data.input_parent_id ) )
                          return;
                        if ( ! $('li', '.social-links').find('a[data-model-id=' + data.input_parent_id +']').length )
                          return;
                        $('li', '.social-links').find('a[data-model-id=' + data.input_parent_id +']').css( 'color', data.value );
                  }
            }
      };

      _settingsCbsExtend = {
            blogname : function(to) {
              var self = this,
                  _proto_ = api.CZR_preview.prototype,
                  _hasLogo,
                  _logoSet;
              //the logo was previously set with a custom hueman theme option => custom-logo
              if ( api.has( _proto_._build_setId('custom-logo') ) ) {
                    _logoSet = api( _proto_._build_setId('custom-logo') ).get();
              }

              _hasLogo = ( _.isNumber(_logoSet) && _logoSet > 0 ) || ( ! _.isEmpty(_logoSet) && ( false !== _logoSet ) );

              if ( _hasLogo )
                return;
              $( '.site-title a' ).text( to );
            },
            blogdescription : function(to) {
              $( '.site-description' ).text( to );
            },
            'font' : function( font_id ) {
                var gfontUrl        = ['//fonts.googleapis.com/css?family='],
                    fontList = themeServerPreviewParams.fonts,
                    fontFamily, fontSrc;

                if ( fontList.family && fontList.src ) {
                    fontSrc = false !== fontList.src[font_id] ? fontList.src[font_id] : null;
                    if ( ! _.isNull( fontSrc ) ) {
                        gfontUrl.push( fontSrc );
                        if ( 0 === $('link#gfontlink' ).length ) {
                            $gfontlink = $('<link>' , {
                                id    : 'gfontlink' ,
                                href  : gfontUrl.join(''),
                                rel   : 'stylesheet',
                                type  : 'text/css'
                            });

                            $('link:last').after($gfontlink);
                        }
                        else {
                            $('link#gfontlink' ).attr('href', gfontUrl.join('') );
                        }
                    }

                    fontFamily = false !== fontList.family[font_id] ? fontList.family[font_id] : null;
                    if ( ! _.isNull( fontFamily ) ) {
                        $('body').css( 'font-family', fontFamily );
                    }
                }
            },
            'body-font-size' : function( to ) {
              to = parseInt( to , 10);
              if ( ! _.isNumber( to ) )
                return;
              var _rem = parseFloat( to ) / 16;
              $( 'body' ).css( { 'font-size' : _rem + 'rem' } );
              $( '.nav > li').css( { 'font-size' : _rem + 'rem' } );
            },
            'body-background' :  function(to) {
              $('body').css('background-color', to);
            },
            'color-topbar' : function(to) {
              $('.search-expand, #nav-topbar.nav-container, #nav-topbar .nav ul').css('background-color', to);
            },
            'color-header': function(to) {
              $('#header').css('background-color', to);
            },
            'color-header-menu' : function(to) {
              $('#nav-header.nav-container, #nav-header .nav ul').css('background-color', to);
            },
            'color-footer' : function(to) {
              $('#footer-bottom').css('background-color', to);
            },
            credit : function(to) {
              $( '#footer-bottom #credit' ).slideToggle();
            }
      };

      $.extend( api.CZR_preview.prototype, {
          setting_cbs : $.extend( setting_cbs, _settingsCbsExtend ),
          input_cbs : $.extend( input_cbs, _inputCbsExtend )
      });
}) ( wp.customize, jQuery, _ );