

define.panel('/Tool/Less/Preview', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');

    let $div = panel.$.find('[data-id="markdoc"]');
    let passive = false;    //是否被动的滚动。 即是否由于外面调用而引起的滚动。
    let markdoc = null;

    //需要保持为代码模式展示的。 
    let exts = [ '.json', '.js', '.css', '.less', '.html', '.htm', ];
    //let headers = [];
  


    panel.on('init', function () {
        markdoc = new MarkDoc({
            'container': $div.get(0),
        });

        markdoc.on('hash', function (href) {
            panel.fire('hash', [href]);
        });


        markdoc.on('render', function (info) {
            let list = markdoc.getOutlines();
            panel.fire('render', [list]);

        });



        panel.$.on('scroll', function (event) {
            if (passive) {
                passive = false;
                return;
            }

            let height = $div.outerHeight();
            let top = panel.$.get(0).scrollTop;

            panel.fire('scroll', [{
                'height': height,
                'top': top,
            }]);

        });

        panel.$on('click', {
            '[data-cmd="compile"]': function (event) {
                panel.fire('compile');
            },
        });

       
    });



    /**
    * 渲染。
    *   opt = {
    *       content: '',                    //文件内容。
    *       ext: '',                        //如 `.json`。
    *       minify: false,                  
    *   };
    */
    panel.on('render', function (opt) {
        panel.$.toggleClass('markdoc-mode', !!opt);

        if (!opt) {
            return;
        }


        let { content, ext, minify, } = opt;
        let language = '';

        if (exts.includes(ext)) {
            language = ext.slice(1);
        }

        markdoc.render({
            'content': content,
            'language': language,
            'sample': minify ? 'code' : 'pre',
            
            'code': {
                'language': false,
                'numbers': !minify,
            },
        });

        markdoc.$.toggleClass('minify', minify);


        

    });

    return {

        /**
        *   editor = {
        *       left: 0,            //
        *       top: 0,             //
        *       height: 0,          //
        *       width: 0,           //
        *       clientHeight: 0,    //
        *   };
        */
        scroll(editor) {
            let height = $div.outerHeight();
            let top = (height - editor.clientHeight) * editor.top / (editor.height - editor.clientHeight);

            passive = true;
            panel.$.get(0).scrollTo(0, top);
        },


        
       
      
       

    };



});
