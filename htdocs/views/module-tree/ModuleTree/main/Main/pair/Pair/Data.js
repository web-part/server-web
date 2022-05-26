

define('/ModuleTree/Main/Pair/Data', function (require, module, exports) {
    
    let meta = {
        item: null,
        stat: null,
    };

   
    return {
        /**
        *
        */
        init({ item, stat, }) {
            console.log(item);
            meta.item = item;
            meta.stat = stat;
        },

        /**
        * 
        * @param {*} opt 
        * @returns 
        */
        filter(opt = {}) {
            let {
                js$checked = null,
                html$checked = null,
            } = opt;

            let { item, stat, } = meta;
            let { moduleStat, htmlStat, } = stat;
            let { id, } = item.data;
            let ids = [...new Set([...moduleStat.ids, ...htmlStat.ids,])];
            let list = [];

            //非根节点，则要包括当前节点。
            if (item.parent) {
                let pid = `${id}/`; // id 可能为空串，此时展现为 '(app)'

                //过滤出所有的子节点。
                list = ids.filter((mid) => {
                    return mid.startsWith(pid);
                });

                list = [id, ...list];
            }
            else { //根节点。
                list = ids;
            }


            list = list.map((id) => {
                let file = moduleStat.id$file[id];
                let htmlFile = htmlStat.id$file[id];

                //所在 js 文件。
                if (js$checked) {
                    let N =
                        typeof file == 'string' ? 1 :
                        Array.isArray(file) ? file.length : 0;

                    //`N = 0` 没有勾选。
                    if (!js$checked['N=0'] && N == 0) {
                        return;
                    }

                    //`N = 1` 没有勾选。
                    if (!js$checked['N=1'] && N == 1) {
                        return;
                    }

                    //`N > 1` 没有勾选。
                    if (!js$checked['N>1'] && N > 1) {
                        return;
                    }
                }


                //所在 html 文件。
                if (html$checked) {
                    let N =
                        typeof htmlFile == 'string' ? 1 :
                            Array.isArray(htmlFile) ? htmlFile.length : 0;

                    //`N = 0` 没有勾选。
                    if (!html$checked['N=0'] && N == 0) {
                        return;
                    }

                    //`N = 1` 没有勾选。
                    if (!html$checked['N=1'] && N == 1) {
                        return;
                    }

                    //`N > 1` 没有勾选。
                    if (!html$checked['N>1'] && N > 1) {
                        return;
                    }
                }

                return {
                    'id': id,
                    'htmlFile': htmlFile,
                    'file': file,
                };
            });

           
            list = list.filter((item) => {
                return !!item;
            });

           

            return list;
        },
    };



});
