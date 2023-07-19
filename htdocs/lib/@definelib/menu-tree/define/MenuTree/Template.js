

define('MenuTree/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    const Class = module.require('Class');
    const DataSet = module.require('DataSet');
    const Style = module.require('Style');
   





    return {
        create(meta) {
           
            let tpl = new Template(meta.template);

            function fill(item, index) {
                let { id, type, list, } = item;

                //未指定类型，则自动推断。
                if (!type) {
                    type = list.length > 0 || id.endsWith('/') ? 'dir' : 'file';
                }

                let html = tpl.fill('root', type, item);

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

                    this.fix(['class', 'dataset', 'style',]);

                    let cssClass = Class.stringify(meta.class);
                    let dataset = DataSet.stringify(meta.dataset);
                    let style = Style.stringify(meta.style);
                    let roots = this.fill('root', meta.list);

                    return {
                        'id': meta.id,
                        'class': cssClass,
                        'dataset': dataset,
                        'style': style,
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
                        this.fix(['dataset', 'style',]);

                        let { current, } = meta;
                        let { open, id, list, } = item;
                        let items = list.map(fill);
                        let dirIcon = item.dirIcon || meta.dirIcon;
                        let style = Style.stringify(item.style);
                        let dataset = DataSet.stringify(item.dataset);

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
                            'empty': list.length > 0 ? '' : 'empty',
                            'style': style,
                            'dataset': dataset,
                            'ul-display': open ? '' : 'display: none;',
                            'icon': open ? dirIcon.open : dirIcon.close,
                            'items': items,
                        };
                    },

                    'file': function (item, index) {
                        this.fix(['dataset', 'style',]);

                        let { current, } = meta;
                        let { id, fileIcon, } = item;

                        let name = getName(item);
                        let style = Style.stringify(item.style);
                        let dataset = DataSet.stringify(item.dataset);


                        return {
                            'id': id,
                            'name': name,
                            'icon': fileIcon || meta.fileIcon,
                            'on': current && id == current.id ? 'on' : '',
                            'style': style,
                            'dataset': dataset,
                        };
                    },
                },
            });




            return tpl;

        },

    };
});