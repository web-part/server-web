
define.panel('/Log/Filter/Dates', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');


    let chk = null;


    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '日期',
        });

        chk.on({
            'check': function (list) {
                panel.fire('check', [list]);
            },
        });



    });



    panel.on('render', function (list, item$checked) {

        list = list.map((item) => {

            let checked = item$checked[item];

            return {
                'text': item,
                'checked': checked,
                'value': item,
            };
        });

        chk.render(list);


    });



    return {

    };







});
