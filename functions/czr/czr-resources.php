<?php

//control scripts and style
add_action( 'customize_controls_enqueue_scripts'        ,  'hu_customize_controls_js_css' );
//preview scripts
//set with priority 20 to be fired after hu_customize_store_db_opt in HU_utils
add_action( 'customize_preview_init'                    , 'hu_customize_preview_js', 20 );
//exports some wp_query informations. Updated on each preview refresh.
add_action( 'customize_preview_init'                    , 'hu_add_preview_footer_action', 20 );
//Add the visibilities
add_action( 'customize_controls_print_footer_scripts'   , 'hu_extend_visibilities', 10 );

//hook : customize_preview_init
function hu_customize_preview_js() {
  global $wp_version;

  wp_enqueue_script(
    'hu-customizer-preview' ,
    sprintf('%1$s/assets/czr/js/czr-preview%2$s.js' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
    array( 'customize-preview', 'underscore'),
    ( defined('WP_DEBUG') && true === WP_DEBUG ) ? time() : HUEMAN_VER,
    true
  );

  //localizes
  wp_localize_script(
        'hu-customizer-preview',
        'HUPreviewParams',
        apply_filters('hu_js_customizer_preview_params' ,
          array(
            'themeFolder'     => get_template_directory_uri(),
            'wpBuiltinSettings' => HU_customize::$instance -> hu_get_wp_builtin_settings(),
            'themeOptions'  => HU_THEME_OPTIONS,
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
    sprintf('%1$s/assets/czr/css/czr-control%2$s.css' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
    array( 'customize-controls' ),
    HUEMAN_VER,
    $media = 'all'
  );
  wp_enqueue_script(
    'hu-customizer-controls',
    sprintf('%1$s/assets/czr/js/czr-control%2$s.js' , get_template_directory_uri(), ( defined('WP_DEBUG') && true === WP_DEBUG ) ? '' : '.min' ),
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
          'optionAjaxAction' => HU_OPT_AJAX_ACTION,
          'faviconOptionName' => 'favicon',
          'css_attr' => HU_customize::$instance -> hu_get_controls_css_attr(),
          'translatedStrings' => hu_get_translated_strings(),
          'isDevMode' => ( defined('WP_DEBUG') && true === WP_DEBUG ) || ( defined('TC_DEV') && true === TC_DEV )
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
            subsetting_cbs = api.CZR_preview.prototype.subsetting_cbs || {};

          $.extend( api.CZR_preview.prototype, {
              setting_cbs : $.extend( setting_cbs, {
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
              }),//_.extend()



              subsetting_cbs : $.extend( subsetting_cbs, {
                  'social-links' : {
                      'title' : function( obj ) {
                        $( '[data-model-id="'+ obj.model_id +'"]', '.social-links' ).attr('title', obj.value );
                      },
                      'social-color' : function( obj ) {
                        $( '[data-model-id="'+ obj.model_id +'"]', '.social-links' ).css('color', obj.value );
                      },
                      'social-icon' : function( obj ) {
                        var $_el = $( '#'+ obj.model_id, '.social-links' ).find('i'),
                            _classes = ! _.isUndefined( $_el.attr('class') ) ? $_el.attr('class').split(' ') : [],
                            _prev = '';

                        //find the previous class
                        _.filter(_classes, function(_c){
                          if ( -1 != _c.indexOf('fa-') )
                            _prev = _c;
                        });

                        $( '[data-model-id="'+ obj.model_id +'"]', '.social-links' ).find('i').removeClass(_prev).addClass( obj.value );
                      },
                      'social-link' : function( obj ) {
                        var self = this;
                        $( '[data-model-id="'+ obj.model_id +'"]', '.social-links' ).attr('href', ! self._isValidURL(obj.value) ? 'javascript:void(0);' : obj.value );
                      },
                      'social-target' : function( obj ) {
                        if ( 0 !== ( obj.value * 1 ) )
                          $( '[data-model-id="'+ obj.model_id +'"]', '.social-links' ).attr('target', "_blank");
                        else
                          $( '[data-model-id="'+ obj.model_id +'"]', '.social-links' ).removeAttr('target');
                      }
                  }
              })
          });
    }) ( wp.customize, jQuery, _);
  </script>
  <?php
}




//hook : wp_footer in the preview
function hu_add_customize_preview_data() {
  global $wp_query, $wp_customize;

  $_wp_conditionals = array();
  $_available_locations = hu_get_available_widget_loc();

  //export only the conditional tags
  foreach( (array)$wp_query as $prop => $val ) {
    if (  false === strpos($prop, 'is_') )
      continue;
    if ( 'is_home' == $prop )
      $val = hu_is_home();

    $_wp_conditionals[$prop] = $val;
  }

  ?>
    <script type="text/javascript" id="czr-customizer-data">
      (function ( _export ){
        _export.czr_wp_conditionals = <?php echo wp_json_encode( $_wp_conditionals ) ?>;
        _export.availableWidgetLocations = <?php echo wp_json_encode( $_available_locations ) ?>;
      })( _wpCustomizeSettings );
    </script>
  <?php
}



//hook : 'customize_controls_enqueue_scripts':10
function hu_extend_visibilities() {
  $_header_img_notice = sprintf( __( "When the %s, this element will not be displayed in your header.", 'hueman'),
      sprintf('<a href="%1$s" title="%2$s">%2$s</a>',
        "javascript:wp.customize.section(\'header_design_sec\').focus();",
        __('header image is enabled', 'hueman')
      )
  );
  $_front_page_content_notice = sprintf( __( "Jump to the %s.", 'hueman'),
      sprintf('<a href="%1$s" title="%2$s">%2$s</a>',
        "javascript:wp.customize.section(\'content_blog_sec\').focus();",
        __('blog design panel', 'hueman')
      )
  );
  $_header_menu_notice = sprintf( __( "The menu currently displayed in your header is a default page menu, you can disable it in the %s.", 'hueman'),
      sprintf('<a href="%1$s" title="%2$s">%2$s</a>',
        "javascript:wp.customize.section(\'header_menu_sec\').focus();",
        __('Header Panel', 'hueman')
      )
  );
  ?>
  <script id="control-visibilities" type="text/javascript">
    (function (api, $, _) {
      //@return boolean
      var _is_checked = function( to ) {
              return 0 !== to && '0' !== to && false !== to && 'off' !== to;
      };
      //when a dominus object define both visibility and action callbacks, the visibility can return 'unchanged' for non relevant servi
      //=> when getting the visibility result, the 'unchanged' value will always be checked and resumed to the servus control current active() state
      api.CZR_visibilities.prototype.dominiDeps = _.extend(
            api.CZR_visibilities.prototype.dominiDeps,
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
                                        var _html = '<span class="description customize-control-description ' + _class +'"><?php echo $_front_page_content_notice; ?></span>';
                                        api.control(wpServusId).container.find('.customize-control-title').after( _html );
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
                        servi : ['logo-max-height', 'custom_logo', 'custom-logo' ],//depending on the WP version, the custom logo option is different.
                        visibility : function( to ) {
                              return _is_checked(to);
                        }
                },
                {
                        dominus : 'use-header-image',
                        onSectionExpand : false,
                        servi : ['header_image', 'display-header-logo', 'custom_logo', 'custom-logo', 'logo-max-height', 'blogname', 'blogdescription', 'header-ads'],
                        visibility : function( to, servusShortId ) {
                              if ( 'header_image' != servusShortId )
                                return 'unchanged';
                              return _is_checked(to);
                        },
                        actions : function( to, servusShortId ) {
                              var wpServusId = api.CZR_Helpers.build_setId( servusShortId ),
                                  shortServusId = api.CZR_Helpers.getOptionName( servusShortId ),
                                  _return = api.control(wpServusId).active();

                              //print a notice
                              switch( shortServusId ) {
                                    case 'display-header-logo' :
                                    case 'custom_logo' :
                                    case 'blogname' :
                                    case 'blogdescription' :
                                    case 'custom-logo' :
                                    case 'header-ads' :
                                        if ( ! api.control.has(wpServusId) )
                                          return;

                                        if ( ! _is_checked(to) && $( '.hu-header-image-notice', api.control(wpServusId).container ).length ) {
                                              $('.hu-header-image-notice', api.control(wpServusId).container ).remove();
                                        } else if ( _is_checked(to) ) {
                                              if ( $( '.hu-header-image-notice', api.control(wpServusId).container ).length )
                                                return;
                                              var _html = '<span class="description customize-control-description hu-header-image-notice"><?php echo $_header_img_notice; ?></span>';
                                              api.control(wpServusId).container.find('.customize-control-title').after( _html );
                                        }
                                    break;
                              }

                              //change opacity
                              switch( shortServusId ) {
                                    case 'display-header-logo' :
                                    case 'logo-max-height' :
                                    case 'custom_logo' :
                                    case 'custom-logo' :
                                    case 'header-ads' :
                                        if ( ! api.control.has(wpServusId) )
                                          return;
                                        if ( ! _is_checked(to) ) {
                                              $(api.control(wpServusId).container ).css('opacity', 1);
                                        } else {
                                              $(api.control(wpServusId).container ).css('opacity', 0.6);
                                        }
                                    break;
                              }
                        }//actions()
                  },
                  {
                        dominus : 'dynamic-styles',
                        servi : [
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
                              'body-background'
                        ],
                        visibility : function ( to ) {
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
                        _html = '<p class="description customize-control-description ' + _notice_selector +'"><?php echo $_header_menu_notice; ?></p>',
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
                                    $menu_panel_content.append( _html );
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


function hu_get_translated_strings() {
  return apply_filters('controls_translated_strings',
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

            //WP TEXT EDITOR MODULE
            'textEditorOpen' => __('Edit', 'hueman'),
            'textEditorClose' => __('Close Editor', 'hueman'),

            //SLIDER MODULE
            'slideAdded'   => __('New Slide created ! Scroll down to edit it.', 'hueman'),
            'slideTitle'   => __( 'Slide', 'hueman')
      )
  );
}