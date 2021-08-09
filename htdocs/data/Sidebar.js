

define('data.Sidebar', function (require, module, exports) {

    let list = [
        { language$name: { chinese: '首页', english: 'Home', }, icon: 'fas fa-home', view: 'Home', args: [], },
        { language$name: { chinese: '文件资源', english: 'Files', }, icon: 'fa fa-folder-open', view: 'FileList', args: [], },
        // { language$name: { chinese: '模块系统', english: 'Module Tree', }, icon: 'fa fa-sitemap', view: 'ModuleTree', args: [], },
        { language$name: { chinese: '模块系统', english: 'Module Tree', }, icon: 'fab fa-connectdevelop', view: 'ModuleTree', args: [], },
        { language$name: { chinese: 'html 系统', english: 'HTML Tree', }, icon: 'fa fa-sitemap', view: 'HtmlTree', args: [], },
        { language$name: { chinese: '日志', english: 'Logs', }, icon: 'fas fa-comment-dots', view: 'Log', args: [], },
        { language$name: { chinese: '写文档', english: 'Markdoc' }, icon: 'fa fa-edit', view: 'DocAdd', },
        { language$name: { chinese: '终端', english: 'Terminal', }, icon: 'fas fa-terminal', view: 'Terminal', args: [], },
        { language$name: { chinese: '常用工具', english: 'Tools', }, icon: 'fas fa-tools', view: 'Tool', args: [], },
        { language$name: { chinese: '偏好设置', english: 'Settings', }, icon: 'fas fa-cogs', view: 'Setting', args: [], },
        { language$name: { chinese: '代理', english: 'Proxy', }, icon: 'fas fa-network-wired', view: 'Proxy', args: [], },
        { language$name: { chinese: '帮助手册', english: 'Help', }, icon: 'fa fa-question-circle', view: 'Help', args: [], },
    ];

    
    return list;


    
});
