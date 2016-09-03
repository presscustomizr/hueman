module.exports = {
    options: {// options
      eol: 'crlf', //or lf
      overwrite: true //orverwrite on the same file
    },
    czr_js: {// Task
      files: { // Files to process: $dest : $source
        '': ['<%= paths.czr_assets %>fmk/js/czr-control.js', '<%= paths.czr_assets %>fmk/js/czr-preview.js']
      }
    }
};