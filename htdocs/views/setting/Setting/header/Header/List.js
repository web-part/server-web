
define.panel('/Setting/Header/List', function (require, module, panel) {

    let list = [
        { name: '显示', value: 'show', icon: 'fas fa-window-maximize', },
        { name: '隐藏', value: 'hide', icon: 'far fa-window-maximize', },
    ];


    panel.on('init', function () {

        panel.template(function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'icon': item.icon,
                'value': item.value,
            };
        });

        panel.$on('click', {
            '[type="radio"]': function (event) {
                let { checked, value, } = event.target;
                
                panel.fire('check', [value, list]);
            },
        });
    });


    panel.on('render', function (value) {
       
        panel.fill(list);

        panel.$.find(`[type="radio"][value="${value}"]`).click();

    });



    return {
        
    };

});
