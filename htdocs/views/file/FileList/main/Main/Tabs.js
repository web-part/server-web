

define.panel('/FileList/Main/Tabs', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');


    let list = [
        { name: '组织架构', cmd: 'tree', root: true, },
        { name: '文件列表', cmd: 'list', root: true, },
    ];


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
    panel.on('render', function () {

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });


        tabs.active(meta.index);

    });


});