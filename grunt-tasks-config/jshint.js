module.exports = {
	options : {
		reporter : require('jshint-stylish')
	},
	gruntfile : ['Gruntfile.js'],
  front_js : ['<%= paths.front_js %>/scripts.js' ],
  global_js : ['<%= paths.global_js %>/oldBrowserCompat.js' ],
	those : [], //populated dynamically with the watch event
};