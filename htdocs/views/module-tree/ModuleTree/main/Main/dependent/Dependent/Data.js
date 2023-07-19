
define('/ModuleTree/Main/Dependent/Data', function (require, module, exports) {


    return {

        get({ item, stat, }) {

            let {
                id$module,
                level$ids,
                outer$dependents,
            } = stat.moduleStat;

            let publics = [];
            let outers = [];


            if (!item.parent) { //根节点，则是显示全部被依赖的模块。
                //过滤掉空串。
                publics = level$ids['1'].filter((id) => {
                    return !!id;
                });

                outers = Object.keys(outer$dependents);
            }
            else { //非根节点，则显示此节点所依赖的公共模块。
                publics = item.data.module.publics;
                outers = item.data.module.outers;
            }

            publics.sort(function (a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a > b ? 1 : -1;
            });

            outers.sort(function (a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a > b ? 1 : -1;
            });



            publics = publics.map((id) => {
                let $main = null;
                let $gridview = null;
                let { dependents, id$dependents, } = id$module[id];

                let list = dependents.map((id) => {
                    let { method, level, file, } = id$module[id];
                    let requires = id$dependents[id];

                    return { id, method, level, file, requires, };
                });

                return { id, list, $main, $gridview, };

            });

            outers = outers.map((id) => {
                let $main = null;
                let $gridview = null;
                let dependents = outer$dependents[id];

                let id0 = id;

                let list = dependents.map((id) => {
                    let { method, level, file, id$requires, } = id$module[id];
                    let requires = id$requires[id0];

                    return { id, method, level, file, requires, };
                });


                return { id, list, $main, $gridview, };
            });
            console.log({ publics, outers, });

            return { publics, outers, };



        },
    };
});