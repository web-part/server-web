
/**
* 菜单树。
*/
define('MenuTree', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $ = require('$');
    const Data = module.require('Data');
    const Events = module.require('Events');
    const Meta = module.require('Meta');
    const Template = module.require('Template');

    const defaults = require('MenuTree.defaults');
    const mapper = new Map();



    class MenuTree {
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

        render(list = []) {
            let meta = mapper.get(this);

            if (meta.$) {
                if (list.length > 0) {
                    this.update(list);
                }

                return;
            }

            //首次渲染。
            meta.tpl = Template.create(meta);

            if (meta.container && list.length > 0) {
                let html = this.fill(list);
                $(meta.container).html(html);
            }

            meta.$ = this.$ = $(`#${meta.id}`);
            Events.bind(meta);

        }

        /**
        * 填充数据以生成 HTML。
        * 仅生成并返回 HTML 以供外部进一步使用。
        */
        fill(list) {
            let meta = mapper.get(this);

            Data.make(list, meta);

            let html = meta.tpl.fill({}); //填充全部。
            return html;
        }


        /**
        * 更新数据。
        */
        update(list) {
            let meta = mapper.get(this);

            Data.make(list, meta);

            let html = meta.tpl.fill('root', meta.list);

            meta.$.html(html);
        }

        /**
        * 打开指定的节点。
        * 这会连同它的所有父节点也一起展开。
        * 已重载 open(id);
        * 已重载 open(cid);
        */
        open(id) {
            let meta = mapper.get(this);
            let item = null;

            if (typeof id == 'string') {
                item = meta.id$item[id];

                if (!item) {
                    throw new Error(`不存在 id 为 '${id}' 的节点`);
                }
            }
            else if (typeof id == 'number') {
                item = meta.cid$item[id];
                if (!item) {
                    throw new Error(`不存在 cid 为 '${id}' 的节点`);
                }
            }
            else {
                throw new Error(`无法识别的参数 id。`);
            }

            item.open = true;

            //向父节点追溯，更改 open 状态。
            //即：只要当前节点是打开状态，则它所有的父节点都要设置为打开状态。
            Data.trace(item, function (parent) {
                parent.open = true;
            });

            this.render(meta.list);

            //是一个目录，则先假设是折叠的。
            if (item.list.length > 0) {
                item.open = false;
            }

            let $li = item.$ = item.$ || meta.$.find(`li[data-id="${item.id}"]`);
            $li.find(`>[data-cmd="item"]`).trigger('click');

        }

        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }

    }




    return MenuTree;
});