


define('Table/Order', function (require, module, exports) {


    let defaults = {
        sample: '{order}',
        add: true,
        index: 0,
    };


    return exports = {

        normalize: function (config) {
            let order = config.order;

            if (!order) {
                return config;
            }

            if (order === true) {
                order = {};
            }

            order = Object.assign({}, defaults, order);


            let fields = config.fields.slice(0);
            let item = { [config.columnName]: 'order', caption: '序号', };
            let index = order.index;

            if (order.add) {
                fields.splice(index, 0, item); //在指定位置插入。
            }
            else {
                fields[index] = item;
            }

    
            config = Object.assign({}, config, {
                'order': order,
                'fields': fields,
            });

            return config;

        },


    };

});


