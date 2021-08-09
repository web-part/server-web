

define('/HtmlTree/Main/HtmlLink/Rel/Data', function (require, module, exports) {




    return {
        get(node) {
            let { parent, } = node;
            let { data, } = parent;

            if (data.link) {
                let link = parent.data.link;
                let no = node.data.no;

                return {
                    'file': link.file,
                    'content': link.content,
                    'beginNo': no,
                    'endNo': no,
                };
            }

            if (data.block) {
                let master = parent.parent.data;

                return {
                    'file': master.file,
                    'content': master.content,
                    'beginNo': data.begin,
                    'endNo': data.end,
                };
            }


            if (data.type == 'MasterPage') {
                let master = parent.data;
                let no = node.data.no;

                return {
                    'file': master.file,
                    'content': master.content,
                    'beginNo': no,
                    'endNo': no,
                };
            }


            throw new Error('无法识别的 node 节点。');
        },
    };

});
