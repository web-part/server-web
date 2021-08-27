

define.panel('/Home/Server', function (require, module, panel) {
    const API = module.require('API');
    const Status = module.require('Status');
    const Loading = module.require('Loading');
    const Main = module.require('Main');


    panel.on('init', function () {

        API.on('success', {
            'get': function (data) {
                Loading.hide();
                Main.render(data);

                Status.test('pwd');
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

});
