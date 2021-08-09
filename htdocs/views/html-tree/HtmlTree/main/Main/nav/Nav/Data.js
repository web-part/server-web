
define('/HtmlTree/Main/Nav/Data', function (require, module, exports) {
    
    return {
        make(item) {
            let list = [item, ...item.parents].reverse();

            let names = list.map((item) => {
                return item.name;
            });


            let icon = {
                'type': item.list.length > 0 ? 'dir' : 'file',
                'name': item.data.file || '.html',
            };


            let path = names.join('>')

            return {
                list,
                names,
                // path,
                icon,
            };
        },
    }



});
