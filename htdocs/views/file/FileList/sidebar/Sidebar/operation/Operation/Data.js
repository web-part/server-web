

define('/FileList/Sidebar/Operation/Data', function (require, module, exports) {
  
    let copyExts = [
        '.css',
        '.less',
        '.sass',
        '.html',
        '.htm',
        '.txt',
        '.json',
        '.js',
        '.md',
    ];

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
        'open': function ({ detail, }) {
            return detail.type == 'file';
        },
        'edit': function ({ detail, }) {
            return detail.type == 'file';
        },
        'demo': function ({ detail, }) {
            return detail.type == 'file';
        },
        'copy': function ({ detail, }) {
            return detail.type == 'file' && copyExts.includes(detail.ext);
        },
        'compile-less': function ({ detail, }) {
            return detail.type == 'file' && detail.ext == '.less';
        },
        'minify-js': function ({ detail, }) {
            return detail.type == 'file' && detail.ext == '.js';
        },
        'delete': function ({ item, }) {
            return !!item.parent;
        },
    };









    return {
        make(opt) {
            let items = list.filter((item) => {
                let { cmd, } = item;
                let filter = cmd$filter[cmd];

                if (filter) {
                    return filter(opt);
                }

                return true;

            });

            return items;
        },
    };


});
