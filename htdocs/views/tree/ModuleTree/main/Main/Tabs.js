

define.panel('/ModuleTree/Main/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');


    let allList = [
        { name: '模块信息', cmd: 'module', },
        { name: '文件信息', cmd: 'file', },
        { name: '文件内容', cmd: 'content', },
        { name: '组织架构', cmd: 'tree', root: true, },
        { name: '模块列表', cmd: 'list', root: true, },
    ];

    let list = [];

    let tabs = null;

    let meta = {
        index: 0,
    };


    panel.on('init', function () {
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

            panel.fire(item.cmd);
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


});