/**
* file: @definejs/module-manager/modules/ModuleManager.js
* package: @definejs/module-manager@1.0.2
*/
$define('ModuleManager', function (require, module, exports) { 
    
    const Module = module.require('Module');
    
    const mapper = new Map();
    
    let idCounter = 0;
    
    
    class ModuleManager {
        /**
        * 构造器。
        *   options = {
        *       seperator: '/',     //模块 id 内的名称分隔符，如 `Users/List/API` 中的 `/`。
        *       cross: false,       //是否允许跨级加载模块。
        *       repeated: false,    //是否允许重复定义同一个 id 的模块。
        *       Emitter: null,      //事件驱动器类。
        *   };
        */
        constructor(options) {
            let config = Object.assign({}, exports.defaults, options);
            let Emitter = config.Emitter;
            let emitter = Emitter ? new Emitter(this) : null;
    
            let id = `definejs-ModuleManager-${idCounter++}`;
    
            let meta = {
                'id': id,                       //实例的 id，方便调试。
                'id$module': {},                //
                'id$data': {},                  //模块关联的自定义数据，仅供模块的工厂函数中内部使用。
                'seperator': config.seperator,  //父子模块命名中的分隔符，如 `User/List/API`。
                'cross': config.cross,          //是否允许跨级加载模块。
                'repeated': config.repeated,    //是否允许重复定义模块。
                'emitter': emitter,             //当前 `模块管理器` 的全局事件管理器。
                'Emitter': Emitter,             //事件管理器构造器。 用于 define() 中，以便针对每个模块创建它私有的 emitter。
                'this': this,                   //方便内部访问 this 对象。
    
                /**
                * 用于给工厂函数加载公共模块。
                * 同时限制为仅允许加载公共模块。
                * 即 factory(require, module, exports){ } 中的第一个参数 `require`。
                */
                require(id) {
                    return meta.this.require(id);
                },
    
                /**
                * 内部使用的，触发全局事件。
                */
                fire(...args) {
                    emitter && emitter.fire(...args);
                },
    
                /**
                * 内部使用的，获取指定 id 对应的父模块对象。
                * 如 `User/List/API` 的父模块 id 为 ``User/List`。
                */
                getParent(id) {
                    let seperator = meta.seperator;
                    let names = id.split(seperator);
    
                    //顶级模块。
                    if (names.length == 1) {
                        return null;
                    }
    
                    //如 `Users/List`
                    let pid = names.slice(0, -1).join(seperator);
    
                    return meta.id$module[pid] || null;
                },
    
            };
    
            mapper.set(this, meta);
    
            Object.assign(this, {
                'id': meta.id,
            });
    
    
            //全局地监听每个模块的首次加载事件。
            this.on('require', function (id, module, exports) {
                //触发被加载模块的首次加载事件。
                module.fire('require', [exports]);
    
                //触发本级模块的事件。
                //取它的父模块的事件管理器。
                let parent = module.parent;
    
                if (parent) {
                    parent.fire('require', module.name, [exports]);
                }
    
            });
    
        }
    
        // /**
        // * 实例的 id。
        // */    
        // id = ''
    
    
        /**
        * 设置指定模块关联的自定义数据。
        * 模块关联的自定义数据仅供模块的工厂函数中内部使用。
        * 即在 define(id, function(require, module, exports) {
        *   var data = module.data;
        * });
        * @param {string} id 模块 id。
        * @param {*} data 模块对应的自定义数据。
        * @returns {*} 返回入参 data。
        */
        data(id, data) {
            if (typeof id != 'string') {
                throw new Error(`参数 id 为要设置的模块的 id，必须为 string 类型。`);
            }
    
            let meta = mapper.get(this);
            meta.id$data[id] = data;
            return data;
        }
    
        /**
        * 定义一个模块。
        * @param {string} id 模块的名称。
        * @param {function|Object|Array} factory 模块的工厂函数或导出对象。
        *   工厂函数原型为 factory(require, module, exports) { }
        */
        define(id, factory) {
            if (typeof id != 'string') {
                throw new Error(`参数 id 的类型必须为 string，当前为: ${typeof id}`);
            }
    
            let meta = mapper.get(this);
            let id$module = meta.id$module;
    
            if (!meta.repeated && id$module[id]) {
                throw new Error(`配置设定了不允许定义重复的模块: 已存在名为 ${id} 的模块`);
            }
    
            let Emitter = meta.Emitter;
            let emitter = Emitter ? new Emitter() : null;
            let name = id.split(meta.seperator).slice(-1)[0];      //取最项一项作为短名称，如 `API`。
    
            id$module[id] = {
                'id': id,           //全名称，如 `Users/List/API`。
                'name': name,       //短名称，如 `API`。 如果 name == id，则说明是顶级模块，即不含有 `/`。
                'factory': factory, //原始的工厂函数或导出对象。
                'emitter': emitter, //用于工厂函数第二个参数 `module` 的事件驱动器。
    
                //以下的在 require() 后肯定会给改写。
                'parent': null,     //父级对象。 如果为空，则说明是顶级模块。
                'required': false,  //指示是否已经 require 过。
                'count': 0,         //require 的次数统计。
    
                //以下的在 require() 后可能会给改写。
                'exports': null,    //最终的导出对象。 要么是 factory 本身，要么是 factory 运行后的结果。
                'mod': null,        //工厂函数第二个参数 `module`。 如果工厂函数是一个直接导出对象，则它为空。
    
                //触发当前模块级别的事件。
                fire() {
                    emitter && emitter.fire(...arguments);
                },
    
            };
        }
    
        /**
        * 加载指定的模块。
        * @param {string} id 模块的名称。
        * @param {boolean} cross 是否允许跨级加载模块。
        *   如果不指定，则根据创建实例时指定的 cross 来决定。
        * @return 返回指定的模块的导出对象。
        */
        require(id, cross) {
            if (typeof id != 'string') {
                throw new Error(`参数 id 的类型必须为 string，当前为: ${typeof id}`);
            }
    
            let meta = mapper.get(this);
            let seperator = meta.seperator;
    
    
            //未指定，则使用创建实例时的配置。
            if (cross === undefined) {
                cross = meta.cross;
            }
    
    
            if (!cross && id.includes(seperator)) {
                throw new Error(`参数指定了或配置设定了不允许跨级加载模块: ${id}`);
            }
    
            //不存在该模块。
            if (!this.has(id)) {
                return;
            }
    
            let id$module = meta.id$module;
            let module = id$module[id];
    
            //加载次数累计。
            module.count++;
    
    
            //已经加载过了。
            if (module.required) {
                return module.exports;
            }
    
            //==============================================================================
            //首次加载。
            module.required = true; //更改标志，指示已经 require 过一次。
    
            let factory = module.factory;
            let parent = module.parent = meta.getParent(id);
    
            //非工厂函数，则直接导出。
            if (typeof factory != 'function') {
                module.exports = factory;
                meta.fire('require', id, [module, factory]);
                meta.fire('require', [id, module, factory]);
                return factory;
            }
    
            //--------------------------------------------------------------------------------
            //factory 是个工厂函数。
    
            //同时也要赋值给 module.exports，针对两个模块间的循环 require 时用到。
            //因为此时在 factory 中会提前用到 exports。
            let exports = module.exports = {};
    
            //mod 就是工厂函数 factory(require, module, exports) 中的第二个参数啦。
            let mod = module.mod = new Module(id, {
                'seperator': seperator,
                'mm': this,
                'emitter': module.emitter,
    
                //会扩展到 mod 的属性。
                'data': meta.id$data[id],
                'exports': exports,                     //模块的导出对象。
                'parent': parent ? parent.mod : null,   //父模块实例。
            });
    
            //调用工厂函数获得导出对象。
            exports = factory(meta.require, mod, exports);
    
            //没有通过 return 来返回值，则要导出的值只能在 mod.exports 里。
            if (exports === undefined) {
                exports = mod.exports;
            }
    
            //这条是必须的。 因为 factory() 可能返回了一个新的导出对象。
            module.exports = exports;
    
            //这条，给提供业务层提供方便。
            //即使业务层是通过 return 来返回导出对象，
            //导出对象各成员函数之间依然可以通过 `module.exports.xx` 来引用其它的成员。
            mod.exports = exports;
    
            meta.fire('require', id, [module, exports]);
            meta.fire('require', [id, module, exports]);
    
            return exports;
        }
    
        /**
        * 绑定事件。
        */
        on(...args) {
            let meta = mapper.get(this);
            let emitter = meta.emitter;
    
            emitter && emitter.on(...args);
        }
    
        /**
        * 判断指定的模块是否已定义。
        */
        has(id) {
            let meta = mapper.get(this);
            let id$module = meta.id$module;
    
            return id$module.hasOwnProperty(id);
        }
    
        /**
        * 销毁本实例。
        */
        destroy() {
            let meta = mapper.get(this);
            let emitter = meta.emitter;
    
            emitter && emitter.destroy();
            mapper.delete(this);
        }
    
    
    }
    
    ModuleManager.defaults = require('ModuleManager.defaults');
    module.exports = exports = ModuleManager;
});
