

define('DropCheckList/Events', function (require, module, exports) {
    const $ = require('$');

    



    return {
        bind: function (meta) {
            if (meta.binded) {
                return;
            }


            meta.binded = true;

            meta.$.on('click', `button`, function (event) {
                if (meta.visible) {
                    meta.masker.hide();
                }
                else {
                    meta.masker.show();
                }
            });

            //点击全选。
            meta.$.on('click', '[data-id="chk-all"]', function (event) {
                let { list, all, tpl, emitter, $list, } = meta;
                let checked = !all.checked;

                all.fill(checked);

                let html = tpl.fill('item', list);
                $list.html(html);

                emitter.fire('check', 'all', [checked, list]);
                emitter.fire('check', [list]);
            });
           
            meta.$.on('click', 'li[data-index]', function (event) {
                let { list, all, tpl, emitter, } = meta;
                let index = +this.dataset.index;
                let item = list[index];

                item.checked = !item.checked;

                all.fill();

                let html = tpl.fill('item', item, index);
                this.outerHTML = html;

                emitter.fire('check', 'item', [item, index, list]);
                emitter.fire('check', [list]);

            });

        },

    };
});