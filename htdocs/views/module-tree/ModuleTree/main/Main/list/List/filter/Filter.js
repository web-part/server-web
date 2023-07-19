
define.panel('/ModuleTree/Main/List/Filter', function (require, module, panel) {
    const Keyword = module.require('Keyword');
    const Fields = module.require('Fields');
    const Childs = module.require('Childs');
    const ChildDependents = module.require('ChildDependents');
    const Dependents = module.require('Dependents');
    const Levels = module.require('Levels');
    const Methods = module.require('Methods');
    const HtmlFile = module.require('HtmlFile');


    let meta = {
        keyword: '',
        field$checked: null,
        child$checked: null,
        childDependent$checked: null,
        dependent$checked: null,
        level$checked: null,
        method$checked: null,
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

        Keyword.on({
            'change': function (keyword) {
                meta.keyword = keyword;
                fireChange();
            },
        });

        Fields.on({
            'check': function (list) {
                meta.field$checked = make(list);
                fireChange();
            },
        });

        Childs.on({
            'check': function (list) {
                meta.child$checked = make(list);
                fireChange();
            },
        });


        ChildDependents.on({
            'check': function (list) {
                meta.childDependent$checked = make(list);
                fireChange();
            },
        });

        Dependents.on({
            'check': function (list) {
                meta.dependent$checked = make(list);
                fireChange();
            },
        });

        Levels.on({
            'check': function (list) {
                meta.level$checked = make(list);
                fireChange();
            },
        });


        Methods.on({
            'check': function (list) {
                meta.method$checked = make(list);
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



    panel.on('render', function (data, fields) {
        // Fields.render(fields); //暂时隐藏，因为 gridview 还没实现显示/隐藏指定的列。
        
        Keyword.render();
        Childs.render(data.childs);
        ChildDependents.render();
        Dependents.render();
        Levels.render(data.levels);
        Methods.render(data.methods);

        HtmlFile.render();



    });

    

    return {
        
        
    };






});
