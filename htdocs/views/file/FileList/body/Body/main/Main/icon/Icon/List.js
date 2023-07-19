
define.panel('/FileList/Body/Main/Icon/List', function (require, module, panel) {
    const Data = module.require('Data');
    


    let meta = {
        list: null,
    };


    panel.on('init', function () {
       

        panel.$on('click', {
            '[data-index]': function (event) {
                let index = + this.dataset.index;
                let item = meta.list[index].raw;
                panel.fire('item', [item]);
            },
        });

    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (list) {

        meta.list = Data.get(list);

        panel.fill(meta.list, function (item, index) {
            return {
                index,
                ...item,
            };
        });

    });




    return {
        
    };

});
