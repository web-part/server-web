

define.panel('/Home/FileList/Main', function (require, module, panel) {
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
                        dirs,
                        files,
                        images,
                        types,
                        size,
                    } = data;

                    types = this.fill('type', types);
                 

                    return {
                        'all': dirs.length + files.length,
                        'sizeValue': size.value,
                        'sizeDesc': size.desc,
                        'dir': dirs.length,
                        'file': files.length,
                        'image': images.length,
                        'types': types,
                    };
                },

                'type': function (item, index) {
                    let { ext, files, } = item;

                    ext = ext|| '(无后缀)';

                    return {
                        'ext': ext,
                        'count': files.length,
                    };
                },
            },

        });


    });


    panel.on('render', function (data) {
        data = Data.parse(data);
        panel.fill(data);
    });

});
