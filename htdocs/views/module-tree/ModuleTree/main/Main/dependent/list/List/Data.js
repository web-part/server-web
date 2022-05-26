
define('/ModuleTree/Main/Dependent/List/Data', function (require, module, exports) {

    function checkValid(id) {
        if (!id) {
            return false;
        }

        if (id.startsWith('@')) {
            return true;
        }

        if (id.includes('/')) {
            return false;
        }

        return true;
    }



    return {

        get({ item, stat, }) {
            let { id, } = item.data;

            let {
                ids,
                id$file,
                id$dependents,
                id$module,
            } = stat.moduleStat;



            let list = [];
           

            //非根节点，则显示此节点所依赖的公共模块。
            if (typeof id == 'string') {
                list = item.data.publics;
            }
            else { //根节点，则是显示全部被依赖的模块。
                let keys = Object.keys(id$dependents);
                list = [...ids, ...keys,];
                list = [...new Set(list)];
            }

            list = list.sort();

          

            list = list.map((id) => {
                if (!checkValid(id)) {
                    return null;
                }

                let module = id$module[id];
                let list = id$dependents[id]; //可能是一个空串。

                if (typeof list == 'string') {
                    list = [list];
                }

                //要放在判断 list 是否为 string 的后面。
                //因为 list 可能为一个空串(definejs.launch()定义的模块)。
                list = list || [];

                list = list.map((id) => {
                    let module = id$module[id];
                    let item = {
                        'id': id,
                        'file': id$file[id],
                        'method': module.method,
                        'level': module.level,
                    };

                    return item;

                });

                let found =
                    Array.isArray(module) ? 'more' :
                    id.startsWith('@') ? 'namespace' :
                    module ? '1' : '0';
                    

                return {
                    'id': id,
                    'module': module,
                    '$main': null,
                    '$gridview': null,
                    'found': found,
                    'list': list,
                };
            });

            let publics = [];
            let namespaces = [];

            list.forEach((item) => {
                if (!item) {
                    return;
                }

                if (item.id.startsWith('@')) {
                    namespaces.push(item);
                }
                else {
                    publics.push(item);
                }
            });

            // list = [...namespaces, ...publics,];
            list = [...publics, ...namespaces, ];

            return list;
        },
    };
});