
define('Dialog/Drager', function (require, module, exports) {
    const $ = require('$');
    const Masker = require('@definejs/masker');




    let x = 0;              //鼠标按下时的 pageX 值。
    let y = 0;              //鼠标按下时的 pageY 值。
    let marginLeft = 0;
    let marginTop = 0;

    let cursor = '';        //鼠标按下时的 cursor 指针值。
    let body = document.body;
    let masker = null;

    let id$meta = {};
    let meta = null;


    function stop(event) {
        body.style.cursor = cursor;
        meta && meta.$.removeClass('draging');
        masker && masker.hide();
        event && event.preventDefault();
        meta = null;
    }


    $(body).on({
        'mousedown': function (event) {
            meta = id$meta[event.target.id];

            if (!meta) {
                return;
            }

            x = event.pageX;
            y = event.pageY;

            cursor = body.style.cursor;
            body.style.cursor = 'move';

            marginLeft = meta.$.css('margin-left');
            marginTop = meta.$.css('margin-top');
            marginLeft = parseInt(marginLeft);
            marginTop = parseInt(marginTop);
            meta.$.addClass('draging');

            masker = masker || new Masker({
                opacity: 0.0,
                background: 'red',
                'z-index': 1025,
            });

            masker.show();

            //禁止选中文本
            window.getSelection().removeAllRanges();

        },

        'mousemove': function (event) {

            if (!meta) {
                return;
            }

            //鼠标左键按下去时， event.which 的值为 1。
            //拖曳 dialog 一直离开浏览器区域，松开鼠标，并不会触发 mouseup 事件。
            //然后鼠标再回到浏览器区域，mousemove 事件还是会继续触发，但 event.which 的值为 0。
            //这里，当 dialog 给拖曳到离开浏览器区域时，我们执行跟 mouseup 一样的逻辑。
            if (event.which != 1) {
                stop();
                return;
            }

            let dx = event.pageX - x;
            let dy = event.pageY - y;
            let left = marginLeft + dx;
            let top = marginTop + dy;

            meta.$.css({
                'margin-left': left,
                'margin-top': top,
            });
        },

        'mouseup': function (event) {
            stop(event);
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