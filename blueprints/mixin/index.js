/*jshint node:true*/

module.exports = {
    description: '',

    locals: function(options) {
        const uppercamelcase = require('uppercamelcase');

        var className;
        var namespace = 'Controller';
        var parts = options.entity.name.split('/');

        if (parts.length > 1) {
            className =  uppercamelcase(parts.splice(parts.length - 1)[ 0 ]);
            for (var i = 0; i < parts.length; ++i) {
                namespace += '.' + uppercamelcase(parts[ i ]);
            }
        } else {
            className = uppercamelcase(options.entity.name);
        }

        return {
            module: 'mixins',
            namespace: namespace,
            inheritance: 'Mixin',
            className: className,
            author: options.project.pkg.author,
            project: options.project.pkg.name
        };
    }

    // afterInstall: function(options) {
    //   // Perform extra work here.
    // }
};