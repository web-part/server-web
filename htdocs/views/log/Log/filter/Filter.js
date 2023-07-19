
define.panel('/Log/Filter', function (require, module, panel) {
    const Types = module.require('Types');
    const Dates = module.require('Dates');

    let meta = {
        type$checked: {},
        date$checked: {},
    };

    panel.on('init', function () {
        function make(list) {
            let key$checked = {};

            list.forEach((item) => {
                key$checked[item.value] = item.checked;
            });

            return key$checked;
        }
        
        Types.on({
            'check': function (list) {
                meta.type$checked = make(list);

                panel.fire('change', [meta]);
            },
        });

        Dates.on({
            'check': function (list) {
                meta.date$checked = make(list);

                panel.fire('change', [meta]);
            },
        });
  
    });


    


    panel.on('render', function ({ dates, types, }) {
        let type$checked = meta.type$checked = {};
        let date$checked = meta.date$checked = {};


        dates.forEach((date) => { 
            date$checked[date] = true;
        });

        types.forEach((type) => {
            type$checked[type] = true;
        });

        Types.render(types, type$checked);
        Dates.render(dates, date$checked);

        panel.fire('change', [{ type$checked, date$checked, }]);


    });

    

    return {
        
    };






});
