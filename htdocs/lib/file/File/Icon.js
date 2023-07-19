

define('File/Icon', function (require, module, exports) {
    let ext$font = {
        '/': 'fa fa-folder',
        '': 'fas fa-file-alt',

        'css': 'fab fa-css3-alt',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'html': 'fab fa-html5',
        'js': 'fab fa-node-js',
        'json': 'fab fa-npm',
        'less': 'fab fa-less',
        'md': 'fab fa-markdown',
        'map': 'fas fa-globe',

        'bmp': 'fas fa-file-image',
        'gif': 'fas fa-file-image',
        'jpg': 'fas fa-file-image',
        'jpeg': 'fas fa-file-image',
        'png': 'fas fa-file-image',

        'ttf': 'fas fa-font',
        'woff2': 'fas fa-font',
        'gitattributes': 'fab fa-square-git',
        'npmignore': 'fab fa-npm',
        'ds_store': 'fab fa-apple',
    };

   
   

    return {
        get(ext) {
            ext = ext.toLowerCase();

            let type = ext == '/' ? 'dir' : 'file';
            let font = ext$font[ext] || ext$font[''];
            let className = `FileIcon ${type} ${ext == '/' ? '' : ext} ${font}`;
            let html = `<i class="${className}"></i>`;

            return { type, font, className, html, };
        },

        
    };
});