<?php

//control scripts and style
add_action( 'customize_controls_enqueue_scripts'        ,  'hu_customize_controls_js_css' );
//preview scripts
//set with priority 20 to be fired after hu_customize_store_db_opt in HU_utils
add_action( 'customize_preview_init'                    , 'hu_customize_preview_js', 20 );
//exports some wp_query informations. Updated on each preview refresh.
add_action( 'customize_preview_init'                    , 'hu_add_preview_footer_action', 20 );
//Various DOM ready actions + print rate link + template
add_action( 'customize_controls_print_footer_scripts'   , 'hu_various_dom_ready' );
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
        'isCtxEnabled'  => HU_CTX_ON,
        'themeOptions'  => HU_THEME_OPTIONS,
        'optionAjaxAction' => HU_OPT_AJAX_ACTION,
        'faviconOptionName' => 'favicon',
        'defaultSocialColor' => 'rgba(255,255,255,0.7)',
        'dynWidgetSection' => CZR_DYN_WIDGETS_SECTION,
        'defaultWidgetSidebar' => 'primary',//the one that will be cloned. Specific to each themes
        'defaultWidgetLocation' => 's1',//Specific to each themes
        'css_attr' => HU_customize::$instance -> hu_get_controls_css_attr(),
        'translatedStrings' => HU_customize::$instance -> hu_get_translated_strings()
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
                          _hasLogo,
                          _logoSet = api.has( self._build_setId('custom-logo') ) ? api( self._build_setId('custom-logo') ).get() : '';

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






//hook : customize_controls_print_footer_scripts
function hu_various_dom_ready() {
  ?>
  <script id="rate-tpl" type="text/template" >
    <?php
      printf( '<span class="czr-rate-link">%1$s %2$s, <br/>%3$s <a href="%4$s" title="%5$s" class="czr-stars" target="_blank">%6$s</a> %7$s</span>',
        __( 'If you like' , 'hueman' ),
        __( 'the Hueman theme' , 'hueman'),
        __( 'we would love to receive a' , 'hueman' ),
        'https://' . 'wordpress.org/support/view/theme-reviews/hueman?filter=5',
        __( 'Review the Hueman theme' , 'hueman' ),
        '&#9733;&#9733;&#9733;&#9733;&#9733;',
        __( 'rating. Thanks :) !' , 'hueman')
      );
    ?>
  </script>
  <script id="rate-theme" type="text/javascript">
    (function (wp, $) {
      $( function($) {
        //Render the rate link
        _render_rate_czr();
        function _render_rate_czr() {
          var _cta = _.template(
                $( "script#rate-tpl" ).html()
          );
          $('#customize-footer-actions').append( _cta() );
        }

        /* Append text to the content panel title */
        if ( $('#accordion-panel-hu-content-panel').find('.accordion-section-title').first().length ) {
          $('#accordion-panel-hu-content-panel').find('.accordion-section-title').first().append(
            $('<span/>', { html : ' ( Home, Blog, Layout, Sidebars, Slideshows, ... )' } ).css('font-style', 'italic').css('font-size', '14px')
          );
        }
      });
    })(wp, jQuery)
  </script>
  <?php
}


//hook : 'customize_controls_enqueue_scripts':10
function hu_extend_visibilities() {
  ?>
  <script id="control-visibilities" type="text/javascript">
    (function (api, $, _) {
      api.CZR_visibilities.prototype.controlDeps = _.extend(
        api.CZR_visibilities.prototype.controlDeps,
        {
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
              'body-background'
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
          }
        }//end of visibility {}
      );//_.extend()
    }) ( wp.customize, jQuery, _);
  </script>
  <?php
}