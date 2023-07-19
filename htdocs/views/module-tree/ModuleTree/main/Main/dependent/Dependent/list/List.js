

define.panel('/ModuleTree/Main/Dependent/List', function (require, module, panel) {
    const $ = require('$');
    const Data = module.require('Data');
    const GridView = module.require('GridView');



    let meta = {
        list: [],
    };

    panel.on('init', function () {

        panel.template({
            '': function ({ list, }) {
                if (!list.length) {
                    return this.fill('none', {});
                }

                return this.fill('item', list);
            },

            'item': {
                '': function (item, index) {
                    let total = item.list.length;
                    let tip = this.fill('tip', { total, });

                    return {
                        'no': index,
                        'id': item.id,
                        'total': total,
                        'tip': tip,
                    };
                },

                'tip': function ({ total, }) {
                    let tip =
                        total == 0 ? '该模块没有被任何模块依赖' : '';
                    
                    return tip ? { tip, } : '';
                 
                    
                },

            },
        });

        panel.$on('click', {
            'li[data-no] h3': function (event) {
                let li = this.parentNode.parentNode;
                let { no, } = li.dataset;
                let $li = $(li);
                let item = meta.list[no];
              

                $li.toggleClass('on');

                //已填充，直接展开。
                if (item.$gridview) {
                    item.$main.slideToggle('fast');
                    return;
                }


                //首次填充。
                item.$main = $li.find(`[data-id="main"]`);
                item.$gridview = $li.find(`[data-id="gridview"]`);


                GridView.render({
                    'container': item.$gridview,
                    'list': item.list,

                    'cmdClick': function (cmd, cell) {
                        panel.fire('cmd', [cmd, cell.row.item]);
                    },
                });
               
                setTimeout(() => {
                    item.$main.slideDown('fast');
                }, 100);

            },

            '[data-cmd="id"]': function (event) {
                let id = this.innerText;
                let { cmd, } = this.dataset;
                panel.fire('cmd', [cmd, { id, }]);
            },

           
        });

    });



 



    panel.on('render', function (list) {
        meta.list = list;

        panel.fill({ list, });
        

    });


    panel.on('show', function () { 
        panel.fire('show', [meta.list]);
    });




});
