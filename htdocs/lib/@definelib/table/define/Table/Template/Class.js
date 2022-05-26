define('Table/Template/Class', function (require, module, exports) {
    
    return {
        stringify(data) {
            if (Array.isArray(data)) {
                data = data.join(' ');
            }

            if (!data) {
                return '';
            }

            return `class="${data}"`;
        },
    };
});