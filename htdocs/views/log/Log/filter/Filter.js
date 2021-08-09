
define.panel('/Log/Filter', function (require, module, panel) {
    const Types = module.require('Types');
    const Dates = module.require('Dates');

    let meta = {
        'type$checked': null,
        'date$checked': null,
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


    


    panel.on('render', function (data) {
        
        // meta.type$checked = null;
        // meta.date$checked = null;

        Types.render(data.names);
        Dates.render(data.dates);

        panel.fire('change', [meta]);


    });

    

    return {
        
        
    };






});
