

define('/HtmlTree/Tree/Data', function (require, module, exports) {
    const File = require('File');



 
    function getNode(item, dir) {
        let { link, } = item;
        let list = link.list;
        let name = item.href;
        let icon = File.getIcon(item.file);


        if (!name) {
            name = item.file;

            if (dir && name.startsWith(dir)) {
                name = name.slice(dir.length);
            }
        }

        //只有 HtmlLink 有 list。
        if (list) {
            list = list.map((item) => {
                return getNode(item);
            });
        }

        return {
            'name': name,
            'id': link.id,
            'open': false,
            'fileIcon': icon.className,
            'data': item,
            'list': list,
        };

    }


    function getLinks(list) {
        list = list.map((item) => {
            let node = getNode(item);
            return node;
        });

        return list;
    }


    function getBlocks(list, dirIcon) {
        list = list.map((item) => {
            let { block, } = item;

            let list = block.list.map((item) => {
                return getNode(item, block.dir);
            });

            return {
                'name': block.id,
                'id': block.id,
                'open': false,
                'dirIcon': dirIcon,
                'data': item,
                'list': list,
            };
        });

        return list;
    }



    return {
        make(json) {

            let masters = json.masterBlock.list.map(({ master, }) => {
                let cssLinks = getLinks(master.cssLinks);
                let lessLinks = getLinks(master.lessLinks);
                let htmlLinks = getLinks(master.htmlLinks);
                let jsLinks = getLinks(master.jsLinks);

                let lessBlocks = getBlocks(master.lessBlocks, {
                    open: 'less-block far fa-list-alt',
                    close: 'less-block fas fa-list-alt',
                });

                let htmlBlocks = getBlocks(master.htmlBlocks, {
                    open: 'html-block far fa-list-alt',
                    close: 'html-block fas fa-list-alt',
                });

                let jsBlocks = getBlocks(master.jsBlocks, {
                    open: 'js-block far fa-list-alt',
                    close: 'js-block fas fa-list-alt',
                });




                return {
                    'name': master.file,
                    'id': master.id,
                    'open': true,
                    'data': master,

                    'list': [
                        ...cssLinks,
                        ...lessLinks,
                        ...lessBlocks,
                        ...htmlLinks,
                        ...htmlBlocks,
                        ...jsLinks,
                        ...jsBlocks,
                    ],
                };
            });


            return masters;
        },
    };


});