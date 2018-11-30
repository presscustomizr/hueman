module.exports = {
    options: {// options
      eol: 'crlf', //or lf
      overwrite: true //orverwrite on the same file
    },
    czr_js: {// Task
      files: { // Files to process: $dest : $source
        '': [
            '<%= paths.czr_assets %>js/czr-control-base.js',
            '<%= paths.czr_assets %>js/czr-preview-base.js',
        ]
      }
    },
    front_js: {// Task
      files: { // Files to process: $dest : $source
        '': ['<%= paths.front_js %>scripts.js']
      }
    },
    front_css: {// Task
      files: { // Files to process: $dest : $source
        '': ['<%= paths.front_css %>main.css']
      }
    }
};