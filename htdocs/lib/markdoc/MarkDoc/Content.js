
/**
* 
*/
define('MarkDoc/Content', function (require, module, exports) {
    const $String = require('@definejs/string');

    const marked = window.marked;


    return {

        /**
        * 获取内容。
        *   options = {
        *       language: '',   //可选。 语言类型。 如果要使用源代码模式显示内容，则需要指定该字段。
        *       content: '',    //必选。 要填充的内容。
        *       process: function(content){ },
        *   };
        */
        get: function (meta, options) {
            let language = options.language;
            let content = options.content;
            let process = options.process;

            //html源文件要特殊处理。
            if (language == 'html' || language == 'htm') {
                language = '';

                content = [
                    '``` html',
                        content,
                    '```',
                ].join('\r\n');
            }


            if (language) {
                //注意，content 里可能含有 html 标签，因此需要转义。
                let reg = /[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g;

                content = content.replace(reg, function (r) {
                    return "&#" + r.charCodeAt(0) + ";"
                });

                content = $String.format(meta.samples['pre'], {
                    'language': language,
                    'content': content,
                });

            }
            else {
                content = marked(content);

                if (process) {
                    content = process(content);
                }
            }

            return content;
        },


        
    };
    
});


