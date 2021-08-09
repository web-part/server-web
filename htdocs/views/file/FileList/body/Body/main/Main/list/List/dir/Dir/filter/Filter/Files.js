
define.panel('/FileList/Body/Main/List/Dir/Filter/Files', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');

    let chk = null;

    let list = [
        { text: 'N = 0', checked: true, value: 'N=0', },
        { text: 'N > 0', checked: true, value: 'N>0', },
    ];

    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '文件数',
        });

        chk.on({
            'check': function (list) {
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
