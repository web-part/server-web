

define.panel('/ModuleTree/Main/Tabs', function (require, module, panel) {
    const Tabs = require('Tabs');


    let allList = [
        { name: '统计', cmd: 'Stat', icon: 'fas fa-chart-bar', root: true, },
        { name: '依赖关系', cmd: 'Dependent', icon: 'fas fa-share-nodes', root: true, },
        { name: '模块列表', cmd: 'List', icon: 'fas fa-list', root: true, },
        { name: '组织架构', cmd: 'Tree', icon: 'fas fa-folder-tree', root: true, },
        { name: '模块信息', cmd: 'ModuleInfo', icon: 'fas fa-circle-info', },
        { name: '文件信息', cmd: 'FileInfo', icon: 'fas fa-file', },
        { name: '文件内容', cmd: 'Content', icon: 'fas fa-file-lines', },

    ];


    let tabs = null;

    let meta = {
        cmd$module: null,
        list: [],
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
    panel.on('render', function (item) {
        meta.list = allList;

        if (!item.parent) {
            meta.list = meta.list.filter((item) => {
                return item.root;
            });
        }

        tabs.render(meta.list);

        tabs.active();

    });


    return {
        map(cmd$module) {
            meta.cmd$module = cmd$module;
        },
    };


});