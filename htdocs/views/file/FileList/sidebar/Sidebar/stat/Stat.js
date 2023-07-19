

define.panel('/FileList/Sidebar/Stat', function (require, module, panel) {
    const Types = module.require('Types');

    panel.on('init', function () {
    

        panel.template({
            '': function (data) {
                let table = this.fill('table', data);
                return table;
            },

            'table': {
                '': function (item) {
                    let { type, name, data, } = item;
                    let { ext, size, md5, birthtime, mtime, } = data;
                    let desc = type == 'dir' ? '目录' :  `${ext} 文件`;
                    let types = Types.get(item);
                    
                    types = this.fill('type', types);

                    return {
                        name,
                        ext,
                        md5,
                        birthtime,
                        mtime,

                        'sizeValue': size.value,
                        'sizeDesc': size.desc,
                        'type': desc,
                        'types': types,
                    };
                },

                'type': function (item, index) {
                    return {
                        'name': item.name,
                        'value': item.value,
                        'desc': item.desc,
                        'value1': item.value1,
                        'desc1': item.desc1,
                        'class': item.class,

                    };

                },
            },
        });
    });




    panel.on('render', function (item) {
        
        panel.fill(item);

        panel.$.toggleClass('dir', item.type == 'dir');
    });





});
