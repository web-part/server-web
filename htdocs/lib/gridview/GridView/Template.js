
/**
* 
*/
define('GridView/Template', function (require, module, exports) {
    const Template = require('@definejs/template');



    return {

        create: function (meta) {
            let tpl = new Template('#tpl-GridView');
            let fields = meta.fields;

            //如果指定了启用复选框列，则表头的首列生成一个全选的复选框。
            if (meta.check) {
                fields[0].caption = tpl.fill('check-all', {});
            }

            tpl.process({
                '': function () {
                    let header = this.fill('header', {
                        'fields': fields,
                    });

                    return {
                        'header': header,
                        'id': meta.id,
                        'class': meta.class,
                        'sumWidth': meta.sumWidth + 10,
                        'no-footer': meta.footer ? '' : 'no-footer',
                        'headerId': meta.headerId,
                        'tableId': meta.tableId,
                        'pagerId': meta.pagerId,
                        'counterId': meta.counterId,
                        'countId': meta.countId,
                        'checkAllId': meta.checkAllId,
                        'nodataId': meta.nodataId,
                    };
                },

                //表头。
                'header': {
                    '': function (data) {
                        let fields = data.fields;
                        let cells = this.fill('cell', fields);

                        return {
                            'cells': cells,
                        };
                    },

                    'cell': function (item, index) {
                        return {
                            'caption': item.caption,
                        };
                    },
                },

            });
           

            return tpl;
        },
    };
    
});


