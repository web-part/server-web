


let exports = {
    build: {
        /**
        * 通用部分。
        */
        '': {
            //构建前要排除在外的文件或目录。
            //相对于网站的根目录。
            excludes: [
                'babel/',       //生成的。
                'packages/',    //生成的。
                'style/css/',   //生成的。

                'f/definejs/**/*',
                '!f/definejs/dist/',

                'f/jquery/**/*',
                '!f/jquery/dist/jquery.debug.js',
                '!f/jquery/dist/jquery.min.js',

                //--------------------------------
                'f/datetimepicker/', //暂时用不到。

                'f/codemirror-5.61.1/**/*',
                'f/codemirror-5.61.1/**/.*', //删除只有后缀名的文件。
                '!f/codemirror-5.61.1/lib/',
                '!f/codemirror-5.61.1/theme/',
                '!f/codemirror-5.61.1/addon/mode/overlay.js',
                '!f/codemirror-5.61.1/addon/selection/active-line.js',
                '!f/codemirror-5.61.1/mode/htmlmixed/htmlmixed.js',
                '!f/codemirror-5.61.1/mode/css/css.js',
                '!f/codemirror-5.61.1/mode/javascript/javascript.js',
                '!f/codemirror-5.61.1/mode/markdown/markdown.js',
                '!f/codemirror-5.61.1/mode/gfm/gfm.js',

                'f/fontawesome-free-6.4.0-web/**/*',
                '!f/fontawesome-free-6.4.0-web/css/all.debug.css',
                '!f/fontawesome-free-6.4.0-web/css/all.min.css',
                '!f/fontawesome-free-6.4.0-web/webfonts/',

                'f/highlight/**/*',
                '!f/highlight/styles/default.css',
                '!f/highlight/highlight.pack.js',

            ],

            //构建完成后需要清理的文件或目录。
            cleans: [
                'config/',
                'data/',
                'lib/',
                'modules/',
                'partial/',
                'routers/',
                'views/',

                '**/*.master.html',
                '**/*.less',
                '**/*.debug.css',
                '**/*.debug.js',
                '**/index.js',

                'f/codemirror-5.61.1/theme/',
                'f/codemirror-5.61.1/addon/mode/overlay.js',
                'f/codemirror-5.61.1/addon/selection/active-line.js',
                'f/codemirror-5.61.1/mode/htmlmixed/htmlmixed.js',
                'f/codemirror-5.61.1/mode/css/css.js',
                'f/codemirror-5.61.1/mode/javascript/javascript.js',
                'f/codemirror-5.61.1/mode/markdown/markdown.js',
                'f/codemirror-5.61.1/mode/gfm/gfm.js',
            ],

            masters: {
                lessLink: {
                    minify: false,
                },

                lessBlock: {
                    minify: false,
                },

                jsBlock: {
                    minify: false, //这里不压缩，方便后续在实际环境中调试。
                },
                html: {
                    minify: false,
                },
            },

        },


        /**
        * 针对分布式打包。
        */
        '.pack': {
            packages: {
                minify: false,
            },
        },
    }
};

module.exports = function ({ opts, defaults, master, }) {

    master.on({
        'init': function (website) {
            console.log('------init-----');
        },

        'done': {
            'compile': function (website) {
                console.log('compile.done!'.green);
            },
            'watch': function (website) {
                console.log('-------watch.done-------'.green);
            },
            'build': function (website) {
                console.log('build.done!'.green);
            },
        },
    });

    return exports;
};

