module.exports = {
	target: {
		options: {
			domainPath: '<%= paths.lang %>',    // Where to save the POT file.
			mainFile: 'style.css',      // Main project file.
			potFilename: 'customizr.pot',   // Name of the POT file.
			type: 'wp-theme',  // Type of project (wp-plugin or wp-theme).
			exclude: ['node_modules/.*'], // List of files or directories to ignore.
			processPot: function( pot, options ) {
				pot.headers['Project-Id-Version'] = '* Customizr v3.2.5\n';
				pot.headers['report-msgid-bugs-to'] = 'http://presscustomizr.com/contact/';
				pot.headers['plural-forms'] = 'nplurals=2; plural=(n > 1);\n;';
				pot.headers['last-translator'] = 'Nicolas <contact@presscustomizr.com>\n';
				pot.headers['language-team'] = 'Customizr translation contributors <contact@presscustomizr.com>\n';
				pot.headers['x-poedit-basepath'] = '.\n';
				pot.headers['X-Poedit-SearchPath-0'] = '..\n';
				pot.headers['x-poedit-language'] = 'English\n';
				pot.headers['x-poedit-country'] = 'UNITED STATES\n';
				pot.headers['x-poedit-sourcecharset'] = 'utf-8\n';
				pot.headers['x-poedit-keywordslist'] = '__;_e;__ngettext:1,2;_n:1,2;__ngettext_noop:1,2;_n_noop:1,2;_c,_nc:4c,1,2;_x:1,2c;_ex:1,2c;_nx:4c,1,2;_nx_noop:4c,1,2;\n';
				pot.headers['x-textdomain-support'] = 'yes\n';
				return pot;
			}
		}
	}
};