module.exports = {
  customize_control_js : {
    // Target-specific file lists and/or options go here.
    options: {
        singleline: true,
        multiline: true
    },
    src: [ '<%= paths.admin_js %>/theme-customizer-control.js'] // files to remove comments from
  }
};