

define('/ModuleTree/Main/Stat/Data', function (require, module, exports) {
    const $Array = require('@definejs/array');
    const File = require('File');

    function getPercent(value, total) { 
        if (Array.isArray(value)) {
            value = value.length;
        }

        if (Array.isArray(total)) {
            total = total.length;
        }

        let percent = value / total * 100;

        percent = percent.toFixed(2);

        if (0<percent && percent < 0.2) {
            percent = 0.2;
        }

        return percent;
    }

    function getSize(ids, moduleStat) { 
        let { id$module, file$info, } = moduleStat;
        let total = 0;

        ids.forEach((id) => {
            if (typeof id == 'object') {
                id = id.data.module.id;
            }

            let { file, } = id$module[id];
            let { size, } = file$info[file];
            total += size.raw;
        });

        let size = File.getSize(total);

        return size;

    }


    function getLines(ids, moduleStat) { 
        let { id$module, file$info, } = moduleStat;
        let total = 0;

        ids.forEach((id) => {
            if (typeof id == 'object') {
                id = id.data.module.id;
            }

            let { file, } = id$module[id];
            let { lines, } = file$info[file];

            total += lines
        });

        return total;
    }

    return {
        
        get({ item, stat, }) {

            let { children, } = item;

            if (item.id != '/') {
                children = [item, ...children];
            }

            let { moduleStat, } = stat;

            
            let method$ids = {};        //记录模块的定义方法对应的模块列表。 即按定义方法把模块进行归类。
            let level$ids = {};         //层级对应的模块列表。
            let factory$ids = {};
            let name$ids = {};
            let dir$ids = {};
            let outer$ids = {};
            let public$ids = {};

          
            let totalSize = getSize(children, moduleStat);
            let totalLines = getLines(children, moduleStat);

            console.log({ totalSize, totalLines, });
        
            let list = [{
                
                group: 'all',
                name: '全部模块',
                count: {
                    value: children.length,
                    desc: '个',
                    percent: 0,
                },
                size: {
                    ...totalSize,
                    percent: 0,
                },

                line: {
                    value: totalLines,
                    desc: '行',
                    percent: 0,
                },
            }];

            function add(group, key$ids, fn) {
                Object.entries(key$ids).forEach(([key, ids]) => {
                    let size = getSize(ids, moduleStat);
                    let name = key;

                    if (fn) {
                        name = fn(key) || key;
                    }

                    let lines = getLines(ids, moduleStat);

                    list.push({
                        'group': group,
                        'name': name,
                        'count': {
                            value: ids.length,
                            desc: '个',
                            percent: getPercent(ids, children),
                        },
                        'size': {
                            ...size,
                            percent: getPercent(size.raw, totalSize.raw),
                        },

                        'line': {
                            value: lines,
                            desc: '行',
                            percent: getPercent(lines, totalLines),
                        },
                    });
                });
            }

        

            children.forEach(({ data, }) => {
                let { dir, factory, file, id, level, method, name, outers, publics, } = data.module;

                $Array.add(method$ids, method, id);
                $Array.add(level$ids, level, id);
                $Array.add(factory$ids, factory.type, id);
                $Array.add(name$ids, name, id);
                $Array.add(dir$ids, dir, id);

                
                outers.forEach((outer) => {
                    $Array.add(outer$ids, outer, id);
                });

                publics.forEach((public) => {
                    $Array.add(public$ids, public, id);
                });
            });


            add('method', method$ids, function (method) {
                return `定义方式为 ${method}`;
            });
            
            add('level', level$ids, function (level) { 
                return `${level}级模块`;
            });

            add('factory', factory$ids, function (factory) {
                return `导出对象为 ${factory}`;
            });

          
            add('outer', outer$ids, function (outer) {
                return `依赖 ${outer}`;
            });
            add('public', public$ids, function (public) {
                return `依赖 ${public}`;
            });

            add('name', name$ids, function (name) {
                return `.../${name}`;
            });
            // add('dir', dir$ids);
        

            return list;
        },

        

    };

});
