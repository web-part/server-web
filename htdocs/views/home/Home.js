

define.view('/Home', function (require, module, view) {
    const JsModule = module.require('JsModule');
    const FileList = module.require('FileList');
    const Server = module.require('Server');

    view.on('init', function () {



    });


    view.on('render', function () {


        JsModule.render();
        FileList.render();
        Server.render();

    });

});
