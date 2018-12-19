module.exports = {
  options: {
    // compatibility: {
    //     properties: {
    //         spaceAfterClosingBrace: true
    //     }
    // }
  },
  front_css : {
    expand: true,
    cwd: '<%= paths.front_css %>',
    src: ['main.css', 'main-not-responsive.css'],
    dest: '<%= paths.front_css %>',
    ext: '.min.css'
  },
  font_awesome_css: {
    files: [
      {'<%= paths.front_css %>font-awesome.min.css' : '<%= paths.front_css %>dev-font-awesome.css'}
    ]
  }
  // czr_css: {
  //   expand: true,
  //   cwd: '<%= paths.czr_assets %>fmk/css',
  //   src: ['*.css', '!*.min.css'],
  //   dest: '<%= paths.czr_assets %>css',
  //   ext: '.min.css'
  // }
};