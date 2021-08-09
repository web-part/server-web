

define('MenuNav/Template', function (require, module, exports) {
    const Template = require('@definejs/template');


   





    return {
        create: function (meta) {
           
            let tpl = new Template('#tpl-MenuNav');
           

            tpl.process({
                '': function () {

                    return {
                        'id': meta.id,
                    };
                   
                },

                'item': function (item, index) {
                    return {
                        'index': index,
                        'name': item,
                    };
                },

            });




            return tpl;

        },

    };
});