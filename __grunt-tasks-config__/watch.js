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
  common_css : {
    files : ['<%= paths.front_css %>_parts/*.css'],
    tasks : [ 'concat:common_css', 'concat:front_css', 'concat:front_not_responsive_css', 'cssmin:front_css', 'cssmin:font_awesome_css' ],
  },
  front_css : {
    files : ['<%= paths.front_css %>dev-common.css', '<%= paths.front_css %>dev-responsive.css', '<%= paths.front_css %>dev-font-awesome.css'],
    tasks : [ 'concat:front_css', 'concat:front_not_responsive_css', 'cssmin:front_css', 'cssmin:font_awesome_css'],
  },
	front_js : {
		files : [
      '<%= paths.front_js %>_front_js_fmk/*.js',
      '<%= paths.front_js %>_parts/*.js',
      '<%= paths.front_js %>libs/*.js',
      '<%= paths.front_js %>libs/jquery-plugins/*.js',
      '!*.min.js',
      '! <%= paths.front_js %>_parts/main.js'
    ],
		//tasks : [ 'jshint:front_js', 'uglify:front_js'],
		tasks: [
        //'replace:czr_fmk_namespace',// always make sure that we have the correct namespace in case it's been copied from Nimble
        'jshint:part_front_js',
        'concat:front_main_parts_js',
        'concat:front_js',
        'jshint:front_js',
        'uglify:front_js',
        'comments:front_assets_js'
    ],
	},
  front_init_js : {
    files : ['<%= paths.front_js %>hu-init.js'],
    tasks : [
        //'replace:czr_fmk_namespace',// always make sure that we have the correct namespace in case it's been copied from Nimble
        'uglify:front_init_js'
    ],
  },
  global_js : {
    files : ['<%= paths.global_js %>*.js', '!*.min.js'],
    tasks : [
        //'replace:czr_fmk_namespace',// always make sure that we have the correct namespace in case it's been copied from Nimble
        'jshint:global_js',
        'uglify:global_js'
    ],
  },
  czr_concat_control_css : {
    files : ['<%= paths.czr_assets %>fmk/css/parts/*.css'],
    tasks : [
        //'replace:czr_fmk_namespace',// always make sure that we have the correct namespace in case it's been copied from Nimble
        'concat:czr_control_css',
        'cssmin:czr_css',
        'copy:czr_css',
        'copy:czr_css_in_hueman_addons'
    ],
  },
  // czr_min_copy_control_css : {
  //   files : ['<%= paths.czr_assets %>fmk/css/czr-control.css'],
  //   tasks : ['cssmin:czr_css', 'copy:czr_css'],
  // },
	czr_control_js : {
		files : ['<%= paths.czr_assets %>fmk/js/control_dev/**/*.js'],
		tasks : [
        //'replace:czr_fmk_namespace',// always make sure that we have the correct namespace in case it's been copied from Nimble
        'jshint:those' ,
        'concat:czr_control_js',
        'comments:czr_control_js',
        'uglify:czr_control_js',
        'copy:czr_js',
        'copy:czr_js_in_hueman_addons'
    ],
	},
	//Other admin js assets are jshinted on change
	czr_preview_js : {
		files : ['<%= paths.czr_assets %>fmk/js/czr-preview-base.js'],
		tasks : [
        //'replace:czr_fmk_namespace',// always make sure that we have the correct namespace in case it's been copied from Nimble
        'jshint:those',
        'uglify:czr_preview_js',
        'copy:czr_js',
        'copy:czr_js_in_hueman_addons'
    ],
	},
	php : {
		files: ['**/*.php' , '!build/**.*.php'],
		tasks: []
	},


  czr_modules : {
    files: ['functions/czr-modules/**/*'],
    tasks: [
        'concat:widget_areas_modules_js'
    ]
  }
};