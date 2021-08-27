

define.panel('/ModuleTree/Main/Content/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');
    const Storage = require('@definejs/local-storage');

    let tabs = null;
    let storage = null;

    let list = [
        { name: 'JS', cmd: 'js', },
        { name: 'HTML', cmd: 'html', },
    ];

    let meta = {
        index: 0,
        list: [ ],
    };


    panel.on('init', function () {
        storage = new Storage(module.id);
        meta.index = storage.get('index') || 0;

        tabs = new Tabs({
            container: panel.$,
            activedClass: 'on',
            eventName: 'click',
            selector: '>li',
            // repeated: true, //这里要允许重复激活相同的项。
        });


        tabs.on('change', function (item, index) {
            meta.index = index;
            item = meta.list[index];
            storage.set('index', index);

            panel.fire(item.cmd);

        });


    });

    /**
    * 渲染。
    */
    panel.on('render', function ({ js, html, }) {
        meta.list = [];

        if (js) {
            meta.list.push(list[0]);
        }

        if (html) {
            meta.list.push(list[1]);
        }

        if (meta.list.length == 1) {
            meta.index = 0;
        }

        tabs.render(meta.list, function (item, index) {

            return {
                'index': index,
                'name': item.name,
            };
        });

        tabs.active(meta.index);

        panel.$.toggleClass('only-one', meta.list.length == 1);

    });


    return {

    };

});