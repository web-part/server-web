

define.panel('/FileList/Main/Tree/Main', function (require, module, panel) {
    const TextTree = require('TextTree');
    const Clipboard = require('Clipboard');
 
    let tree = null;

    let meta = {
        $view: null,
    };

    function setHeight($view) {
        if ($view) {
            meta.$view = $view;
        }
        
        if (!meta.$view) {
            return;
        }

        let h = meta.$view.height();
        panel.$.height(h - 139);
    }



    panel.on('init', function () {
        tree = new TextTree({
            'container': panel.$,
            // 'secondaryKey': 'id',   //如果不指定，则不生成对应的 html 内容。
        });

        tree.on('cmd', function (cmd, item) {
            panel.fire('cmd', [cmd, item,]);
        });

        $(window).on('resize', function (event) {
            setHeight();
        });
    });

   


    panel.on('render', function (opt) {
        let { id, list, $view, } = opt;

        tree.render(list);

        if (typeof id == 'string') {
            tree.highlight(id);
        }

        setHeight($view);

        panel.fire('render');


    });


    return {
        
        check(opt) {
            tree.toggle(opt);
        },

        copy() {
            let value = tree.toString();
            Clipboard.copy(value);
        },
        
    };



});
