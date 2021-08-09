
define('TableResizer', function (require, module) {
    const $ = require('$');
    const $String = require('@definejs/string');
    const Emitter = require('@definejs/emitter');
    const Template = require('@definejs/template');

    const Cols = module.require('Cols');
    const Mouse = module.require('Mouse');
    const Rows = module.require('Rows');
    const Fields = module.require('Fields');
    const Meta = module.require('Meta');

    const defaults = require('TableResizer.defaults');
    let mapper = new Map();
    let tpl = new Template('#tpl-TableResizer');


    function TableResizer(config) {
        config = Object.assign({}, defaults, config);

        let emitter = new Emitter(this);
        let fields = Fields.normalize(config.fields);
        let width = config.width || Fields.sum(fields);

        let meta = Meta.create(config, {
            'emitter': emitter,     //
            'this': this,           //
            'fields': fields,       //列字段集合。
            'width': width,         //表格总宽度。
        });

        mapper.set(this, meta);

        Object.assign(this, {
            'id': meta.id,
            'meta': meta,
        });

       
    }

    //实例方法。
    TableResizer.prototype = {
        constructor: TableResizer,

        id: '',
        $: null,


        render: function () {
            this.destroy(true); //弱销毁。

            let meta = mapper.get(this);

            meta.$ = this.$ = $(meta.selector);
            meta.$.addClass(meta.cssClass);

            let table = meta.table = meta.$.get(0);
            let rows = Rows.get(table, meta.rowspan);


            //指定了允许可拖曳，则在有效行(一般是第一行)的列之间生成 resizer 相应的 html。
            meta.dragable && rows.map(function (cells) {

                cells.map(function (cell, index) {
                    let id = $String.random();
                    let targetIndex = cell.getAttribute(meta.indexKey);

                    //指定了要关联的目标列索引值，则只创建和保留对应的 resizer。
                    if (targetIndex !== null) {
                        let ids = meta.cell$ids.get(cell) || [];
                        let nextIndex = ids.length;

                        ids.push(id);
                        meta.cell$ids.set(cell, ids);

                        if (nextIndex != targetIndex) {
                            return ;
                        }
                    }

                    let field = meta.fields[index];

                    let html = tpl.fill('resizer', {
                        'id': id,
                        'display': field.dragable === false ? 'display: none;' : '',
                    });

                    $(cell).append(html);

                    meta.id$index[id] = index;
                    Mouse.set(id, meta);

                    return;
                });
            });
            
            meta.cols = Cols.fill(meta.$, meta.fields);

            meta.$.width(meta.width);
            meta.emitter.fire('render', [meta.width, meta.fields]);

        },

        /**
        * 设置指定索引号的列宽和整个表格的宽度。
        */
        set: function (data) {
            let index = data.index;
            let width = data.width;
            let tdWidth = data.tdWidth;

            let meta = mapper.get(this);

            meta.fields[index].width = tdWidth;
            meta.cols[index].width = tdWidth;
            meta.width = width;

            meta.$.width(width);

        },


        on: function () {
            let meta = mapper.get(this);

            meta.emitter.on(...arguments);
        },

        destroy: function (weak) {
            let meta = mapper.get(this);

            Object.keys(meta.id$index).map(function (id) {
                Mouse.remove(id);

                let el = document.getElementById(id);
                el && el.parentNode.removeChild(el);
            });


            //当指定 weak 为 true 时，表示是弱销毁，一般是内部调用。
            if (!weak) {
                let cg = meta.$.find('>colgroup').get(0);
                cg && cg.parentNode.removeChild(cg);

                meta.emitter.destroy();
                meta.$.removeClass(meta.cssClass);
                mapper.delete(this);
            }
          
        },
    };

    return TableResizer;
});