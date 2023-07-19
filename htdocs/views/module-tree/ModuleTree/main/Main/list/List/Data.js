

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
                keyword = '',
                child$checked = null,
                childDependent$checked = null,
                dependent$checked = null,
                level$checked = null,
                method$checked = null,
                html$checked = null,
            } = opt;

            let { item, stat, } = meta;
            let list = item.children;

            //非根节点，则要包括当前节点。
            if (item.parent) {
                list = [item, ...list];
            }

            list = list.map((item) => {
                let { id, module, html, } = item.data;
                let htmlFile = html ? html.file : '';

                let {
                    file,
                    level,
                    method,
                    children = [],
                    childs = [],
                    dependents = [],
                    parents = [],
                    privates = [],
                    publics = [],
                    siblings = [],
                } = module;




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


                if (level$checked && !level$checked[level]) {
                    return;
                }

                if (method$checked && !method$checked[method]) {
                    return;
                }

                //所在 html 文件。
                if (html$checked) {
                    let N = htmlFile ? 1 : 0;

                    //`N = 0` 没有勾选。
                    if (!html$checked['N=0'] && N == 0) {
                        return;
                    }

                    //`N = 1` 没有勾选。
                    if (!html$checked['N=1'] && N == 1) {
                        return;
                    }

                }

                return {
                    id,
                    method,
                    level,
                    file,
                    htmlFile,
                    'name': module.name,
                    'dependents': dependents.length,    //
                    'childs': childs.length,            //直接子模块数。
                    'children': children.length,
                    'publics': publics.length,
                    'privates': privates.length,        //所依赖私有模块数。
                    'siblings': siblings.length,
                };
            });

           
            list = list.filter((item) => {
                if (!item) {
                    return false;
                }

                let { id, file, htmlFile, } = item;

                if (keyword) {
                    let includes =
                        id.includes(keyword) ||
                        file.includes(keyword) ||
                        htmlFile.includes(keyword);
                    
                    return includes;
                }
                
                return true;
            });

           

            return list;
        },
    };



});
