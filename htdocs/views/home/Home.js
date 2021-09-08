

define.view('/Home', function (require, module, view) {
    const JsModule = module.require('JsModule');
    const FileList = module.require('FileList');
    const Project = module.require('Project');
    const Server = module.require('Server');

    view.on('init', function () {

        Server.on({
            'get': function (data) {
                Project.render();
                JsModule.render();
                FileList.render();
            },
        });

    });


    view.on('render', function () {
        
        Server.render();


    });

});
