define('TextTree/Template/Class', function (require, module, exports) {
    
    return {
        stringify(data) {
            if (Array.isArray(data)) {
                data = data.filter((item) => {
                    return !!item;
                });
                data = data.join(' ');
            }

            if (!data) {
                return '';
            }

            return `class="${data}"`;
        },
    };
});