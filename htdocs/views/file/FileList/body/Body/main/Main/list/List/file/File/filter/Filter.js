
/*
* 
*/
define.panel('/FileList/Body/Main/List/File/Filter', function (require, module, panel) {
    const Type = module.require('Type');
    const Name = module.require('Name');
    const OnlyCurrent = module.require('OnlyCurrent');
    const MD5 = module.require('MD5');
    const ChildDirs = module.require('ChildDirs');


    //当前选中的数据字段。
    let meta = {
        name: '',
        onlyCurrent: false, //是否仅限当前目录。
        ext$checked: null,
        md5$checked: null,
        childDirs: null,         //选中的直接子目录。 如果非空，则为一个数组。
    };



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        let tid = null;

        function change(item) {
            Object.assign(meta, item);

            //把短时间内的多次 change 合并成一次对外触发。
            clearTimeout(tid);

            tid = setTimeout(function () {
                panel.fire('change', [meta]);
            }, 100);
        }


        function make(list) {
            let key$checked = {};

            list.forEach((item) => {
                key$checked[item.value] = item.checked;
            });

            return key$checked;
        }

       
        Name.on({
            'change': function (name) {
                change({ 'name': name, });
            },
        });

        OnlyCurrent.on({
            'change': function (checked) {
                change({ 'onlyCurrent': checked, });
            },
        });


        Type.on({
            'check': function (list) {
                change({
                    'ext$checked': make(list),
                });
            },
        });


        MD5.on({
            'check': function (list) {
                change({
                    'md5$checked': make(list),
                });
            },
        });

        ChildDirs.on({
            'check': function (list) {
                change({
                    'childDirs': list,
                });
            },
        });

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (item) {
        ChildDirs.render(item);
        Type.render(item);
        OnlyCurrent.render(meta.onlyCurrent);
        Name.render();
        MD5.render();

       

    });



});



