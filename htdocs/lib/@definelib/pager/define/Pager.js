
/**
* 分页器。 
*/
define('Pager', function (require, module, exports) {
    const $ = require('$');
    const Emitter = require('@definejs/emitter');
    const Events = module.require('Events');
    const Meta = module.require('Meta');
    const No = module.require('No');
    const Sizes = module.require('Sizes');
    const Template = module.require('Template');

    let mapper = new Map();


    class Pager {
        constructor(config) {
            config = Object.assign({}, exports.defaults, config);

            let emitter = new Emitter(this);

            let { size, sizes, } = Sizes.parse(config);

            let meta = Meta.create(config, {
                'size': size,
                'sizes': sizes,
                'emitter': emitter,         //
                'this': this,               //方便内部使用。
            });

            meta.tpl = Template.create(meta);
            mapper.set(this, meta);

            //指定了公开 meta 对象。
            if (config.meta) {
                this.meta = meta;
            }
            
            this.id = meta.id;
            this.$ = meta.$;
        }

        /**
        * 渲染 HTML 到容器中以生成 DOM 节点。
        */
        render(opt) {
            let meta = mapper.get(this);
            let updated = this.update(opt);
            
            if (updated) {
                return;
            }

            //首次渲染，全量填充。
            let html = meta.tpl.fill({});

            $(meta.container).html(html);

            meta.$ = this.$ = $(`#${meta.id}`);
            meta.$nav = meta.$.find(`[data-id="nav"]`);
            meta.$stat = meta.$.find(`[data-id="stat"]`);
            meta.$jump = meta.$.find(`[data-id="jump"]`);
            meta.$.toggle(meta.maxNo >= meta.minNo);

            Events.bind(meta);
            
        }

        /**
        * 更新组件。
        * 必须在渲染后才可更新。
        * @param {object} opt 配置对象。
        *   opt = {
        *       total: 0,   //总的记录数。 必须为非负整数。
        *       size: 0,    //每页的记录数。 必须为正整数。
        *       no: 0,      //当前页码。 如果为负数，则从后面算始算起。 如：-1 表示倒数第一页，即最后一页。
        *   };
        * @returns 
        */
        update(opt) {
            opt = opt || {};

            let meta = mapper.get(this);

            let { size, sizes, } = Sizes.parse({
                'size': opt.size || meta.size,
                'sizes': meta.sizes,
            });

            
            let total = opt.total === 0 ? 0 : opt.total || meta.total;
            let maxNo = No.getMax(total, size);
            let no = opt.no || 1;

            let changes = {
                'no': no != meta.no,
                'total': total != meta.total,
                'size': size != meta.size,
                'maxNo': maxNo != meta.maxNo,
            };

            meta.total = total;
            meta.size = size;
            meta.maxNo = maxNo;
            meta.sizes = sizes;

            //下面三句的顺序不要变。
            meta.recentNo = meta.no;                //用来辅助判断下次要跳转的页码。
            meta.no = No.normalize(no, meta.maxNo); //每次都需要规范化。
            meta.jumpNo = No.getJump(meta);         //计算出下次要跳转的页码，填到输入框里。


            //尚未渲染。
            if (!meta.$) {
                return false;
            }


            let nav = '';
            let stat = '';
            let jump = '';

            //total、size、maxNo 发生变化时，要重新渲染 stat，nav、jump。
            if (changes.total || changes.size || changes.maxNo) {
                nav = meta.tpl.fill('nav', {});
                stat = meta.tpl.fill('stat', {});
                jump = meta.tpl.fill('jump', {});
            }
            else if (changes.no) {
                //no 发生变化时，要重新渲染 nav。
                nav = meta.tpl.fill('nav', {});
                // jump = meta.tpl.fill('jump', {});
                document.getElementById(meta.txtId).value = meta.jumpNo;  //用这句更新粒度会更小。
            }

            nav && meta.$nav.html(nav);
            stat && meta.$stat.html(stat);
            jump && meta.$jump.html(jump);

            meta.$.toggle(meta.maxNo >= meta.minNo);

            return true;
        }

        /**
        * 跳转到指定页码的分页。
        * @param {number} no 要跳转的页码。
        *   如果为负数，则从后面算始算起。 如：-1 表示倒数第一页，即最后一页。
        * @example
        *   pager.to(1);    //跳转到第一页。
        *   pager.to(2);    //跳转到第二页。
        *   pager.to(-1);   //跳转到最后一页。
        *   pager.to(-2);   //跳转到倒数第二页。
        */
        to(no) {
            let meta = mapper.get(this);

            meta.this.render({ no, }); //此处的 no 的范围可能不合法，渲染后会规范成合法的放在 meta.no 里。

            meta.emitter.fire('change', [{
                'no': meta.no,              //当前页码，从 1 开始。
                'size': meta.size,          //分页的大小，即每页的记录数。
                'maxNo': meta.maxNo,        //总页数，计算得到。
                'recentNo': meta.recentNo,  //上一次的页码。
                'jumpNo': meta.jumpNo,      //计算出下次要跳转的页码，填到输入框里。
                'total': meta.total,        //总的记录数。
                'sizes': meta.sizes,        //可供选择的分页大小列表。
            }]);
        }

        /**
        * 跳转指定的页数（步数）到目标页码。
        * @param {number} 要跳转的页数（步数），可以为负数。
        *   如果为正，则向页码增大的方向跳转。 如果目标页码超过最大页码，则取最大页码。
        *   如果为负数，则向页码减小的方向跳转。 如果目标小于 1，则取 1。
        * @example
        *   pager.jump(-1); //跳转到上一页。
        *   pager.jump(1);  //跳转到下一页。
        */
        jump(step) {
            let meta = mapper.get(this);
            let no = meta.no + step;

            //这个要加，否则又要从后面开始跳。
            if (no < 1) {
                no = 1;
            }

            this.to(no);
        }

        /**
        * 绑定事件。
        */
        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }




    }




    module.exports = exports = Pager;
    exports.defaults = require('Pager.defaults');

});

