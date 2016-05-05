module.exports = {
	free: {
		src:  [
			'**',
			'!bin/**',
			'!build/**',
			'!grunt-tasks-config/**',
			'!node_modules/**',
			'!tests/**',
			'!wpcs/**',
			'!.git/**',
			'!gruntfile.js',
			'!package.json',
			'!.gitignore',
			'!.ftpauth',
			'!.travis.yml',
			'!travis-examples/**',
			'!phpunit.xml',
			//'!readme.md',
			'!**/*.db',
      '!patches/**',
      '!inc/init-pro.php',
      '!assets/back/js/parts/**',
      '!assets/front/css/dev-common.css',
      '!assets/front/css/dev-responsive.css',
      '!assets/front/css/dev-font-awesome.css',
      '!npm-debug.log',
		],
		dest: 'build/<%= pkg.name %>/'
	}
};