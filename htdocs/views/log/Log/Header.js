
define.panel('/Log/Header', function (require, module, panel) {
    const CheckBox = require('CheckBox');


    let chks = [
        { id: 'time', cmd: 'time', checked: true, fireNow: true, text: '时间', },
        { id: 'color', cmd: 'color', checked: true, fireNow: true, text: '彩色', },
        { id: 'highlight', cmd: 'highlight', checked: false, fireNow: true, text: '高亮当前行', },
        { id: 'border', cmd: 'border', checked: false, fireNow: true, text: '边线', },
    ];

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd]': function (event) {
                let { cmd, } = event.currentTarget.dataset;

                panel.fire('cmd', cmd, []);
            },
        });

        chks = chks.map((item) => {
            let chk = new CheckBox({
                'checked': item.checked,
                'fireNow': item.fireNow,
                'text': item.text,
                'container': panel.$.find(`[data-id="chk-${item.id}"]`),
            });

            chk.on('checked', function (checked) {
                panel.fire('check', item.cmd, [checked]);
            });

            return chk;
        });

  
    });




    panel.on('render', function () {
        chks.forEach((chk) => {
            chk.render();
        });
    });

    return {
        close(closed) {
            
        },
    };






});
