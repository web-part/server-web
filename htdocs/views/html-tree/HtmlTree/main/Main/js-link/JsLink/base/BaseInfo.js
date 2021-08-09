

define.panel('/HtmlTree/Main/JsLink/BaseInfo', function (require, module, panel) {
    const Base = module.require('Base');


    panel.on('init', function () {
        [
            Base,
            
        ].forEach((M) => {
            M.on({
                'file': function (file) {
                    panel.fire('file', [file]);
                },
                'id': function (id) {
                    panel.fire('id', [id]);
                },
                
            });
        });

        Base.on({
            'rel': function () {
                panel.fire('rel');
            },
        });

    });




    panel.on('render', function (item) {
        Base.render(item);
        
    });





});
