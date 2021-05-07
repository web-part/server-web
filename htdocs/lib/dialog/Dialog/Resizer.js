
define('Dialog/Resizer', function (require, module, exports) {
    const $ = require('$');




    let x = 0;              //��갴��ʱ�� pageX ֵ��
    let y = 0;              //��갴��ʱ�� pageY ֵ��
    let width = 0;
    let height = 0;

    let cursor = '';        //��갴��ʱ�� cursor ָ��ֵ��
    let body = document.body;

    let id$meta = {};
    let meta = null;
    let header = null;
    let sizer = null;


    function stop(event) {
        body.style.cursor = cursor;
        event && event.preventDefault();
        header && header.removeClass('resizing');

        meta = null;
        header = null;
        sizer = null;
    }

    function setSizer(width, height) {
        let html = width + ' x ' + height;
        sizer.html(html);
    }


    $(body).on({
        'mousedown': function (event) {
            let target = event.target;
            let id = target.getAttribute('data-id');
            meta = id$meta[id];

            if (!meta) {
                return;
            }

            x = event.pageX;
            y = event.pageY;

            cursor = body.style.cursor;
            body.style.cursor = $(target).css('cursor');

            width = meta.$.css('width');
            height = meta.$.css('height');
            width = parseInt(width);
            height = parseInt(height);

            header = $('#' + meta.headerId);
            header.addClass('resizing');

            sizer = $('#' + meta.sizerId);
            setSizer(width, height);

            return false; //��ֹѡ���ı�
        },

        'mousemove': function (event) {
            if (!meta) {
                return;
            }

            //����������ȥʱ�� event.which ��ֵΪ 1��
            //��ҷ dialog һֱ�뿪����������ɿ���꣬�����ᴥ�� mouseup �¼���
            //Ȼ������ٻص����������mousemove �¼����ǻ������������ event.which ��ֵΪ 0��
            //����� dialog ����ҷ���뿪���������ʱ������ִ�и� mouseup һ�����߼���
            if (event.which != 1) {
                stop();
                return;
            }

            let dx = event.pageX - x;
            let dy = event.pageY - y;

            let w = width + dx;
            let h = height + dy;

            let maxWidth = meta.maxWidth;
            if (maxWidth && w > maxWidth) {
                w = maxWidth;
            }

            let minWidth = meta.minWidth;
            if (minWidth && w < minWidth) {
                w = minWidth;
            }

            let maxHeight = meta.maxHeight;
            if (maxHeight && h > maxHeight) {
                h = maxHeight;
            }

            let minHeight = meta.minHeight;
            if (minHeight && h < minHeight) {
                h = minHeight;
            }


            meta.$.css({
                'width': w,
                'height': h,
            });

            setSizer(w, h);
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