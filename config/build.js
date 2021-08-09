
module.exports = {
    /**
    * 通用部分。
    */
    '': {
        //要复制到的构建目录。
        dir: 'output/build/htdocs/',

        //构建前要排除在外的文件或目录。
        //相对于网站的根目录。
        excludes: [
            'babel/',       //生成的。
            'packages/',    //生成的。
            'style/css/',   //生成的。


            'f/codemirror-5.61.1/**/*',
            'f/codemirror-5.61.1/**/.*', //删除只有后缀名的文件。

            //保留。
            '!f/codemirror-5.61.1/lib/',
            '!f/codemirror-5.61.1/theme/',
            '!f/codemirror-5.61.1/addon/mode/overlay.js',
            '!f/codemirror-5.61.1/addon/selection/active-line.js',
            '!f/codemirror-5.61.1/mode/htmlmixed/htmlmixed.js',
            '!f/codemirror-5.61.1/mode/css/css.js',
            '!f/codemirror-5.61.1/mode/javascript/javascript.js',
            '!f/codemirror-5.61.1/mode/markdown/markdown.js',
            '!f/codemirror-5.61.1/mode/gfm/gfm.js',

            'f/fontawesome-free-5.15.2-web/**/*',
            //保留
            '!f/fontawesome-free-5.15.2-web/css/all.debug.css',
            '!f/fontawesome-free-5.15.2-web/css/all.min.css',
            '!f/fontawesome-free-5.15.2-web/webfonts/',

            'f/highlight/**/*',
            //保留。
            '!f/highlight/styles/default.css',
            '!f/highlight/highlight.pack.js',

            'f/definejs/**/*',
            //保留。
            '!f/definejs/dist/',

            'f/jquery/**/*',
            //保留。
            '!f/jquery/dist/jquery.debug.js',
            '!f/jquery/dist/jquery.min.js',
        ],

        //构建完成后需要清理的文件或目录。
        cleans: [
            'data/',
            'f/codemirror-5.61.1/theme/',

            'f/codemirror-5.61.1/addon/mode/overlay.js',
            'f/codemirror-5.61.1/addon/selection/active-line.js',

            'f/codemirror-5.61.1/mode/htmlmixed/htmlmixed.js',
            'f/codemirror-5.61.1/mode/css/css.js',
            'f/codemirror-5.61.1/mode/javascript/javascript.js',
            'f/codemirror-5.61.1/mode/markdown/markdown.js',
            'f/codemirror-5.61.1/mode/gfm/gfm.js',


            'lib/',
            'modules/',
            'views/',
            'partial/',
            'routers/',

            'config.js',

            '**/*.master.html',
            '**/*.less',
            '**/*.debug.css',
            '**/*.debug.js',
            '**/index.js',
        ],

        //需要进行内容转换的文件。
        process: {
            '**/*.js': function (file, content, require) {
                const BlockList = require('BlockList');

                let list = [
                    {
                        begin: '/**webpart.debug.begin*/',
                        end: '/**webpart.debug.end*/',
                        value: "",
                    },
                    {
                        begin: '/**webpart.test.begin*/',
                        end: '/**webpart.test.end*/',
                        value: '',
                    },
                ];

                list.forEach(function (item) {
                    content = BlockList.replace(content, item);
                });

                return content;
            },
        },

        masters: {
            lessLink: {
                minify: true,
                name: '{md5}.css',  //如果指定则输出目标文件。
                query: {},
            },

            lessBlock: {
                minify: true,
                inline: false,
                name: '{md5}.css',
                props: {},
                query: {},
            },

            jsBlock: {
                begin: 'partial/begin.js',
                end: 'partial/end.js',
                minify: true,
                inline: false,
                name: '{md5}.js',
                props: {},
                query: {},
            },
            html: {
                //压缩选项详见: https://github.com/kangax/html-minifier。

                // minify: {
                //     collapseWhitespace: true,   //折叠空白。 即删除空行、空格等，压缩最重要的体现。
                //     minifyJS: true,             //压缩 html 里的 js。
                //     keepClosingSlash: true,     //保留闭合斜线。
                // },

                // minify: false,

            },
        },

    },


    /**
    * 针对分布式打包。
    */
    '.pack': {
        packages: {
            minify: true,
            name: '{md5}',
            //begin: 'partial/begin.js',
            //end: 'partial/end.js',
            query: {},
        },
    },

    /**
    * 针对兼容版。
    */
    '.compat': {
        //构建前要排除在外的文件或目录。
        excludes: [
            //js 分 babel 版本，但 css 的不区分，所以要保留。
            'f/definejs/definejs.debug.js',
            'f/definejs/definejs.min.js',
        ],
    },

    /**
    * 针对标准版。
    */
    '.normal': {
        //构建前要排除在外的文件或目录。
        excludes: [
            'f/**/*.babel.debug.js',
            'f/**/*.babel.min.js',
            'f/polyfill/',
        ],
    },

};