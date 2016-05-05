module.exports = {
	options: {
		compress: {
			global_defs: {
				"DEBUG": false
  		},
  		dead_code: true
		},
    preserveComments: function(node, comment) {
            // preserve comments that start with a bang
            return /^!/.test( comment.value );
        },
	},
  global_js: {
    files: [{
      expand: true,
      cwd: '<%= paths.global_js %>',
      src: ['oldBrowserCompat.js'],
      //src: ['**/*.js', '!*.min.js'],
      dest: '<%= paths.global_js %>',
      ext: '.min.js'
    }]
  },
	front_js: {
		files: [{
			expand: true,
			cwd: '<%= paths.front_js %>',
			src: ['scripts.js'],
			//src: ['**/*.js', '!*.min.js'],
			dest: '<%= paths.front_js %>',
			ext: '.min.js'
		}]
	},
  customize_control_js : {
    files: [{
      expand: true,
      cwd: '<%= paths.admin_js %>',
      src: ['theme-customizer-control.js'],
      dest: '<%= paths.admin_js %>',
      ext: '.min.js'
    }]
  },
  customize_preview_js : {
    files: [{
      expand: true,
      cwd: '<%= paths.admin_js %>',
      src: ['theme-customizer-preview.js'],
      dest: '<%= paths.admin_js %>',
      ext: '.min.js'
    }]
  },
	prod_admin_js:{
		files: [{
			expand: true,
			cwd: '<%= paths.admin_js %>',
			src: ['*.js', '!*.min.js'],
			dest: '<%= paths.admin_js %>',
			ext: '.min.js'
		}]
	},
	any_file : {
		files: { '<%= uglify_requested_paths.dest %>': ['<%= uglify_requested_paths.src %>']
      }
	}
};