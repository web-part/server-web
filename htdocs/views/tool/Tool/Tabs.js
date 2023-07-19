

define.panel('/Tool/Tabs', function (require, module, panel) {
    const Tabs = require('Tabs');

    let tabs = null;

    let meta = {
        item: null,
        cmd$module: null,
        list: [
            { name: '二维码', icon: 'fas fa-qrcode', cmd: 'QRCode', },
            { name: '内容指纹', icon: 'fas fa-fingerprint', cmd: 'MD5' },
            { name: 'Less 编译', icon: 'fab fa-less', cmd: 'Less', },
            { name: 'JS 压缩', icon: 'fab fa-node-js', cmd: 'JS', },
        ],
    };


    panel.on('init', function () {

        tabs = new Tabs({
            container: panel.$.get(0),
            storage: module.id,
        });


        tabs.on('change', function (item, index) {
            let { cmd, } = item;
            let { cmd$module, } = meta;

            if (cmd$module) {
                Object.keys(cmd$module).forEach((key) => {
                    let M = cmd$module[key];

                    if (key == cmd) {
                        panel.fire('change', [M]);
                    }
                    else {
                        M.hide();
                    }
                });
            }

            //后备方案。
            panel.fire('cmd', cmd, []);
        });

       
    });

    /**
    * 渲染。
    */
    panel.on('render', function () {
        tabs.render(meta.list);
        tabs.active();
    });

    return {
        map(cmd$module) {
            meta.cmd$module = cmd$module;
        },
    };

});