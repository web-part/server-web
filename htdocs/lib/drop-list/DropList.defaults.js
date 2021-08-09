
//注意：
//factory 用工厂函数的形式是最安全的，便于 wepbart 统计工具进行分析。
//因为如果用立即执行的方式，涉及到浏览器环境的变量时，webpart 统计工具会失效。
//因此最安全可靠的方式是把导出对象放在工厂函数里。
define('DropList.defaults', function (require, module, exports) {
    return {
        cssClass: 'DropList',
        tableClass: '',
        text: '',
        readonly: false,
        disabled: false,
        custom: false,
        order: false,            //是否自动增加一列作为序号列。
        empty: false,           //是否允许为空。
        mask: 0,
        dialog: document.body,  //这里用到了浏览器的环境，为了便于 webpart 工具统计，要放在一个 factory 工厂函数中。
        columns: [],
        field: null,
        filters: true,
        container: null,

        tabIndex: '',
        maxLength: 0,           //0 表示不限制。
    };
});

