

define('DropCheckList/Template', function (require, module) {
    const $String = require('@definejs/string');
    const Template = require('@definejs/template');


    return {

        create: function (meta) {

            let tpl = new Template('#tpl-DropCheckList');


            tpl.process({
                '': function () {
                    return {
                        'id': meta.id,
                        'text': meta.text,
                    };
                   
                },

                'all': function (data) {

                    return {
                        'checked': data.checked ? 'checked' : '',
                        'icon': data.checked ? 'check-' : '',
                        'text': data.text,
                        'count': data.count,
                        'total': data.total,

                    };
                },

                'item': function (item, index) {
                    let { text, checked, } = item;
                    let width = $String.getByteLength(text) * 8;


                    meta.maxTextWidth = Math.max(width, meta.maxTextWidth);


                    return {
                        'index': index,
                        'text': text,
                        'checked': checked ? 'checked' : '',
                        'icon': checked ? 'check-' : '',
                    }
                    
                },

            });


            return tpl;
        },
    };



});

