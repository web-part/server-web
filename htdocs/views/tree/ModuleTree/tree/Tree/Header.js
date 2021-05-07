

define.panel('/ModuleTree/Tree/Header', function (require, module, panel) {
    const CheckBox = require('CheckBox');

    let chk = null;

    let meta = {
        dirOnly: false,
    };

    panel.on('init', function () {

        chk = new CheckBox({
            'fireNow': true,
            'container': panel.$.find(`[data-id="chk-dir-only"]`),
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

   


});