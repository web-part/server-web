
/**
* 
*/
define('GridView/Fields', function (require, module, exports) {


    const defaults = require('GridView.defaults');



    return {
        /**
        * 获取字段列表。
        */
        get: function (config) {
            let fields = config.fields;
            let check = config.check;
            let order = config.order;
            let list = [];
           
            //是否指定了显示复选框列。
            check = check === true ? defaults.check : check;

            //是否指定了显示序号列。
            order = order === true ? defaults.order : order;
         
            //复选框列。
            check && list.push({
                'name': check.name,
                'width': check.width,
                'caption': '',
                'class': check.class,
                'dragable': check.dragable,
            });


            //序号列。
            order && list.push({
                'name': order.name,
                'width': order.width,
                'caption': order.caption,
                'class': order.class,
                'dragable': order.dragable,
            });

            //其它字段。  field 里也许有其它字段，这里只挑出需要用到的。
            fields.forEach(function (field) {
                list.push({
                    'name': field.name,
                    'width': field.width,
                    'caption': field.caption,
                    'class': field.class,
                    'dragable': field.dragable,
                    'delegate': field.delegate,
                });
            });

            return list;
        },

        /**
        * 计算所有列宽的总和。
        */
        sumWidth: function (fields) {
            let sum = 0;

            fields.map(function (field) {
                sum += field.width;
            });

            return sum;
        },
    };
    
});


