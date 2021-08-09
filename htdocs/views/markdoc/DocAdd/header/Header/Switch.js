
define('/DocAdd/Header/Switch', function (require, module, exports) {
    const $Object = require('@definejs/object');
    const Storage = require('@definejs/local-storage');
    const $ = require('$');

    let storage = new Storage(module.id);


    let meta = {
        panel: null,
        act$on: null,
    };
    
    
    return {
        init(panel) {
            meta.panel = panel;

            meta.act$on = storage.get() || {
                'crlf': true,
                'fullscreen': false,
                'column': true,
            };

            $Object.each(meta.act$on, function (act, on) {
                let $el = panel.$.find(`[data-cmd="switch:${act}"]`);

                //先置反，点击时再置反就得正。                
                meta.act$on[act] = !on;

                $el.click();
            });


        },

        toggle(el) {
            let { panel, act$on, } = meta;

            let { cmd, } = el.dataset;
            let act = cmd.split(':')[1];
            let on = act$on[act] = !act$on[act];

            storage.set(act$on);

            $(el).toggleClass('on', on);
            panel.fire('switch', act, [on]);
        },
    };

});