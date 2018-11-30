module.exports = {
	options : {
		reporter : require('jshint-stylish')
	},
	gruntfile : ['Gruntfile.js'],
  part_front_js : [
    '<%= paths.front_js %>/_parts/*.part.js',
    '<%= paths.front_js %>/libs/jquery-plugins/*.js',
    '! <%= paths.front_js %>/parts/*.min.js'
  ],
  front_js : ['<%= paths.front_js %>_parts/main.js'],
  //front_js : ['<%= paths.front_js %>/scripts.js' ],
  global_js : ['<%= paths.global_js %>/oldBrowserCompat.js' ],
	those : [], //populated dynamically with the watch event
};