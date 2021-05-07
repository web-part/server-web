
define('Dialog/Events', function (require, module, exports) {
    const $ = require('$');







    return {
        bind: function (meta) {

            //响应回车键。
            let name$fn = {
                'keyup': function (event) {
                    if (event.keyCode != 13 || !meta.visible) {
                        return;
                    }

                    event.stopPropagation();
                    meta.emitter.fire('enter', [event]);
                },
            };


            $(document.body).on(name$fn);
            $('#' + meta.id).on(name$fn);



            $('#' + meta.headerId).on('click', 'i', function () {
                meta.this.close();
            });


            $('#' + meta.footerId).on('click', 'button[data-index]', function () {
                let index = +this.getAttribute('data-index');
                let item = meta.footer.buttons[index];
                let name = item.name || String(index);

                meta.emitter.fire('button', name, [item, index]);
                meta.emitter.fire('button', [item, index]);

                // item.autoClosed 优先级高于 meta.autoClosed
                let autoClose = 'autoClose' in item ?
                        item.autoClose :
                        meta.autoClose;

                if (autoClose) {
                    meta.this.close(true);
                }
            });



        },

    };
});