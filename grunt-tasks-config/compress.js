module.exports = {
	main: {
		options: {
			mode: 'zip',
			archive: './build/<%= pkg.name %>.zip'
		},
		expand: true,
		cwd: 'build/<%= pkg.name %>/',
		src: ['**/*'],
		dest: '<%= pkg.name %>/'
	}
};