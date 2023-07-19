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
        '/ModuleTree/Tree/Data',
        '/ModuleTree/Main/ModuleInfo/Base',
        '/ModuleTree/Main/Tree/Main',
        '/ModuleTree/Main/List/GridView',
    ], {
        none: '(launch)',
    });

    define.data({
        'Settings.Header': 'hide',
        'Settings.Language': 'chinese',
        'Settings.Theme': 'light',
    });


    // definejs 内部模块所需要的默认配置
    definejs.config({
        'API': {
            /**
            * API 接口 Url 的主体部分。
            */
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


