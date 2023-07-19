

define('GridView/Panel/Main', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const Table = require('Table');
    const TableResizer = require('TableResizer');

    return function (meta) {
        let panel = new Panel(`[data-panel="${meta.id}/Main"]`);
        let table = null;
        let resizer = null;

        function make(item, info) {
          
            let args = [item, {
                ...info,
                'page': meta.page,
            }];

            return args;
        }


        //初始阶段适合用来绑定事件。
        panel.on('init', function () {

            let fields = meta.fields.map((field) => {
                return {
                    ...field,
                    dragable: false, //表体不需要生成用于拖拽的 html。
                };
            });

            tpl = panel.template();

            table = exports.table = new Table({
                'container': panel.$,
                'fields': fields,
                'header': false,
                'meta': true,
            });

            resizer = exports.resizer = new TableResizer({
                'container': `#${table.id}`,
                'fields': fields,
                'class': '',  //这里要去掉默认的 `TableResizer` 类名，可避免一些样式冲突。
            });


            table.on('process', {
                'row': function (row, info) {
                    let args = make(row, info);
                    meta.emitter.fire('process', 'row', args);
                },
                'cell': {
                    '': function (cell, info) {
                        let args = make(cell, info);
                        let values0 = meta.emitter.fire('process', 'cell', cell.name, args);
                        let values1 = meta.emitter.fire('process', 'cell', args);
                        let html0 = values0.slice(-1)[0]; //以最后一个为准。
                        let html1 = values1.slice(-1)[0]; //以最后一个为准。

                        if (html0 !== undefined) {
                            return html0;
                        }

                        if (html1 !== undefined) {
                            return html1;
                        }
                    },
                },
            });

            table.on('click', {
                '': function (info) {
                    let args = make(table, info);
                    meta.emitter.fire('click', 'table', args);
                },

                'body': function (info) {
                    let args = make(table, info);
                    meta.emitter.fire('click', 'body', args);
                },

                'row': function (row, info) {
                    let args = make(row, info);
                    meta.emitter.fire('click', 'row', `${info.no}`, args);
                    meta.emitter.fire('click', 'row', args);
                },

                'cell': function (cell, info) {
                    let args = make(cell, info);
                    let { element, event, } = info;
                    let { click, } = cell.column.field; //如 { click: '[data-cmd]', }

                    if (click) {
                        let target = $(element).find(click).get(0); //可能为空。

                        //单元格里面的子元素触发的。
                        //符合监听的元素选择规则，则触发。
                        if (target && target.contains(event.target)) {
                            meta.emitter.fire('click', 'cell', cell.name, click, args);
                        }
                    }


                    meta.emitter.fire('click', 'cell', cell.name, args);
                    meta.emitter.fire('click', 'cell', args);
                },
            });

        });



        //渲染。
        panel.on('render', function (list) {
            table.render(list);
            if (list.length > 0) {
                resizer.render();
            }
        });


        return panel.wrap({
            exports,

            setWidth(index, width) {
                resizer.set(index, width);
            },
        });
    };
});