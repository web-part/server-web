

define.panel('/FileList/Body/Main/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');
    const Storage = require('@definejs/local-storage');


    let tabs = null;
    let storage = null;

    let meta = {
        index: 0,
        list: [
            { name: '平铺', cmd: 'icon', root: true, },
            { name: '列表', cmd: 'list', root: true, },
            { name: '架构', cmd: 'tree', root: true, },
        ],
        cmd$module: null,
    };


    panel.on('init', function () {
        storage = new Storage(module.id);
        meta.index = storage.get('index') || 0;

        tabs = new Tabs({
            container: panel.$.get(0),
            activedClass: 'on',
            eventName: 'click',
            selector: '>li',
            repeated: true, //这里要允许重复激活相同的项。
        });


        tabs.on('change', function (item, index) {
            meta.index = index;
            item = meta.list[index];

            storage.set('index', index);

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

        tabs.render(meta.list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });


        tabs.active(meta.index);

    });

    return {
        map(cmd$module) {
            meta.cmd$module = cmd$module;
        },
    };

});