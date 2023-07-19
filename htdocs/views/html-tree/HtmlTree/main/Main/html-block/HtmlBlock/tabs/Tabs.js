

define.panel('/HtmlTree/Main/HtmlBlock/Tabs', function (require, module, panel) {
    const Tabs = require('Tabs');


    let allList = [
        { name: '基本信息', cmd: 'base', icon: 'fas fa-circle-info', },
        { name: '引用原文', cmd: 'rel', icon: 'fas fa-quote-left', },
        { name: '渲染内容', cmd: 'render', icon: 'fas fa-code', },
    ];


    let tabs = null;

    let meta = {
        index: 0,
        list: [],
        cmd$module: null,
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
    panel.on('render', function (isRoot) {
        meta.list = allList;

        if (isRoot) {
            meta.list = meta.list.filter((item) => {
                return item.root;
            });
        }

        tabs.render(meta.list);
        tabs.active();

    });

    return {
        active(cmd) {
            let index = meta.list.findIndex((item) => {
                return item.cmd == cmd;
            });

            tabs.active(index);
        },

        map(cmd$module) {
            meta.cmd$module = cmd$module;
        },
    };


});