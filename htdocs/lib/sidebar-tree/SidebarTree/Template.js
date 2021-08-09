

define('SidebarTree/Template', function (require, module, exports) {
    const Template = require('@definejs/template');


   





    return {
        create: function (meta) {
           
            let tpl = new Template('#tpl-SidebarTree');
           

            tpl.process({
                '': function () {

                    return {
                        'id': meta.id,
                        'width': meta.width,
                        'header-display': meta.header ? '' : 'display: none;',
                        'resizer-display': meta.resizer ? '' : 'display: none;',
                    };
                   
                },

            });




            return tpl;

        },

    };
});