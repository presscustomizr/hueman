module.exports = {
	theme: {
		options: {
			type: 'wp-theme',
			exclude: [ 'node_modules/.*' ],
			updatePoFiles: true, // Whether to update PO files in the same directory as the POT file.
			potHeaders: {
				'report-msgid-bugs-to': 'https://presscustomizr.com/contact/\n',
				'last-translator': 'Nicolas <contact@presscustomizr.com>\n',
				'language-team': 'Hueman translation contributors <contact@presscustomizr.com>\n'
			}
		}
	}
}