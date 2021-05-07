
define('Dialog/Drager', function (require, module, exports) {
    const $ = require('$');
    const Masker = require('@definejs/masker');




    let x = 0;              //��갴��ʱ�� pageX ֵ��
    let y = 0;              //��갴��ʱ�� pageY ֵ��
    let marginLeft = 0;
    let marginTop = 0;

    let cursor = '';        //��갴��ʱ�� cursor ָ��ֵ��
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

            //��ֹѡ���ı�
            window.getSelection().removeAllRanges();

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