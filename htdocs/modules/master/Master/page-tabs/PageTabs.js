

define.panel('/Master/PageTabs', function (require, module, panel) {
    const List = module.require('List');
    const Tabs = module.require('Tabs');


    panel.on('init', function () {
        List.on({
            'change': function (list) {
                Tabs.render(list);
            },
            'remove': function (item, index) {
                Tabs.active(index - 1, true);
            },
        });


        Tabs.on({
            'active': function (item, index) {
                panel.fire('active', [item, index]);
            },
            'before-close': function (item, index) {
                let values = panel.fire('before-close', [item, index]);

                if (values.includes(false)) {
                    return false;
                }
            },

            //关闭后。
            'after-close': function (item, index) {
                List.remove(index);
                panel.fire('after-close', [item, index]);
            },
        });

    });

    


    panel.on('render', function () {
        Tabs.render([]);


    });





    return {
        open(item) {
            let index = List.index(item);
         
            //尚未存在。
            if (index < 0) {
                //在当前激活的项后面插入。
                index = Tabs.index();
                index = List.insert(index, item);
            }

            Tabs.active(index, false); //不触发事件。

        },

        //给外面手动关闭页签。
        close(id) {
            let index = List.index({ 'id': id, });

            Tabs.close(index, false);//被动关闭的，不需要触发事件。
            List.remove(index);
        },

       
       
    };


});