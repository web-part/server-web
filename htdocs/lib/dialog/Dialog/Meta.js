
define('Dialog/Meta', function (require, module, exports) {
    const $String = require('@definejs/string');






    return {
        create: function (config, others) {
            let id = 'Dialog-' + $String.random(4);
            let footer = config.footer;

            if (Array.isArray(footer)) {
                footer = {
                    'content': '',
                    'buttons': footer,
                };
            }
            else if (typeof footer == 'string') {
                footer = {
                    'content': footer,
                    'buttons': [],
                };
            }
            else {
                footer = footer || {};
            }


            let meta = {
                'dragable': config.dragable,
                'resizable': config.resizable,
                'cssClass': config.cssClass,
                'autoClose': config.autoClose,  //����κ�һ����ť���Ƿ��Զ��ر����
                'mask': config.mask,
                'z-index': config['z-index'],    //����͸����ʱҪ�õ�
                'width': config.width,
                'height': config.height,
                'container': config.container,
                'title': config.title,
                'content': config.content,
                'footer': footer,
                'maxWidth': config.maxWidth,
                'minWidth': config.minWidth,
                'maxHeight': config.maxHeight,
                'minHeight': config.minHeight,
                'attributes': config.attributes,
                'masker': null,

                'id': id,
                'headerId': id + '-header',
                'contentId': id + '-content',
                'footerId': id + '-footer',
                'sizerId': id + '-sizer',

                'rendered': false,  //�Ƿ�����Ⱦ���ˡ�
                'visible': false,   //��¼��ǰ����Ƿ�����ʾ
                '$': null,          //$(this)���ڲ�ʹ�õ�һ�� jQuery ����
                'this': this,
            };


            Object.assign(meta, others);


            return meta;


        },
    };
});