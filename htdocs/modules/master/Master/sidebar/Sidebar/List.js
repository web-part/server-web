

define.panel('/Master/Sidebar/List', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');

    let list = [];
    let tabs = null;

    panel.on('init', function () {

        tabs = new Tabs({
            container: panel.$,
            selector: '>li',
            activedClass: 'on',
        });

      
        panel.$.on('click', '[data-index]', function () {
            let li = this;
            let index = +li.getAttribute('data-index');
            let item = list[index];

            tabs.active(index);

            panel.fire('item', [item]);

        });

    });




    panel.on('render', function (data) {

        list = data;


        panel.fill(list, function (item, index) {
            item.id = item.view;    //这里以 view 作为 id，需要具有唯一性。
            item.index = index;


            return {
                'index': index,
                'name': item.name,
                'icon': item.icon,
                'class': item.border ? 'group' : '',
            };
        });


    });



    


    return {
        active: function (item) {
            let index = item.index;

            if (typeof index != 'number') {
                index = -1;
            }

            tabs.active(index);
        },

        get: function (view) {
            let item = list.find(function (item, index) {
                return item.view === view;
            });

            return item;
        },

    };

});