
define('DropCheckList/Masker', function (require, module, exports) {
    const Masker = require('@definejs/masker');


    return {
        create: function (meta) {
            let masker = new Masker({
                volatile: true, //易消失。
                opacity: 0,
                //opacity: 0.04,
            });


            masker.on({
                'show': function () {
                    meta.$.addClass('show');
                    meta.visible = true;
                    meta.$main.slideDown(80);
                    

                },

                'hide': function () {
                    meta.$.removeClass('show');
                    meta.visible = false;

                    meta.$main.slideUp(50);

                },
               
            });


            return masker;

        },

    };
});