

define('/FileList/Sidebar/Operation/Data', function (require, module, exports) {
  
    let list = [
        { name: '详情', cmd: 'detail', icon: 'fas fa-angle-double-{icon}', },
        { name: '刷新', cmd: 'refresh', icon: 'fa fa-sync-alt', },
        { name: '打开', cmd: 'open', icon: 'fa fa-external-link-alt', },
        { name: '编辑', cmd: 'edit', icon: 'fa fa-edit', },
        { name: '效果', cmd: 'demo', icon: 'fas fa-desktop', },
        { name: '复制', cmd: 'copy', icon: 'far fa-copy', },
        { name: '编译', cmd: 'compile-less', icon: 'fab fa-less', },
        { name: '压缩', cmd: 'minify-js', icon: 'fab fa-node-js', },
        { name: '删除', cmd: 'delete', icon: 'fa fa-times', },
    ];

    let cmd$filter = {
        'detail': function () {
            return true;
        },
        'open': function (item) {
            return item.type == 'file';
        },
        'edit': function (item) {
            return item.type == 'file';
        },
        'demo': function (item) {
            return item.type == 'file';
        },
        'copy': function (item) {
            return item.type == 'file';
        },
        'compile-less': function (item) {
            return item.type == 'file' && item.data.ext == 'less';
        },
        'minify-js': function (item) {
            return item.type == 'file' && item.data.ext == 'js';
        },
        'delete': function (item) {
            return !!item.parent;
        },
    };









    return {
        make(item) {
            let items = list.filter(({ cmd, }) => {
                let filter = cmd$filter[cmd];

                if (filter) {
                    return filter(item);
                }

                return true;

            });

            return items;
        },
    };


});
