define.route('ModuleTree', function (require, module) {
    const Master = module.require('Master');

    return {
        'cmd': {
            'file': function (item) {
                Master.open('FileList', [item.file]);
            },

        },
    };

    

});
