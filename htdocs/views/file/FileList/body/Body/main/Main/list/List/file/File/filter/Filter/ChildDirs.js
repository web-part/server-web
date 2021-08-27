
define.panel('/FileList/Body/Main/List/File/Filter/ChildDirs', function (require, module, panel) {
    const $Array = require('@definejs/array');
    const DropCheckList = require('DropCheckList');


    let chk = null;

   
    panel.on('init', function () {

        function fireCheck(list) {
            //注意，为了后续方便处理，此处过滤出选中的项。
            list = $Array.map(list, function (item) {
                return item.checked ? item.value : null;
            });
            panel.fire('check', [list]);
        }


        chk = new DropCheckList({
            'container': panel.$,
            'text': '直接子目录',
        });

        chk.on({
            'check': function (list) {
                fireCheck(list);
            },
            'fill': function (list) {
                fireCheck(list);
            },
        });


       
    });



    panel.on('render', function (list) {
        list = $Array.map(list, (item) => {
            let { type, name, } = item.data;

            return type == 'dir' ? {
                'text': item.name,
                'checked': true,
                'value': name,
            } : null;
        });

        chk.render(list);

    });



    return {
        
    };







});
