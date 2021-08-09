

define.panel('/Home/FileList', function (require, module, panel) {
    const API = module.require('API');
    const Loading = module.require('Loading');
    const Main = module.require('Main');


    panel.on('init', function () {

        API.on('success', {
            'get': function (data) {
                Loading.hide();
                Main.render(data);
            },
        });

    });


    panel.on('render', function () {
        Main.hide();
        Loading.render();
        API.get();

    });

});
