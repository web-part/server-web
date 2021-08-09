
define.panel('/Setting/Local', function (require, module, panel) {
    const Local = require('Settings.Language');
    const List = module.require('List');

    panel.on('init', function () {

        List.on({
            'check': function (value, list) {
                Local.set(value);
            },
        });
        
    });


    panel.on('render', function () {

        let value = Local.get();

        List.render(value);

    });



    return {
        
    };

});
