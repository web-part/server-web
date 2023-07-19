

define.panel('/ModuleTree/Main/Tree/Header', function (require, module, panel) {

    const CheckBox = require('CheckBox');

 

    let chks = [
        { id: 'value', text: '文件', chk: null, checked: false, },
        { id: 'icon', text: '图标', chk: null, checked: false, },
        { id: 'tab', text: '缩进', chk: null, checked: true, },
        { id: 'color', text: '彩色', chk: null, checked: true, },
        { id: 'hover', text: '悬停', chk: null, checked: true, },
    ];



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        chks.forEach((item) => {
            let chk = new CheckBox({
                'fireNow': true,
                'container': panel.$.find(`[data-id="chk-${item.id}"]`),
                'text': item.text,
            });

            chk.on('checked', function (checked) {
                item.checked = checked;
                
                panel.fire('check', [{
                    [item.id]: checked,
                }]);
            });

            item.chk = chk;
        });
        

        panel.$on('click', '[data-cmd]', function (event) {
            let { cmd, } = event.target.dataset;
            panel.fire('cmd', cmd, []);
        });

       
    });




    panel.on('render', function () {

        chks.forEach((item) => {
            item.chk.render(item);
        });

    });





});
