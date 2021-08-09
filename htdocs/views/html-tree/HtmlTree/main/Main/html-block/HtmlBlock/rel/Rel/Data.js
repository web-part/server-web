

define('/HtmlTree/Main/HtmlBlock/Rel/Data', function (require, module, exports) {




    return {
        get(node) {
            let { parent, } = node;



            return {
                'file': parent.data.file,
                'content': parent.data.content,
                'beginNo': node.data.begin,
                'endNo': node.data.end,
            };

        },
    };

});
