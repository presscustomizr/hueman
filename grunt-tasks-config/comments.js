module.exports = {
  customize_control_js : {
    // Target-specific file lists and/or options go here.
    options: {
        singleline: true,
        multiline: true
    },
    src: [ '<%= paths.czr_assets %>/js/czr-control.js'] // files to remove comments from
  }
};