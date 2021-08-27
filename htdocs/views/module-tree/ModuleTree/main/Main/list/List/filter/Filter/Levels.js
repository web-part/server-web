
define.panel('/ModuleTree/Main/List/Filter/Levels', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');

    let chk = null;


    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '级别',
        });

        chk.on({
            'check': function (list) {
                panel.fire('check', [list]);
            },
            'fill': function (list) {
                panel.fire('check', [list]);
            },
        });


       
    });



    panel.on('render', function (list) {

        list = list.map((level) => {
            return {
                'text': `${level} 级`,
                'checked': true,
                'value': level,
            };
        });

        chk.render(list);


    });



    return {
        
    };







});
