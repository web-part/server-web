
define('/Markdoc/Url', function (require, module, exports) {
    let texts = [
        'md',
        'txt',
        'markdown',
    ];

    let images = [
        'bmp',
        'gif',
        'jpg',
        'jpeg',
        'png',
    ];

    //提取出目录
    function getDir(url) {
        url = url.split('#')[0];
        url = url.split('?')[0];

        let dir = url.split('/').slice(0, -1).join('/') + '/';  
        return dir;
    }



    return {
        parse(sUrl) {
            console.log({ sUrl });

            let isOrigin = sUrl.startsWith('@');            //是否明确指定作为源码模式。
            let url = isOrigin ? sUrl.slice(1) : sUrl;      //
            let ext = url.split('.').slice(-1)[0].toLowerCase();          //
            let name = url.split('/').slice(-1)[0];         //取最后一部分的短名称
            let dir = getDir(url);
            
            let isMarkdown = texts.includes(ext) || images.includes(ext); //
            let isCode = isOrigin || !isMarkdown;

            

            return {
                'url': url,
                'name': name,
                'dir': dir,
                'ext': ext,
                'isCode': isCode,
            };
        },
    };

});
