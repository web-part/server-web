

define.panel('/Tool/Less/Themes/Mask', function (require, module, panel) {
    const Masker = require('@definejs/masker');

    let mask = null;
    let visible = false;
   

    panel.on('init', function () {
        mask = new Masker({
            volatile: true, //易消失。
            opacity: 0,
            //opacity: 0.04,

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



    return {
        toggle: function () {
            if (!visible) {
                mask.show();
            }
            else {
                mask.hide();
            }
        },
    };


});