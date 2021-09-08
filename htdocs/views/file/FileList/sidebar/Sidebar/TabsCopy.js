

define.panel('/FileList/Sidebar/TabsCopy', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');


    var list = [
        { name: '常规', type: 'general', },
        { name: '提纲', type: 'outline', },
    ];

    var currentIndex = 0;
    var tabs = null;


    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            activedClass: 'on',
            eventName: 'click',
            selector: '>li',
            repeated: true, //这里要允许重复激活相同的项。
        });


        tabs.on('change', function (item, index) {
            currentIndex = index;
            item = list[index];

            panel.fire(item.type);
        });

       
    });

    /**
    * 渲染。
    *   options = {
    *       index: 0,
    *       outline: false,
    *   };
    */
    panel.on('render', function (options) {
        var index = options.index;
        var outline = options.outline;
        var items = outline ? list : list.slice(0, -1);

        tabs.render(items, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });

        if (typeof index == 'number') {
            currentIndex = index;
        }
        else {
            index = currentIndex;
        }

        //不存在提纲，则强行回到 0。
        if (!outline) {
            index = 0;
        }

        tabs.active(index);

    });


});