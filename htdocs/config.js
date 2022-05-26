; (function (definejs) {
    let AppModule = definejs.require('AppModule');
    let define = window.define = AppModule.define;
    
    Object.assign(define, {
        'panel': definejs.panel,
        'view': definejs.view,
        'module': definejs.define,
        'data': definejs.data,
        'route': definejs.route,
        'proxy': definejs.proxy,
    });


    //业务端模块的默认配置。
    define.data([
        '/ModuleTree/API/Data',
        '/ModuleTree/Tree/Data',
        '/ModuleTree/Tree',
        '/ModuleTree/Main/ModuleInfo/Base',
        '/ModuleTree/Main/Tree/Main',
        '/ModuleTree/Main/List/GridView',
        '/ModuleTree/Main/Pair/GridView',
    ], {
        none: '(app)',
    });

    define.data({
        'Settings.Header': 'hide',
        'Settings.Language': 'chinese',
        'Settings.Theme': 'light',
    });


    // KISP 内部模块所需要的默认配置
    definejs.config({
        'API': {
            /**
            * API 接口 Url 的主体部分。
            */
            // url: 'http://localhost:8000/api/',
            // url: `http://localhost:${location.port}/api/`,
            url: `${location.origin}/api/`,
            base: 'api/',
        },

        'App': {
            name: `webpart-server-${location.port}`,
        },


        'Masker': {
            fadeIn: 200,
            fadeOut: 200,
        },

    });
    

})(window.definejs);


