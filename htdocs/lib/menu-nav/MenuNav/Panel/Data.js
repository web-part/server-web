
define('MenuNav/Panel/Data', function (require, module, panel) {
    const File = require('File');


    return {
        parse(opt) {
            let path = opt; //假设 opt 是 string。
            let text = '';
            let icon = null;
            let names = null;

            if (typeof opt == 'object') {
                path = opt.path;
                text = opt.text;
                icon = opt.icon;
                names = opt.names;
            }
           

            if (!text) {
                text = path;
            }

            if (!icon) {
                icon = File.getIcon(path);
            }

            if (!names) {
                names = path.split('/');

                if (path.endsWith('/')) {
                    names = names.slice(0, -1);
                }
            }


            return { names, path, text, icon, };
    


        },
    };

});
