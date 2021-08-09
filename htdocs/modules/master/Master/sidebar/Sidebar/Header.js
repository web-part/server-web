

define.panel('/Master/Sidebar/Header', function (require, module, panel) {
    const Storage = require('@definejs/local-storage');

    let storage = null
    let visible = true;


    panel.on('init', function () {
        storage = new Storage(module.id);
        visible = storage.get('visible');

        if (visible === undefined) {
            visible = true;
        }

        panel.fire('toggle', [visible]);


        panel.$.on('click', function () {
            visible = !visible;

            storage.set('visible', visible);
            panel.fire('toggle', [visible]);

        });
    });




    panel.on('render', function () {
     
       

    });






});