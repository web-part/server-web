

define.panel('/Tool/Main/QRCode/Statics/List', function (require, module, panel) {
    
    

    panel.on('init', function () {
        
        panel.template(function (item, index) {
            
            let { qrcode, url, } = item;
            
            let qr = `${qrcode}?url=${encodeURIComponent(url)}`;
            let src = `${qr}&size=10`;
            let href = `${qr}&size=10&margin=4`;

            return {
                'index': index,
                'url': url,
                'href': href,
                'src': src,
            };
        });
    });


    panel.on('render', function (list) {

        panel.fill(list);

    });


    return {

    };
});