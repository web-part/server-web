

define('/ModuleTree/Tree/Data', function (require, module, exports) {
    const none = module.data.none;

    function sort(list) {
        let dirs = [];
        let files = [];

        //把目录节点和文件节点分类。
        list.forEach((item) => {
            let list = item.list.length > 0 ? dirs : files;
            list.push(item);
        });


        dirs.sort((a, b) => {
            return a.id > b.id ? 1 : -1;
        });

        files.sort((a, b) => {
            return a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1;
        });

        return [...dirs, ...files,];
    }

    function make(id, info) {
        let childs = info.id$childs[id] || [];
        let module = info.id$module[id];

        let list = childs.map((id) => {
            let item = make(id, info);
            return item;
        });

        list = sort(list);

        return {
            'id': id,
            'name': module.name || none,
            'open': false,
            'list': list,
            'data': {
                'id': id,
                'children': info.id$children[id],
                'childs': info.id$childs[id],
                'dependents': info.id$dependents[id],
                'file': info.id$file[id],
                'info': info.id$info[id],
                'module': info.id$module[id],
                'parent': info.id$parent[id],
                'parents': info.id$parents[id],
                'privates': info.id$privates[id],
                'publics': info.id$publics[id],
                'siblings': info.id$siblings[id],
            },
        };
    }

    


    return {
        /**
        */
        make: function (stat) {
            let info = stat.moduleStat;
            let { level$ids, } = info;

            //把一级的找出来。
            let roots = level$ids['1'].map((id) => {
                let root = make(id, info);
                return root;
            });


            roots = sort(roots);


            return [
                {
                    'id': '/',
                    'name': '模块树',
                    'open': true,
                    'dirIcon': {
                        close: 'fas fa-folder',
                        open: 'fas fa-folder-open',
                    },
                    'data': {},
                    'list': roots,
                }
            ];


        },


    };


});