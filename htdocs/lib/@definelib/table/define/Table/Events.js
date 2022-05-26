

define('Table/Events', function (require, module, exports) {


    return {
        bind(meta) {
            //整个表格的点击事件。
            meta.$.on('click', function (event) {
                let element = this;

                meta.emitter.fire('click', [{ event, element, }]);
            });

            if (meta.header) {
                meta.$.on('click', '>thead>tr>th', function (event) {
                    let id = this.id;
                    let column = meta.id$column[id];

                    if (!column) {
                        throw new Error(`不存在 id 为 ${id} 的列记录。`);
                    }

                    let { columns, } = meta;
                    let element = this;

                    let index = columns.findIndex((item) => {
                        return item === column;
                    });
                    let args = [column, { event, index, columns, element, }];

                    meta.emitter.fire('click', 'caption', column.name, args);
                    meta.emitter.fire('click', 'caption', args);

                });
            }



            //整个表体的点击事件。
            meta.$tbody.on('click', function (event) {
                let element = this;

                meta.emitter.fire('click', 'body', [{ event, element, }]);
            });

            //表格行的点击事件。
            meta.$tbody.on('click', '>tr', function (event) {
                let id = this.id;
                let row = meta.id$row[id];

                if (!row) {
                    throw new Error(`不存在 id 为 ${id} 的表格行记录。`);
                }

                //所在的行号。
                let no = meta.rows.findIndex((row) => {
                    return row.id == id;
                });

                let element = this;
                let args = [row, { event, no, element, }];

                meta.emitter.fire('click', 'row', `${no}`, args);
                meta.emitter.fire('click', 'row', args);
            });

            //单元格的点击事件。
            meta.$tbody.on('click', '>tr>td', function (event) {
                let id = this.id;
                let cell = meta.id$cell[id];

                if (!cell) {
                    throw new Error(`不存在 id 为 ${id} 的单元格记录。`);
                }

                //所在的行号。
                let no = meta.rows.findIndex((row) => {
                    return row.id == cell.row.id;
                });

                //所在的列号。
                let index = cell.row.cells.findIndex((cell) => {
                    return cell.id == id;
                });

                let element = this;
                let args = [cell, { event, no, index, element, }];

                meta.emitter.fire('click', 'cell', cell.name, args);
                meta.emitter.fire('click', 'cell', args);
            });
        }

    };

});


