//https://www.npmjs.org/package/grunt-multi
module.exports = function(grunt) {
	return {
		prod_skins : {
			options : {
				logBegin: function( vars ){
					console.log( 'Begin generating skin : ' + vars.skin_list + ' ' + vars.skin_color_list);
				},
				logEnd: function( vars ){
					console.log( 'Skin : ' + vars.skin_list + ' created');
				},
				//pkg : function() { return grunt.file.readJSON( 'package.json' ) },
				vars : {
					skin_list : function() {
						var _skin_list = [];
						Object.keys(grunt.config('pkg.skins')).forEach(function(key) {
							_skin_list.push(key);
						});
						return _skin_list;
					},
					skin_color_list : function() {
						var _color_list = [],
							_skins = grunt.config('pkg.skins');
						Object.keys(_skins).forEach(function(key) {
							_color_list.push(_skins[key]);
						});
						return _color_list;
					},
				},
				config: {
					skin_name : "<%= skin_list %>",
					skin_color : "<%= skin_color_list %>",
				},
				tasks : ['less:skin_generator']
			}
		}
	};
};