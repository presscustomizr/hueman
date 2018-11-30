module.exports = {
	style: {
		src: [
			'style.css'
		],
		overwrite: true,
		replacements: [ {
			from: /^.*Version: .*$/m,
			to: 'Version: <%= pkg.version %>'
		} ]
	},
	other : {
		src: [
			'<%= paths.lang %>*.po'
		],
		overwrite: true,
		replacements: [ {
			from: /^.* Hueman v.*$/m,
			to: '"Project-Id-Version: Hueman v<%= pkg.version %>\\n"'
		} ]
	},
	readme_md : {
		src: [
			'readme.md'
		],
		overwrite: true,
		replacements: [ {
			from: /^.*# Hueman v.*$/m,
			to: '# Hueman v<%= pkg.version %>'
		} ]
	},
  readme_txt : {
    src: [
      'readme.txt'
    ],
    overwrite: true,
    replacements: [ {
      from: /^.*Stable tag: .*$/m,
      to: 'Stable tag: <%= pkg.version %>'
    } ]
  },
  czr_fmk_namespace : {
    src: [
      'functions/czr-base-fmk/czr-base-fmk.php'
    ],
    overwrite: true,
    replacements: [ {
      from: /^.*namespace Nimble;.*$/m,
      to: 'namespace hu_czr_fmk;'
    } ]
  },
  // czr_control_js : {
  //   src: [
  //     '<%= paths.czr_assets %>js/czr-control.js', '<%= paths.czr_assets %>js/czr-control.min.js'
  //   ],
  //   overwrite: true,
  //   replacements: [ { from: 'czr_activeSkopeId', to: 'milton_poetry' } ]
  // }
};