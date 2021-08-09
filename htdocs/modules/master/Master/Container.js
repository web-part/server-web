

define.panel('/Master/Container', function (require, module, panel) {
    const Header = require('Settings.Header');


    panel.on('init', function () {
        Header.on('change', function (value, old) {
            panel.$.toggleClass('no-header', value == 'hide');
        });


    });


    panel.on('render', function () {
        let value = Header.get();
        panel.$.toggleClass('no-header', value == 'hide');

    });

});