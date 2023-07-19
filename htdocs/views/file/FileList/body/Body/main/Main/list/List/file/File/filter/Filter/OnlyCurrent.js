
/*
* 
*/
define.panel('/FileList/Body/Main/List/File/Filter/OnlyCurrent', function (require, module, panel) {
    const CheckBox = require('CheckBox');


    let chk = null;

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        chk = new CheckBox({
            'fireNow': true,
            'container': panel.$,
            'text': '仅当前目录',
        });

        chk.on('checked', function (checked) {
            panel.fire('change', [checked]);
        });


    });




    panel.on('render', function (checked) {

        chk.render({
            'checked': checked,
        });

    });


});



