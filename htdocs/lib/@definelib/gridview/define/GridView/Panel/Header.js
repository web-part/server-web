


define('GridView/Panel/Header', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const Table = require('Table');
    const TableResizer = require('TableResizer');


    return function (meta) {
        let panel = new Panel(`[data-panel="${meta.id}/Header"]`);
        let table = null;
        let resizer = null;
        
        panel.on('init', function () {

            table = exports.table = new Table({
                'container': panel.$,
                'fields': meta.fields,
                'class': '',    //去掉默认的 Table 类名，可避免一些样式冲突。
            });

            resizer = exports.resizer = new TableResizer({
                'container': `#${table.id}`,
                'fields': meta.fields,
            });

            
            table.on('process', {
                'caption': function (column, info) {
                    column.class += column.field.sort ? ' sortable' : '';

                    let values0 = meta.emitter.fire('process', 'caption', column.name, [column, info]);
                    let values1 = meta.emitter.fire('process', 'caption', [column, info]);

                    let html0 = values0.slice(-1)[0]; //以最后一个为准。
                    let html1 = values1.slice(-1)[0]; //以最后一个为准。

                    if (html0 !== undefined) {
                        return html0;
                    }

                    if (html1 !== undefined) {
                        return html1;
                    }
                },
            });
            

            table.on('click', {
                'caption': function (column, info) {
                    meta.emitter.fire('click', 'caption', column.name, [column, info]);
                    meta.emitter.fire('click', 'caption', [column, info]);
                    
                    meta.Sort.render(column, info);
                },
            });
           


            resizer.on({
                'dblclick': function (column, info) {
                    resizer.set(info.index, column.field.width);
                },

                'change': function (column, info) {
                    panel.fire('resize', [column, info]);
                },
            });

        });


        /**
        * 渲染。
        */
        panel.on('render', function () {
            table.render([]);
            resizer.render();
        });

        return panel.wrap({
            exports,

            get() {
                let w = table.$.width();
                return w + 15;
            },

        });
    };



});