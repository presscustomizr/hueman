module.exports = {
	options : {
		reporter : require('jshint-stylish')
	},
	gruntfile : ['Gruntfile.js'],
  part_front_js : ['<%= paths.front_js %>/parts/*.part.js', '<%= paths.front_js %>/parts/jquery*', '! <%= paths.front_js %>/parts/*.min.js' ],
	front : ['<%= paths.front_js %>parts/main.js'],
	those : [], //populated dynamically with the watch event
};