

define.panel('/Tool/JS/Themes', function (require, module, panel) {
    const Storage = require('@definejs/local-storage');
    const List = module.require('List');
    const Mask = module.require('Mask');
   

    let storage = null;

    panel.set('show', false);

    panel.on('init', function () {
        storage = new Storage(module.id);

        Mask.on({
            'show': function () {
                panel.$.addClass('show');
                List.slide(true);
            },

            'hide': function () {
                List.slide(false);
                panel.$.removeClass('show');
            },
        });

        List.on({
            'item': function (item, index) {
                storage.set('index', index);
                panel.fire('item', [item.name]);
            },
        });
    });



    panel.on('render', function (index) {
        if (typeof index == 'number') {
            storage.set('index', index);
        }
        else {
            index = storage.get('index') || 1;
        }

        List.render(index);
        Mask.render();

    });


    return {
        toggle: function () {
            Mask.toggle();
        },
    };

    

});
