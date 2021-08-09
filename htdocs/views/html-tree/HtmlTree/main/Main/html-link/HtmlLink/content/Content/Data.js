

define('/HtmlTree/Main/HtmlLink/Content/Data', function (require, module, exports) {




    return {
        get(node) {
            let { data, } = node;
            let { content, file, } = data.link;


            return { file, content, };

        },
    };

});
