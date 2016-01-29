module.exports = {
	style: {
		src: [
			'style.css'
		],
		overwrite: true,
		replacements: [ {
			from: /^.* Version:.*$/m,
			to: '* Version: <%= pkg.version %>'
		} ]
	},
	other : {
		src: [
			'<%= paths.lang %>*.po'
		],
		overwrite: true,
		replacements: [ {
			from: /^.* Customizr v.*$/m,
			to: '"Project-Id-Version: * Customizr v<%= pkg.version %>\\n"'
		} ]
	},
	less: {
		src: [
			'<%= paths.less %>**/*.less'
		],
		overwrite: true,
		replacements: [ {
			from: /^.* Customizr v.*$/m,
			to: ' * Customizr v<%= pkg.version %>'
		} ]
	},
  css: {
    src: [
      '<%= paths.front_css %>**/*.css'
    ],
    overwrite: true,
    replacements: [ {
      from: /^.* Customizr v.*$/m,
      to: ' * Customizr v<%= pkg.version %>'
    } ]
  },
	//! the gitinfo task must be ran before the replace:readme task, to get Git info from a working copy and populate grunt.config with the data
	readme : {
		src: [
			'readme.md'
		],
		overwrite: true,
		replacements: [ {
			from: /^.*# Customizr v.*$/m,
			to: '# Customizr v<%= pkg.version %> [![Build Status](https://travis-ci.org/Nikeo/customizr.svg?branch=<%= gitinfo.local.branch.current.name %>)](https://travis-ci.org/Nikeo/customizr)'
		} ]
	}
};