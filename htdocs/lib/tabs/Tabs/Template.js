

define('Tabs/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    const Class = module.require('Class');
    const DataSet = module.require('DataSet');
    const Style = module.require('Style');
   





    return {
        create(meta) {
           
            let tpl = new Template(meta.template);

           

            tpl.process({
                '': function () {

                    this.fix(['class', 'dataset', 'style',]);

                    let cssClass = Class.stringify(meta.class);
                    let dataset = DataSet.stringify(meta.dataset);
                    let style = Style.stringify(meta.style);
                    let items = this.fill('item', meta.list);

                    return {
                        'id': meta.id,
                        'class': cssClass,
                        'dataset': dataset,
                        'style': style,
                        'items': items,
                    };
                   
                },

                'item': {
                    '': function (item, index) {
                        let { name, icon, } = item;
                       
                        icon = this.fill('icon', item);

                        return {
                            index,
                            name, 
                            icon,
                        };
                    },
                    'icon': function ({ icon, }) { 
                        return icon ? { icon, } : '';
                    },
                },
            });




            return tpl;

        },

    };
});