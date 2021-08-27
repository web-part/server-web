
define.panel('/ModuleTree/Main/Pair/Filter', function (require, module, panel) {
    const JsFile = module.require('JsFile');
    const HtmlFile = module.require('HtmlFile');

    let meta = {
        js$checked: null,
        html$checked: null,
    };

    panel.on('init', function () {
        let tid = null;

        //防抖。
        function fireChange() {
            if (tid) {
                clearTimeout(tid);
            }

            tid = setTimeout(function () {
                panel.fire('change', [meta]);
            }, 200);
        }


        function make(list) {
            let key$checked = {};

            list.forEach((item) => {
                key$checked[item.value] = item.checked;
            });

            return key$checked;
        }
       

        JsFile.on({
            'check': function (list) {
                meta.js$checked = make(list);
                fireChange();
            },
        });

        HtmlFile.on({
            'check': function (list) {
                meta.html$checked = make(list);
                fireChange();
            },
        });

  
    });



    panel.on('render', function (data) {
        
        JsFile.render();
        HtmlFile.render();
        


    });

    

    return {
        
        
    };






});
