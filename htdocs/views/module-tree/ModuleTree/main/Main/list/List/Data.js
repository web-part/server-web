

define('/ModuleTree/Main/List/Data', function (require, module, exports) {
    
    let meta = {
        item: null,
        stat: null,
    };

   
    return {
        /**
        *
        */
        init({ item, stat, }) {
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

        /**
        * 
        * @param {*} opt 
        * @returns 
        */
        filter(opt = {}) {
            let {
                child$checked = null,
                childDependent$checked = null,
                dependent$checked = null,
                level$checked = null,
                method$checked = null,
            } = opt;

            let { item, stat, } = meta;
            let list = item.children;

            //非根节点，则要包括当前节点。
            if (item.parent) {
                list = [item, ...list];
            }

            list = list.map((item) => {
                let {
                    id,
                    file,
                    module,
                    children = [],
                    childs = [],
                    dependents = [],
                    parents = [],
                    privates = [],
                    publics = [],
                    siblings = [],
                } = item.data;

                let htmlFile = stat.htmlStat.id$file[id];

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
                    let N = privates.length -childs.length;

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


                if (level$checked && !level$checked[module.level]) {
                    return;
                }

                if (method$checked && !method$checked[module.method]) {
                    return;
                }

                return {
                    'id': id,
                    'method': module.method,
                    'level': module.level,
                    'htmlFile': htmlFile,
                    'dependents': dependents.length,    //

                    'file': file,
                    'childs': childs.length,            //直接子模块数。
                    'children': children.length,
                    'publics': publics.length,
                    'privates': privates.length,        //所依赖私有模块数。
                    'siblings': siblings.length,
                };
            });

           
            list = list.filter((item) => {
                return !!item;
            });

           

            return list;
        },
    };



});
