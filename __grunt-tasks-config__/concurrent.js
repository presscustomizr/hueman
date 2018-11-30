module.exports = {
  options: {
    logConcurrentOutput: true
  },
  hueman_pre_build : {
    tasks: [
      'pre_front_css',
      'pre_front_js',
      'cssmin:admin_css',

      'concat:widget_areas_modules_js',

      //'comments:czr_base_control_js',
      //'comments:czr_base_preview_js',

      'lineending:czr_js',
      'replace',
      'clean',
    ]
  }
};