module.exports = {
	// gruntfile: {
	// files: 'Gruntfile.js',
	// tasks: ['jshint:gruntfile'],
	// },
	options: {
		spawn : false,
		// Start a live reload server on the default port 35729
		livereload : true,
	},
  front_css : {
    files : ['<%= paths.front_css %>dev-common.css', '<%= paths.front_css %>dev-responsive.css', '<%= paths.front_css %>dev-font-awesome.css'],
    tasks : [ 'concat:front_css', 'concat:front_not_responsive_css', 'cssmin:front_css', 'cssmin:font_awesome_css'],
  },
	front_js : {
		files : ['<%= paths.front_js %>_parts/*.js', '<%= paths.front_js %>lib/*.js', '<%= paths.front_js %>jquery-plugins/*.js', '!*.min.js'],
		//tasks : [ 'jshint:front_js', 'uglify:front_js'],
		tasks: ['jshint:part_front_js', 'concat:front_main_parts_js', 'concat:front_js', 'jshint:front_js', 'uglify:front_js'],
	},
  global_js : {
    files : ['<%= paths.global_js %>*.js', '!*.min.js'],
    tasks : [ 'jshint:global_js', 'uglify:global_js'],
  },
  czr_concat_control_css : {
    files : ['<%= paths.czr_assets %>fmk/css/parts/*.css'],
    tasks : ['concat:czr_control_css', 'cssmin:czr_css', 'copy:czr_css' ],
  },
  // czr_min_copy_control_css : {
  //   files : ['<%= paths.czr_assets %>fmk/css/czr-control.css'],
  //   tasks : ['cssmin:czr_css', 'copy:czr_css'],
  // },
	czr_control_js : {
		files : ['<%= paths.czr_assets %>fmk/js/control_dev/**/*.js'],
		tasks : ['jshint:those' , 'concat:czr_control_js', 'comments:czr_control_js', 'uglify:czr_control_js', 'copy:czr_js' ],
	},
	//Other admin js assets are jshinted on change
	czr_preview_js : {
		files : ['<%= paths.czr_assets %>fmk/js/czr-preview.js'],
		tasks : ['jshint:those', 'uglify:czr_preview_js', 'copy:czr_js'],
	},
	admin_css : {
		files : ['<%= paths.admin_css %>*.css'],
		tasks : ['cssmin:admin_css'],
	},
	php : {
		files: ['**/*.php' , '!build/**.*.php'],
		tasks: []
	}
};