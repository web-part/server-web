

define.panel('/Tool/QRCode/Main/Output', function (require, module, panel) {
  
    

    panel.on('init', function () {
       

    });

    panel.on('render', function (server, url) {
        let baseUrl = `http://${server.host}:${server.port}`;
        let qr = `${baseUrl}${server.qrcode.path}?url=${encodeURIComponent(url)}`;

        let src = `${qr}&size=10`;
        let href = `${qr}&size=10&margin=4`;


        panel.fill({
            'url': url,
            'src': src,
            'href': href,
        });

    });


    return {

    };
});