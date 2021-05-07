

define('/Master/PageList/Mask', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const Masker = require('@definejs/masker');

    let mask = null;
    let visible = false;
    let panel = new Panel();


    panel.on('init', function () {

        mask = new Masker({
            volatile: true, //易消失。
            //opacity: 0.04,
            opacity: 0,
            //'z-index': -1, //测试。
        });


        mask.on({
            'hide': function () {
                visible = false;
                panel.fire('hide');
            },
            'show': function () {
                visible = true;
                panel.fire('show');
            },
        });


    });






    panel.on('render', function () {
       
    });





    return panel.wrap({
        toggle: function () {
            if (!visible) {
                mask.show();
            }
            else {
                mask.hide();
            }
        },
    });
});