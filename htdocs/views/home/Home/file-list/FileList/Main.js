

define.panel('/Home/FileList/Main', function (require, module, panel) {
    const File = require('File');
    const Data = module.require('Data');

   

    panel.on('init', function () {

        panel.template({
            '': function (data) {
                let html = this.fill('html', data);
                return html;
            },

            'html': {
                '': function (data) {
                    let {
                        list,
                        dirs,
                        files,
                        images,
                        ext$files,
                        exts,
                        size,
                        utf8,
                    } = data;

                    let types = this.fill('type', exts);

                    let sizeInfo = File.getSizeDesc(size);


                    return {
                        'all': list.length,
                        'sizeValue': sizeInfo.value,
                        'sizeDesc': sizeInfo.desc,
                        'dir': dirs.length,
                        'file': files.length,
                        'image': images.length,
                        'types': types,
                        'isUTF8': utf8.is,
                        'notUTF8': utf8.not,
                    };
                },

                'type': function (item, index) {
                    let { ext, files, } = item;

                    ext = ext.slice(1) || '(none)';

                    return {
                        'ext': ext,
                        'count': files.length,
                    };
                },
            },

        });


    });


    panel.on('render', function (data) {
        data = Data.parse(data.list);
        panel.fill(data);
    });

});
