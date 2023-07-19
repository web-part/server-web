

define.panel('/Tool/QRCode/Main', function (require, module, panel) {
    const Input = module.require('Input');
    const Output = module.require('Output');
    

    let meta = {
        server: null,
    };

    panel.on('init', function () {
       
        Input.on({
            'submit': function (url) {
                Output.render(meta.server, url);
            },
        });

    });

    panel.on('render', function (server) {
        
        meta.server = server;

        Input.render();

    });


    return {

    };
});