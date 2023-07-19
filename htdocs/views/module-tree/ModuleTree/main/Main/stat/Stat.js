
define.panel('/ModuleTree/Main/Stat', function (require, module, panel) {

    const Data = module.require('Data');
    const GridView = module.require('GridView');


    panel.on('init', function () {

    });


    /**
    * 渲染内容。
    */
    panel.on('render', function ({ item, stat, }) {
       
        console.log({item, stat});

        let list = Data.get({ item, stat, });

        console.log(list)

        GridView.render(list);

      

    });




    return {
        
    };

});
