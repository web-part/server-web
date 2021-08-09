

define.panel('/HtmlTree/Main/HtmlBlock/BaseInfo/Children', function (require, module, panel) {

    const GridView = module.require('GridView');

    panel.set('show', false);


    panel.on('init', function () {
        
        GridView.on({
            'cmd': function (cmd, item) {
                let value = item[cmd];      //cmd 为 `id`、`file`。
                panel.fire(cmd, [value]);
            },
        });

    });




    panel.on('render', function (node) {


        let list = node.children.map((node) => {
            let { data, } = node;
            // let lines = data.link.content.split('\n');


            return {
                'id': node.id,
                'name': `${node.cid} - ${node.name}`,
                'file': data.file,
                // 'lines': lines.length,
                'list': node.list.length,
            };
        });

        
        GridView.render(list);
        panel.show();
    });





});
