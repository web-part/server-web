define('TextTree/Template/DataSet', function (require, module, exports) {

    return {
        stringify(data) {
            if (!data) {
                return '';
            }

            let list = Object.keys(data).map((key) => {
                let value = data[key];

                return `data-${key}="${value}"`;
            });

            return list.join(' ');
        },
    };
});