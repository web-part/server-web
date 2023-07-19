

define.panel('/FileList/Sidebar/Tabs', function (require, module, panel) {
    const Tabs = require('Tabs');


    let list = [
        { name: '常规', type: 'general', },
        { name: '提纲', type: 'outline', },
    ];

    let tabs = null;


    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
        });

        tabs.on('change', function (item, index) {
            panel.fire(item.type);
        });

    });

    /**
    * 渲染。
    */
    panel.on('render', function ({ index, outline, }) {
        let items = outline ? list : list.slice(0, -1);

        tabs.render(items);
        tabs.active(index);

    });


});