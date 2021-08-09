
define.panel('/Setting/Local/List', function (require, module, panel) {

    let list = [
        { name: '简体中文', value: 'chinese', icon: 'fas fa-flag red', },
        { name: 'English', value: 'english', icon: 'fas fa-flag-usa blue', },
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
