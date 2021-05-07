
define('DropList/Field', function (require, module, exports) {


    function getValue(item, key) {
        return typeof key == 'function' ? key(item) : item[key];
    }




    return {
        map: function (field, list) {
            list = list || [];

            if (!field) {
                return list;
            }


            list = list.map(function (item) {
               
                let id = field.id ? getValue(item, field.id) : '';
                let title = field.title ? getValue(item, field.title) : '';

                return {
                    'id': id,
                    'title': title,
                    'item': item,
                    'disabled': false,
                };
            });

            return list;

        },


    };
});