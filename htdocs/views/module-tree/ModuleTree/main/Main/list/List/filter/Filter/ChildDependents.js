
define.panel('/ModuleTree/Main/List/Filter/ChildDependents', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');

    let chk = null;

    let list = [
        { text: 'N > 0', checked: true, value: 'N>0', },
        { text: 'N = 0', checked: true, value: 'N=0', },
        { text: 'N < 0', checked: true, value: 'N<0', },
    ];

    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '所依赖私有模块数 - 直接子模块数',
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
