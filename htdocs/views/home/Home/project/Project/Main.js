

define.panel('/Home/Project/Main', function (require, module, panel) {
    const $Date = require('@definejs/date');

    panel.on('init', function () {


        panel.template({
            '': function (data) {
                let table = this.fill('table', data);
                return table;
            },

            'table': {
                '': function (data) {
                    let { process, package, cwd, } = data;
                    let { repository, } = package;
                    let keywords = JSON.stringify(package.keywords).split('","').join('", "');

                  
                    let processInfo = {
                        time: '',
                        status: 'stop',
                        statusText: ' 已停止',
                        pid: '',
                        argv: '',
                    };

                    if (process) {
                        let { time, argv, pid, } = process;

                        time = $Date.format(time, 'yyyy-MM-dd HH:mm:ss');
                        argv = JSON.stringify(argv.slice(2)).split('","').join('", "');

                        processInfo = {
                            time,
                            argv: `[ ${argv.slice(1, -1)} ]`,
                            status: 'play',
                            statusText: ' 监控中',
                            pid,
                        };
                    }


                    return {
                        'cwd': cwd,
                        'name': package.name,
                        'description': package.description,
                        'repositoryHref': repository ? repository.url.slice(0, -4) : '',
                        'repositoryUrl': repository ? repository.url : '',
                        'version': package.version,
                        'keywords': `[ ${keywords.slice(1, -1)} ]`,
                        'author': package.author,
                        'email': package.email,

                        ...processInfo,

                    };
                },

            

            },
        });


    });


    panel.on('render', function (data) {

        panel.fill(data);
    });


    return {
        
    };

});
