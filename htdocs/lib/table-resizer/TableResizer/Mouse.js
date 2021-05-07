
define('TableResizer/Mouse', function (require, module, exports) {
    const $ = require('$');
    const Masker = module.require('Masker');


    let id$meta = {};       //
    let draging = false;    //表示鼠标左键是否已按下并还没释放。
    let tdWidth = 0;        //鼠标按下时的 td 宽度。
    let tableWidth = 0;
    let x = 0;              //鼠标按下时的 pageX 值。
    let cursor = '';        //鼠标按下时的 cursor 指针值。

    let id = '';            //鼠标按下时的 target 元素的 id 值。
    let $b = null;

    let body = document.body;


   






    $(body).on({
       
        //开始按下鼠标左键。
        'mousedown': function (event) {
            id = event.target.id;

            let meta = id$meta[id];

            if (!meta) {
                return;
            }

            let index = meta.id$index[id];
            let field = meta.fields[index];
            let isLast = index == meta.fields.length - 1; //是否为最后一列。

            draging = true;
            x = event.pageX;
            cursor = body.style.cursor;
            body.style.cursor = 'ew-resize';

            tdWidth = field.width;

            $b = $('#' + id + '>b');
            $b.addClass('on');
            $b.toggleClass('last', isLast);
            $b.html(tdWidth + 'px');

            Masker.show();
            
        },

        //按住鼠标左键进行移动。
        'mousemove': function (event) {
            if (!draging) {
                return;
            }

            let meta = id$meta[id];
            let dx = event.pageX - x;   //delta width
            let cw = tdWidth + dx;      //cell width

            if (cw < meta.minWidth) {   //单元格宽度不能小于指定的最小宽度。
                return;
            }
          


            let fields = meta.fields;
            let index = meta.id$index[id];
            let col = meta.cols[index];
            let tw = tableWidth = meta.width + dx;

            col.width = fields[index].width = cw;
            meta.$.width(tw);

            $b.html(cw + 'px');

            meta.emitter.fire('change', [{
                'index': index,
                'dx': dx,
                'tdWidth': cw,
                'width': tw,
                'fields': fields,
            }]);
        },

        //释放鼠标左键。
        'mouseup': function () {
            let meta = id$meta[id];
            if (!meta) {
                return;
            }

            meta.width = tableWidth;

            id = '';
            draging = false;

            body.style.cursor = cursor;
            Masker.hide();
            $b && $b.removeClass('on');
        },


    });





    return {

        set: function (id, meta) {
            id$meta[id] = meta;
        },

        remove: function (id) {
            delete id$meta[id];
        },

    };
});