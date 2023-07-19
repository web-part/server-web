
/**
* 
*/
define('Tabs', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $ = require('$');
    const Events = module.require('Events');
    const Meta = module.require('Meta');
    const Template = module.require('Template');

   
    const mapper = new Map();



    class Tabs {
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
            if (list) {
                meta.list = list;
            }

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
            meta.list = list;

            let html = meta.tpl.fill('item', meta.list);
            meta.$.find('>ul').html(html);
        }

        active(index) { 
            let meta = mapper.get(this);
            let { $li, } = meta;

            if ($li) {
                $li.removeClass('on');
            }

            if (typeof index == 'number') {
                meta.index = index;
            }
            else {
                index = meta.index;
            }

            //列表长度可能发生了变化。
            if (index > meta.list.length - 1) {
                index = 0;
            }

            meta.index = index;

            if (meta.storage) {
                meta.storage.set('index', index);
            }

            $li = meta.$li = meta.$.find(`li[data-index="${index}"]`);
            $li.addClass('on');

            //要延迟获取 left 与 width。
            setTimeout(() => {
                let { left, } = $li.position();
                let width = $li.outerWidth();
                let item = meta.list[index];
                let $slider = meta.$.find(`[data-id="slider"]`);

                $slider.css({
                    left: `${left + 10}px`,
                    width: `${width}px`,
                });
                

                //等动画结束后再触发外部逻辑。
                setTimeout(() => {
                    meta.emitter.fire('change', [item, index]);
                }, 150);

            }, 0);

            
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

    module.exports = exports = Tabs;
    exports.defaults = require('Tabs.defaults');

});