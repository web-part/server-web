
define('/HtmlTree/Main/Nav/Data', function (require, module, exports) {

    
    function getIcon(item) { 
        let { fileIcon, dirIcon, } = item;
        if (fileIcon) {
            return fileIcon;
        }

        if (dirIcon) {
            return dirIcon.close;
        }

        return `FileIcon file html fab fa-html5`;
    }

    
    return {
        make(item) {
            let list = [item, ...item.parents].reverse();

            let names = list.map((item) => {
                return item.name;
            });


            let path = names.join('>');

            let icon = { html: `<i class="${getIcon(item)}"></i>`, };

            return {
                list,
                names,
                path,
                icon,
            };
        },
    }



});
