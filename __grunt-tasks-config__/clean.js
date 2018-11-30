module.exports = {
  options : {
    force: true //This overrides this task from blocking deletion of folders outside current working dir (CWD). Use with caution.
  },
	free : ['build/**/*'],
  in_hueman_pro : [
    '../hueman-pro/**/*',
    '!../hueman-pro/addons/**',
    '!../hueman-pro/build/**',
    '!../hueman-pro/__grunt-tasks-config__/**',
    '!../hueman-pro/node_modules/**',
    '!../hueman-pro/.ftpauth',
    '!../hueman-pro/.gitignore',
    '!../hueman-pro/package.json',
    '!../hueman-pro/readme.md',
    '!../hueman-pro/readme.txt',
    '!../hueman-pro/screenshot.png',
    '!../hueman-pro/style.css',
    '!../hueman-pro/gruntfile.js',

    '!../hueman-pro/inc/**',
    '!../hueman-pro/contextualizer/**'
  ],
  // customizr_pro_lang : [
  //   '../customizr-pro/lang_pro/**',
  // ]
};