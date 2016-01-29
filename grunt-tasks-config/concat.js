module.exports = {
	options: {
		separator: '',
	},
	front_main_parts_js : {
    src: ['<%= paths.front_js %>parts/_main_base.part.js', '<%= paths.front_js %>parts/_main_browser_detect.part.js', '<%= paths.front_js %>parts/_main_jquery_plugins.part.js', '<%= paths.front_js %>parts/_main_slider.part.js', '<%= paths.front_js %>parts/_main_userxp.part.js', '<%= paths.front_js %>parts/_main_sticky_header.part.js', '<%= paths.front_js %>parts/_main_sticky_footer.part.js', '<%= paths.front_js %>parts/_main_side_nav.part.js', '<%= paths.front_js %>parts/_main_dropdown_placement.part.js', '<%= paths.front_js %>parts/_main_xfire.part.js' ],
    dest: '<%= paths.front_js %>parts/main.js',
  },
  front_js: {
		src: ['<%= paths.front_js %>parts/tc-js-params.js', '<%= paths.front_js %>parts/oldBrowserCompat.js', '<%= paths.front_js %>parts/bootstrap.js', '<%= paths.front_js %>parts/underscore-min.js', '<%= paths.front_js %>parts/jqueryimgOriginalSizes.js', '<%= paths.front_js %>parts/jqueryaddDropCap.js', '<%= paths.front_js %>parts/jqueryimgSmartLoad.js', '<%= paths.front_js %>parts/jqueryextLinks.js', '<%= paths.front_js %>parts/jqueryCenterImages.js', '<%= paths.front_js %>parts/smoothScroll.js', '<%= paths.front_js %>parts/main.js'],
		dest: '<%= paths.front_js %>tc-scripts.js',
	},
	admin_control_js:{
		src: ['<%= paths.front_js %>parts/oldBrowserCompat.js', '<%= paths.admin_js %>lib/icheck.min.js', '<%= paths.admin_js %>lib/selecter.min.js', '<%= paths.admin_js %>lib/stepper.min.js', '<%= paths.admin_js %>lib/select2.min.js', '<%= paths.admin_js %>parts/_control.js', '<%= paths.admin_js %>parts/_call_to_actions.js' , '<%= paths.admin_js %>parts/_various_dom_ready.js'],
		dest: '<%= paths.admin_js %>theme-customizer-control.js',
	}
};
