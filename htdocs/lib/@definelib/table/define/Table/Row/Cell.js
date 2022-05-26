

define('Table/Row/Cell', function (require, module, exports) {
    const $String = require('@definejs/string');

    return {
        /**
        * 创建一个表体单元格对应的数据对象。
        */
        create({ meta, column, row, no, }) {
            let id = $String.random();          //单元格 id

            let cell = {
                'name': column.name,        //列名，编程用，只读。
                'class': column.class,      //css 类名，会生成到 DOM 元素中。
                'title': column.title,      //title 提示，会生成到 DOM 元素中。
                'style': column.style,      //css 样式，会生成到 DOM 元素中。
                'dataset': column.dataset,  //自定义数据集，会在 DOM 元素中生成 `data-` 开头的自定义属性。
                'id': id,                   //单元格 id，会生成到 DOM 元素中。
                'type': 'TableCell',        //类型。
                'column': column,           //所在的列引用。
                'row': row,                 //单元格所在的行引用。
                'table': meta.this,         //表格实例的自身，方便业务使用。

                'value': null,              //该单元格的任意类型的值，由业务层写入，组件内不关注、不使用。
                'data': {},                 //用户自定义数据的容器。 仅用于给用户存储数据，组件内不关注、不使用。
            };

            meta.id$cell[id] = cell;
            row.name$cell[cell.name] = cell;
            column.cells.splice(no, 0, cell);

            return cell;
        },


    };

});


