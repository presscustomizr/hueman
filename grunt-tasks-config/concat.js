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
  czr_control_css:{
    src:[
      '<%= paths.czr_assets %>fmk/css/parts/czr-control-common.css',
      '<%= paths.czr_assets %>fmk/css/parts/czr-control-modules.css',
      '<%= paths.czr_assets %>fmk/css/parts/czr-control-footer.css',
      '<%= paths.czr_assets %>fmk/css/parts/czr-control-input-types.css',
      '<%= paths.czr_assets %>fmk/css/parts/czr-control-sektion.css',
      '<%= paths.czr_assets %>fmk/css/parts/czr-control-skope.css'
    ],
    dest : '<%= paths.czr_assets %>fmk/css/czr-control.css',
  },
  czr_control_js:{
    src: [
      '<%= paths.global_js %>oldBrowserCompat.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/icheck.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/selecter.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/stepper.min.js',
      '<%= paths.czr_assets %>fmk/js/lib/select2.min.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_0_pre_base.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_1_skope_base_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_2_skope_base_current_skopes_collection.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_3_skope_base_active_skope_react.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_4_skope_base_control_reset.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_5_skope_base_helpers.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_7_skope_model_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_8_skope_model_view.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_1_skope/_0_0_0_pre_9_skope_model_reset.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/0_2_api_override/_0_0_0_pre_90_api_overrides.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/0_3_api_helpers/_0_0_0_pre_91_api_helpers_various.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/0_3_api_helpers/_0_0_0_pre_92_api_helpers_dom.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/1_0_input/_0_0_1_input_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_0_input/_0_0_1_input_1_img_upload.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_0_input/_0_0_1_input_2_colorpicker.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_0_input/_0_0_1_input_3_selecter.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_0_input/_0_0_1_input_4_content_picker.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_0_input/_0_0_1_input_5_text_editor.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/1_1_item/_0_0_2_item_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_1_item/_0_0_2_item_1_collection.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_1_item/_0_0_2_item_2_model.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_1_item/_0_0_2_item_3_view.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/1_2_module/_0_0_3_module_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_2_module/_0_0_3_module_1_collection.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_2_module/_0_0_3_module_2_model.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_2_module/_0_0_3_module_3_view.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/1_2_module/_0_0_4_dyn_module_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_2_module/_0_0_4_dyn_module_1_pre_item_views.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_0_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_1_sektion_item_extend.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_2_sektion_column.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_3_dragula.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_4_modules_panel.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_5_column_class_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_6_column_class_collection.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/sektion/_2_8_sektions_module_7_settings_panel.js',


      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/_2_7_socials_module.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/_2_6_widget_areas_module.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/_2_9_fps_module.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/_3_0_text_module.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/_3_1_slider_module.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/5_0_module_list/_3_15_text_editor_module.js',


      '<%= paths.czr_assets %>fmk/js/control_dev/1_3_control/_0_1_0_base_control.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/1_3_control/base_module_control/_0_1_0_base_module_control_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_3_control/base_module_control/_0_1_1_base_module_control_instantiate.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_3_control/base_module_control/_0_1_2_base_module_control_collection.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/1_3_control/multi_module_control/_0_2_0_multi_module_control_init.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/1_3_control/multi_module_control/_0_2_1_multi_module_control_mod_extender.js',


      '<%= paths.czr_assets %>fmk/js/control_dev/6_0_control_list/_2_1_multiplepicker_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/6_0_control_list/_2_2_cropped_image_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/6_0_control_list/_2_3_upload_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/6_0_control_list/_2_4_layout_control.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/6_0_control_list/_2_5_background_control.js',

      '<%= paths.czr_assets %>fmk/js/control_dev/_5_extend_api.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_6_visibilities.js',
      '<%= paths.czr_assets %>fmk/js/control_dev/_7_various_dom_ready.js'
    ],
    dest: '<%= paths.czr_assets %>fmk/js/czr-control.js',
  }
};