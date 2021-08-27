
/**
* 
*/
define('MarkDoc/Content', function (require, module, exports) {
    const $String = require('@definejs/string');

    const marked = window.marked;


    return {

        /**
        * 获取内容。
        *   opt = {
        *       language: '',   //可选。 语言类型。 如果要使用源代码模式显示内容，则需要指定该字段。
        *       content: '',    //必选。 要填充的内容。
        *       sample: '',     //可选，要使用地模板名称，值为 `pre` 或 `code`。
        *       process: function(content){ },
        *   };
        */
        get: function (meta, opt) {

            let {
                language,
                content,
                sample = 'pre',
                process,
            } = opt;

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

                content = $String.format(meta.samples[sample], {
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


