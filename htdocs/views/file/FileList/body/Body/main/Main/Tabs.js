

define.panel('/FileList/Body/Main/Tabs', function (require, module, panel) {
    const Tabs = require('Tabs');

    let tabs = null;

    let meta = {
        item: null,
        cmd$module: null,
        list: [
            { name: '统计', cmd: 'Stat', icon: 'fas fa-chart-bar', },
            { name: '平铺', cmd: 'Icon', icon: 'fas fa-folder', },
            { name: '列表', cmd: 'List', icon: 'fas fa-list', },
            { name: '架构', cmd: 'Tree', icon: 'fas fa-folder-tree', },
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