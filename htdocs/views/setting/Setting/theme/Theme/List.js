
define.panel('/Setting/Theme/List', function (require, module, panel) {

    let list = [
        { name: 'Blue', value: 'blue', },
        { name: 'Light', value: 'light', },
    ];


    panel.on('init', function () {

        panel.template(function (item, index) {
            return {
                'index': index,
                'name': item.name,
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
