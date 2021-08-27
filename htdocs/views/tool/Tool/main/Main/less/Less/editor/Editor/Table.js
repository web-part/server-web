

define('/Tool/Main/Less/Editor/Table', function (require, module, exports) {
  

    function map(count, fn) {
        let list = [];
        let item = null;

        for (let i = 0; i < count; i++) {
            item = fn(i, i == count - 1);

            if (item !== null) {
                list.push(item);
            }
        }

        return list;
    }



    return {
        /**
        * 创建表格。
        *   options = {
        *       row: 0,
        *       cell: 0,
        *   };
        * 最终效果如: 
        *   |  列1  |  列2  |  列3  |
        *   |-------|-------|-------|
        *   |       |       |   1   |
        *   |       |       |   2   |
        *   |       |       |   3   |
        * 每列的最后一个单元格要加点内容，才能把整行的高度撑开。
        * 特别是最后一行的最后一个单元格，必须要有点内容，否则会丢失它。
        * 为了直观，就干脆加行号当内容算了。
        */
        create: function (options) {
            let row = options.row;
            let cell = options.cell;


            //表头。 如:
            //|  列1  |  列2  |  列3  |
            let headers = map(cell, function (index, isLast) {
                let item = '|  列' + (index + 1) + '  ';

                if (isLast) {
                    item += '|';
                }

                return item;
            });


            //分隔线。 如: 
            //|-------|-------|-------|
            let spliters = map(cell, function (index, isLast) {
                let item = '|-------';

                if (isLast) {
                    item += '|';
                }

                return item;
            });


            //表体行。 如:
            //|       |       |   1   |
            //|       |       |   2   |
            //|       |       |   3   |
            let rows = map(row, function (no) {
                let order = no + 1;

                let cells = map(cell, function (index, isLast) {

                    return isLast ? '|   ' + order + '   |' : '|       ';
                });

                return cells;
            });


            let table = [
                headers,
                spliters,
                ...rows,
            ];

            table = table.join('\n');
            table = table.replace(/,/g, ''); //去掉里面的逗号。

            table = '\n\n' + table + '\n\n'; //前后插入多两个空行，可以解决在文本行内插入表格的问题。


            return table;

        },
    };





});
