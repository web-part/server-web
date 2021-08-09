
/**
* 菜单树。
*/
define('MenuNav', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $ = require('$');

    const Panel = module.require('Panel');
    const Meta = module.require('Meta');
    const Template = module.require('Template');

    const defaults = require('MenuNav.defaults');
    const mapper = new Map();



    class MenuNav {
        constructor(config) {
            config = Object.assign({}, defaults, config);

            let emitter = new Emitter(this);

            let meta = Meta.create(config, {
                'this': this,
                'emitter': emitter,
            });


            mapper.set(this, meta);

            Object.assign(this, {
                'id': meta.id,
                '$': meta.$,
            });
        }


        init() {
            let meta = mapper.get(this);

            if (meta.panel) {
                return;
            }

            //首次渲染。
            meta.tpl = Template.create(meta);

            if (meta.container) {
                let html = this.fill();
                $(meta.container).html(html);
            }
        
            meta.panel = Panel.create(meta);
            this.$ = meta.panel.$;

            meta.panel.on({
                'item': function (names, index) {
                    meta.emitter.fire('item', [names, index]);
                },
                'text': function (path) {
                    let values = meta.emitter.fire('text', [path]);
                    return values.slice(-1)[0];
                },
                'render': function (opt) {
                    meta.emitter.fire('render', [opt]);
                },
            });
        }

        fill() {
            let meta = mapper.get(this);
            let html = meta.tpl.fill({});
            return html;
        }

        render(options) {
            let meta = mapper.get(this);

            this.init();
            meta.panel.render(options);
        }

        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }

    }




    return MenuNav;
});