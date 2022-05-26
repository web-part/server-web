define('Table/Meta/Column', function (require, module, exports) {
    const $String = require('@definejs/string');

    return {
        create({ field, table, }) {
            let id = $String.random();      //列 id。

            let column = {
                'name': field.name,             //列名，编程用的，只读。
                'caption': field.caption || '', //标题名，会生成到表头的单元格 DOM 元素中。
                'class': field.class || '',     //css 类名，会生成到表头和表体的单元格 DOM 元素中。
                'title': field.title || '',     //title 提示，会生成到表头和表体的单元格 DOM 元素中。
                'dataset': field.dataset || {}, //自定义属性集，会生成到表头和表体的单元格 DOM 元素中。
                'style': field.style || {},     //css 样式集，会生成到表头和表体的单元格 DOM 元素中。
                'id': id,                       //列 id，会生成到表头的单元格 DOM 元素中。
                'type': 'TableColumn',          //类型。
                'table': table,                 //表格实例的自身，方便业务使用。
                'cells': [],                    //该列所包含的表体的单元格集合。

                'field': field,                 //此字段只是存着，本组件不使用。 可以在触发事件时让外部使用。
                'value': null,                  //该列的任意类型的值，由业务层写入，组件内不关注、不使用。
                'data': {},                     //用户自定义数据的容器。 仅用于给用户存储数据，组件内不关注、不使用。
            };


            return column;


        },
    };

    

});