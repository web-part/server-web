define('Pager/Template/Style', function (require, module, exports) {
    const Style = require('@definejs/style');

    return {
        stringify(data) {
            if (!data) {
                return '';
            }

            data = Style.stringify(data);
            
            if (!data) {
                return '';
            }

            return `style="${data}"`;
        },
    };
});