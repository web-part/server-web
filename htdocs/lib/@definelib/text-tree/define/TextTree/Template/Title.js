define('TextTree/Template/Title', function (require, module, exports) {

    return {
        stringify(data) {
            if (!data) {
                return '';
            }

            return `title="${data}"`;
        },
    };
});