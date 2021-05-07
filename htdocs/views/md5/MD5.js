
define.view('/MD5', function (require, module, view) {
    const $ = require('$');
    const API = module.require('API');
    const List = module.require('List');


    view.on('init', function () {
        function setHeight() {
            let h = view.$.height();
            List.setHeight(h - 100);
        }

        $(window).on('resize', function (event) {
            setHeight();
        });


        API.on('success', {
            'get': function (list) {
                List.render(list);
                setHeight();
            },


        });

        List.on({
            'cmd': function (cmd, item) {
                view.fire('cmd', cmd, [item]);
            },
        });


  
    });


    view.on('render', function () {
        API.get();
    });




});
