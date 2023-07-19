
define.view('/DocAdd', function (require, module, view) {
    const Editor = module.require('Editor');
    const Preview = module.require('Preview');
    const Themes = module.require('Themes');
    const Header = module.require('Header');
    const Outline = module.require('Outline');
    const Data = module.require('Data');




    view.on('init', function () {

        Data.on({
            'render': function ({file, content, ext, }) {
                console.log({ file, content, ext, });

                Editor.render({ content, ext, });
                Header.render({ file, ext, });
                Themes.render();
            },

            'save': function (data, opt) {
                //如果是新增文件，则重新加载一下，以便根据后缀名进行语法高亮。
                if (opt.mode == 'new') {
                    view.render({ 'name': data.name });
                    return;
                }
            },

            'status': {
                'init': function () {
                    Header.saved(false);
                },
                'changed': function () {
                    Header.saved(false);
                },
                'read': function () {
                    Header.saved(null);
                },
                'saved': function () {
                    Header.saved(true);
                },
            },
        });

        Editor.on({
            'save': function () {
                let name = Header.get();
                Data.save(name);
            },

            'scroll': function (info) {
                Preview.scroll(info);
            },

            //填充内容、修改内容时，都会触发。
            'change': function (data) {
                Data.set(data.content);
                Preview.render(data);
            },
        });

        Header.on({
            'cmd': {
                'save': function () {
                    let name = Header.get();
                    Data.save(name);
                },
                'themes': function () {
                    Themes.toggle();
                },
                'new': function () {
                    Data.render({ content: '', });
                },
               
                'format': function () {
                    let content = Preview.$.find('code').text();
                    Editor.render({ content, });
                },

                'outline': function () {
                    Outline.toggle();
                },
                'demo': function (file) {
                    view.fire('demo', [file]);
                },

                'table': function (data) {
                    Editor.addTable(data);
                },
            },

            

            'editor': function (cmd) {
                Editor.call(cmd);
            },

            'switch': {
                'crlf': function (on) {
                    Editor.set('lineWrapping', on);
                },
                'fullscreen': function (on) {
                    view.fire('fullscreen', [on]);
                },
                'column': function (on) {
                    view.$.toggleClass('full-editor', !on);
                },
            },
        });

       

        Preview.on({
            'render': function (titles) {
                Outline.render(titles);
            },
            'scroll': function (info) {
                Editor.scroll(info);
            },
        });

        Themes.on({
            'item': function (name) {
                Editor.setTheme(name);
            },
        });

        Outline.on({
            'item': function (item, index) {
                Preview.to(index);
            },
        });

    });


    /**
    * 渲染内容。
    * 处理的优先级如下：
    *   //1, 来源于某个文件时。
    *   file: '', //必选。 文件 id。
    *   //2, 来源于具体内容时。
    *   opt = {
    *       content: '',    //必选。 内容。
    *       ext: '',        //可选。 内容类型。
    *   };
    *   //3, 来源于 storage 时。
    *   opt: 不指定时。
    */
    view.on('render', function (file) {
        
        Data.render(file);

       
    });


    view.on('close', function () {
        let status = Data.status();

        //
        if (status == 'changed') {
            definejs.confirm(`当前编辑器中存在未保存的内容，是否继续关闭？`, function () {
                view.fire('close'); //发出确实要关闭的信号。
            });

            return false;
        }
        
    });
  

});
