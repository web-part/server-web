

define('DropList/Template', function (require, module) {
    const Template = require('@definejs/template');


    return {

        create: function (meta) {

            let tpl = new Template('#tpl-DropList');


            tpl.process({
                '': function () {

                    //因为原 html 中的 sample 给处理后 没有等号的属性值会给替换成有空值的属性值。
                    //如 {readonly} 会给替换成 {readonly}=""，这不是我们想要的。
                    //这里我们手动替换回来。
                    this.fix(['maxlength', 'readonly', 'disabled', 'tabIndex']);

                    let tabIndex = meta.tabIndex;
                    let maxLength = meta.maxLength;

                    tabIndex = tabIndex ? 'tabindex="' + tabIndex + '"' : '';
                    maxLength = maxLength ? 'maxlength="' + meta.maxLength + '"' : '';

                    return {
                        'txtId': meta.txtId,
                        'tableId': meta.tableId,
                        'text': meta.text,
                        'readonly': meta.readonly ? 'readonly' : '',
                        'disabled': meta.disabled ? 'disabled' : '',

                        'tabindex': tabIndex,
                        'maxlength': maxLength,

                    };
                },

            });


            return tpl;
        },
    };



});

