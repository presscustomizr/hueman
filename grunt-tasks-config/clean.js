module.exports = {
  options : {
    force: true //This overrides this task from blocking deletion of folders outside current working dir (CWD). Use with caution.
  },
	free : ['build/free/**/*'],
  in_customizr_pro : [
    '../customizr-pro/**/*',
    '!../customizr-pro/addons/**',
    '!../customizr-pro/build/**',
    '!../customizr-pro/grunt-tasks-config/**',
    '!../customizr-pro/node_modules/**',
    '!../customizr-pro/.ftpauth',
    '!../customizr-pro/.gitignore',
    '!../customizr-pro/package.json',
    '!../customizr-pro/readme.md',
    '!../customizr-pro/readme.txt',
    '!../customizr-pro/screenshot.png',
    '!../customizr-pro/style.css',
    '!../customizr-pro/gruntfile.js'
  ]
};