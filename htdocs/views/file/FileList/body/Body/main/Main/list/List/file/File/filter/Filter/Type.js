
/*
* 
*/
define.panel('/FileList/Body/Main/List/File/Filter/Type', function (require, module, panel) {
    const DropCheckList = require('DropCheckList');

    let chk = null;
    let list = [ ];

    panel.on('init', function () {

        chk = new DropCheckList({
            'container': panel.$,
            'text': '类型',
        });

        chk.on({
            'check': function (list) {
                panel.fire('check', [list]);
            },
        });



    });



    panel.on('render', function (exts) {

        list = exts.map((ext) => {
            return {
                'text': `${ext.slice(1)} 文件`,
                'checked': true,
                'value': ext,
            };
        });


        chk.render(list);

        //因为每次 render 后 list 可能发生了变化，
        //此处需要重新触发事件。
        panel.fire('check', [list]);


    });



    return {

    };



});



