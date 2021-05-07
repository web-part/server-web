
define('DropList/Masker', function (require, module, exports) {
    const Masker = require('@definejs/masker');


    return {
        create: function (meta) {

            let masker = new Masker({
                'volatile': true, //易消失。
                'opacity': meta.mask,
                'container': meta.dialog,
                'position': 'absolute',     //这里用回绝对定位。
            });


            masker.on({
                'show': function () {
                    meta.$.addClass('on');
                    meta.visible = true;

                    meta.adjust();
                    meta.$table.get(0).scrollIntoViewIfNeeded(); //在对话框环境中，可能会给遮挡住了。

                    let row = meta.current.row;
                    row && row.element.scrollIntoViewIfNeeded();

                    meta.emitter.fire('focus');
                },

                'hide': function () {
                    let item = meta.old.item;
                    let isEmpty = meta.txt.value === '';

                    if (isEmpty && !meta.empty && item) {
                        meta.this.fill(meta.list);
                        meta.this.select(item);
                    }

                    //是否非法的: true 表示非法。 false 表示合法。
                    let invalid =
                          !meta.custom &&         //不允许自定义输入。
                          !meta.current.item &&   //尚未选中任何项。
                          !!meta.text;              //输入框中有内容。

                    console.log('invalid: =========  ', invalid);

                    if (invalid) {
                        meta.$txt.addClass('error');
                        
                        definejs.alert('输入的数据不存在，请重新输入。', function () {
                            meta.txt.focus();
                        });
                        return false; //返回 false 阻止 masker 关闭。
                    }



                    meta.$.removeClass('on');
                    meta.visible = false;
                    meta.emitter.fire('blur');



                    //if (invalid) {
                    //    meta.$txt.addClass('error');
                    //    meta.txt.focus();
                    //    //meta.emitter.fire('error', ['custom', '输入的数据不存在，请重新输入。']);


                    //    setTimeout(function () {
                    //        meta.txt.focus();
                    //    }, 100);

                    //    //definejs.alert('输入的数据不存在，请重新输入。', function () {
                    //    //    meta.txt.focus();

                    //    //});
                    //}
                },
               
            });


            return masker;

        },

    };
});