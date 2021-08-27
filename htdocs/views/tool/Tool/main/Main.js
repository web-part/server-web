
define.panel('/Tool/Main', function (require, module, panel) {
    const QRCode = module.require('QRCode');
    const MD5 = module.require('MD5');
    const Less = module.require('Less');
    const JS = module.require('JS');


    let meta = {
        cmd$module: {},
    };

  

    panel.on('init', function () {
        

        [Less, JS, ].forEach((M) => {
            M.on({
                'fullscreen': function (on) {
                    panel.fire('fullscreen', [on]);
                },
            });
        });


    });


    /**
    * 渲染内容。
    *   item = {}   //当前菜单项。
    */
    panel.on('render', function (item, args) {
        let { cmd, } = item.data;
        let M = meta.cmd$module[cmd];

        if (M) {
            if (args) {
                M.render(...args);
            }
            else {
                M.show();
            }
        }
        else {
            args = args || [];
            M = meta.cmd$module[cmd] = module.require(cmd);
            M.render(...args);
        }


        [QRCode, MD5, Less, JS, ].forEach((item) => {
            if (item != M) {
                item.hide();
            }
        });

      

    });




    return {
        

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
