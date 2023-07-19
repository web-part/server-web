

define('/Home/JsModule/Main/Data', function (require, module, exports) {

    return {
        
        parse(stat) {
            let { id$module, level$ids, } = stat.moduleStat;

            let ids = Object.keys(id$module);
            let nones = [];         //空 id 的模块列表，一般只有一个，index.js 中的 launch()。
            let publics = [];       //公共模块列表。
            let privates = [];      //私有模块列表。
            let singles = [];       //单模块。
            let parents = [];       //父模块列表。

            //按定义的方式。
            let views = [];         //视图模块列表。
            let panels = [];        //面板模块列表。
            let defines = [];       //普通模块列表。

            ids.forEach((id) => {
                //启动模块，一般只有一个。
                if (!id) {
                    nones.push(id);
                    return;
                }

                let { level, children, method, } = id$module[id];
                let hasChild = children.length > 0;

                //有儿子的模块，即父模块。
                if (hasChild) {
                    parents.push(id);
                }

                if (level == 1) {
                    publics.push(id);
                    if (!hasChild) {
                        singles.push(id);
                    }
                }
                else { //二级或以上。
                    privates.push(id);
                }

                //按模块的定义方式。
                if (method.endsWith('.view')) {
                    views.push(id);
                }
                else if (method.endsWith('.panel')) {
                    panels.push(id);
                }
                else {
                    defines.push(id);
                }
               

            });


            let levels = Object.keys(level$ids).map((level) => {
                let ids = level$ids[level];

                return { level, ids, };
            });


            return {
                ids,

                nones,
                publics,
                privates,

                singles,
                parents,
            
                views,
                panels,
                defines,

                levels,
            };
        },

    };


});