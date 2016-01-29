module.exports = {
	main: {
		options: {
			mode: 'zip',
			archive: './build/free/<%= pkg.name %>.zip'
		},
		expand: true,
		cwd: 'build/free/<%= pkg.name %>/',
		src: ['**/*'],
		dest: '<%= pkg.name %>/'
	}
};