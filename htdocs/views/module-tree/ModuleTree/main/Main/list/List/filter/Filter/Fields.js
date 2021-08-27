
define.panel('/ModuleTree/Main/List/Filter/Fields', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');


    let chk = null;

   
    panel.on('init', function () {
        chk = new DropCheckList({
            'container': panel.$,
            'text': '显示列',
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



    panel.on('render', function (fields) {
        
        let list = fields.map((field, index) => {
            return {
                'checked': true,
                'text': field.caption,
                'value': index + 1,
            };
        });

        chk.render(list);

    });



    return {
        
    };







});
