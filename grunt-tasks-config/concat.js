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
	admin_control_js:{
		src: [
      '<%= paths.global_js %>oldBrowserCompat.min.js',
      '<%= paths.admin_js %>lib/icheck.min.js',
      '<%= paths.admin_js %>lib/selecter.min.js',
      '<%= paths.admin_js %>lib/stepper.min.js',
      '<%= paths.admin_js %>lib/select2.min.js',

      '<%= paths.admin_js %>parts/_0_pre_control.js',

      '<%= paths.admin_js %>parts/_1_dyn_control_0_init.js',
      '<%= paths.admin_js %>parts/_1_dyn_control_1_model.js',
      '<%= paths.admin_js %>parts/_1_dyn_control_2_collection.js',
      '<%= paths.admin_js %>parts/_1_dyn_control_3_view.js',
      '<%= paths.admin_js %>parts/_1_dyn_control_4_dom_listeners.js',

      '<%= paths.admin_js %>parts/_1_multi_input_control.js',

      '<%= paths.admin_js %>parts/_2_1_multiplepicker_control.js',
      '<%= paths.admin_js %>parts/_2_2_cropped_image_control.js',
      '<%= paths.admin_js %>parts/_2_3_upload_control.js',
      '<%= paths.admin_js %>parts/_2_4_layout_control.js',
      '<%= paths.admin_js %>parts/_2_5_background_control.js',
      '<%= paths.admin_js %>parts/_2_6_widget_zones_control.js',
      '<%= paths.admin_js %>parts/_2_7_socials_control.js',

      '<%= paths.admin_js %>parts/_5_extend_api.js',
      '<%= paths.admin_js %>parts/_6_visibilities.js',
      '<%= paths.admin_js %>parts/_7_various_dom_ready.js'
      //'<%= paths.admin_js %>parts/_control.js',
      //'<%= paths.admin_js %>parts/_various_dom_ready.js',
    ],
		dest: '<%= paths.admin_js %>theme-customizer-control.js',
	}
};
