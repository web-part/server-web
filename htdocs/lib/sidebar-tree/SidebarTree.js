
/**
* 菜单树。
*/
define('SidebarTree', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $ = require('$');

    const Panel = module.require('Panel');
    const Meta = module.require('Meta');
    const Template = module.require('Template');

    const defaults = require('SidebarTree.defaults');
    const mapper = new Map();



    class SidebarTree {
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
                'item': function (item) {
                    meta.emitter.fire('item', [item]);
                },
                'dir': function (item) {
                    meta.emitter.fire('dir', [item]);
                },
                'resize': function () {
                    meta.emitter.fire('resize');
                },
                'fill': {
                    'name': function (item) {
                        let names = meta.emitter.fire('fill', 'name', [item]);
                        return names.slice(-1)[0];
                    },
                },
            });
        }

        fill() {
            let meta = mapper.get(this);
            let html = meta.tpl.fill({});
            return html;
        }

        //name 可选。
        render(data) {
            let meta = mapper.get(this);

            this.init();
            meta.panel.render(data);
        }

        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }

        open(id) {
            let meta = mapper.get(this);

            meta.panel.open(id);
        }

        each(fn) { 
            let meta = mapper.get(this);
            meta.panel.each(fn);
        }

    }




    return SidebarTree;
});