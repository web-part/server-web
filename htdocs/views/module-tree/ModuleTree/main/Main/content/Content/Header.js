

define.panel('/ModuleTree/Main/Content/Header', function (require, module, panel) {

    const File = require('File');


    let meta = {
        file: '',
    };

    panel.on('init', function () {
       
        panel.$on('click', {
            '[data-cmd="file"]': function (event) {
                panel.fire('file', [meta.file]);
            },
        });
    });



    /**
    * 渲染。
    */
    panel.on('render', function (file) {
        let icon = File.getIcon(file);
        
        meta.file = file;

        panel.fill({
            'icon': icon.html,
            'file': file,
        });
       
       
    });


    return {

    };

});
