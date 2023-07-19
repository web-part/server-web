
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
                console.log(list);
                fireCheck(list);
            },
            'fill': function (list) {
                fireCheck(list);
            },
        });


       
    });



    panel.on('render', function (item) {
        let { dirs, } = item.data.current;

        let list = dirs.map((item) => {
            return {
                'text': item.name,
                'value': item,
                'checked': true,
            };
        });

        chk.render(list);

    });



    return {
        
    };







});
