

define.panel('/Master/Sidebar', function (require, module, panel) {
    const Package = require('@definejs/package');
    const Header = module.require('Header');
    const List = module.require('List');


    panel.on('init', function () {

        Header.on({
            'toggle': function (visible) {
                panel.fire('toggle', [visible]);
            },
        });

        List.on({
            'render': function (list) {
                panel.fire('render', [list]);
            },
            'item': function (item) {
                panel.fire('item', [item]);
            },
            'refresh': function (item) {
                panel.fire('refresh', [item]);
            },
        });

      
    });





    panel.on('render', function () {

        Package.load('data.Sidebar', function () {
            let list = require('data.Sidebar');

            Header.render();
            List.render(list);

        });

    });




    return {

        active(item) {
            if (typeof item == 'string') {
                item = List.get(item);
            }

            if (!item) {
                return;
            }

            List.active(item);

            return item;
        },
    };

});