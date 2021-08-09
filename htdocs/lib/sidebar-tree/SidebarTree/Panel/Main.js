

define('SidebarTree/Panel/Main', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const MenuTree = require('MenuTree');


    return {
        create($meta) {
            let panel = new Panel(`[data-panel="${$meta.id}/Main"]`);

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
                        'dirOnly': item.list.length > 0,
                    }]);

                    panel.fire(item.data.type, [item]);
                }



                let config = { 'container': panel.$, };
                let { fileIcon, dirIcon, } = $meta;

                if (fileIcon) {
                    config.fileIcon = fileIcon;
                }
                
                if (dirIcon) {
                    config.dirIcon = dirIcon;
                }

                tree = new MenuTree(config);

                tree.on({
                    //点击某一项时触发。
                    'item': function (item) {
                        let id = item.id;

                        //空目录的指示文件。
                        if (id != '/' && id.endsWith('/')) {
                            tree.open(item.parent.id);
                        }
                        else {
                            active(item);
                        }
                    },
                    'fill': {
                        'name': function (item) {
                            let names = panel.fire('fill', 'name', [item]);
                            return names.slice(-1)[0];
                        },
                    },

                });

            });


            /**
            * 渲染。
            */
            panel.on('render', function (list) {

                meta.item = null;
                meta.list = [];
                meta.index = -1;

                tree.render(list);


            });

            
            return panel.wrap({
                open: function (id) {
                    tree.open(id);
                },

                back: function () {
                    let index = meta.index - 1;
                    let item = meta.list[index];

                    if (!item) {
                        return;
                    }

                    meta.index = index - 1; //后退多一步，为 push 做准备。
                    this.open(item.id);
                },

                forward: function () {
                    let index = meta.index + 1;
                    let item = meta.list[index];

                    if (!item) {
                        return;
                    }

                    this.open(item.id);
                },

                up: function () {
                    let item = meta.item;
                    let parent = item ? item.parent : null;

                    if (!parent) {
                        return;
                    }

                    this.open(parent.id);
                },

                root: function () {
                    this.open(1); //cid 从 1 开始。
                },

                dirOnly: function (checked) {
                    panel.$.toggleClass('dir-only', !!checked);
                },
            });

           

        },
    };

});