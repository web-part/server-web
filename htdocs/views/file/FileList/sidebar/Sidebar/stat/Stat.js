

define.panel('/FileList/Sidebar/Stat', function (require, module, panel) {
    const File = require('File');
    const $Date = require('@definejs/date');
    const Types = module.require('Types');


    panel.on('init', function () {
    

        panel.template({
            '': function (data) {
                let table = this.fill('table', data);
                return table;
            },

            'table': {
                '': function (data) {
                    let { stat, type, name, } = data;
                    let desc = type == 'dir' ? '目录' : data.ext.slice(1) + ' 文件';
                    let birthtime = $Date.format(stat.birthtime, 'yyyy-MM-dd HH:mm:ss');
                    let mtime = $Date.format(stat.mtime, 'yyyy-MM-dd HH:mm:ss');
                    let size = File.getSizeDesc(stat.size);
                    let types = Types.get(data.list);
                    let sname = name.split('/').slice(-1)[0];
                    let root = data.root.slice(0, -1);
                    
                    types = this.fill('type', types);

                    return {
                        'sname': sname,
                        'name': root + name,
                        'ext': data.ext,
                        'md5': data.md5,
                        'size': size.value,
                        'sizeDesc': size.desc,
                        'birthtime': birthtime,
                        'mtime': mtime,
                        'type': desc,
                        'types': types,
                    };
                },

                'type': function (item, index) {
                    return {
                        'name': item.name,
                        'value': item.value,
                        'desc': item.desc || '',
                        'class': item.class || '',
                    };

                },
            },
        });
    });




    panel.on('render', function (data) {
        
        panel.fill(data);

        panel.$.toggleClass('dir', data.type == 'dir');
    });





});
