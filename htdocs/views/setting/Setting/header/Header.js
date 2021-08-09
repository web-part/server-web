
define.panel('/Setting/Header', function (require, module, panel) {
    const Header = require('Settings.Header');
    const List = module.require('List');


    panel.on('init', function () {


        List.on({
            'check': function (value, list) {
                Header.set(value);
            },
        });
    });


    panel.on('render', function () {

        let value = Header.get();

        List.render(value);

    });



    return {

    };

});
