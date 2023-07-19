

define.panel('/ModuleTree/Main/FileInfo', function (require, module, panel) {


    panel.on('init', function () {
        panel.template(function (info, index) {
          
            return {
                'icon': info.icon.html,
                'name': info.name,
                'file': info.file,
                'ext': info.ext,
                'md5': info.md5,
                'dir': info.dir,
                'lines': info.lines,
                'length': info.length,
                'byteLength': info.byteLength,
                'modules': info.modules.length,
                'type': `${info.ext} 文件`,
                'size': info.size.value,
                'sizeDesc': info.size.desc,
                'birthtime': info.birthtime,
                'mtime': info.mtime,
            };
        });
    });

    panel.on('init', function () { 
        panel.$on('click', {
            '[data-cmd="file"]': function (event) {
                let file = this.innerText;
                panel.fire('file', [file]);
            },
        });
    });




    panel.on('render', function ({ item, stat, }) {

        let { htmlStat, moduleStat, } = stat;
        let { module, html, } = item.data;

        let info = moduleStat.file$info[module.file];
        let list = [info];

        if (html) {
            info = htmlStat.file$info[html.file];
            list = [...list, info];
        }
        
        panel.fill(list);



    });





});
