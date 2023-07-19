

define('GridView/Sort', function (require, module, exports) {
    const $ = require('$');

    function switchStatus(status) {
        //未设定 --> 降序
        if (!status) { 
            return 'down';
        }

        //降序 --> 升序
        if (status == 'down') { 
            return 'up';
        }
        
        //升序 --> 未设定
        return '';
    }

    
    return {
        create(meta) {

            let exports = {
                column: null,   //当前处于排序的列。
                id$status: {},  //每一列对应的排序状态。

                sort(column, status, list) {
                    let value = status == 'down' ? -1 : 1;
                    let { name, } = column;

                    //复制一份。
                    list = [...list];

                    list.sort(function (a, b) {
                        let args = [{ status, column, a, b, list, }];
                        let values0 = meta.emitter.fire('sort', name, args);
                        let v0 = values0.slice(-1)[0]; //以最后一个为准。

                        if (typeof v0 == 'number') {
                            return v0;
                        }
                        
                        //v0 = { a, b, };
                        if (typeof v0 == 'object') {
                            a = v0.a;
                            b = v0.b;
                        }
                        else {
                            a = a[name];
                            b = b[name];
                        }
                        
                        return a > b ? value : (a < b ? -value : 0);
                    });

                    let values1 = meta.emitter.fire('sort', [{ status, column, list, }]);
                    let v1 = values1.slice(-1)[0]; //以最后一个为准。

                    if (Array.isArray(v1)) {
                        list = v1;
                    }

                    return list;
                },


                init(list) {
                    let { column, } = exports;

                    if (column) {
                        let status = exports.id$status[column.id];
                        list = exports.sort(column, status, list);
                    }

                    return list;
                },

                render(column, info) {
                    if (!column.field.sort) {
                        return;
                    }

                    console.log(column, info);

                    let { id, } = column;
                    let { event, columns, } = info;

                    if (event.target.id != id) {
                        return;
                    }

                    let { list, } = meta;
                    let status = switchStatus(exports.id$status[id]);

                    columns.forEach(({ id, }) => {
                        $(`#${id}`).removeClass('sort-up sort-down');
                    });

                    if (status) {
                        $(`#${id}`).addClass(`sort-${status}`);
                        list = exports.sort(column, status, list);
                        exports.column = column;
                    }
                    else { 
                        exports.column = null;
                    }

                    exports.id$status[id] = status;

                    meta.panel.render(list);
                },
            };

            return exports;
        },
    };



});