
define.panel('/FileList/Body/Main/List/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');
    const Storage = require('@definejs/local-storage');

    let tabs = null;
    let storage = null;

    let meta = {
        index: 0,

        list: [
            { name: '文件', cmd: 'file', },
            { name: '目录', cmd: 'dir', },
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
