
define.panel('/FileList/Body', function (require, module, panel) {
    const Nav = module.require('Nav');
    const Main = module.require('Main');
    const Preview = module.require('Preview');




    panel.on('init', function () {
        Nav.on({
            'render': function (path) {
                panel.fire('path', [path]);
            },
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Main.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Preview.on({
            'render': function (titles) {
                panel.fire('outline', [titles]);
            },
        });

    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (type, data) {
        Nav.render(data);

        if (type == 'file') {
            Main.hide();
            Preview.render(data);
        }
        else if (type == 'dir') {
            Preview.hide();
            Main.render(data);
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
