
define('DropCheckList', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Meta = module.require('Meta');
    const Template = module.require('Template');
    const Events = module.require('Events');
    const Masker = module.require('Masker');

    const defaults = require('DropCheckList.defaults');
    const mapper = new Map();


    class DropCheckList {
        constructor(config) {
            config = Object.assign({}, defaults, config);

            let emitter = new Emitter(this);

            let meta = Meta.create(config, {
                'emitter': emitter,
                'this': this,
            });


            mapper.set(this, meta);

            Object.assign(this, {
                'id': meta.id,
                '$': meta.$,
            });

        }


        render(list) {
            let meta = mapper.get(this);

            if (list) {
                meta.list = list;
            }

            //已经渲染过了，直接填充即可。
            if (meta.$) {
                this.fill();
                return;
            }

            let tpl = meta.tpl = Template.create(meta);
            let html = tpl.fill({});
            let $container = $(meta.container);

            $container.html(html);

            meta.$ = this.$ = $(`#${meta.id}`);
            meta.$main = meta.$.find('[data-id="main"]');
            meta.all.$ = meta.$.find('[data-id="all"]');
            meta.$list = meta.$.find('[data-id="list"]');
            meta.masker = Masker.create(meta);

            Events.bind(meta);

            this.fill();
            
        }

        fill(list) {
            let meta = mapper.get(this);

            list = meta.list = list || meta.list;

            let width = meta.width;
            let html = meta.tpl.fill('item', list);

            meta.all.fill();
            meta.$list.html(html);

            if (width == 'auto') {
                width = meta.maxTextWidth + 50;
            }

            if (width > 0) {
                width = Math.max(width, 110);
                meta.$main.width(width);
                meta.all.$.width(width);
            }

            meta.emitter.fire('fill', [list]);

           

        }

        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }
    }

    return DropCheckList;
});