

define.panel('/Master/Sidebar/List', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');
    const Language = require('Settings.Language');
    const Data = module.require('Data');

    let tabs = null;

    let meta = {
        index: -1,   //
        list: [],
    };



    panel.on('init', function () {

        tabs = new Tabs({
            container: panel.$,
            selector: '>li',
            activedClass: 'on',
            repeated: true,
        });

        tabs.on('change', function (item, index) {
            //点击的是当前已激活的项，则当成是刷新，有意而为之。
            if (index == meta.index) {
                panel.fire('refresh', [item]);
                return;
            }

            item = meta.list[index];
            meta.index = index;

            panel.fire('item', [item]);
        });

      
       

        panel.template(function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'icon': item.icon,
                'class': item.border ? 'group' : '',
            };
        });

        Language.on('change', function (value, old) {
            Data.set(meta.list, value);
            panel.fill(meta.list);

            tabs.reset();
            tabs.active(meta.index);
        });


    });




    panel.on('render', function (items) {
        let list = meta.list = Data.make(items);

        tabs.render(list);
        panel.fire('render', [list]);


    });



    


    return {
        active: function (item) {
            let index = item.index;

            if (typeof index != 'number') {
                index = -1;
            }

            meta.index = index;
            tabs.active(index, false);
        },

        get: function (view) {
            let item = meta.list.find(function (item, index) {
                return item.view === view;
            });

            return item;
        },

    };

});