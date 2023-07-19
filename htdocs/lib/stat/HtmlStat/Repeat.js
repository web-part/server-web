

define('HtmlStat/Repeat', function (require, module, exports) {

    module.exports = {

        check({ old, file, }) {
            if (!old) {
                return false;
            }


            console.error(`已存在相同 id 的模块: ${old.id}\n 所在文件:\n ├──${old.file}\n └──${file}`);
            // console.error(`所在文件:`);
            // console.error(`├──${old.file}`);
            // console.error(`└──${file}`);

            definejs.alert(`已存在相同 id 的模块: ${old.id}<br/>详情请打开控制台`);

            return true;


        },
    };

});