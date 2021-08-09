
/**
* 
*/
define('DropCheckList/Meta', function (require, module, exports) {
    const IDMaker = require('@definejs/id-maker');

    let idmaker = new IDMaker(module.parent.id);


    return {

        create: function (config, others) {
            let { container, list, text, } = config;

            let meta = {
                'id': idmaker.next(),

                '$': null,
                'this': null,
                'emitter': null,
                'masker': null,
                'tpl': null,
                '$main': null,
                '$list': null,
                '$container': $(container),

                'text': text,
                'width': config.width || 'auto',
                'maxTextWidth': 0,          //根据 text 计算出的最大宽度。
                'container': container,
                'list': list || [],

                'binded': false,
                'visible': false,
                
                all: {
                    $: null,
                    text: '全选',
                    checked: false,

                    fill(checked) {
                        let { all, list, tpl, } = meta;

                        let total = list.length;
                        let count = 0;

                        //指定了具体的值，则把列表的都统一为该值。
                        if (typeof checked == 'boolean') {
                            count = checked ? total : 0;
                            all.checked = checked;

                            list.forEach((item) => {
                                item.checked = checked;
                            });
                        }
                        else {
                            list.forEach((item) => {
                                if (item.checked) {
                                    count++;
                                }
                            });

                            checked = all.checked = count > 0 && count == total;
                        }

                        let html = tpl.fill('all', {
                            'text': all.text,
                            'checked': checked,
                            'count': count,
                            'total': total,
                        });

                        meta.$.toggleClass('not-all-checked', !checked);

                        all.$.html(html);

                    }

                },
                
            };


            Object.assign(meta, others);


           

            return meta;
           
        },


    };
    
});


