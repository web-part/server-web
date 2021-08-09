
define.panel('/Tool/Main/QRCode', function (require, module, panel) {
    const API = module.require('API');
    const Main = module.require('Main');
    const Statics = module.require('Statics');


    panel.on('init', function () {
       

        API.on('success', {
            'get': function (server) {
                Main.render(server);
                Statics.render(server);
            },

        });
       
       

  
    });


    panel.on('render', function () {
        
        API.get();
    });




});
