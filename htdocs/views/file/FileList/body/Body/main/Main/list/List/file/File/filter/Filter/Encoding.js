
/*
* 
*/
define.panel('/FileList/Body/Main/List/File/Filter/Encoding', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');

    let chk = null;

    let list = [
        { text: 'UTF8', checked: true, value: 'utf8', },
        { text: '其它', checked: true, value: 'other', },
    ];

    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '编码',
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



