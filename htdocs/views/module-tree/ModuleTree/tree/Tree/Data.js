

define('/ModuleTree/Tree/Data', function (require, module, exports) {
    const MenuTree = require('MenuTree');
    const none = module.data.none;


    let meta = {
        id$node: {},
    };
    
    function getFile(id) {
        if (id === '') {
            return none;
        }

        if (id.startsWith('/')) {
            return `${none}${id}`;
        }

        return id;
    }


    return exports = {
        /**
        */
        make({ htmlStat, moduleStat, }) {

            let root = {
                id: '/',
                name: '模块树',
                open: true,
                dirIcon: {
                    close: 'fas fa-folder',
                    open: 'fas fa-folder-open',
                },
            };

            

            let file$id = {};

            let files = Object.keys(moduleStat.id$module).map((id) => {
                let file = getFile(id);

                file$id[file] = id;

                return file;
            });

            files.sort(function (a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a > b ? 1 : -1;
            });

            let list = MenuTree.parse({ root, files, }, function (item) {
                if (item.id == '/') {
                    meta.id$node['/'] = item;
                    return;
                }

                
                let file = item.id;

                if (file.endsWith('/')) {
                    file = file.slice(0, -1);
                }

                let id = file$id[file];
                let module = moduleStat.id$module[id];
                let html = htmlStat.id$module[id]; //可能为空。

                meta.id$node[id] = item;

                Object.assign(item.data, {
                    id,
                    module,
                    html,
                });

            });
            
            return list;


        },

        //
        getNode(id) { 
            return meta.id$node[id];
        },


    };


});