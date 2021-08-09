

define.panel('/FileList/Sidebar/Operation', function (require, module, panel) {
    const Storage = require('@definejs/local-storage');

    let meta = {
        visible: true,
    };

    let storage = null;


    panel.on('init', function () {
        storage = new Storage(module.id);
        meta.visible = storage.get('visible');

        //修正一下初始状态的值。
        if (meta.visible === undefined) {
            meta.visible = true;
        }


        panel.$.on('click', '[data-cmd]', function () {
            let cmd = this.getAttribute('data-cmd');

            if (cmd == 'detail') {
                meta.visible = !meta.visible;
                panel.refresh();
                return;
            }

            
            panel.fire('cmd', [cmd]);
        });
    });




    panel.on('render', function ({ detail, item, }) {
        let visible = meta.visible;
        let isFile = detail.type == 'file';
        let isRoot = !item.parent;

        panel.fill({
            'detail-class': visible ? 'right' : 'left',
            'open-display': isFile ? '' : 'display: none;',
            'edit-display': isFile ? '' : 'display: none;',
            'demo-display': isFile ? '' : 'display: none;',
            'delete-display': isRoot ? 'display: none;' : '',
        });

        panel.fire('detail', [visible]);
        storage.set('visible', visible);
    });





});
