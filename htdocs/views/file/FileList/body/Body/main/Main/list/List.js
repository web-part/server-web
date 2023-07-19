
define.panel('/FileList/Body/Main/List', function (require, module, panel) {
    const Tabs = module.require('Tabs');
    const File = module.require('File');
    const Dir = module.require('Dir');



    let meta = {
        item: null,
    };

    panel.on('init', function () {

        Tabs.on({
            'file': function () {
                File.render(meta.item);
                Dir.hide();
            },
            'dir': function () {
                File.hide();
                Dir.render(meta.item);
            },
        });

        File.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Dir.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        if (item === meta.item) {
            panel.show();
            return;
        }

        console.log(item);
        
        meta.item = item;

        Tabs.render();

    });




    return {
        
    };

});
