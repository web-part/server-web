

define.panel('/DocAdd/Header/Validater', function (require, module, panel) {
    const Toast = require('@definejs/toast');

    let toast = new Toast({
        icon: 'times',
        duration: 1200,
        mask: 0,
        width: 250,
    });

    let timeout = 150;

    let allows = [
        '.md',
        '.txt',
        '.json',
        '.js',
        '.css',
        '.html',
        '.sql',
    ];



    return {
        check: function ($name) {
            let name = $name.val();

            function error(msg) {
                toast.show(msg);

                //闪两次
                $name.addClass('on');

                setTimeout(function () {
                    $name.removeClass('on');

                    setTimeout(function () {
                        $name.addClass('on');

                        setTimeout(function () {
                            $name.removeClass('on');
                        }, timeout);

                    }, timeout);

                }, timeout);
            }


            if (!name) {
                error('文件名不能为空');
                return;
            }



            let file = name.replace(/\\/g, '/'); //把所有的 '\' 替换成 '/'。

            if (file.includes('../')) {
                return error('不能引用到父目录中去');
            }

            if (file.includes('./')) {
                return error('不能使用相对路径');
            }

            if (file.startsWith('.')) {
                return error('文件路径非法');
            }

            if (!file.includes('.')) {
                return error('文件名必须包含后缀名');
            }

            if (file.includes('..') ||
                file.includes(':') ||
                file.includes('*') ||
                file.includes('?') ||
                file.includes('"') ||
                file.includes('<') ||
                file.includes('>') ||
                file.includes('|') ||
                file.includes('//') ||
                file.includes(' ') ||
                file.includes('./')) {

                return error('文件路径非法');
            }

           
            let ext = file.split('.').slice(-1)[0];
            ext = '.' + ext.toLowerCase();

            if (!allows.includes(ext)) {
                return error('不能使用后缀名: ' + ext);
            }

            return file;
        },
    };



});
