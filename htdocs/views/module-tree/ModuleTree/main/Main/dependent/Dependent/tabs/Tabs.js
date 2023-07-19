
define.panel('/ModuleTree/Main/Dependent/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');
    const Storage = require('@definejs/local-storage');

    let tabs = null;
    let storage = null;

    let meta = {
        index: 0,

        list: [
            { name: '内部', cmd: 'inner', },
            { name: '外部', cmd: 'outer', },
        ],
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
    panel.on('render', function (index) {

        tabs.render(meta.list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });

        if (typeof index == 'number') {
            meta.index = index;
        }
        else {
            index = meta.index;
        }

        tabs.active(index);

    });


    return {
        
    };

});
