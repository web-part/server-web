

define('MenuTree/Files/Init', function (require, module, exports) {
    const Tree = require('@definejs/tree');

    function add(id$list, id, value) {
        let list = id$list[id] || new Set();

        if (value !== undefined) {
            list.add(value);
        }

        id$list[id] = list;
    }


    function parseFiles(files, { dir$dirs ,dir$files,}) { 

        let tree = new Tree(files, '/');

        tree.each(function (node, index) {
            let { nodes, keys, parent, } = node;
            let id = keys.join('/');
            let pid = parent.isRoot ? '' : parent.keys.join('/');
            let name = keys.slice(-1)[0];

            //父节点。
            pid = pid + '/';

            //当前节点是一个文件。
            if (nodes.length == 0) {
                add(dir$files, pid, name);
                return;
            }

            //当前节点是一个目录。
            id = id + '/';
            add(dir$files, id); //要给每个目录都创建对应的列表，即使为空。
            add(dir$dirs, id);  //要给每个目录都创建对应的列表，即使为空。
            add(dir$dirs, pid, name);
        });


    }

    function parseDirs(dirs, { dir$dirs, dir$files, }) {

        //标准化。
        dirs = dirs.map((dir) => {
            dir = dir.replace(/\\/g, '/');  //把 '\' 换成 '/'。
            dir = dir.replace(/\/+/g, '/'); //把多个 '/' 合成一个。
            
            //此处需要去掉后缀 `/`。
            if (dir.endsWith('/')) {
                dir = dir.slice(0, -1);
            }

            return dir;
        });
        

        let tree = new Tree(dirs, '/');

        tree.each(function (node, index) {
            let { nodes, keys, parent, } = node;
            let id = keys.join('/');
            let pid = parent.isRoot ? '' : parent.keys.join('/');
            let name = keys.slice(-1)[0];

            pid = pid + '/';
            id = id + '/';

            add(dir$files, id);
            add(dir$dirs, id);
            add(dir$dirs, pid, name);
        });

    }
  



    return {
        parse({ dirs, files, }) {
            dirs = dirs || [];
            files = files || [];

            let dir$dirs = {};
            let dir$files = {};

            parseFiles(files, { dir$dirs, dir$files, });
            parseDirs(dirs, { dir$dirs, dir$files, });


            Object.entries(dir$dirs).forEach(function ([dir, dirs]) {
                dir$dirs[dir] = [...dirs].sort(); //让外面排序。
            });

            Object.entries(dir$files).forEach(function ([dir, files]) {
                dir$files[dir] = [...files].sort(); //让外面排序。
            });


            return { dir$dirs, dir$files, };
        },
    };

});