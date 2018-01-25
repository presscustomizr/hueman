<?php

//control scripts and style
add_action( 'customize_controls_enqueue_scripts'        , 'hu_customize_controls_js_css', 10 );
//preview scripts
//set with priority 20 to be fired after hu_customize_store_db_opt in HU_utils
add_action( 'customize_preview_init'                    , 'hu_customize_preview_js', 20 );
//exports some wp_query informations. Updated on each preview refresh.
add_action( 'customize_preview_init'                    , 'hu_add_preview_footer_action', 20 );
//Add the control dependencies
add_action( 'customize_controls_print_footer_scripts'   , 'hu_extend_ctrl_dependencies', 10 );

//Add various dom ready
add_action( 'customize_controls_print_footer_scripts'   , 'hu_add_various_dom_ready_actions', 10 );

//hook : customize_preview_init
function hu_customize_preview_js() {
    global $wp_version;

    wp_enqueue_script(
        'hu-customizer-preview' ,
        sprintf('%1$s/assets/czr/js/czr-preview-base%2$s.js' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
        array( 'customize-preview', 'underscore'),
        ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
        true
    );

    //localizes
    wp_localize_script(
        'hu-customizer-preview',
        'CZRPreviewParams',
        apply_filters('hu_js_customizer_preview_params' ,
            array(
                'themeFolder'     => get_template_directory_uri(),
                'wpBuiltinSettings' => HU_customize::$instance -> hu_get_wp_builtin_settings(),
                'themeOptions'  => HU_THEME_OPTIONS,
                'fonts' => array( 'src' => hu_get_fonts( array( 'all' => true, 'request' => 'src' ) ), 'family' => hu_get_fonts( array( 'all' => true, 'request' => 'family' ) ) ),
                //patch for old wp versions which don't trigger preview-ready signal => since WP 4.1
                'preview_ready_event_exists'   => version_compare( $wp_version, '4.1' , '>=' ),
                'blogname' => get_bloginfo('name'),
                'copyright' => sprintf('%1$s &copy; %2$s. %3$s',
                  get_bloginfo('name'),
                  date( 'Y' ),
                  __( 'All Rights Reserved.', 'hueman' )
                )
            )
        )
    );
}



/**
 * Add script to controls
 * Dependency : customize-controls located in wp-includes/script-loader.php
 * Hooked on customize_controls_enqueue_scripts located in wp-admin/customize.php
 * @package Hueman
 * @since Hueman 3.3.0
 */
function hu_customize_controls_js_css() {

    wp_enqueue_style(
        'hu-customizer-controls-style',
        sprintf('%1$s/assets/czr/css/czr-control-base%2$s.css' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
        array( 'customize-controls' ),
        HUEMAN_VER,
        $media = 'all'
    );
    wp_enqueue_script(
        'hu-customizer-controls',
        sprintf('%1$s/assets/czr/js/czr-control-base%2$s.js' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
        array( 'customize-controls' , 'underscore'),
        HUEMAN_VER,
        true
    );

    //localizes
    wp_localize_script(
        'hu-customizer-controls',
        'serverControlParams',
        apply_filters('hu_js_customizer_control_params' ,
          array(
              'AjaxUrl'       => admin_url( 'admin-ajax.php' ),
              'docURL'        => esc_url('docs.presscustomizr.com/'),
              'HUNonce'       => wp_create_nonce( 'hu-customizer-nonce' ),
              'wpBuiltinSettings' => HU_customize::$instance -> hu_get_wp_builtin_settings(),
              'themeName'     => THEMENAME,
              'themeOptions'  => HU_THEME_OPTIONS,
              //'optionAjaxAction' => HU_OPT_AJAX_ACTION,//DEPRECATED
              'faviconOptionName' => 'favicon',
              'css_attr' => HU_customize::$instance -> hu_get_controls_css_attr(),
              'i18n' => hu_get_czr_translated_strings(),
              'isDevMode' => ( defined('WP_DEBUG') && true === WP_DEBUG ) || ( defined('CZR_DEV') && true === CZR_DEV ),
              'isThemeSwitchOn' => ! (bool)HU_IS_PRO,
              'themeSettingList' => HU_utils::$_theme_setting_list
          )
        )
    );

}



//hook : customize_preview_init
function hu_add_preview_footer_action() {
    //Add the postMessages actions
    add_action( 'wp_footer', 'hu_extend_postmessage_cb', 1000 );
    add_action( 'wp_footer', 'hu_add_customize_preview_data' , 20 );
}

//hook : wp_footer in the preview
function hu_extend_postmessage_cb() {
    ?>
    <script id="preview-settings-cb" type="text/javascript">
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
                    if ( api.has( _proto_._build_setId('custom-logo') ) )
                      _logoSet ? api( _proto_._build_setId('custom-logo') ).get() : '';
                    else if ( api.has( _proto_._build_setId('custom_logo') ) )
                       _logoSet ? api( _proto_._build_setId('custom_logo') ).get() : '';

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
                          fontList = CZRPreviewParams.fonts,
                          fontFamily, fontSrc;

                      if ( fontList.family && fontList.src ) {
                          fontSrc = false != fontList.src[font_id] ? fontList.src[font_id] : null;
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

                          fontFamily = false != fontList.family[font_id] ? fontList.family[font_id] : null;
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
    </script>
    <?php
}




//hook : wp_footer in the preview
function hu_add_customize_preview_data() {
    global $wp_query, $wp_customize;
    $current_obj  = get_queried_object();
    $query_data = array(
        'post_id'           => false,
        'post_thumbnail_id' => false,
        'post_title'        => false
    );
    //post, custom post types, page
    if ( is_singular() && ! hu_is_real_home() && isset($current_obj -> post_type) ) {
        $query_data['post_id'] = $current_obj -> ID;
        $query_data['post_title'] = $current_obj -> post_title;
        $query_data['post_thumbnail_id'] = has_post_thumbnail( $current_obj -> ID ) ? get_post_thumbnail_id( $current_obj -> ID ) :  false;
    }

    $_wp_query_infos = array(
        'conditional_tags' => array(),
        'query_data' => $query_data
    );
    $_available_locations = hu_get_available_widget_loc();

    //Populates the conditional tags
    foreach( (array)$wp_query as $prop => $val ) {
        if (  false === strpos($prop, 'is_') )
          continue;
        if ( 'is_home' == $prop )
          $val = hu_is_real_home();

        $_wp_query_infos['conditional_tags'][$prop] = $val;
    }
    $_wp_query_infos = apply_filters( 'czr-preview-query-data', $_wp_query_infos );

    ?>
      <script type="text/javascript" id="czr-customizer-data">
        (function ( _export ){
          _export.czr_wpQueryInfos = <?php echo wp_json_encode( $_wp_query_infos ) ?>;
          _export.availableWidgetLocations = <?php echo wp_json_encode( $_available_locations ) ?>;
        })( _wpCustomizeSettings );
      </script>
    <?php
}



//hook : 'customize_controls_print_footer_scripts':10
function hu_extend_ctrl_dependencies() {
    $_front_page_content_notice = esc_js( sprintf( __( "Jump to the %s.", 'hueman'),
        sprintf('<a href="%1$s" title="%2$s">%2$s</a>',
          "javascript:wp.customize.section(\'content_blog_sec\').focus();",
          __('blog design panel', 'hueman')
        )
    ) );
    $_header_menu_notice = esc_js( sprintf( __( "The menu currently displayed in your header is a default page menu, you can disable it in the %s.", 'hueman'),
        sprintf('<a href="%1$s" title="%2$s">%2$s</a>',
          "javascript:wp.customize.section(\'header_design_sec\').focus();",
          __('Header Panel', 'hueman')
        )
    ) );
    ?>
    <script id="control-dependencies" type="text/javascript">
      (function (api, $, _) {
        //@return boolean
        var _is_checked = function( to ) {
                return 0 !== to && '0' !== to && false !== to && 'off' !== to;
        };
        //when a dominus object define both visibility and action callbacks, the visibility can return 'unchanged' for non relevant servi
        //=> when getting the visibility result, the 'unchanged' value will always be checked and resumed to the servus control current active() state
        api.CZR_ctrlDependencies.prototype.dominiDeps = _.extend(
              api.CZR_ctrlDependencies.prototype.dominiDeps,
              [
                  {
                          dominus : 'show_on_front',
                          servi : ['show_on_front', 'page_for_posts' ],
                          visibility : function( to, servusShortId ) {
                                if ( 'show_on_front' == servusShortId )
                                  return 'unchanged';
                                return 'page' == to;
                          },
                          actions : function( to, servusShortId ) {
                                var wpServusId = api.CZR_Helpers.build_setId( servusShortId ),
                                      _class = 'hu-front-posts-notice',
                                      _maybe_print_html = function() {
                                          if ( $( '.' + _class , api.control(wpServusId).container ).length )
                                            return;
                                          var _html = '<span class="description customize-control-description ' + _class +'"><?php echo html_entity_decode( $_front_page_content_notice ); ?></span>';
                                          api.control(wpServusId).container.find('.customize-control-title').after( $.parseHTML( _html ) );
                                      };

                                if ( 'show_on_front' == servusShortId ) {
                                      if ( 'posts' != to && $( '.' + _class , api.control(wpServusId).container ).length ) {
                                            $('.' + _class, api.control(wpServusId).container ).remove();
                                      } else if ( 'posts' == to ) {
                                            _maybe_print_html();
                                      }
                                } else if ( 'page_for_posts' == servusShortId ) {
                                      if ( 'page' != to && $( '.' + _class , api.control(wpServusId).container ).length ) {
                                            $('.' + _class, api.control(wpServusId).container ).remove();
                                      } else if ( 'page' == to ) {
                                            _maybe_print_html();
                                      }
                                }
                          }
                  },
                  {
                          dominus : 'display-header-logo',
                          servi : ['logo-max-height', 'custom_logo', 'custom-logo', 'mobile-header-logo', 'display-header-title' ],//depending on the WP version, the custom logo option is different.
                          visibility : function( to, servusShortId ) {
                                if ( 'display-header-title' == servusShortId )
                                  return ! _is_checked(to);
                                return _is_checked(to);
                          }
                  },
                  {
                          dominus : 'use-header-image',
                          onSectionExpand : false,
                          servi : [ 'header_image', 'logo-title-on-header-image' ] ,
                          visibility : function( to, servusShortId ) {
                                return _is_checked(to);
                          }
                    },
                    {
                          dominus : 'blog-heading-enabled',
                          servi : [ 'blog-heading', 'blog-subheading' ],
                          visibility : function ( to ) {
                                return _is_checked(to);
                          }
                    },
                    {
                          dominus : 'featured-posts-enabled',
                          servi : [
                                'featured-category',
                                'featured-posts-count',
                                'featured-posts-full-content',
                                'featured-slideshow',
                                'featured-slideshow-speed',
                                'featured-posts-include'
                          ],
                          visibility : function ( to ) {
                                return _is_checked(to);
                          }
                    },
                    {
                          dominus : 'featured-slideshow',
                          servi : [ 'featured-slideshow-speed' ],
                          visibility : function ( to ) {
                                return _is_checked(to);
                          }
                    },
                    {
                          dominus : 'about-page',
                          servi : [ 'help-button' ],
                          visibility : function ( to ) {
                                return _is_checked( to );
                          }
                    },
                    {
                          dominus : 'header-ads',
                          servi : [
                                'header-ads-desktop',
                                'header-ads-mobile'
                          ],
                          visibility : function ( to ) {
                                return _is_checked(to);
                          }
                    },
                    {
                          dominus : 'header_mobile_menu_layout',
                          servi : [
                                'mobile-search',
                                'header-mobile-sticky',
                                'color-mobile-menu',
                                'transparent-fixed-topnav'
                          ],
                          visibility : function( to, servusShortId ) {
                                return 'both_menus' != to;
                          }
                    },
                    {
                          dominus : 'nav_menu_locations[topbar]',
                          servi : [ 'default-menu-header'],
                          visibility : function( to ) { return 0 == to; }
                    },
                    {
                          dominus : 'nav_menu_locations[mobile]',
                          servi : [ 'header_mobile_menu_layout'],
                          visibility : function( to ) { return true; },
                          actions : function( to, servusShortId ) {
                                if ( 0 == to )
                                  return;
                                var wpServusId = api.CZR_Helpers.build_setId( servusShortId ),
                                    $_select = api.control( wpServusId ).container.find("select");
                                    //$_select.find( 'option[value="pull-menu-center"]' )[ is_header_centered ? 'removeAttr': 'attr']('disabled', 'disabled');
                                    $_select.selecter( 'destroy' );
                                    _.delay( function() {
                                        api( wpServusId )( 'mobile_menu' );
                                        $_select.selecter();
                                    }, 200 );

                          }
                    }
              ]//dominiDeps {}
        );//_.extend()


        //add a notice in the Menus panel to easily disable the default page menu in the header
        <?php if ( ! is_multisite() ) : //no default menu for multisite installs ?>
          api.when('nav_menu_locations[header]', function( header_menu_loc_settting ) {
                //bail for old version of WP
                if ( ! _.has( api, 'section' ) || ! _.has( api, 'panel') )
                  return;

                var _notice_selector = 'hu-menu-notice',
                    _toggle_menu_notice = function( show ) {
                      var $menu_panel_content = api.panel('nav_menus').container.find('.control-panel-content'),
                          notice_rendered = 0 !== $menu_panel_content.find( '.' + _notice_selector ).length,
                          _html = '<p class="description customize-control-description ' + _notice_selector +'"><?php echo html_entity_decode( $_header_menu_notice ); ?></p>',
                          _render_notice = function() {
                                //defer the rendering when all sections of this panel have been embedded
                                $.when.apply(
                                      null,
                                      ( function() {
                                            var _promises = [];
                                            //build the promises array
                                            api.section.each( function( _sec ){
                                                  if ( 'nav_menus' == _sec.panel() ) {
                                                        _promises.push( _sec.deferred.embedded );
                                                  }
                                            });
                                            return _promises;
                                      })
                                      )
                                .then( function() {
                                      $menu_panel_content.append( $.parseHTML( _html ) );
                                });
                          },
                          _toggle_notice = function() {
                                if ( ! notice_rendered ) {
                                  _render_notice();
                                };
                                $('.' + _notice_selector, $menu_panel_content).toggle( show );
                          };

                      //bail if the menu panel is still not yet rendered
                      if ( ! $menu_panel_content.length )
                        return;

                      if ( api.topics && api.topics.ready && api.topics.ready.fired() ) {
                            _toggle_notice();
                      } else {
                            api.bind('ready', _toggle_notice );
                      }
                };//_toggle_menu_notice

                //API based toggling : maybe toggle the notice when nav_menu panel has been registered AND embedded
                api.panel.when('nav_menus', function( panel_instance ){
                      panel_instance.deferred.embedded.then( function() {
                            _toggle_menu_notice( 0 == header_menu_loc_settting() );
                      });
                });

                //User action based toggling : Maybe toggle the notice when user changes the related settings
                api.bind('ready', function() {
                      //bail if the [default-menu-header] has been removed
                      if ( ! api.has('hu_theme_options[default-menu-header]') )
                        return;

                      //react to header menu location changes
                      header_menu_loc_settting.bind( function( to, from ) {
                            _toggle_menu_notice( 0 == to && _is_checked( api('hu_theme_options[default-menu-header]')() ) );
                      } );
                      //react to hu_theme_options[default-menu-header]
                      api('hu_theme_options[default-menu-header]').bind( function( to ) {
                            _toggle_menu_notice( _is_checked( to ) && 0 == header_menu_loc_settting() );
                      });
                });

          });
        <?php endif; ?>

      }) ( wp.customize, jQuery, _);
    </script>
    <?php
}

function hu_add_various_dom_ready_actions() {
    ?>
    <script id="control-various-dom-ready" type="text/javascript">
      (function (wp, $) {
          $( function($) {
              var api = wp.customize || api;

              /* WIDGET PANEL ICON */
              if ( $('.control-panel-widgets').find('.accordion-section-title').first().length ) {
                    $('.control-panel-widgets').find('.accordion-section-title')
                          .first()
                          .prepend( $('<span/>', {class:'fas fa-magic'} ) );
              }
          });//end of $( function($) ) dom ready
      }) ( wp, jQuery );
    </script>
    <?php
}

function hu_get_czr_translated_strings() {
    return apply_filters( 'controls_translated_strings',
        array(
              'edit' => __('Edit', 'hueman'),
              'close' => __('Close', 'hueman'),
              'faviconNote' => __( "Your favicon is currently handled with an old method and will not be properly displayed on all devices. You might consider to re-upload your favicon with the new control below." , 'hueman'),
              'locations' => __('Location(s)', 'hueman'),
              'contexts' => __('Context(s)', 'hueman'),
              'notset' => __('Not set', 'hueman'),
              'rss' => __('Rss', 'hueman'),
              'selectSocialIcon' => __('Select a social icon', 'hueman'),
              'followUs' => __('Follow us on', 'hueman'),
              'successMessage' => __('Done !', 'hueman'),
              'socialLinkAdded' => __('New Social Link created ! Scroll down to edit it.', 'hueman'),

              'selectBgRepeat'  => __('Select repeat property', 'hueman'),
              'selectBgAttachment'  => __('Select attachment property', 'hueman'),
              'selectBgPosition'  => __('Select position property', 'hueman'),

              'widgetZone' => __('Widget Zone', 'hueman'),
              'widgetZoneAdded' => __('New Widget Zone created ! Scroll down to edit it.', 'hueman'),
              'inactiveWidgetZone' => __('Inactive in current context/location', 'hueman'),
              'unavailableLocation' => __('Unavailable location. Some settings must be changed.', 'hueman'),
              'locationWarning' => __('A selected location is not available with the current settings.', 'hueman'),

              'readDocumentation' => __('Learn more about this in the documentation', 'hueman'),
              'Settings' => __('Settings', 'hueman'),
              'Options for' => __('Options for', 'hueman'),

              'skope' => array(
                  //skope reset
                  'Reset the current customizations for' => __('Reset the current customizations for','hueman'),
                  'Reset the theme options published sitewide' => __('Reset the theme options published sitewide','hueman'),
                  'Reset your website published options for' => __('Reset your website published options for','hueman'),
                  'Please confirm that you want to reset your current ( not published ) customizations for' => __('Please confirm that you want to reset your current ( not published ) customizations for','hueman'),
                  'Your customizations have been reset for' => __('Your customizations have been reset for','hueman'),
                  'Please confirm that you want to reset your sitewide published customizations. Note : this will not reset the customizations made in other option scopes' => __('Please confirm that you want to reset your sitewide published customizations. Note : this will not reset the customizations made in other option scopes', 'hueman'),
                  'Please confirm that you want to reset your published customizations for' => __('Please confirm that you want to reset your published customizations for','hueman'),
                  'Your published customizations have been reset for' => __('Your published customizations have been reset for','hueman'),

                  //control reset
                  'Reset your customized ( and published ) value' => __('Reset your customized ( and published ) value', 'hueman'),
                  'Reset your customized ( but not yet published ) value' => __('Reset your customized ( but not yet published ) value', 'hueman'),
                  'Not customized yet, nothing to reset' => __('Not customized yet, nothing to reset', 'hueman'),
                  'Reset your customized ( but not yet published ) value' => __('Reset your customized ( but not yet published ) value', 'hueman'),
                  'Please confirm that you want to reset your current customizations for this option' => __( 'Please confirm that you want to reset your current customizations for this option', 'hueman' ),
                  'Please confirm that you want to reset your current customizations for this option in' => __('Please confirm that you want to reset your current customizations for this option in', 'hueman'),
                  'sitewide' => __('sitewide', 'hueman'),
                  'Your customizations have been reset' => __('Your customizations have been reset', 'hueman'),
                  'This WordPress setting can not be reset sitewide' => __('This WordPress setting can not be reset sitewide', 'hueman'),
                  'Please confirm that you want to reset this option' => __('Please confirm that you want to reset this option', 'hueman'),
                  'Please confirm that you want to reset this option in' => __('Please confirm that you want to reset this option in', 'hueman'),
                  'The option has been reset' => __('The option has been reset', 'hueman'),

                  //control notices
                  'Display informations about the scope of this option.' => __('Display informations about the scope of this option.', 'hueman'),
                  'This option is always customized sitewide and cannot be reset.' => __('This option is always customized sitewide and cannot be reset.', 'hueman'),
                  'Customized. Will be applied sitewide once published.' => __('Customized. Will be applied sitewide once published.','hueman'),
                  'Customized. Will be applied to' => __('Customized. Will be applied to', 'hueman'),
                  'once published.' => __('once published.', 'hueman'),
                  'Customized and applied sitewide.' => __('Customized and applied sitewide.', 'hueman'),
                  'Customized and applied to' => __('Customized and applied to','hueman'),
                  'Default website value applied sitewide.' => __('Default website value applied sitewide.','hueman'),
                  'Default website value.' => __('Default sitewide value.','hueman'),
                  'You can customize this specifically for' => __('You can customize this specifically for', 'hueman'),
                  'Currently inherited from' => __('Currently inherited from','hueman'),
                  'You can customize this specifically for' => __('You can customize this specifically for','hueman'),
                  'The value currently applied to' => __('The value currently applied to','hueman'),
                  'The value that will be applied to' => __('The value that will be applied to','hueman'),
                  'is set in' => __('is set in','hueman'),
                  'is customized in' => __('is customized in','hueman'),

                  //various skope
                  'is always customized sitewide.' => __('is always customized sitewide.', 'hueman'),
                  'Menus are created sitewide.' => __('Menus are created sitewide.', 'hueman'),
                  'Widgets are created sitewide.' => __('Widgets are created sitewide.', 'hueman'),
                  'and' => __('and', 'hueman'),
                  'Switch to scope' => __('Switch to scope', 'hueman'),
                  'In this context :' => __('In this context :', 'hueman'),
                  'inherits from' => __('inherits from', 'hueman'),
                  'overridden by' => __('overridden by', 'hueman'),

                  //error when loading
                  'There was a problem when trying to load the customizer.' => __('There was a problem when trying to load the customizer.','hueman'),
                  'Please refer to' => __('Please refer to','hueman'),
                  'this documentation page' => __('this documentation page','hueman'),
                  'to understand how to fix the problem.' => __('to understand how to fix the problem.','hueman'),

                  //skope preview bottom informations
                  'The customizations made site wide are inherited by all other levels of customization.' => __('The customizations made site wide are inherited by all other levels of customization.', 'hueman'),
                  'The current context' => __('The current context', 'hueman'),
                  'can be customized more specifically at the following level' => __('can be customized more specifically at the following level', 'hueman'),
                  'The current customizations will be applied to' => __('The current customizations will be applied to', 'hueman'),
                  'The options not customized at this level will inherit their value from' => __('The options not customized at this level will inherit their value from', 'hueman'),
                  'can be customized more specifically at the following level' => __('can be customized more specifically at the following level', 'hueman'),
                  'can be customized with a specific set of options.' => __('can be customized with a specific set of options.', 'hueman'),
                  'The options not customized at this level will inherit their value from' => __('The options not customized at this level will inherit their value from', 'hueman')
              )
        )
    );
}