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
	readme : {
		src: [
			'readme.md', 'readme.txt'
		],
		overwrite: true,
		replacements: [ {
			from: /^.*# Hueman v.*$/m,
			to: '# Hueman v<%= pkg.version %>'
		} ]
	}
};