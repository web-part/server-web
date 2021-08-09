
module.exports = {
    /**
    * 通用部分。
    */
    '': {
        masters: {
            minify: false,
        },
    },

    /**
    * 针对分布式打包。
    */
    '.pack': {
        packages: {
            minify: false,
            name: '{name}',
            query: {
                md5: 4,
            },
        },
    },

};