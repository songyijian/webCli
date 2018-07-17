
const path = require('path');
const fs = require('fs-extra');
//const local = path.resolve(__dirname, 'dist')

let createItemData = {
"template": {
        "pc" : [
            "images",
            "src/mian.js",
            "src/css.css",
            "src/sass.sass",
            { "html": '' },
            {
                ".gitignore":`tignore
                            node_modules
                            .DS_Store`
            }
        ]
    }
}



class Argvs {
    constructor() {
        this.argvsAll = this.argvsAll();
    }
    argvsAll() {
        return process.argv.slice(2).reduce((acc, item) => {
            item = item.split(/=/);
            const [k, v] = [item[0].replace(/-/gi, ''), item[1]];
            acc.push({
                [k]: v
            });
            return acc;
        }, [])
    }

    argvsGet(k) {
        return this.argvsAll.reduce((acc, item) =>
            acc ?
                acc :
                (k in item) ?
                    acc = item[k] :
                    acc, false)
    }

    argvsKeys(argvsAll) {
        if (!argvsAll) argvsAll = this.argvsAll;
        return argvsAll.reduce((acc, item) => {
            return [...acc, ...Object.keys(item)]
        }, [])
    }
    argvsHas(k) {
        return Object.is(this.argvsKeys().indexOf(k), -1) ? false : true;
    }

}

// // λ node server.js --name=ajanuw --post=14
// let a = new Argvs();
// console.log(a.argvsAll); // [ { name: 'ajanuw' }, { post: '14' } ]



