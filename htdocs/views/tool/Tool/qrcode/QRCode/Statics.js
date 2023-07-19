

define.panel('/Tool/QRCode/Statics', function (require, module, panel) {
    const List = module.require('List');
    

    panel.on('init', function () {
        

    });

    panel.on('render', function (server) {

        let baseUrl = `http://${server.host}:${server.port}`;

        let list = server.statics.map((item) => {
            return {
                'url': `${baseUrl}${item}`,
                'qrcode': `${baseUrl}${server.qrcode.path}`,
            };
        });
        
        
        List.render(list);


    });


    return {

    };
});