

define.panel('/ModuleTree/Main/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');
    const Storage = require('@definejs/local-storage');


    let allList = [
        { name: '依赖关系', cmd: 'dependent', root: true, },
        { name: '模块列表', cmd: 'list', root: true, },
        { name: '组织架构', cmd: 'tree', root: true, },
        { name: '模块信息', cmd: 'module', },
        { name: '文件信息', cmd: 'file', },
        { name: '文件内容', cmd: 'content', },
    ];


    let list = [];
    let tabs = null;
    let storage = null;

    let meta = {
        index: 0,
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
            item = list[index];
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
    panel.on('render', function (isRoot) {

        list = allList;

        if (isRoot) {
            list = list.filter((item) => {
                return item.root;
            });
        }

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });


        //列表长度可能发生了变化。
        if (meta.index > list.length - 1) {
            meta.index = 0;
        }

        tabs.active(meta.index);

    });


    return {
        map(cmd$module) {
            meta.cmd$module = cmd$module;
        },
    };


});