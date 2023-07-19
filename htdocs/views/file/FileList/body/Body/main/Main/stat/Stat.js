
define.panel('/FileList/Body/Main/Stat', function (require, module, panel) {

    const Data = module.require('Data');
    const GridView = module.require('GridView');


    let meta = {
        item: null,
    };

    panel.on('init', function () {

    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        if (item === meta.item) {
            panel.show();
            return;
        }
        
        meta.item = item;

        console.log(item);

        let list = Data.get(item);
        console.log(list)

        GridView.render(list);

      

    });




    return {
        
    };

});
