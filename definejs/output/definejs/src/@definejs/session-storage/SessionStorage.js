/**
* src: @definejs/session-storage/modules/SessionStorage.js
* pkg: @definejs/session-storage@1.0.2
*/
define('SessionStorage', function (require, module, exports) { 
    const $Object = require('Object');
    const Storage = module.require('Storage');
    const mapper = new Map();
    
    /**
    * 会话存储工具类。
    *
    * sessionStorage 属性允许你访问一个 session Storage 对象。
    * 它与 localStorage 相似，不同之处在于 localStorage 里面存储的数据没有过期时间设置，
    * 而存储在 sessionStorage 里面的数据在页面会话结束时会被清除。
    * 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
    * 在新标签或窗口打开一个页面会初始化一个新的会话，这点和 session cookies 的运行方式不同。
    * 应该注意的是，无论是 localStorage 还是 sessionStorage 中保存的数据都仅限于该页面的协议。
    *
    * 此处的 SessionStorage 设计理念为：
    *   SessionStorage 是针对多个应用的存储，每个应用都有自己独立的存储空间。
    *   使用之前，一个应用请先配置应用的名称(通过配置 `SessionStorage` 模块的 `name` 字段)。
    *   为防止跟别的应用名称冲突，可以加一些随机数，如当前应用名称为 `kis-cloud`，则可以配置为 `kis-cloud-9DCA`。
    *   通过应用的名称来区分每个应用的独立的存储空间。
    *   在每个应用中，又可以创建多个 id 不同的 SessionStorage 的实例，每个 SessionStorage 实例都有自己的存储空间。
    *   每个 SessionStorage 实例中可以储存不同的 key 和 value。
    *   因此，从层级上来说，结构为：web 应用 -> SessionStorage 实例 -> 键值。
    *
    * @class
    * @name SessionStorage
    */
    class SessionStorage {
        /**
        * 构造器。
        *   id: '',         //当前 storage 实例的 id，拥有自己的存储空间。
        *   config = {
        *       name: '',   //必选，应用的名称。
        *   };
        */
        constructor(id, config) {
            config = $Object.deepAssign({}, exports.defaults, config);
    
            let name = config.name;
    
            if (!name) {
                throw new Error(
                    `@definejs/session-storage 是针对多个应用的存储，每个应用都有自己独立的存储空间。
                    请先指定所在应用的名称(通过配置 @definejs/session-storage.defaults 模块的 name 字段) 。`
                );
            }
    
            let meta = {
                'name': name,       //应用名称。
                'id': id,           //
            };
    
            mapper.set(this, meta);
    
        }
    
        /**
        * 设置一对键值。
        * 已重载 set(obj); 批量设置。
        * 已重载 set(key, value); 单个设置。
        * @param {string} key 要进行设置的键名称。
        * @param value 要进行设置的值，可以是任何类型。
        */
        set(key, value) {
            let meta = mapper.get(this);
            let app = Storage.get(meta.name) || {}; //每次都实时从存储中获取。
            let data = app[meta.id] || {};
    
            //重载 set({...}); 批量设置的情况。
            if (typeof key == 'object') {
                Object.assign(data, key);
            }
            else { //单个设置
                data[key] = value;
            }
    
            app[meta.id] = data;
            Storage.set(meta.name, app);
        }
    
        /**
        * 根据给定的键获取关联的值。
        * 已重载 get() 获取全部的情况。
        * @param {string} [key] 要进行获取的键名称。
        * @return 返回该键所关联的值。
        */
        get(key) {
            let meta = mapper.get(this);
            let app = Storage.get(meta.name) || {};   //每次都实时从存储中获取。
            let data = app[meta.id];
    
            if (!data) {
                return;
            }
    
            //重载 get(); 获取全部的情况
            if (arguments.length == 0) {
                return data;
            }
    
            //重载 get(key); 获取指定键的值。
            return data[key];
        }
    
        /**
        * 移除给定的键所关联的项。
        * @param {string} key 要进行移除的键名称。
        */
        remove(key) {
            let meta = mapper.get(this);
            let app = Storage.get(meta.name) || {}; //每次都实时从存储中获取。
            let data = app[meta.id];
    
            if (!data) {
                return;
            }
    
            delete data[key];
    
            Storage.set(meta.name, app);
        }
    
        /**
        * 清空所有项。
        */
        clear() {
            let meta = mapper.get(this);
            let app = Storage.get(meta.name); //每次都实时从存储中获取。
    
            if (!app) {
                return;
            }
    
            delete app[meta.id];
            Storage.set(meta.name, app);
        }
    }
    
    SessionStorage.defaults = require('SessionStorage.defaults');
    module.exports = exports = SessionStorage;
});