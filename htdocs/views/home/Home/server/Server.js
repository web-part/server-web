

define.panel('/Home/Server', function (require, module, panel) {
    const API = module.require('API');
    const Status = module.require('Status');
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
                Status.test(data);

                panel.fire('get', [data]);
            },
        });

        Status.on({
            'restart': function () {
                panel.refresh();
            },
            'close': function () {
                Main.setStatus(false);
            },
        });

    });


    panel.on('render', function () {
        Main.hide();
        Loading.render();
        API.get();

    });

    return {
        
    };

});
