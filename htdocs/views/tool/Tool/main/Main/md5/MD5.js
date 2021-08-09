

define.panel('/Tool/Main/MD5', function (require, module, panel) {
    const API = module.require('API');
    const Input = module.require('Input');
    const Output = module.require('Output');
    

    panel.on('init', function () {
       
        Input.on({
            'submit': function (content) {
                API.get(content);
            },
        });

        API.on({
            'success': function (md5) {
                Output.render(md5);
            },
        });

    });

    panel.on('render', function () {

        Input.render();

    });


    return {

    };
});