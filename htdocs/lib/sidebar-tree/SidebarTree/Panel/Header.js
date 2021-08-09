

define('SidebarTree/Panel/Header', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const CheckBox = require('CheckBox');
    


    return {
        create($meta) {
            let panel = new Panel(`[data-panel="${$meta.id}/Header"]`);

            let chk = null;

            let meta = {
                dirOnly: false,
            };

            panel.set('show', false);

            panel.on('init', function () {

                chk = new CheckBox({
                    'fireNow': true,
                    'container': panel.$.find(`[data-cmd="dirOnly"]`),
                    'text': '仅目录',
                });

                chk.on('checked', function (checked) {
                    meta.dirOnly = checked;
                    panel.fire('dir-only', [checked]);
                });



                panel.$on('click', {
                    '[data-cmd]': function (event) {
                        let { cmd, } = this.dataset;
                        panel.fire(cmd);
                    },
                });

            });


            /**
            * 渲染。
            *   opt = {
            *       
            *   };
            */
            panel.on('render', function (opt) {
                opt = opt || {};

                panel.$.toggleClass('back', !!opt.back);
                panel.$.toggleClass('forward', !!opt.forward);
                panel.$.toggleClass('up', !!opt.up);
                panel.$.toggleClass('root', !!opt.root);
                panel.$.toggleClass('dir-only', !!opt.dirOnly);

                chk.render({
                    'checked': meta.dirOnly,
                });

            });

            return panel.wrap({
                
            });

        },
    };

});