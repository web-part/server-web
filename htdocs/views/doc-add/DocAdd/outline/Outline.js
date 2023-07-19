

define.panel('/DocAdd/Outline', function (require, module, panel) {
    const Masker = require('@definejs/masker');
    const Outline = require('Outline');

    let masker = null;
    let outline = null;


    panel.set('show', false); //不要在 render 后自动显示。


    panel.on('init', function () {

        masker = new Masker({
            volatile: true, //易消失。
            opacity: 0,
        });

        masker.on({
            'hide': function () {
                panel.hide();
            },
        });


        outline = new Outline({
            'container': panel.$.find('>div'),
        });

        outline.on({
            'item': function (item, index) {
                panel.fire('item', [item, index]);
            },
        });

        outline.render();


        panel.$.on('click', '[data-cmd="close"]', function (event) {
            panel.hide();
        });

    });



    panel.on('show', function () {
        //masker.show();
    });





    /**
    * 渲染。
    *   items = [
    *       {
    *           text: '',       //
    *           level: 1,       //
    *       },
    *   ];
    */
    panel.on('render', function (items) {

        outline.fill(items);

    });



});
