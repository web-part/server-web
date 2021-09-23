/**
* src: @definejs/emitter/modules/Emitter.defaults.js
* pkg: @definejs/emitter@1.1.0
*/
define('Emitter.defaults', function (require, module, exports) { 
    /**
    * Emitter 模块的默认配置
    */
    module.exports = {
        /**
        * 停止值。 
        * 在事件回调函数中如果要中途停止继续执行后面的回调函数时的返回值。
        * 即如果外部代码想要中途停止继续执行后面的回调函数，只需要返回一个指定的停止值即可。
        * 停止值不能为 undefined，如果指定为 undefined，则不会停止继续执行后面的回调函数。
        */
        stopValue: undefined,
    };
});