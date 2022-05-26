

define('GridView/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    const Class = module.require('Class');
    const DataSet = module.require('DataSet');
    const Style = module.require('Style');



    return {
        create(meta) {
            let tpl = new Template(meta.template);

            tpl.process({
                //填充表格。
                '': function () {
                    this.fix(['class', 'dataset', 'style',]);

                    let cssClass = Class.stringify(meta.class);
                    let dataset = DataSet.stringify(meta.dataset);
                    let style = Style.stringify(meta.style);

                    return {
                        'id': meta.id,
                        'class': cssClass,
                        'dataset': dataset,
                        'style': style,
                        'nodata': meta.nodata,
                    };
                },
               
            });

            return tpl;

        },

    };
});