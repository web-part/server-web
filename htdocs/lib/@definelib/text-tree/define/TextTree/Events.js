

define('TextTree/Events', function (require, module, exports) {
    const $ = require('$');
    const Status = module.require('Status');


    return {
        bind(meta) {

            meta.$.on('click', `>li [data-cmd="icon"]`, function (event) {
                let { id, } = this.dataset;
                let item = meta.id$item[id];

                if (item.childs.length == 0) {
                    return;
                }

                let $icon = $(this);
                let needOpen = $icon.hasClass('closed');
                let needClose = !needOpen;
              
                if (needClose) {
                    Status.close(item);
                }
                else {
                    Status.open(item);
                }
                
                item.closed = needClose;//此语句要在 close 或 open 之后。
                $icon.toggleClass('closed', needClose);
            });


            meta.$.on('click', `>li [data-cmd]`, function (event) {
                let { cmd, id, } = this.dataset;
                let item = meta.id$item[id];

                meta.emitter.fire('cmd', cmd, [item, event]);
                meta.emitter.fire('cmd', [cmd, item, event]);

            });

       



           
        },

    };
});