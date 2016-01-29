module.exports = {
  options: {
    // compatibility: {
    //     properties: {
    //         spaceAfterClosingBrace: true
    //     }
    // }
  },
	dev_skin: {
		files: [
			{'<%= paths.front_css %>blue3.min.css' : '<%= paths.front_css %>blue3.css'}
		]
	},
  dev_common: {
    files: [
      {'<%= paths.front_css %>tc_common.min.css' : '<%= paths.front_css %>tc_common.css'}
    ]
  },
	prod_skins: {
		expand: true,
		cwd: '<%= paths.front_css %>',
		src: ['*.css', '!*.min.css'],
		dest: '<%= paths.front_css %>',
		ext: '.min.css'
	},
	prod_common :{
		expand: true,
		cwd: '<%= paths.front_css %>',
		src: ['tc_common.css'],
		dest: '<%= paths.front_css %>',
		ext: '.min.css'
	},
  prod_common_rtl :{
    expand: true,
    cwd: '<%= paths.front_css %>rtl/',
    src: ['tc_common.css'],
    dest: '<%= paths.front_css %>rtl/',
    ext: '.min.css'
  },
	prod_admin_css: {
		expand: true,
		cwd: '<%= paths.admin_css %>',
		src: ['*.css', '!*.min.css'],
		dest: '<%= paths.admin_css %>',
		ext: '.min.css'
	},
  custom_skin : {
    expand: true,
    cwd: 'custom-skins/',
    src: ['*.css', '!*.min.css'],
    dest: 'custom-skins/',
    ext: '.min.css'
  }
};