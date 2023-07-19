

define.panel('/FileList/Body/Main/Tree/Header', function (require, module, panel) {
    const CheckBox = require('CheckBox');


    let chks = [
        { id: 'icon', text: '图标', chk: null,},
        { id: 'tab', text: '缩进', chk: null, },
        { id: 'color', text: '彩色', chk: null, },
        { id: 'hover', text: '悬停', chk: null, },
        { id: 'dirOnly', text: '仅目录', chk: null, },
    ];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        //把短时间内的多次触发合并成一次对外触发。
        let tid = null;
        let key$checked = {};

        function fireCheck(key, checked) { 
            clearTimeout(tid);

            key$checked[key] = checked;

            tid = setTimeout(() => {
                panel.fire('check', [key$checked]);
            }, 20);
        }

        chks.forEach((item) => {
            let { id, } = item;
            let chk = new CheckBox({
                'fireNow': true,
                'container': panel.$.find(`[data-id="chk-${id}"]`),
                'text': item.text,
            });

            chk.on('checked', function (checked) {
                if (id == 'dirOnly') {
                    panel.fire('dirOnly', [checked]);
                }
                else {
                    fireCheck(id, checked);
                }


                
            });

            item.chk = chk;
        });
        

        panel.$on('click', '[data-cmd]', function (event) {
            let { cmd, } = event.target.dataset;
            panel.fire('cmd', cmd, []);
        });

       
    });




    panel.on('render', function (id$checked) {

        chks.forEach((item) => {
            let checked = id$checked[item.id];

            item.chk.render({ checked, });
        });

    });





});
