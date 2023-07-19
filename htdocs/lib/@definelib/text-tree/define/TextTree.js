
/**
* 文本树。
*/
define('TextTree', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $ = require('$');
    const Data = module.require('Data');
    const Events = module.require('Events');
    const Meta = module.require('Meta');
    const Template = module.require('Template');


    let mapper = new Map();

    class TextTree {
        /**
        * 构造器。
        * @param {Object} config 配置项。
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
            this.$ = meta.$;
        }

        /**
        * 渲染。
        * @param {Array} raws 数据列表。 其中列表中的每个元素为：
        *   item = {
        *       keys: [],       //必选，节点名称数组。 如 ['foo', 'bar']
        *       type: '',       //可选，节点的类型，为 `dir` 或 `file`。 如果未指定，则自动根据是否有下级节点进行推算。
        *       id: '',         //可选，会生成在 DOM 节点中。 如果指定，请确保唯一。
        *       class: '',      //可选，生成在 DOM 节点中的样式类名。
        *       dataset: {},    //可选，生成在 DOM 节点中的以 `data-` 开头的自定义属性。
        *       title: '',      //可选，生成在 DOM 节点中的 title 提示。
        *       style: {},      //可选，生成在 DOM 节点中的内联样式。
        *       value: '',      //可选，要展示的值部分，即副字段。
        *       data: {},       //可选，用户的自定义数据，仅用来存储在当前节点，以便后续用户再读取出来使用，组件内部不使用。
        *   };
        * @returns 
        */
        render(raws = []) {
            let meta = mapper.get(this);
            let { list, id$item, } = Data.make(raws, meta.trimLeft);
           
            meta.list = list;
            meta.id$item = id$item;

            //已浸染过。
            if (meta.$) {
                let html = meta.tpl.fill('item', meta.list);
                meta.$.html(html);
                return;
            }


            let html = meta.tpl.fill({});

            $(meta.container).html(html);
            meta.$ = this.$ = $(`#${meta.id}`);
            Events.bind(meta);
        }

        /**
        * 转成字符串文本。
        * @param {boolean} withValue 可选，是否带上值部分。
        *   如果不指定，则根据当前界面的状态来判断。
        */
        toString(withValue) {
            let meta = mapper.get(this);

            //如果没有指定 withValue, 则根据当前界面的状态来判断。
            if (withValue === undefined && meta.$) {
                withValue = !meta.$.hasClass('hide-value');
            }

            let texts = meta.list.map(function (item) {
                let value = withValue ? item.value : '';
                let s = `${item.tabs}${item.linker} ${item.key}`;

                if (value) {
                    s = s + ' ' + value;
                }

                return s;
            });

            let content = texts.join('\n');

            return content;
        }

        /**
        * 绑定事件。
        */
        on(...args) {
            let meta = mapper.get(this);

            meta.emitter.on(...args);
        }

        /**
        * 切换显示或隐藏指定的效果。
        * 切换展开或收起指定的节点。
        * 切换显示或隐藏整个组件。
        */
        toggle(opt) {
            let meta = mapper.get(this);

            if (!meta.$) {
                return;
            }

            switch (typeof opt) {
                //展开或收起指定的节点。
                case 'string':
                    let id = opt;
                    $(`#${id}`).find(`[data-cmd][data-id="${id}"]`).trigger('click');
                    break;
                
                //切换显示某种效果，如显示或隐藏颜色。
                case 'object':
                    Object.entries(opt).forEach(([key, visible]) => {
                        meta.$.toggleClass(`hide-${key}`, !visible);
                    });
                    break;
                
                //整个组件的显示或隐藏。
                default:
                    meta.$.toggle(opt);
                    break;
            }


        }



    }



    module.exports = exports = TextTree;
    exports.defaults = require('TextTree.defaults');
});