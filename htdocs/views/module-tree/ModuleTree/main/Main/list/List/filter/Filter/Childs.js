
define.panel('/ModuleTree/Main/List/Filter/Childs', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');


    let chk = null;

   
    panel.on('init', function () {
        chk = new DropCheckList({
            'container': panel.$,
            'text': '直接子模块',
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



    panel.on('render', function (items) {
        
        let list = items.map((item) => {
            return {
                'text': item.name,
                'checked': true,
                'value': item.data.id,
            };
        });

        chk.render(list);

    });



    return {
        
    };







});
