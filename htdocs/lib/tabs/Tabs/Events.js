

define('Tabs/Events', function (require, module, exports) {
    const $ = require('$');



    return {
        bind(meta) {

            //点击菜单项。
            meta.$.on('click', 'li[data-index]', function (event) {
                let li = this;
                let { index, } = li.dataset;

                meta.this.active(+index);
                

            });

            
            // //绑定动画结束事件。
            // meta.$.on('transitionend', function (event) {
            //     console.log(event);

            //     //忽略掉内部的子节点冒泡上来的动画结束事件。 
            //     if (event.target !== this) {
            //         return;
            //     }

            //     let { index, } = meta;
            //     let item = meta.list[index];
            //     meta.emitter.fire('change', [item, index]);

            //     event.stopPropagation();
              
            // });

        },

    };
});