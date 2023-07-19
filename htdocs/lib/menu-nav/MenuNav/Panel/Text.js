
define.panel('MenuNav/Panel/Text', function (require, module, panel) {
    const Panel = require('@definejs/panel');

    
    return {
        create($meta) {
            let panel = new Panel(`[data-panel="${$meta.id}/Text"]`);

            let txt = null;

            let meta = {
                value: '',
            };

            panel.set('show', false);


            panel.on('init', function () {

                txt = panel.$.find('input').get(0);



                panel.$bind('input', {
                    'blur': function (event) {
                        panel.fire('blur');
                    },

                    'click': function (event) {
                        
                        let len = txt.value.length;
                        let d = txt.selectionEnd - txt.selectionStart;

                        //已全部选中，点击则取消选中，并把焦点移到最后一位字符。
                        if (d == len) {
                            txt.selectionStart = len;
                            txt.selectionEnd = len;
                        }

                    },

                    'change': function (event) {
                        let value = txt.value;


                        if (value == meta.value) {
                            return;
                        }

                        //这个语句先提前设置为原先的值。 
                        //因为：
                        //1，如果新值不正确，外面一样会显示回原值的，但外面没机会告诉本界面，所以本界面可以提前先设置回原值。
                        //2，如果正确，则由外面再切换到新值，同时也会触发事件导致本界面设置成新值。
                        txt.value = meta.value;

                        meta.value = value;

                        panel.fire('change', [value]);
                    },

                    'keyup': function (event) {
                        if (event.keyCode == 13) {
                            txt.blur();
                        }
                    },
                });

            });


            /**
            * 渲染内容。
         
            */
            panel.on('render', function (value) {

                meta.value = txt.value = value;

            });



            panel.on('show', function () {
                txt.focus();
                txt.select();

            });

            return panel.wrap({

            });
        },
    };

});
