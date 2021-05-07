

define.panel('/ModuleTree/Tree/Main', function (require, module, panel) {
    const MenuTree = require('MenuTree');
    const Data = module.require('Data');
 
    let tree = null;

    let meta = {
        item: null,     //当前激活的项。
        index: -1,      //路径中下次要 push 的指针。
        list: [],       //路径历史。
    };


    panel.on('init', function () {

        function active(item) {
        
            if (item === meta.item) {
                return;
            }

            meta.index++;
            meta.list[meta.index] = item;
            meta.item = item;
         
            panel.fire('item', [item, {
                'back': meta.index > 0,
                'forward': meta.index < meta.list.length - 1,
                'up': !!(item && item.parent),
                'root': !!item.parent,
                'dirOnly': item.data.type == 'dir',
            }]);

            panel.fire(item.data.type, [item]);
        }



        tree = new MenuTree({
            'container': panel.$,
        });

        tree.on({
            'fill': function (list) {
                
            },

            //点击某一项时触发。
            'item': function (item) {
                let id = item.id;

                //空目录的指示文件。
                if (id != '/' && id.endsWith('/')) { 
                    tree.open(item.parent.id);
                    return;
                }
                
                active(item);
               
            },

            //展开复合节点时触发。
            'open': function (item) {
                active(item);
            },

            //关闭复合节点时触发。
            'close': function (item) {
                active(item);
            },

            'icon': function (icon, item) {

            },

            'delete': function (item) {
                this.open(item.parent);
            },
        });

        tree.render();
    });


    /**
    * 渲染。
    *   opt = {
    *       dir$dirs: {},   //某个目录对应的子目录列表（仅当前层级，不包括子目录的）。
    *       dir$files: {},  //某个目录对应的文件列表（仅当前层级，不包括子目录的）。
    *   };
    */
    panel.on('render', function (opt) {
        let list = Data.toTree(opt);
        console.log(list);

        meta.item = null;
        meta.list = [];
        meta.index = -1;
        meta.push = true;

        tree.fill(list);

        
    });

    return {
        open: function (id) {
            let item = tree.get(id);

            if (!item) {
                definejs.alert('不存在节点: ' + id, function () {
                    // tree.open('/(index)');
                });
                return;
            }
            
            tree.open(id);
        },

        back: function () {
            let index = meta.index - 1;
            let item = meta.list[index];

            if (!item) {
                return;
            }

            meta.index = index - 1; //后退多一步，为 push 做准备。
            this.open(item);
        },

        forward: function () {
            let index = meta.index + 1;
            let item = meta.list[index];

            if (!item) {
                return;
            }

            this.open(item);
        },

        up: function () {
            let item = meta.item;
            let parent = item ? item.parent : null;

            if (!parent) {
                return;
            }

            this.open(parent);
        },

        root: function () {
            this.open('/');
        },

        dirOnly: function (checked) {
            panel.$.toggleClass('dir-only', !!checked);
        },
    };


});