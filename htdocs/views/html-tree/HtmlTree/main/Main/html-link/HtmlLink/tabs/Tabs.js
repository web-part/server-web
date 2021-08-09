

define.panel('/HtmlTree/Main/HtmlLink/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');
    const Storage = require('@definejs/local-storage');


    let allList = [
        { name: '基本信息', cmd: 'base', },
        { name: '引用原文', cmd: 'rel', },
        { name: '渲染内容', cmd: 'render', },
        { name: '文件内容', cmd: 'content', },
        { name: '文件信息', cmd: 'file', },
    ];


    let tabs = null;
    let storage = null;

    let meta = {
        index: 0,
        list: [],
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
    panel.on('render', function (isRoot) {

        meta.list = allList;

        if (isRoot) {
            meta.list = meta.list.filter((item) => {
                return item.root;
            });
        }

        tabs.render(meta.list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });


        //列表长度可能发生了变化。
        if (meta.index > meta.list.length - 1) {
            meta.index = 0;
        }

        tabs.active(meta.index);

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