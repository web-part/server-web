define.panel('/Tool/JS/Header', function (require, module, panel) {
    const CheckBox = require('CheckBox');
    const Switch = module.require('Switch');




   

    panel.on('init', function () {
        

        panel.$.on('click', '[data-cmd]', function (event) {
            let { cmd, } = this.dataset;
            
            let list = cmd.split(':');
            let target = list.length > 1 ? list[0] : '';
            let act = list.length > 1 ? list[1] : cmd;

            if (!target) {
                panel.fire('cmd', cmd, []);
                return;
            }


            //针对 editor 的。
            if (target == 'editor') {
                panel.fire('editor', [act]);
                return;
            }

            if (target == 'switch') {
                Switch.toggle(this);
                return;
            }

        });


       

      
    });



    /**
    * 渲染。
    */
    panel.on('render', function () {
        Switch.init(panel);

        

    });


    return {
        set(md5) {
            panel.$.find('[data-id="md5"]').html(md5);
            panel.$.find('[data-cmd="copy"]').toggle(!!md5);
        },
    };


});
