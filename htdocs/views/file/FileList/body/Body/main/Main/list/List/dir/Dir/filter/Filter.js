
/*
* 
*/
define.panel('/FileList/Body/Main/List/Dir/Filter', function (require, module, panel) {
    const Name = module.require('Name');
    const CWD = module.require('CWD');
    const Files = module.require('Files');
    const Dirs = module.require('Dirs');
    const ChildDirs = module.require('ChildDirs');


    //当前选中的数据字段。
    let meta = {
        name: '',
        cwd: false, //是否仅限当前目录。
        files$checked: null,
        dirs$checked: null,
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

        CWD.on({
            'change': function (checked) {
                change({ 'cwd': checked, });
            },
        });

        Files.on({
            'check': function (list) {
                change({
                    'files$checked': make(list),
                });
            },
        });

        Dirs.on({
            'check': function (list) {
                change({
                    'dirs$checked': make(list),
                });
            },
        });

        ChildDirs.on({
            'check': function (list) {
                console.log(list)
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

        Name.render();
        CWD.render(meta.cwd);
        Files.render();
        Dirs.render();
    });



});



