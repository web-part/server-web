
define.panel('/FileList/Body/Main/Icon/List', function (require, module, panel) {
    const File = require('File');
    const Data = module.require('Data');
    

    let list = [];


    panel.on('init', function () {
       
        panel.template(function (item, index) {
            let icon = File.getIcon(item);

            return {
                'index': index,
                'icon': icon.html,
                'name': item.sname,
            };
        });

        panel.$on('click', {
            '[data-index]': function (event) {
                let index = + this.dataset.index;
                let item = list[index];

                panel.fire('item', [item]);
            },
        });

    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (items) {
        list = Data.get(items);
        panel.fill(list);

    });




    return {
        
    };

});
