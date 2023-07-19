

define('GridView/Panel', function (require, module, exports) {
    const Panel = require('@definejs/panel');

    return {
        create(meta) {
            const Header = module.require('Header')(meta);
            const Main = module.require('Main')(meta);
            const Pager = module.require('Pager')(meta);
            const Data = module.require('Data');

            let panel = new Panel(`[data-panel="${meta.id}"]`);

            let $meta = {
                page: null, //分页信息。 如果指定，则进行分页。
                all: null,  //全部列表数据。 如果指定，则在组件内部进行分页。
            };


            //初始阶段适合用来绑定事件。
            panel.on('init', function () {

                Header.on({
                    'resize': function (column, info) {
                        let width = info.sum + 15;
                        let args = [column, info];

                        panel.$.width(width);
                        Main.setWidth(info.index, column.width);

                        meta.emitter.fire('resize', column.name, args);
                        meta.emitter.fire('resize', args);
                    },
                });


                Pager.on({
                    'change': function (page) {
                        //为了方便在 `process` 事件中传出去，以让外界知道当前的分页信息。
                        meta.page = page; 

                        if ($meta.all) { //内部分页。
                            let values = meta.emitter.fire('page', [page, $meta.all]);
                            let list = values.slice(-1)[0] || Data.get($meta.all, page);

                            Main.render(list);
                        }
                        else { //外部分页。
                            //方便外部重新 render() 时可以不传参数 page。
                            $meta.page = page;    
                            panel.fire('page', [page, null]);
                        }
                    },
                });

                //表头只需要渲染一次，放此处即可。
                Header.render();

            });



            //渲染。
            panel.on('render', function (list, page) {
                //第二个是方便在分页时可以不传参数 page。
                page = page || $meta.page;

                //重置一下，避免受上次 render() 的影响。
                $meta.page = null;
                $meta.all = null;

                //指定了 page，则进行分页。
                //未指定 total，则在组件内部进行分页。
                if (page && page.total === undefined) {
                    page = { ...page, };
                    $meta.all = list;            //此时 list 就是全部的列表数据。
                    page.total = list.length;   //        
                    list = Data.get(list, page);//截取分页对应的列表片段。
                }

               
                meta.page = page;
                Main.render(list);
                Main.$.toggleClass('no-pager', !page);
                panel.$.toggleClass('no-data', !list.length);

                //只有指定了才分页。
                if (page) {
                    Pager.render(page);
                }
                


                let width = Header.get();
                panel.$.width(width);

                meta.emitter.fire('render');
            });


            return panel.wrap({
                Header,
                Main,
                Pager,
            });

        },
    };

});