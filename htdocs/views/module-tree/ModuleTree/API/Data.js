
define('/ModuleTree/API/Data', function (require, module, exports) {
    const $Object = require('@definejs/object');
    const none = module.data.none;


    function format(id$list) {
        let id$items = {};

        function pad(id) {
            if (id === '') {
                return `/${none}`;
            }

            if (id.startsWith('/') && id.length > 1) {
                return `/${none}${id}`;
            }

            if (id != '/') {
                return `/${id}`;
            }

            return id;
        }

        $Object.each(id$list, function (id, list) {
            id = pad(id);

            list = list.map(function (id) {
                
                if (id === '') {
                    id = none;
                }
                return id;
            });

            id$items[id] = list;
        });

        return id$items;
    }

    function checkIsDir(id$childs, id) {
        let childs = id$childs[id];
        let isDir = !!childs;

        return isDir;
    }




    return {
        make(data) {
            let { moduleStat, } = data;
            let { id$childs, id$parent, id$module, } = moduleStat;

            let dir$dirs = {
                '/': [],
            };

            let dir$files = {
                '/': [],
            };

            $Object.each(id$parent, function (id, parent) {
                if (parent || parent === '') {
                    return;
                }

                let isDir = checkIsDir(id$childs, id);

                if (isDir) {
                    dir$dirs['/'].push(id);
                }
                else {
                    dir$files['/'].push(id);
                }
            });


            $Object.each(id$childs, function (id, childs) {
                let dirs = [];
                let files = [];

                childs.forEach(function (id) {
                    let isDir = checkIsDir(id$childs, id);
                    let list = isDir ? dirs : files;
                    let { name, } = id$module[id];

                    list.push(name);
                });

                dir$dirs[id] = dirs;
                dir$files[id] = files;
            });

            dir$dirs = format(dir$dirs);
            dir$files = format(dir$files);

            return {
                dir$dirs,
                dir$files,
                root: '模块树',
            };
        },
    };
});