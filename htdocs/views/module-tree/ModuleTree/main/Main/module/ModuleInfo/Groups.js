

define.panel('/ModuleTree/Main/ModuleInfo/Groups', function (require, module, panel) {

    const GridView = module.require('GridView');


    function click(cmd, item) {
        let value = item[cmd];      //cmd 为 `id`、`file`。
        panel.fire(cmd, [value]);
    }

    let list = [
        { name: '被依赖的模块', key: 'dependents', },
        { name: '所依赖的公共模块', key: 'publics', },
        { name: '所依赖的私有模块', key: 'privates', },
        { name: '直接子模块', key: 'childs', },
        { name: '全部子模块', key: 'children', },
        { name: '兄弟模块', key: 'siblings', },
    ];


    panel.on('init', function () {

        panel.template({
            '': function ({ groups, }) {
                groups = this.fill('group', groups);
                return { groups, };
            },

            'group': function ({ name, }, index) {
                return { name, index, };
            },
        });


    });




    panel.on('render', function ({ item, stat, }) {
        let { module, } = item.data;
        let { id$module, } = stat.moduleStat;

        let groups = list.map(({ name, key, }) => {
            let list = module[key].map((id) => {
                return id$module[id];
            });

            return { name, list, };
        });

        panel.fill({ groups, });


        
        groups.forEach(({ list, }, index) => {
            let container = panel.$.find(`[data-id="gridview-${index}"]`);
            let tpl = panel.template();
            let gridview = GridView.create({ container, tpl, click, });

            gridview.render(list);

        });




    });





});
