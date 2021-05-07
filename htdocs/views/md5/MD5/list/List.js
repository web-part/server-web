

define.panel('/MD5/List', function (require, module, panel) {
    const Header = module.require('Header');
    const GridView = module.require('GridView');

    
    let meta = {
        list: [],
    };

    panel.on('init', function () {
        Header.on({
            'multi': function (checked) {
                console.log(checked);

                GridView.render(meta.list, checked);

            },
        });

        GridView.on({
            'cmd': function (cmd, item) {
                panel.fire('cmd', [cmd, item]);
            },
        });
        

    });




    panel.on('render', function (list) {
        meta.list = list;

        Header.render(false);


    });


    return {
        setHeight(h) {
            GridView.setHeight(h);
        },
    };




});
