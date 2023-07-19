

define('/FileList/Tree/Data', function (require, module, exports) {
    const MenuTree = require('MenuTree');

    return {


        /**
        */
        make({ dir, dirs, files, file$info, }) {
            
            //过滤掉根目录。
            if (dirs[0] == '/') { 
                //性能优化。
                //经过排序后的 dirs 的首项就是根目录。
                dirs = dirs.slice(1);
            }
            else {
                //备用方案。
                dirs = dirs.filter((dir) => {
                    return dir != '/';
                });
            }



            let root = {
                id: '/',
                type: 'dir',
                name: dir.split('/').slice(-2, -1)[0],
                open: true,
            };


            let list = MenuTree.parse({ root, files, dirs, }, function (item, depth) {
              
                if (item.type == 'dir') {
                    return;
                }

                let { icon, } = file$info[item.id];
                
                item.fileIcon = icon.className;
            });

            return list;
        },



    };


});