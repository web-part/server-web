

define('TableResizer/Rows', function (require, module) {
    const $Array = require('@definejs/array');

  
    return {

        get: function (table, rowspan) {
            let rows = Array.from(table.rows).slice(0, rowspan);

            let list = $Array.pad(0, rowspan).map(function () {
                return [];
            });
            

            rows.map(function (row, no) {
                let baseX = 0;
                let cells = list[no];
                let len = cells.length;

                if (len > 0) {
                    //查找空位。
                    baseX = cells.findIndex(function (cell) {
                        return !cell;
                    });

                    //没有空位，则在最后加上。
                    if (baseX < 0) {
                        baseX = len;
                    }
                }

                Array.from(row.cells).map(function (cell, index) {
                    let rowspan = cell.getAttribute('rowspan');
                    let colspan = cell.getAttribute('colspan');

                    rowspan = Number(rowspan) || 1;
                    colspan = Number(colspan) || 1;
                   

                    $Array.pad(0, rowspan).map(function (R) {
                        let y = R + no;
                        let cells = list[y];

                        $Array.pad(0, colspan).map(function (C) {
                            let x = baseX + C;
                            cells[x] = cell;
                        });
                    });


                    baseX += colspan;


                    if (cells[baseX]) {
                        baseX = cells.findIndex(function (cell) {
                            return !cell;
                        });

                        if (baseX < 0) {
                            baseX = cells.length;
                        }
                    }
                });
            });

            return list;


        },
    };

});

