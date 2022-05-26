define('Table/Template/Caption', function (require, module, exports) {

    return {
        html(meta, column, index) {
            let { emitter, } = meta;
            let { name, caption, } = column;
            let args = [column, { index, }]; //触发事件用到的参数列表。

            //让外界有机会处理/更改 cell 对象。
            let values0 = emitter.fire('process', 'caption', name, args);
            let values1 = emitter.fire('process', 'caption', args);

            let html0 = values0.slice(-1)[0]; //以最后一个为准。
            let html1 = values1.slice(-1)[0]; //以最后一个为准。
            let html2 = caption;

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