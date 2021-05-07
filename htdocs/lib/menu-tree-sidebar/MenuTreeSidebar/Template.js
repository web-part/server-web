

define('MenuTreeSidebar/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    



    return {
        create: function (meta) {
           
            let tpl = new Template('#tpl-MenuTreeSidebar');


            tpl.process({
                '': function (data) {
                    
                    return {
                        'id': meta.id,
                    };
                },

            });



            return tpl;

        },

    };
});