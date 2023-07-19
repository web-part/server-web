
define.panel('/FileList/Body', function (require, module, panel) {
    const Nav = module.require('Nav');
    const Main = module.require('Main');
    const Preview = module.require('Preview');




    panel.on('init', function () {
        Nav.on({
            'path': function (path) {
                panel.fire('path', [path]);
            },
        });

        Main.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Preview.on({
            'outlines': function (outlines) {
                panel.fire('outlines', [outlines]);
            },
        });

    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        Nav.render(item);

        if (item.type == 'dir') {
            Preview.hide();
            Main.render(item);
        }
        else {
            Main.hide();
            Preview.render(item);
        }



    });



 



    return {
        outline: Preview.outline,

        resize(...args) {
            let w = args.reduce(function (sum, value) {
                return sum + value;
            }, 0);


            let calc = 'calc(100% - ' + w + 'px)';

            panel.$.css({
                'width': calc,
            });

        },
    };


});
