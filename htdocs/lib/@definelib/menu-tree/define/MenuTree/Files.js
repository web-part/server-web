

define('MenuTree/Files', function (require, module, exports) {
    const Init = module.require('Init');
    const List = module.require('List');


    return {
        parse(data, fnEach) {
            if (Array.isArray(data)) {
                return { list: data, };
            }

            let { root, dirs, files, } = data; //三个字段都是可选的。
            let list = [];

            if (typeof root == 'string') {
                root = {
                    id: '/',
                    type: 'dir',
                    name: root,
                    open: true,
                    data: {},
                    list: [],
                };
            }


            if (dirs || files) {
                let { dir$dirs, dir$files, } = Init.parse({ dirs, files, });

                //根目录的文件列表。
                let roots = dir$files['/'].map(function (file) {
                    return {
                        'type': 'file',
                        'name': file,
                        'id': file,
                        'data': {},
                    };
                });

                list = List.make('/', { dir$dirs, dir$files, });
                list = [...list, ...roots,];
            }

            if (root) {
                root.list = list;
                root.data = root.data || {}; //这个是必须的。
                list = [root];
            }


            if (fnEach) {
                List.each(list, fnEach);
            }
            
         
            return list;
            

            
        },
    };

});