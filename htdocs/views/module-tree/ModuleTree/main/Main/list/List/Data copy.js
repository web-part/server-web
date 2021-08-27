

define('/ModuleTree/Main/List/Data0', function (require, module, exports) {
    let meta = {
        item: null,
        stat: null,
    };

   
    return {
        init({ item, stat, }) {
            console.log(item);

            meta.item = item;
            meta.stat = stat;
          
            let { list, children, } = item;
            let methods = new Set();
            let levels = new Set();


            children.forEach((item) => {
                let { level, method, } = item.data.module;

                methods.add(method);
                levels.add(level);
            });

            return {
                'methods': [...methods],
                'levels': [...levels],
                'childs': list,             //直接子节点。
            };
           
        },

        filter(opt) {
            let {
                child$checked = null,
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
                id$parents,
                id$siblings,
                id$module,
            } = stat.moduleStat;

            if (typeof id == 'string') {
                ids = [id, ...children,];
            }

            let list = [];

            ids.forEach((id) => {
                let file = id$file[id];
                let htmlFile = stat.htmlStat.id$file[id];
                
                let dependents = id$dependents[id] || [];
                let childs = id$childs[id] || [];
                let children = id$children[id] || [];
                let siblings = id$siblings[id] || [];
                let publics = id$publics[id] || [];
                let privates = id$privates[id] || [];
                let parents = id$parents[id] || [];

                let module = id$module[id];
                let { level, method, } = module;

                if (typeof dependents == 'string') {
                    dependents = [dependents];
                }

                if (child$checked) {
                    let found = [id, ...parents].some((id) => {
                        return child$checked[id];
                    });

                    if (!found) {
                        return;
                    }
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
                    'htmlFile': htmlFile,
                };

                list.push(item);
            });

            return list;
        },
    };



});
