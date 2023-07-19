
define('/ModuleTree/API/Data', function (require, module, exports) {
    const $Date = require('@definejs/date');
    const File = require('File');
    const HtmlStat = require('HtmlStat');
    const ModuleStat = require('ModuleStat');


    



    return {
        make({ html, module, }) {

            [ html.file$info, module.file$info, ].forEach((file$info) => {
                Object.entries(file$info).forEach(([file, info]) => {
                    let { stat, } = info;
                    let { names, dir, name, ext, isImage, icon, } = File.getInfo(file);
                    let size = File.getSize(stat.size);

                    let atime = $Date.format(stat.atimeMs, 'yyyy-MM-dd HH:mm:ss');
                    let birthtime = $Date.format(stat.birthtimeMs, 'yyyy-MM-dd HH:mm:ss');
                    let ctime = $Date.format(stat.ctimeMs, 'yyyy-MM-dd HH:mm:ss');
                    let mtime = $Date.format(stat.mtimeMs, 'yyyy-MM-dd HH:mm:ss');


                    //增加几个字段。
                    Object.assign(info, {
                        file,
                        name, 
                        names,
                        icon,
                        ext,
                        dir,
                        size,
                        atime,
                        birthtime,
                        ctime,
                        mtime,
                    });
                });
            });

            

            let htmlStat = HtmlStat.parse(html.file$info);
            let moduleStat = ModuleStat.parse(module.file$info);

            htmlStat = { ...html, ...htmlStat, };
            moduleStat = { ...module, ...moduleStat, };

            return { htmlStat, moduleStat, };


        },
    };
});