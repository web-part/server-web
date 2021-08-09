

define.panel('/Master/Views', function (require, module, panel) {
    const Package = require('@definejs/package');

    
    let meta = {
        current: null,              //当前激活的视图。
        view$bind: new Map(),       //记录视图是否已被绑定事件。
        view$rendered: new Map(),   //记录视图是否已经 render 过了。 用于辅助要 show() 还是要 render()。
    };


    function get(name) {
        let values = panel.fire('require', [name]);
        let view = values[0];

        if (!view) {
            return;
        }

        //未绑定事件。
        if (!meta.view$bind.get(view)) {
            meta.view$bind.set(view, true);

            //接收来自 view 内部触发的事件。
            //即以下事件是 view 内部业务层的代码触发的。

            //视图内部发出信号想要关闭。
            view.on('close', function (...args) {
                panel.fire('close', [name]);
            });
           

            view.on('fullscreen', function (...args) {
                panel.fire('fullscreen', args);
            });

            //视图内部发出信号想要设置 title。
            view.on('title', function (...args) {
                panel.fire('title', args);
            });
        }
     

    
        return view;
    }



    //激活指定的视图。
    function active(view, opt = {}) {
        let { args = [], render = null, title = '', } = opt;

        if (meta.current) {
            meta.current.hide();
        }

        meta.current = view;

        //未指定是否要渲染。
        if (render === null) {
            render = !meta.view$rendered.get(view);
        }

        //这句放在 view.render() 的前面。
        //因为 view 内部可能有要修改 title 的逻辑。
        //让 view 内部的发出的 title 优先级更高。
        panel.fire('title', [title]);

        if (render) {
            meta.view$rendered.set(view, true);
            view.render(...args);
        }
        else {
            view.show();
        }

        

    }



    panel.on('init', function () {
        
    });
  



    panel.on('render', function (name, opt) {
        //重载 render(item, opt);
        if (typeof name == 'object') {
            let item = name;
            name = item.view;

            opt = {
                'title': item.name,
                ...opt,
            };
        }


        let view = get(name);

        if (view) {
            active(view, opt);
            return;
        }

        //尝试以异步方式去加载。
        Package.load(name, function (pack) {
            if (!pack) {
                console.warn(`不存在视图 ${name} 对应的 package 文件。`);
                panel.fire('404', [name, opt]);
                return;
            }

            //要先添加 html 内容。
            let html = pack['html'];
            if (html) {
                panel.$.append(html.content);
            }

            //再去加载 js 模块。
            let view = get(name);

            if (!view) {
                console.warn(`无法获取到视图 ${name}`);
                panel.fire('404', [name, opt]);
                return;
            }

            active(view, opt);

        });

    });



    return {
        /**
        * 关闭指定名称的视图，并传递一些参数。
        */
        close(name, args) {
            
            let view = get(name);

            if (!view) {
                return;
            }

            //目标视图中有阻止关闭的，或需要确认关闭的，则先取消关闭。
            //调用 view.close(); 会触发 view 内部的 `close` 事件，从而执行 view 内部的业务代码。
            //目标视图包含：
            //  view.on('close', function () { 
            //      return false;
            //  });
            //通过返回 false 即可阻止关闭。
            let values = view.close(...args);

            if (values.includes(false)) {
                return false;
            }

            view.$.fadeOut('slow', function () {
                view.hide();
            });

            //关闭的是当前被激活的视图。
            if (meta.current === view) {
                meta.current = null;
            }
            
            meta.view$rendered.delete(view);
        },

        /**
        * 刷新指定的或当前视图。
        */
        refresh(view) {
            view = view || meta.current;

            if (typeof view == 'string') {
                view = get(view);
            }

            if (!view) {
                return;
            }

          
            view.refresh();
            meta.view$rendered.set(view, true);
        },
    };


});