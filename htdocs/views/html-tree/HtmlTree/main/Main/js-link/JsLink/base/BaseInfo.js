

define.panel('/HtmlTree/Main/JsLink/BaseInfo', function (require, module, panel) {
    const Base = module.require('Base');


    panel.on('init', function () {
        Base.on({
            'rel': function () {
                panel.fire('rel');
            },
            'file': function (file) {
                panel.fire('file', [file]);
            },
            'id': function (id) {
                panel.fire('id', [id]);
            },
        });

    });




    panel.on('render', function (item) {
        Base.render(item);
        
    });





});
