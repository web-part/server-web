

define('MenuTree/Template', function (require, module, exports) {
    const Template = require('@definejs/template');


   





    return {
        create: function (meta) {
           
            let tpl = new Template('#tpl-MenuTree');

            function fill(item, index) {
                let isDir = item.list.length > 0;
                let name = isDir ? 'dir' : 'file';
                let html = tpl.fill('root', name, item);

                return html;
            }

            function getName(item) {
                //让外面有机会自定义要展示的 name。
                let names = meta.emitter.fire('fill', 'name', [item]);
                let name = names.slice(-1)[0];

                if (name === undefined) {
                    name = item.name;
                }

                return name;
            }

            tpl.process({
                '': function () {

                    let roots = this.fill('root', meta.list);

                    return {
                        'id': meta.id,
                        'roots': roots,
                    };
                },

                'root': {
                    '': function (item, index) {
                        
                        let root = fill(item);

                        return {
                            'root': root,
                        };
                        
                    },

                    'dir': function (item) {
                        let { open, id, } = item;
                        let items = item.list.map(fill);
                        let current = meta.current;
                        let dirIcon = item.dirIcon || meta.dirIcon;

                        if (typeof dirIcon == 'string') {
                            dirIcon  = {
                                'close': dirIcon,
                                'open': dirIcon,
                            };
                        }

                        let name = getName(item);

                        return {
                            'id': id,
                            'name': name || '',
                            'open': open ? 'open' : '',
                            'on': current && id == current.id ? 'on' : '',
                            'display': open ? 'display: block;' : 'display: none;',
                            'icon': open ? dirIcon.open : dirIcon.close,
                            'items': items,
                        };
                    },

                    'file': function (item, index) {
                        let { id, fileIcon, } = item;
                        let { current, } = meta;

                        let name = getName(item);


                        return {
                            'id': id,
                            'name': name,
                            'icon': fileIcon || meta.fileIcon,
                            'on': current && id == current.id ? 'on' : '',
                        };
                    },
                },
            });




            return tpl;

        },

    };
});