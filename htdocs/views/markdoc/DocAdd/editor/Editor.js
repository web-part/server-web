

define.panel('/DocAdd/Editor', function (require, module, panel) {
    const File = module.require('File');
    const CMD = module.require('CMD');
    const Table = module.require('Table');
    const Headers = module.require('Headers');

    let passive = false;    //是否被动的滚动。 即是否由于外面调用而引起的滚动。
    let editor = null;
    let doc = null;
    let txt = panel.$.find('textarea').get(0);

    let ext$mode = {
        '.js': 'javascript',
        '.json': 'javascript',
        '.css': 'css',
        '.less': 'css',
        '.htm': 'htmlmixed',
        '.html': 'htmlmixed',
    };

    let meta = {
        ext: '',
    };



    panel.on('init', function () {

        editor = CodeMirror.fromTextArea(txt, {
            mode: 'gfm',
            //mode: 'css',
            //theme: 'midnight',
            cursorHeight: 1,
            lineNumbers: true,
            lineWrapping: true,         //是否自动换行。
            styleActiveLine: true,
            smartIndent: false,
            indentUnit: 4,
            tabSize: 4,
            
            //viewportMargin: Infinity, //全部生成 DOM 节点，能性能消耗很大。
        });

        doc = editor.getDoc();




        editor.on('scroll', function () {
            if (passive) {
                passive = false;
                return;
            }

            let info = editor.getScrollInfo();
            panel.fire('scroll', [info]);

        });




        editor.on('change', function () {
            let doc = editor.getDoc()
            let value = doc.getValue();

            value = value.split('\t').join('    ');

            panel.fire('change', [{
                'content': value,
                'ext': meta.ext,
            }]);
            
        });


        panel.$.on('keydown', function (event) {
            //metaKey 为 MacOS 的 `command` 键。
            let isSave = (event.ctrlKey || event.metaKey) && event.key == 's';

            if (!isSave) {
                return;
            }

            event.preventDefault();
            panel.fire('save');
        });

        CMD.init(editor);

        
    });


    //这个事件要放在外面才能监听到文件。
    panel.$.on('paste', function (event) {
        let clipboardData = event.originalEvent.clipboardData;
        let file = clipboardData.files[0];

        if (!file || file.type != 'image/png') {
            return;
        }
       
        File.upload(file, function (md, data) {
            editor.replaceSelection(md);
        });

    });



    /**
    * 渲染。
    *   opt = {
    *       content: '',    //内容。
    *       ext: '',        //扩展名，以此来确定类型。 如 '.json'。
    *   };
    */
    panel.on('render', function (opt = {}) {
        let content = opt.content || '';
        let ext = opt.ext || '.md';
        let mode = ext$mode[ext.toLowerCase()] || 'gfm';

        meta.ext = ext;

        editor.setOption('mode', mode);

        doc.setValue(content); //会触发 editor.change 事件。


        //详见：http://www.91r.net/ask/8349571.html
        setTimeout(function () {
            editor.refresh();
        }, 100);

    
      
    });




    let exports ={
        /**
        *   preview = {
        *       top: 0,         //
        *       height: 0,      //
        *   };
        */
        scroll: function (preview) {
            let info = editor.getScrollInfo();
            let top = (info.height - info.clientHeight) * preview.top / (preview.height - info.clientHeight);

            passive = true;
            editor.scrollTo(0, top);
        },

        getReadme: function () {
            return txt.value;
        },



        getContent: function () {
            let content = doc.getValue();
            return content;
        },

        setTheme: function (name) {
            editor.setOption('theme', name);
        },

        call: function (name) {
            CMD[name]();
        },

        addTable: function (data) {
            let table = Table.create(data);
           
            console.log(table);

            editor.replaceSelection(table);
            editor.focus();
        },

        set: function (key, value) {
            editor.setOption(key, value);
        },
    };


    return exports;

});
