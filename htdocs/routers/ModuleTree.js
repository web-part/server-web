define.route('ModuleTree', function (require, module) {
    const Master = module.require('Master');

    return {
        'file': function (file) {
            Master.open('FileList', [file]);
        },
    };

    

});
