

define.panel('/FileList/Sidebar/Operation', function (require, module, panel) {
    const Storage = require('@definejs/local-storage');
    const $String = require('@definejs/string');
    const Data = module.require('Data');

    let meta = {
        visible: true,
        list: [],
    };

    let storage = null;
 



    panel.on('init', function () {
        storage = new Storage(module.id);
        meta.visible = storage.get('visible');

        //修正一下初始状态的值。
        if (meta.visible === undefined) {
            meta.visible = true;
        }


        panel.$on('click', {
            'li[data-index]': function (event) {
                let { index, } = this.dataset;
                let item = meta.list[index];
                let { cmd, } = item;

                if (cmd == 'detail') {
                    meta.visible = !meta.visible;
                    panel.refresh();
                    return;
                }

                panel.fire('cmd', [cmd]);
            },
        });
       

        panel.template(function (item, index) {
            let { cmd, icon, } = item;

            if (cmd == 'detail') {
                icon = $String.format(icon, {
                    'icon': meta.visible ? 'right' : 'left',
                });
            }

            return {
                'index': index,
                'cmd': cmd,
                'icon': icon,
                'name': item.name,
            };
        });
    });




    panel.on('render', function (item) {
        let visible = meta.visible;
        let list = meta.list = Data.make(item);

        panel.fill(list);
        panel.fire('detail', [visible]);
        storage.set('visible', visible);
    });





});
