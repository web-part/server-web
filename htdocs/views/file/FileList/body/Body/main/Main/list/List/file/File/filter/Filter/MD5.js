
/*
* 
*/
define.panel('/FileList/Body/Main/List/File/Filter/MD5', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');

    let list = [
        { text: 'N = 1', checked: true, value: 'N=1', },
        { text: 'N > 1', checked: true, value: 'N>1', },
    ];


    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '重复文件',
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



