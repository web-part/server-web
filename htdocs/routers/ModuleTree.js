define.route('ModuleTree', function (require, module) {
    const Master = module.require('Master');

    return {
        'file': function (file) {
            console.log(module.id, file);
            Master.open('FileList', [file]);
        },
    };

    

});
