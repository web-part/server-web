
define('HtmlStat', function (require, module, exports) {
    const $Array = require('@definejs/array');
    const Repeat = module.require('Repeat');


    return {

        /**
        * 对分析出来的列表信息从多个维度作进一步分析、提取和归类等，以便后续快速使用相关维度的数据。
        */
        parse(file$info) {
            let id$module = {};     //记录模块 id 对应的模块信息记录。 
            let method$ids = {};    //记录模块的定义方法对应的模块列表。 即按定义方法把模块进行归类。
            let level$ids = {};     //层级对应的模块列表。
            let file$ids = {};      //记录文件名对应的模块 id。 可能存在一对多，即一个文件里定义了两个模块（相同或不同模块）。
            let dir$ids = {};       //目录对应的模块 id。
            let factory$ids = {};   //
            let name$ids = {};      //

            let id$childs = {};     //记录模块 id 对应的直接子模块 id 列表。
            let id$children = {};   //记录模块 id 对应的所有子模块 id 列表。


            Object.entries(file$info).forEach(([file, info]) => {
                //info = { isUTF8, lines, links, md5, modules, stat, }

                let dir = file.split('/').slice(0, -1).join('/');

                if (dir) {
                    dir += '/';
                }

                //这个是必须的，可以发现不存在 module 的文件。
                file$ids[file] = []; 
                dir$ids[dir] = dir$ids[dir] || [];

                info.modules.forEach((module) => {
                    let { factory, id, method, } = module;
                    let old = id$module[id];

                    if (Repeat.check({ old, file, })) {
                        throw new Error(`已存在相同 id 的模块: ${id}`);
                    }

                    let names = id.split('/');
                    let name = names.slice(-1)[0];
                    let level = names.length;
                    let parent = undefined;
                    let parents = [];

                    $Array.add(method$ids, method, id);
                    $Array.add(level$ids, level, id);
                    $Array.add(file$ids, file, id);
                    $Array.add(dir$ids, dir, id);
                    $Array.add(factory$ids, factory.type, id);
                    $Array.add(name$ids, name, id);


                    if (level > 1) {
                        //`A/B/C/D` --> ['A', 'B', 'C']
                        parents = names.slice(0, -1);  

                        //父模块 id，如 `A/B/C`。
                        //可能不存在。
                        parent = parents.join('/');    

                        $Array.add(id$childs, parent, id);

                        // `A/B/C/D` ---> ['A/B/C', 'A/B', 'A']
                        parents = parents.map((name, index) => {
                            let pid = names.slice(0, index + 1).join('/'); //可能不存在。
                            $Array.add(id$children, pid, id);
                            return pid;
                        }).reverse();
                    }

                    
                    id$module[id] = {
                        dir, file,
                        factory, id, method,
                        names, name, level,
                        parent, parents,
                        childs: [],
                        children: [],
                        siblings: [],
                    };
                });
            });

            Object.entries(id$childs).forEach(([id, childs]) => {
                childs.sort();

                childs.forEach((id) => {
                    let module = id$module[id]; //这个肯定不为空。

                    //从过滤掉自己，剩下的就是兄弟节点了。
                    module.siblings = childs.filter((sid) => {
                        return sid != id;
                    });
                });


                let module = id$module[id]; //这个可能为空。

                if (module) {
                    module.childs = childs;
                }

            });


            Object.entries(id$children).forEach(([id, children]) => {
                children.sort();

                let module = id$module[id];
                if (module) {
                    module.children = children;
                }
            });



            return { id$module, method$ids, level$ids, file$ids, dir$ids, factory$ids, name$ids,  };
        },



    };

});
