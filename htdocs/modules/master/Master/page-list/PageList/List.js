

define.panel('/Master/PageList/List', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');

    let list = [];
    let tabs = null;

    panel.on('init', function () {
        
        tabs = new Tabs({
            container: panel.$,
            selector: '>li',
            activedClass: 'on',
        });

        panel.$.on('click', '[data-cmd]', function (event) {

            event.stopPropagation();

            let li = this;
            let index = +li.getAttribute('data-index');
            let cmd = li.getAttribute('data-cmd');
            let item = list[index];

            tabs.active(index);
            panel.fire(cmd, [item, index]);

        });
    });




    panel.on('render', function (items) {
        
        list = items;

        panel.fill(list, function (item, index) {

            return {
                'index': index,
                'name': item.name,
            };
        });
       
    });


    return {
        active: function (index) {
            //debugger
            tabs.active(index);
        },
    };


});