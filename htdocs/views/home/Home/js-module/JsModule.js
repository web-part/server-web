

define.panel('/Home/JsModule', function (require, module, panel) {
    const API = module.require('API');
    const Loading = module.require('Loading');
    const Main = module.require('Main');


    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="refresh"]': function (event) {
                panel.refresh();
            },
        });
        
        API.on('success', {
            'get': function (stat) {
                Loading.hide();
                Main.render(stat);
            },
        });

    });


    panel.on('render', function () {
        Main.hide();
        Loading.render();
        API.get();

    });

});
