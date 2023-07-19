
/**
* 带有翻页、固定表头的列表表格展示器组件。
*/
define('GridView', function (require, module, exports) {
    const $ = require('$');
    const Emitter = require('@definejs/emitter');
    
    const Meta = module.require('Meta');
    const Template = module.require('Template');
    const Panel = module.require('Panel');
    const Sort = module.require('Sort');
    



    let mapper = new Map();


    class GridView {
        constructor(config) {
            config = Object.assign({}, exports.defaults, config);

            let emitter = new Emitter(this);
            
            let meta = Meta.create(config, {
                'emitter': emitter,         //
                'this': this,               //方便内部使用。
            });

            meta.tpl = Template.create(meta);
            meta.Sort = Sort.create(meta);
            
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
        * @param {Array} list 要渲染的列表数据。 
        * @param {Object} page 分页信息。 
        *   首次如果指定，则进行分页；否则不生成分页器。
        *   page = {
        *       no: 1,          //当前页码。
        *       size: 20,       //每页大小，即每页显示多少条记录。
        *       total: 1250,    //总的记录数。 如果不指定此字段，则参数 list 就当作是全部列表数据，并在组件内部进地分页。
        *   };
        * @returns 
        */
        render(list, page) {
            let meta = mapper.get(this);

            //首次渲染。
            if (!meta.panel) {
                let html = meta.tpl.fill({});

                $(meta.container).html(html);
                meta.panel = Panel.create(meta);

                this.$ = meta.panel.$;
            }

            list = meta.Sort.init(list);

            meta.list = list;
            meta.panel.render(list, page);
           
        }

        /**
        * 绑定事件。
        */
        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }




    }




    module.exports = exports = GridView;
    exports.defaults = require('GridView.defaults');

    
});


