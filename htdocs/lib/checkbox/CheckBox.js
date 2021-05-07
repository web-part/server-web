
define('CheckBox', function (require, module, exports) {
    const $ = require('$');
    const $Object = require('@definejs/object');
    const Template = require('@definejs/template');
    const Emitter = require('@definejs/emitter');
    const Defaults = require('Defaults');

    let mapper = new Map();
    let tpl = new Template('#tpl-CheckBox');


    class CheckBox {
        constructor(config) {
            config = Defaults.clone(module, config);

            let emitter = new Emitter(this);

            let meta = {
                'checked': config.checked,
                'text': config.text,
                'fireNow': config.fireNow,
                'checkedClass': config.checkedClass,
                'uncheckedClass': config.uncheckedClass,

                '$': $(config.container),

                'emitter': emitter,
                'bind': false,

            };

            mapper.set(this, meta);

            
        }

        render(opt = {}) {
            let meta = mapper.get(this);
            let config = $Object.filter(opt, ['checked', 'text',]);

            Object.assign(meta, config);


            let html = tpl.fill({
                'class': meta.checked ? meta.checkedClass : meta.uncheckedClass,
                'text': meta.text,
            });


            meta.$.html(html);
            meta.$.addClass('CheckBox');

            //指定了立即触发事件。
            if (meta.fireNow) {
                meta.emitter.fire('checked', [meta.checked]);
            }

            if (!meta.bind) {
                meta.$.on('click', function (event) {
                    let checked = meta.checked = !meta.checked;
                    let $icon = meta.$.find('i');

                    //因为 class 里有空格，所以下面的写法有问题。
                    // $icon.toggleClass(meta.checkedClass, checked);
                    // $icon.toggleClass(meta.uncheckedClass, !checked);

                    if (checked) {
                        $icon.removeClass(meta.uncheckedClass);
                        $icon.addClass(meta.checkedClass);
                    }
                    else {
                        $icon.removeClass(meta.checkedClass);
                        $icon.addClass(meta.uncheckedClass);
                    }

                    meta.emitter.fire('checked', [checked]);
                });

                meta.bind = true;
            }
            
            

        }

        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }

        destroy() {
            let meta = mapper.get(this);

            meta.emitter.destroy();
            meta.$ = null;
            mapper.delete(this);
        }

    }



    return CheckBox;
});