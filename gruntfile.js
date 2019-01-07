
module.exports = function(grunt) {
	var path = require('path');
  var _ = require('lodash');
	var global_config = {
		// path to task.js files, defaults to grunt dir
      configPath: path.join(process.cwd(), '__grunt-tasks-config__/'),
      // auto grunt.initConfig
      init: true,
      // data passed into config ( => the basic grunt.initConfig(config) ). Can be used afterwards with < %= test % >
      data: {
      pkg: grunt.file.readJSON( 'package.json' ),
      paths : {
        front_css : 'assets/front/css/',
        front_js : 'assets/front/js/',
        global_js : 'assets/global/',
        admin_css : 'assets/admin/css/',
        admin_js : 'assets/admin/js/',
        czr_assets : 'assets/czr/',
        czr_modules : 'functions/czr-modules/',
        lang : 'languages/'
      },
      vars : {
        textdomain : 'hueman'
      },
			//default less modifiers
			is_rtl: 'true',
			//https://www.npmjs.org/package/grunt-ssh
			//Check if the context var is set and == travis => avoid travis error with ftpauth no found
			//credentials : 'travis' == grunt.option('context') ? {} : grunt.file.readJSON('.ftpauth'),
			hueman_tasks : {
				//DEV : clean the build and watch changes (see watch task)
				'hueman_dev': [
            'replace:czr_fmk_namespace',
            'clean:free',
            'watch'
        ],

				//PROD
        'pre_front_css' : [
            'concat:common_css',
            'concat:front_css',
            'concat:front_not_responsive_css',
            'cssmin:front_css',
            'cssmin:font_awesome_css',
            'lineending:front_css'
        ],
        'pre_front_js' : [
            'jshint:part_front_js',
            'concat:front_main_parts_js',
            'concat:front_js',
            'jshint:front_js',
            'uglify:front_js',
            'uglify:flexslider_js',
            'lineending:front_js',
            'comments:front_assets_js'
        ],
				'hueman_build':  [
            'concurrent:hueman_pre_build',
            'addtextdomain',
            'makepot',
            'potomo',
            'copy:free',
            'compress',
            'copy:pro',
            'copy:pro_lang'
        ],

				//TRAVIS ci virtual machine build check on js @todo check other resources?
				'travis' : ['jshint'],
			},
			uglify_requested_paths : {
				src : '' || grunt.option('src'),
				dest : '' || grunt.option('dest')
			}
		}
	};

	// LOAD GRUNT PACKAGES AND CONFIGS
	// https://www.npmjs.org/package/load-grunt-config
	require( 'load-grunt-config' )( grunt , global_config );

	//http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
	//http://gruntjs.com/api/grunt.task#grunt.task.loadtasks
	//grunt.loadTasks('grunt-tasks');
	// REGISTER TASKS
  _.map( grunt.config('hueman_tasks'), function(task, name) {
    grunt.registerTask(name, task);
  });
	//DEV WATCH EVENT
	//watch is enabled only in dev mode
	grunt.event.on('watch', function(action, filepath, target) {
		var files = [
			{
				expand: true,
				cwd: '.',
				src: [
				filepath,
				]
			}
		];
		grunt.log.writeln( 'WATCH EVENT INFOS : ', grunt.task.current.name , action, filepath, target);

		if ( 'admin_customizer_control_js' == target || 'admin_js' == target  || 'czr_control_js' == target ) {
			//if some js admin scripts have been changed in dev mode, jshint them dynamically
			grunt.config('jshint.those', [filepath]);
		}
	});
};