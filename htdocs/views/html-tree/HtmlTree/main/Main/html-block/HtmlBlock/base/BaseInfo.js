

define.panel('/HtmlTree/Main/HtmlBlock/BaseInfo', function (require, module, panel) {
    const Base = module.require('Base');
    const Childs = module.require('Childs');
    const Children = module.require('Children');


    panel.on('init', function () {
        [
            Base,
            Childs,
            Children,
            
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
        console.log({ item });
        
        Base.render(item);
        Childs.render(item);

        
        if (item.children.length > item.list.length) {
            Children.render(item);
        }
        else {
            Children.hide();
        }
    });





});
