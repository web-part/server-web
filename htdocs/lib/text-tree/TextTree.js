
/**
* 菜单树。
*/
define('TextTree', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $Object = require('@definejs/object');
    const $ = require('$');
    const Defaults = require('Defaults');
    const Events = module.require('Events');
    const Meta = module.require('Meta');
    const Template = module.require('Template');


    let mapper = new Map();

    class TextTree {

        constructor(config) {
            config = Defaults.clone(module, config);

            let emitter = new Emitter(this);

            let meta = Meta.create(config, {
                'this': this,
                'emitter': emitter,
            });

            meta.tpl = Template.create(meta);

            mapper.set(this, meta);

            Object.assign(this, {
                'id': meta.id,
                '$': meta.$,
            });

            Events.bind(meta);

        }


        render(list) {
            let meta = mapper.get(this);

            if (list) {
                let { ids, } = meta.makeData(list);
                meta.tree.clear();

                ids.forEach((id) => {
                    let keys = id.split(meta.seperator);

                    meta.tree.set(keys);
                });
            }
            
            // debugger;
            // meta.tree = meta.tree.spawn(['htdocs']);
            
            let items = meta.tree.render(function (node, info) {
                let { key, nodes, keys, value, } = node;
                let { tabs, linker, content, } = info;
                let id = keys.join(meta.seperator);

                return { id, tabs, key, linker, };
            });

            meta.items = items;


            let html = meta.tpl.fill({
                'id': meta.id,
                'list': items,
            });


            if (meta.container) {
                $(meta.container).html(html);
                meta.$ = meta.this.$ = $(`#${meta.id}`);
            }

            return html;

        }

        toString(withSecondary) {
            let meta = mapper.get(this);

            //如果没有指定 withSecondary，则根据当前界面的状态来判断。
            if (withSecondary === undefined && meta.$) {
                withSecondary = !meta.$.hasClass('hide-secondary');
            }

            let texts = meta.tree.render(function (node, info) {
                let { key, nodes, keys, value, } = node;
                let { tabs, linker, content, } = info;
                let secondary = '';

                if (withSecondary) {
                    let id = keys.join(meta.seperator);
                    let item = meta.id$item[id];
                    secondary = item[meta.secondaryKey];
                }

                let s = `${tabs}${linker} ${key || meta.emptyText}`;

                if (secondary) {
                    s = s + ' ' + secondary;
                }

                return s;
            });

            let content = texts.join('\n');

            return content;
        }

        on(...args) {
            let meta = mapper.get(this);

            meta.emitter.on(...args);
        }

        toggle(opt) {
            let meta = mapper.get(this);

            if ($Object.isPlain(opt)) {
                $Object.each(opt, function (key, showValue) {
                    meta.toggleHideClass(`hide-${key}`, showValue);
                });
            }
            else {
                meta.$.toggle(opt);
            }
        }

        highlight(id) {
            let meta = mapper.get(this);
            let index = meta.id$index[id];

            if (index < 0) {
                console.warn(`不存在 id 为 ${id} 的项。`)
                return;
            }

            if (meta.highlightIndex) {
                meta.$.find(`[data-cmd="id"][data-index="${meta.highlightIndex}"]`).removeClass('on');
            }

            meta.$.find(`[data-cmd="id"][data-index="${index}"]`).addClass('on');
            meta.highlightIndex = index;
        }
        
    }

    

    return TextTree;
});