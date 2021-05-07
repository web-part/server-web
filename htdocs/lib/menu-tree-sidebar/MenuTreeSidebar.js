
/**
* 菜单树。
*/
define('MenuTreeSidebar', function (require, module, exports) {
    const AppModule = require('@definejs/app-module');
    const Emitter = require('@definejs/emitter');
    const $ = require('$');
    const Defaults = require('Defaults');
    const Events = module.require('Events');
    const Meta = module.require('Meta');
    const Template = module.require('Template');


    let mapper = new Map();


   
    class MenuTreeSidebar {

        constructor(config) {
            config = Defaults.clone(module, config);

            let emitter = new Emitter(this);

            let meta = Meta.create(config, {
                'this': this,
                'emitter': emitter,
            });

            meta.tpl = Template.create(meta);

            mapper.set(this, meta);

            Object.assign(this, {
                'id': meta.id,
                '$': meta.$,
            });

            Events.bind(meta);
        }


        /**
        * 渲染。
        *   data = {
        *       dir$dirs: {},   //某个目录对应的子目录列表（仅当前层级，不包括子目录的）。
        *       dir$files: {},  //某个目录对应的文件列表（仅当前层级，不包括子目录的）。
        *   };
        */
        render(data) {
            let meta = mapper.get(this);
            let html = meta.tpl.fill({});

            if (meta.container) {
                $(meta.container).html(html);
                meta.$ = meta.this.$ = $(`#${meta.id}`);
            }

            AppModule.fill('{MenuTreeSidebar.id}', {
                'MenuTreeSidebar.id': meta.id,
            });


            const Tree = require(`${meta.id}`);

            Tree.render(data);


           
           
        }
    }





    return MenuTreeSidebar;
});