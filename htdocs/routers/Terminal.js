define.route('Terminal', function (require, module) {
    const Master = module.require('Master');

    return {
        'cmd': {
            'file': function (file) {
                console.log(file);
                Master.open('FileList', [file]);
            },

        },
    };

    

});
