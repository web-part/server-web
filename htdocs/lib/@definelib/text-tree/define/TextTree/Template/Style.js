define('TextTree/Template/Style', function (require, module, exports) {
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

            data = data.trim();

            return `style="${data}"`;
        },
    };
});