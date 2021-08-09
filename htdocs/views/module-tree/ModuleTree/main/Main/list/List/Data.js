

define('/ModuleTree/Main/List/Data', function (require, module, exports) {
    
    let meta = {
        item: null,
        stat: null,
    };

    return {
        init({ item, stat, }) {
            meta.item = item;
            meta.stat = stat;

            let { method$ids, level$ids, } = stat.moduleStat;
            let methods = Object.keys(method$ids);
            let levels = Object.keys(level$ids);
            

            return {
                methods,
                levels,
            };
           
        },

        filter(opt) {
            let {
                childDependent$checked = null,
                dependent$checked = null,
                level$checked = null,
                method$checked = null,

            } = opt || {};

            let { item, stat, } = meta;
            let { id, children, } = item.data;
            let {
                ids,
                id$file,
                id$dependents,
                id$children,
                id$childs,
                id$publics,
                id$privates,
                id$siblings,
                id$module,
            } = stat.moduleStat;

            if (typeof id == 'string') {
                ids = [id, ...children,];
            }

            let list = [];

            ids.forEach((id) => {
                let file = id$file[id];
                let dependents = id$dependents[id] || [];
                let childs = id$childs[id] || [];
                let children = id$children[id] || [];
                let siblings = id$siblings[id] || [];
                let publics = id$publics[id] || [];
                let privates = id$privates[id] || [];

                let module = id$module[id];
                let { level, method, } = module;

                if (typeof dependents == 'string') {
                    dependents = [dependents];
                }


                //被依赖模块数。
                if (dependent$checked) {
                    let N = dependents.length;
                      //`N=0` 没有勾选。
                    if (!dependent$checked['N=0'] && N == 0) {
                        return;
                    }

                    //`N>0` 没有勾选。
                    if (!dependent$checked['N>0'] && N > 0) {
                        return;
                    }
                }

                //所依赖私有模块数 - 直接子模块数
                if (childDependent$checked) {
                    let N = privates.length - childs.length;

                    //`N > 0` 没有勾选。
                    if (!childDependent$checked['N>0'] && N > 0) {
                        return;
                    }

                    //`N = 0` 没有勾选。
                    if (!childDependent$checked['N=0'] && N == 0) {
                        return;
                    }

                    //`N < 0` 没有勾选。
                    if (!childDependent$checked['N<0'] && N < 0) {
                        return;
                    }
                }


                if (level$checked && !level$checked[level]) {
                    return;
                }

                if (method$checked && !method$checked[method]) {
                    return;
                }


                let item = {
                    'id': id,
                    'file': file,
                    'method': method,
                    'level': level,
                    'childs': childs.length,            //直接子模块数。
                    'children': children.length,
                    'dependents': dependents.length,    //
                    'publics': publics.length,
                    'privates': privates.length,        //所依赖私有模块数。
                    'siblings': siblings.length,
                };

                list.push(item);
            });

            return list;
        },
    };



});
