

define('File/Icon', function (require, module, exports) {
    let ext$icon = {
        'dir': 'fa fa-folder',
        'file': 'fas fa-file-alt',

        '.css': 'fab fa-css3-alt',
        '.doc': 'fas fa-file-word',
        '.docx': 'fas fa-file-word',
        '.html': 'fab fa-html5',
        '.js': 'fab fa-js-square',
        '.json': 'fab fa-npm',
        '.less': 'fab fa-less',
        '.md': 'fab fa-markdown',
        '.map': 'fas fa-globe',

        '.bmp': 'fas fa-file-image',
        '.jpg': 'fas fa-file-image',
        '.png': 'fas fa-file-image',
    };

   
   

    return {
        get({ type, ext, }) {
            if (type == 'dir') {
                let icon = ext$icon['dir'];
                let className = `FileIcon dir ${icon}`;
                let html = `<i class="${className}"></i>`;
                return { type, icon, className, html, };
            }


            let extName = ext.slice(1);
            let icon = ext$icon[ext] || ext$icon['file'];
            let className = `FileIcon file ${extName} ${icon}`;
            let html = `<i class="${className}"></i>`;

            return { type, ext, extName, className, icon, html, };
        },

        
    };
});