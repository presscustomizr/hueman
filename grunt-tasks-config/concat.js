module.exports = {
  options: {
    separator: '',
  },
  front_css: {
    src: ['<%= paths.front_css %>dev-common.css', '<%= paths.front_css %>dev-responsive.css', '<%= paths.front_css %>dev-font-awesome.css'],
    dest: '<%= paths.front_css %>main.css',
  },
  front_not_responsive_css: {
    src: ['<%= paths.front_css %>dev-common.css', '<%= paths.front_css %>dev-font-awesome.css'],
    dest: '<%= paths.front_css %>main-not-responsive.css',
  },
  czr_control_js:{
    src: [
      '<%= paths.global_js %>oldBrowserCompat.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/icheck.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/selecter.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/stepper.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/select2.min.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_0_pre_a_base_values.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_0_pre_b_scope_base.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_0_pre_c_scope_model.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_0_pre_d_scope_view.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_0_pre_x_api_overrides.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_0_pre_y_api_helpers.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_0_pre_z_api_dom_listeners.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_1_input_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_1_input_1_img_upload.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_1_input_2_colorpicker.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_0_0_1_input_3_selecter.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_0_1_base_control.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_1_0_static_control_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_1_0_static_control_1_models.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_1_0_static_control_2_views.js',
      //'<%= paths.czr_assets %>fmk/js/control_dev/_1_0_static_control_3_inputs.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_1_1_dyn_control_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_1_1_dyn_control_1_model.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_1_1_dyn_control_2_collection.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_1_1_dyn_control_3_view.js',



      '<%= paths.czr_assets %>fmk/js/control_dev/_2_1_multiplepicker_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_2_2_cropped_image_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_2_3_upload_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_2_4_layout_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_2_5_background_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_2_6_widget_zones_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_2_7_socials_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_2_8_sektions_control.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_5_extend_api.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_6_visibilities.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_7_various_dom_ready.js'
      //'<%= paths.czr_assets %>fmk/js/control_dev/_control.js',
      //'<%= paths.czr_assets %>fmk/js/control_dev/_various_dom_ready.js',
    ],
    dest: '<%= paths.czr_assets %>fmk/js/czr-control.js',
  }
};
