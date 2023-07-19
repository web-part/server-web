

define('/Tool/JS/Data', function (require, module, exports) {
    const Storage = require('@definejs/local-storage');

    let storage = new Storage(module.id);

    let defaultContent =
        
`//请输入 js 代码内容。
function test() {
    
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
