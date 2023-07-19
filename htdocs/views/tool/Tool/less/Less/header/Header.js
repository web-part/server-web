define.panel('/Tool/Less/Header', function (require, module, panel) {
    const CheckBox = require('CheckBox');
    const Switch = module.require('Switch');




    let chks = [
        { id: 'minify', text: '压缩', checked: false, chk: null, },
    ];

    panel.on('init', function () {
        chks.forEach((item) => {
            let chk = new CheckBox({
                'fireNow': true,
                'container': panel.$.find(`[data-id="chk-${item.id}"]`),
                'text': item.text,
            });

            chk.on('checked', function (checked) {
                panel.fire('check', [{
                    [item.id]: checked,
                }]);
            });

            item.chk = chk;
        });


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

        chks.forEach((item) => {
            item.chk.render({
                'checked': item.checked,
            });
        });

    });


    return {
        set(md5) {
            panel.$.find('[data-id="md5"]').html(md5);

            panel.$.find('[data-cmd="copy"]').toggle(!!md5);
        },
    };


});
