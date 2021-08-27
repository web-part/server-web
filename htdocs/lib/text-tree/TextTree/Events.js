

define('TextTree/Events', function (require, module, exports) {

    const $ = require('$');

    let id$closed = {};

    //向下检查看是否有父亲节点是处于关闭状态。
    function checkParentClosed(id, id$parent) {
        let pid;
        let closed;

        do {
            pid = id$parent[id];
            closed = id$closed[pid];
            id = pid;
        }
        while (typeof pid == 'string' && !closed);
        
        return closed;
    }




    return {
        bind: function (meta) {

            let cmdSelector = `#${meta.id} [data-cmd]`;

            $(document.body).on('click', cmdSelector, function (event) {
                let { cmd, index, } = event.currentTarget.dataset;
                if (cmd == 'icon-dir') {
                    return;
                }

                index = Number(index);

                let item = meta.items[index];
                item = meta.id$item[item.id];

                meta.emitter.fire('cmd', cmd, [item]);
                meta.emitter.fire('cmd', [cmd, item]);
            });


            $(document.body).on('click', cmdSelector, function (event) {
                let { cmd, index, } = event.currentTarget.dataset;

                if (cmd != 'icon-dir') {
                    return;
                }


                let $icon = $(this);
                let item = meta.items[index];
                let { id, } = item;

                //剪头向右时，说明当明是折叠状态（即关闭状态），下一步需要展开。
                let needOpen = $icon.hasClass('closed');
                let liSelector = `#${meta.id} li[data-id^="${id}${meta.seperator}"]`;

                $icon.toggleClass('closed', !needOpen);
                id$closed[id] = !needOpen;

                console.log(id$closed)


                $(liSelector).each(function () {
                    let $li = $(this);
                  
                    //需要关闭。
                    if (!needOpen) {
                        $li.slideUp('fast');
                        return;
                    }


                    //需要打开。
                    let { id, } = this.dataset;
                    let isParentClosed = checkParentClosed(id, meta.id$parent);

                    if (isParentClosed) {
                        $li.slideUp('fast');
                    }
                    else {
                        $li.slideDown('fast');
                    }

                    
                });


                
            });
            
          



           
        },

    };
});