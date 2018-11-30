module.exports = {
  front_assets_js : {
    // Target-specific file lists and/or options go here.
    options: {
        singleline: true,
        multiline: true
    },
    src: [ '<%= paths.front_js %>scripts.js'] // files to remove comments from
  }
};