module.exports = {
  options: {
    separator: '',
  },
  common_css : {
    src: [
      '<%= paths.front_css %>_parts/0_0_reset_iefixes_adminbar.css',
      '<%= paths.front_css %>_parts/0_1_base_styles.css',
      '<%= paths.front_css %>_parts/0_2_base_structure.css',
      '<%= paths.front_css %>_parts/0_3_common_elements.css',
      '<%= paths.front_css %>_parts/0_4_header.css',
      '<%= paths.front_css %>_parts/0_5_single_post_page.css',
      '<%= paths.front_css %>_parts/0_6_post_formats.css',
      '<%= paths.front_css %>_parts/0_7_widgets.css',
      '<%= paths.front_css %>_parts/0_8_comments.css',
      '<%= paths.front_css %>_parts/0_9_child_menus.css',
      '<%= paths.front_css %>_parts/1_0_plugin_compat.css',
      '<%= paths.front_css %>_parts/2_0_flexslider.css',
      '<%= paths.front_css %>_parts/3_0_shortcodes.css',
      '<%= paths.front_css %>_parts/4_0_svg_thumbnails.css',
      '<%= paths.front_css %>_parts/9_0_footer.css'
      //'<%= paths.front_css %>_parts/9_9_skins.css'
    ],
    dest: '<%= paths.front_css %>dev-common.css',
  },
  front_css: {
    //src: ['<%= paths.front_css %>dev-common.css', '<%= paths.front_css %>dev-responsive.css', '<%= paths.front_css %>dev-font-awesome.css'],
    src: ['<%= paths.front_css %>dev-common.css', '<%= paths.front_css %>dev-responsive.css' ],
    dest: '<%= paths.front_css %>main.css',
  },
  front_not_responsive_css: {
    //src: ['<%= paths.front_css %>dev-common.css', '<%= paths.front_css %>dev-font-awesome.css'],
    src: ['<%= paths.front_css %>dev-common.css'],
    dest: '<%= paths.front_css %>main-not-responsive.css',
  },
  //
  //------------------------- FRONT JS
  //
  front_main_parts_js : {
    src: [
      '<%= paths.front_js %>_front_js_fmk/_main_base_0_utilities.part.js',
      '<%= paths.front_js %>_front_js_fmk/_main_base_1_fmk.part.js',

      '<%= paths.front_js %>_parts/_main_base_2_initialize.part.js',

      '<%= paths.front_js %>_parts/_main_browser_detect.part.js',

      '<%= paths.front_js %>_parts/_main_jquery_plugins.part.js',

      '<%= paths.front_js %>_parts/_main_userxp_0_init_and_utils.part.js',
      '<%= paths.front_js %>_parts/_main_userxp_1_mobile_menu_toggle.part.js',
      '<%= paths.front_js %>_parts/_main_userxp_2_stickify.part.js',
      '<%= paths.front_js %>_parts/_main_userxp_3_sidebars_life.part.js',
      '<%= paths.front_js %>_parts/_main_userxp_4_various.part.js',
      '<%= paths.front_js %>_parts/_main_userxp_5_welcome.js',

      '<%= paths.front_js %>_front_js_fmk/_main_xfire_0.part.js',

      '<%= paths.front_js %>_parts/_main_xfire_1_theme_specific.part.js'
    ],
    dest: '<%= paths.front_js %>_parts/main.js',
  },
  front_js: {
    src: [
      '<%= paths.global_js %>oldBrowserCompat.js',
      //'<%= paths.front_js %>parts/underscore-min.js',
      '<%= paths.front_js %>libs/jquery-plugins/jqueryimgOriginalSizes.js',
      '<%= paths.front_js %>libs/jquery-plugins/jqueryimgSmartLoad.js',
      '<%= paths.front_js %>libs/jquery-plugins/jqueryextLinks.js',
      '<%= paths.front_js %>libs/jquery-plugins/jqueryCenterImages.js',
      '<%= paths.front_js %>libs/jquery-plugins/jqueryParallax.js',
      '<%= paths.front_js %>libs/requestAnimationFramePolyfill.js',
      '<%= paths.front_js %>libs/matchMediaPolyfill.js',
      //'<%= paths.front_js %>libs/smoothScroll.js',
      '<%= paths.front_js %>libs/outline.js',
      '<%= paths.front_js %>libs/jquery.waypoints.js',
      //'<%= paths.front_js %>libs/vivus.min.js',
      '<%= paths.front_js %>libs/jquery.fittext.js',
      '<%= paths.front_js %>_parts/main.js'
    ],
    dest: '<%= paths.front_js %>scripts.js',
  },


  //
  //------------------------- WIDGET AREAS MODULE
  //
  widget_areas_modules_js: {
    src: [
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_0_widg_initialize.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_1_widg_input_constructor.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_2_widg_item_constructor.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_3_widg_add_remove_widget_zones.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_4_widg_panel_section_react.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_5_widg_callbacks_for_sidebar_insights_values.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_6_widg_overriden_module_methods.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_8_widg_react_to_preview_widget_settings.js',
      '<%= paths.czr_modules %>widget-zones/assets/js/_dev/_2_6_9_widg_extend_module_map.js'
    ],
    dest: '<%= paths.czr_modules %>widget-zones/assets/js/_2_6_widget_areas_module.js',
  },
};