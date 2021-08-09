
/**
* 提纲，即内容目录。
*/
define.panel('/Markdoc/Outline', function (require, module, panel) {
    const Outline = require('Outline');

    let outline = null;



    panel.set('show', false); //不要在 render 后自动显示。


    panel.on('init', function () {

        panel.$.on('scroll', 'ul', function (event) {
            event.stopPropagation();
            console.log(event);
        });

        outline = new Outline({
            'container': panel.$.find('[data-id="container"]'),
        });

        outline.on({
            'item': function (item, index) {
                panel.fire('item', [item, index]);
            },
        });

        outline.render();
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
