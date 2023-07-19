

define('/Tool/Less/Data', function (require, module, exports) {
    const Storage = require('@definejs/local-storage');

    let storage = new Storage(module.id);

    let defaultContent =
        
`//请输入 less 内容。
body {
	color: red;
    div {
    	font-size: 16px;
    }
}
`;

    
    
    let meta = {
        'content': storage.get('content') || defaultContent,
    };


    return exports = {

        get() {
            return meta.content;
        },

        set(content) {
            meta.content = content;
            storage.set('content', content);

            return content;
        },
        

      
    };


});
