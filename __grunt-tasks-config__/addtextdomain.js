module.exports = {
    //for some reason we cannot create a parent property like we do in makepot with 'plugin' (and invoke addtextdomain:plugin)
    options: {
        textdomain: '<%= vars.textdomain %>', // Project text domain.
        updateDomains: true  // List of text domains to replace.
    },
    target: {
        files: {
            src: [
                '*/*.php',
                '**/*.php',
                '!build/**',
                '!node_modules/**',
                '!tests/**'
            ]
        }
    }
}