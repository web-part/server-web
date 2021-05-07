define.route('MD5', function (require, module) {
    const Master = module.require('Master');

    return {
        'cmd': {
            'file': function (file) {
                Master.open('FileList', [file]);
            },

        },
    };

    

});
