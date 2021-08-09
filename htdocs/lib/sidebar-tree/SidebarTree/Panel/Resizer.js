

define('SidebarTree/Panel/Resizer', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const Masker = module.require('Masker');

    return {
        create($meta) {

            let panel = new Panel(`[data-panel="${$meta.id}/Resizer"]`);

            panel.set('show', false);

            panel.on('init', function () {
                let draging = false;    //表示鼠标左键是否已按下并还没释放。
                let x = 0;              //鼠标按下时的 pageX 值。
                let cursor = '';        //鼠标按下时的 cursor 指针值。
                let body = document.body;
                let div = panel.$.get(0);


                $(body).on({

                    //开始按下鼠标左键。
                    'mousedown': function (event) {
                        if (event.target !== div) {
                            return;
                        }

                        draging = true;
                        x = event.pageX;
                        cursor = body.style.cursor;
                        body.style.cursor = 'ew-resize';
                        Masker.show();

                        panel.fire('start');

                    },

                    //按住鼠标左键进行移动。
                    'mousemove': function (event) {
                        if (!draging) {
                            return;
                        }

                        let dx = event.pageX - x;   //delta width

                        panel.fire('change', [dx]);
                    },

                    //释放鼠标左键。
                    'mouseup': function (event) {
                        if (!draging) {
                            return;
                        }

                        draging = false;

                        body.style.cursor = cursor;
                        Masker.hide();
                        panel.fire('stop');

                    },


                });
            });

            /**
            * 渲染。
            *   options = {
            *   };
            */
            panel.on('render', function (options) {



            });

            return panel.wrap();
        },
    };
});

