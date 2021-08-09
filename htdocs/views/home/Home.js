

define.view('/Home', function (require, module, view) {
    const JsModule = module.require('JsModule');
    const FileList = module.require('FileList');

    view.on('init', function () {



    });


    view.on('render', function () {

        // console.log(module.id, '---------render------')

        JsModule.render();
        FileList.render();

    });

});
