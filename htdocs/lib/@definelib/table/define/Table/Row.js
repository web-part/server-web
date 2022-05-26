
//表格行。
define('Table/Row', function (require, module, exports) {
    const $String = require('@definejs/string');
    const Cell = module.require('Cell');


    return {
        /**
        * 创建一个表格行记录的数据对象并插入到行的集合中。
        */
        insert(meta, item, no) {
            let max = meta.rows.length;

            //未指定，或指定的范围不对，则都当成在末尾插入。
            if (no === undefined || no < 0 || no > max) {
                no = max;
            }
            

            let id = $String.random();  //行 id

            //行结构。
            let row = meta.id$row[id] = {
                'type': 'TableRow',     //类型。
                'item': item,           //当前行的数据记录。
                'id': id,               //行 id，会生成到 DOM 元素中。
                'class': '',            //css 类名，会生成到 DOM 元素中。
                'title': '',            //title 提示，会生成到 DOM 元素中。
                'dataset': {},          //自定义数据集，会在 DOM 元素中生成 `data-` 开头的自定义属性。
                'style': {},            //css 样式，会生成到 DOM 元素中。
                'table': meta.this,     //表格实例的自身，方便业务使用。
                'name$cell': {},        //命名的单元格集合。
                'cells': null,          //单元格集合，先占位。

                'value': null,          //该行的任意类型的值，由业务层写入，组件内不关注、不使用。
                'data': {},             //用户自定义数据的容器。 仅用于给用户存储数据，组件内不关注、不使用。
            };

            row.cells = meta.columns.map((column) => {
                let cell = Cell.create({ meta, column, row, no, });
                return cell;
            });

            //在指定的位置插入。
            meta.rows.splice(no, 0, row);

            return { row, no, };
        },

        /**
        * 根据索引、行对象或 id 来获取对应的行对象与其与在的索引值。
        * @param {number|Object|string} item 要获取的行对象对应的索引、行对象或 id 值。
        *   如果传入的是一个 number，则当成行的索引值。 如果小于 0，则从后面开始算起。
        *   如果传入的是一个 Object，则当成是行对象并进行引用匹配。
        *   如果传入的是一个 string，则当成是 id 进行匹配。
        * @returns {Object} 返回获取到的表格行对象及描述，结构为：
        *   {
        *       row: {},    //表格行对象。 获取不到时为空。
        *       no: 0,      //所在行数组的索引值。 在 row 为空时，此字段值为 -1。
        *       msg: '',    //错误信息描述。 在 row 为空时，有此字段值。
        *   }
        */
        get(meta, item) {
            let row = null;
            let no = -1;
            let msg = ``;

            switch (typeof item) {
                //item 为一个索引。
                case 'number':
                    //传入负数，则从后面开始算起。
                    if (item < 0) {
                        item = meta.rows.length + item; //如 -1 就是最后一项；-2 就是倒数第 2 项。
                    }

                    row = meta.rows[item]; //可能为空。
                    no = row ? item : -1;
                    msg = row ? `` : `不存在索引值为 ${item} 的表格行。`;
                    break;

                //item 为一个对象。
                case 'object':
                    //可能为 -1。
                    no = meta.rows.findIndex((row) => {
                        return row === item;
                    });

                    row = meta.rows[no];
                    msg = row ? `` : `不存在匹配的表格行。`;
                    break;


                //item 为一个 id。
                case 'string':
                    row = meta.id$row[item]; //可能为空。
                    no = !row ? -1 : meta.rows.findIndex((row) => {
                        return row.id == item;
                    });
                    msg = row ? `` : `不存在 id 为 ${item} 的表格行。`;
                    break;

            }

            return { row, no, msg, };

        },




    };

});


