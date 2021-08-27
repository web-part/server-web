
define.panel('/ModuleTree/Main/Pair/Filter/JsFile', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');

    let chk = null;
    let list = [
        { text: 'N = 0', checked: true, value: 'N=0', },
        { text: 'N = 1', checked: true, value: 'N=1', },
        { text: 'N > 1', checked: true, value: 'N>1', },
    ];

    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': 'js 文件',
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



    panel.on('render', function () {


        chk.render(list);


    });



    return {
        
    };







});
