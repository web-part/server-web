

define.panel('/Home/Project', function (require, module, panel) {
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
