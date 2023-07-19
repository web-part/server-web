
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
    const Files = module.require('Files');

   
    const mapper = new Map();



    class MenuTree {
        /**
        * 构造器。
        * @param {*} config 
        */
        constructor(config) {
            config = Object.assign({}, exports.defaults, config);

            let emitter = new Emitter(this);
            
            let meta = Meta.create(config, {
                'this': this,
                'emitter': emitter,
            });

            meta.tpl = Template.create(meta);
            mapper.set(this, meta);

            //指定了公开 meta 对象。
            if (config.meta) {
                this.meta = meta;
            }

            this.id = meta.id;
        }

        each(fn) { 
            let meta = mapper.get(this);
            meta.list.forEach((node) => {
                Data.each(node, fn);
            });
        }

        /**
        * 渲染 HTML 到容器中以生成 DOM 节点。
        * @returns
        */
        render(list = []) {
            let meta = mapper.get(this);

            //已渲染。
            if (meta.$) {
                if (list.length > 0) {
                    this.update(list);
                }

                return;
            }

            //首次渲染。
            //data = { list, items, id$item, cid$item, };
            let data = Data.make(list);
            Object.assign(meta, data);
            

            let html = meta.tpl.fill({}); //填充全部。

            $(meta.container).html(html);
            meta.$ = this.$ = $(`#${meta.id}`);
            Events.bind(meta);

        }

        /**
        * 更新数据。
        */
        update(list) {
            let meta = mapper.get(this);

            //data = { list, items, id$item, cid$item, };
            let data = Data.make(list);
            Object.assign(meta, data);


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

        /**
        * 绑定事件。
        */
        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }

        

    }

    //静态方法。
    MenuTree.parse = Files.parse;


    module.exports = exports = MenuTree;
    exports.defaults = require('MenuTree.defaults');

});