
define('ModuleStat/Require', function (require, module, exports) {
    const $Array = require('@definejs/array');

    module.exports = {
        parse(id, requires) {

            let id$requires = {};
            let outers = [];    //所依赖的外部公共模块。
            let publics = [];   //所依赖的内部公共模块。
            let privates = [];  //所依赖的内部私有模块。


            requires.publics.map((item) => {
                let { id, } = item;

                $Array.add(id$requires, id, item);

                if (id.includes('/')) {
                    outers.push(id);
                }
                else {
                    publics.push(id);
                }
            });

            requires.privates.map((item) => {
                let sid = `${id}/${item.id}`
                privates.push(sid);

                $Array.add(id$requires, sid, item);
            });


            return { privates, publics, outers, id$requires, };


        },
    };
});