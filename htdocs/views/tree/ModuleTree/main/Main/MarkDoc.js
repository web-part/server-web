

define.panel('/ModuleTree/Main/MarkDoc', function (require, module, panel) {
    const Escape = require('@definejs/escape');
    const MarkDoc = require('MarkDoc');

    let markdoc = null;

    //预览模式下，需要保持为代码模式展示的。 但又跟源码模式不完全一样。
    let exts = ['.json', '.js', '.css', '.html', ];

    panel.on('init', function () {
        markdoc = new MarkDoc({
            container: panel.$,

        });

        markdoc.on('render', function () {
           
            let list = markdoc.getOutlines();

            panel.fire('render', [list]);

        });
       
    });



    /**
    * 渲染。
    *   opt = {
    *       content: '',                    //文件内容。
    *       ext: '',                        //如 `.json`。
    *       type: 'source' | 'preview',     //是源码视图，还是预览视图。
    *       isImage: false,                 //是否为图片。 图片的则需要对样式进行微调。
    *   };
    */
    panel.on('render', function (opt) {
        let { item, stat, } = opt;
        let { moduleStat, htmlStat, } = stat;
        let { id$info, } = moduleStat;
        let info = id$info[item.mid];
        let { content, ext, } = info;

    
        let language = '';
        let format = true;
        let isImage = false;

        //以源码方式展示，需要进行 html 编码。
        if (opt.type == 'source') {
            content = Escape.html(content);
            language = ext.slice(1);
            format = false; //不格式化代码，以保留源格式。
        }
        else { //预览模式
            if (exts.includes(ext)) {
                language = ext.slice(1); //强制变为代码模式。
            }
        }


        markdoc.render({
            'content': content,
            'language': language,
            'baseUrl': '',
            'code': {
                'format': format,
            },
        });

        panel.$.toggleClass('image', isImage);

       
    });


    return {
        outline: function (index) {
           

            markdoc.toOutline(index);


        },

    };

});