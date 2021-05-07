

define.panel('/Master/Sidebar', function (require, module, panel) {
    const Package = require('@definejs/package');
    const Header = module.require('Header');
    const List = module.require('List');

    let name = 'data.Sidebar';


    panel.on('init', function () {

        Header.on({
            'toggle': function (visible) {
                panel.fire('toggle', [visible]);
            },
        });

        List.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

      
    });





    panel.on('render', function () {

        Package.load(name, function () {
            let list = require(name);

            Header.render();
            List.render(list);

            panel.fire('render', []);
        });

    });




    return {
        'active': List.active,
        'get': List.get,
    };

});