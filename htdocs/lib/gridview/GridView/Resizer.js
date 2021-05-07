
/**
* 
*/
define('GridView/Resizer', function (require, module, exports) {
    const $ = require('$');
    const TableResizer = require('TableResizer');


    return {

        create: function (meta) {

            //表体的调整器。
            let rsz = null;

            //表头的调整器。
            let resizer = new TableResizer({
                'table': '#' + meta.headerId,
                'fields': meta.fields,
            });



            //表头的全选。
            resizer.on('render', function () {
                let chk = '#' + meta.checkAllId;

                this.$.on('click', chk, function () {
                    let $chk = $(this);
                    let checked = !$chk.hasClass('on');

                    $chk.toggleClass('on', checked);

                    meta.table.column('check', function (cell) {
                        cell.ctrl.toggleClass('on', checked);
                        meta.checkItem(cell.row.data, checked);
                    });

                });
            });

            resizer.on({
                'render': function (width, fields) {
                    rsz = new TableResizer({
                        'table': meta.table.get('element'),
                        'dragable': false,
                        'fields': fields,
                    });

                    rsz.render();
                },

                'change': function (data) {
                    rsz.set(data);
                },
            });



            return resizer;
           
        },
    };
    
});


