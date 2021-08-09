
define.panel('/Setting/Theme', function (require, module, panel) {
    const Theme = require('Settings.Theme');
    const List = module.require('List');


    panel.on('init', function () {


        List.on({
            'check': function (value, list) {
                Theme.set(value);
            },
        });
    });


    panel.on('render', function () {

        let value = Theme.get();

        List.render(value);

    });



    return {
        
    };

});
