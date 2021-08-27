

define.panel('/Home/Server/Main', function (require, module, panel) {
    const $Date = require('@definejs/date');

    panel.on('init', function () {


        panel.template({
            '': function (data) {
                let table = this.fill('table', data);
                return table;
            },

            'table': {
                '': function (data) {
                    let statics = data.statics.filter((item) => {
                        return item != '/';
                    });
                    
                    let status = this.fill('status', { running: true, });
                    let localUrls = this.fill('local', statics, data);
                    let networkUrls = this.fill('network', statics, data);

                    let { session, } = data;
                    let { allowCrossOrigin, } = data.api;
                    let time = $Date.format(session.time, 'yyyy-MM-dd HH:mm:ss');

                    return {
                        'status': status,
                        'time': time,
                        'port': data.port,
                        'host': data.host,
                        'sessionId': session.id,
                        'crossOriginClass': allowCrossOrigin ? 'cross-origin-true' : 'cross-origin-false',
                        'crossOriginIcon': allowCrossOrigin ? 'check' : 'times',
                        'crossOriginText': allowCrossOrigin ? '允许' : '禁止',
                        'localUrls': localUrls,
                        'networkUrls': networkUrls,
                    };
                },

                'status': function ({ running, }) {
                    return {
                        'status': running ? 'play' : 'stop',
                        'text': running ? '运行中' : '已停止',
                    };

                },

                'local': function (item, index, data) {

                    return {
                        'port': data.port,
                        'dir': item,
                    };
                },

                'network': function (item, index, data) {
                    let { host, port, } = data;
                    let url = `http://${host}:${port}${item}`;

                    url = encodeURIComponent(url);

                    


                    return {
                        'host': host,
                        'port': port,
                        'dir': item,
                        'url': url,
                        'qrcode.path': data.qrcode.path,
                    };
                },
            },
        });


    });


    panel.on('render', function (data) {

        panel.fill(data);
    });


    return {
        setStatus(running) {
            let tpl = panel.template();
            let html = tpl.fill('table', 'status', { running, });
            
            panel.$.find(`[data-id="td-status"]`).html(html);
        },
    };

});
