
define('/HtmlTree/API/Data', function (require, module, exports) {
    
    
    return {
        //改成使用相对于 htdocs 的路径。
        make(data) { 
            let { cwd, masterBlock, } = data;

            function useRelative(item, key) { 
                if (Array.isArray(item)) {
                    let list = item;

                    list = list.map((item) => {
                        return useRelative(item, key);
                    });

                    return list;
                }

                if (typeof item == 'string') {
                    if (item.startsWith(cwd)) {
                        item = item.slice(cwd.length);
                    }
                    return item;
                }

                if (typeof item != 'object') {
                    throw new Error(`必须为一个 object`);
                }


                let path = item[key];

                if (!path || typeof path != 'string' || !path.startsWith(cwd)) {
                    return path;
                }

                item[key] = path = path.slice(cwd.length);
                return path;
            }

            function fixHtmlLinks(list) { 

                list.forEach((item) => {
                    useRelative(item, 'file');
                    useRelative(item.link, 'dir');
                    useRelative(item.link, 'file');

                    fixHtmlLinks(item.link.list);

                });
            }



            masterBlock.list.forEach((item) => {
                let { master, } = item;

                useRelative(item, 'file');
                useRelative(master, 'dest');
                useRelative(master, 'dir');
                useRelative(master, 'file');

                master.cssLinks.forEach((item) => {
                    useRelative(item, 'file');
                    useRelative(item.link, 'file');
                });

                master.htmlBlocks.forEach((item) => { 
                    let { block, } = item;

                    useRelative(block, 'dir');
                    
                    //这里有递归。
                    fixHtmlLinks(block.list);

                    block.patterns = useRelative(block.patterns);
                });


                //这个有递归。
                fixHtmlLinks(master.htmlLinks);


                master.jsBlocks.forEach((item) => {
                    let { block, } = item;
                    useRelative(block, 'dir');
                    
                    block.list.forEach((item) => {
                        useRelative(item, 'file');
                        useRelative(item.link, 'file');
                    });

                    block.patterns = useRelative(block.patterns);
                });

                master.jsLinks.forEach((item) => {
                    useRelative(item, 'file');
                    useRelative(item.link, 'file');
                });

                master.lessBlocks.forEach((item) => { 
                    let { block, } = item;

                    useRelative(block, 'dir');

                    block.list.forEach((item) => { 
                        useRelative(item, 'file');
                        useRelative(item.dest, 'file');
                        useRelative(item.dest.dir, 'css');
                        useRelative(item.link, 'file');
                    });

                    block.patterns = useRelative(block.patterns);

                });

                master.lessLinks.forEach((item) => {
                    useRelative(item, 'file');
                    useRelative(item.dest, 'file');
                    useRelative(item.dest.dir, 'css');
                    useRelative(item.link, 'file');
                });

            });

            masterBlock.patterns = useRelative(masterBlock.patterns);


        },
    };

});