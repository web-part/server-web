
define.panel('/Log/Filter/Types', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');


    let chk = null;


    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '类型',
        });

        chk.on({
            'check': function (list) {
                panel.fire('check', [list]);
            },
        });



    });



    panel.on('render', function (list) {

        list = list.map((item) => {

            return {
                'text': item,
                'checked': true,
                'value': item,
            };
        });

        

        chk.render(list);


    });



    return {

    };






});
