
define.panel('/ModuleTree/Main/List/Filter/Methods', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');


    let chk = null;


    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '定义方法',
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
