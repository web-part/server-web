define('Table/Template/Cell', function (require, module, exports) {

    return {
        html(meta, cell, index, no) {
            let { emitter, } = meta;
            let { name, row, } = cell;
            let args = [cell, { index, no, }]; //触发事件用到的参数列表。

            //让外界有机会处理/更改 cell 对象。
            let values0 = emitter.fire('process', 'cell', name, args);
            let values1 = emitter.fire('process', 'cell', args);
            let item = row.item || {};

            let html0 = values0.slice(-1)[0]; //以最后一个为准。
            let html1 = values1.slice(-1)[0]; //以最后一个为准。
            let html2 = item[name];

            if (html0 !== undefined) {
                return html0;
            }

            if (html1 !== undefined) {
                return html1;
            }

            if (html2 !== undefined) {
                return html2;
            }

            return '';
        },
    };
});