
/**
*/
define('MarkDoc/Lines', function (require, module, exports) {
    const $String = require('@definejs/string');


    return exports = {

        /**
        *  产生行号的 html。
        */
        getNumbers: function (meta, content) {
            let sample = meta.samples['numbers'];
            let sitem = meta.samples['numbers.item'];
            let lines = content.split(/\r\n|\n|\r/);
            let height = exports.getHeight(lines);

            //最后一个空行要去掉。
            //因为它在 `<pre></pre>` 中无法展示出来。
            let lastLine = lines[lines.length - 1];

            if (!lastLine) {
                lines = lines.slice(0, -1);
            }

            let list = lines.map(function (item, index) {

                return $String.format(sitem, { 'no': index + 1, });
            });


            let html = $String.format(sample, {
                'height': height,
                'items': list.join(''),
                'total': list.length,
            });
        
            return html;


            //let tpl = meta.tpl.template('numbers');

            //tpl.process({
            //    '': function (data) {
            //        let items = this.fill('item', data.items);

            //        return {
            //            'height': height,
            //            'items': lines.join(''),
            //        };
            //    },

            //    'item': function (item, index) {
            //        return {
            //            'no': index + 1,
            //        };
            //    },
            //});

            //let html = tpl.fill({
            //    'height': height,
            //    'items': lines,
            //});
        },


        /**
        * 根据文本内容计算需要的高度。
        */
        getHeight: function (lines) {
            if (!Array.isArray(lines)) {
                lines = lines.split(/\r\n|\n|\r/);
            }

            return lines.length * 20;
        },
    };








});
