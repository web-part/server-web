
define.panel('/Tool/Main', function (require, module, panel) {
    const QRCode = module.require('QRCode');
    const MD5 = module.require('MD5');


    let meta = {
        cmd$module: {},
    };

  

    panel.on('init', function () {
        



    });


    /**
    * 渲染内容。
    *   item = {}   //当前菜单项。
    */
    panel.on('render', function (item) {
        let { cmd, } = item.data;
        let M = meta.cmd$module[cmd];

        if (!M) {
            M = meta.cmd$module[cmd] = module.require(cmd);
            M.render();
        }
        else {
            M.show();
        }

        [QRCode, MD5,].forEach((item) => {
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
