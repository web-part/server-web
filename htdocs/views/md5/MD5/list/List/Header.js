

define.panel('/MD5/List/Header', function (require, module, panel) {
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
            'container': panel.$.find('[data-id="chk-repeat"]'),
            'text': '仅显示重复文件',
        });

        chk.on('checked', function (checked) {
            panel.fire('multi', [checked]);

        });


    });




    panel.on('render', function (checked) {

        chk.render({
            'checked': checked,
        });

    });




});
