
const fs = require('fs-extra');
const path = require("path")

let createItemData = {
    template: {
        init: [
            "images",
            "src/mian.js",
            "src/css.css",
            "src/sass.sass",
            { "index.html":{src:'../tm.html'} },
            { ".gitignore": `tignore\n node_modules\n .DS_Store` }
        ],
        pc: [
            "images",
            "src/mian.js",
            "src/css.css",
            "src/sass.sass",
            { "index.html": '' },
            { ".gitignore": `tignore\n node_modules\n .DS_Store` }
        ],
        cy:'../a'
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


// // λ node server.js --template=newItem  --src="./xsc"
let a = new Argvs();
if (!a.argvsAll.length){
    console.log(new Error('× _ 请填写必要参数。\n 传参示例: --template=pc  --src="./dir'))
    return 
}
if (!a.argvsGet('src')) {
    console.log(new Error('× _ 生成路径src不能为空。\n 传参示例: --template=pc  --src="./dir'))
    return 
}
if (!a.argvsGet('template')){
    console.log(new Error(`× _ --template 参数不能为空。\n 可用参数: ${Object.keys(createItemData.template)}`))
    return
}
let local = path.resolve(__dirname, a.argvsGet('src'));

/***
 * 检查当前项目是否已存在
 */
fs.access(local, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    /* 已存在不再执行构建任务 */ 
    if (!err) {
        console.log(`× _ 该项目已存在：${local}`)
        return
    }


    /**
     * 生成规则 ：  
     *  1. --template 无参数走默认生成init
     *  2. --template 参数 找不到这个模版报错
     * 
     *      template 参数[] = 自动生成【配置】文件
     *      template 参数str = 拷贝这个路径下的整个目录
     * */
    
    let tmp_ag = createItemData.template[a.argvsGet('template')]   //'init'
    // 判断输入的 --template=xxx不存在，就报错
    if (a.argvsGet('template') && !tmp_ag){
        console.log(`× _ ${a.argvsGet('template')}不存在该模版的`);
        return
    }

        
    console.log( `√ . 开始构建：${local}`)
    let mor =  createItemData.template[a.argvsGet('template') || 'init']
    
    // 如果模版内容是字符串路径就去拷贝整个路径下面的文件
    if (typeof mor === 'string'){
        fs.copy(path.resolve(local, mor), local).then(()=>{
            console.log(`√ . 创建完成 (${local})`)
        }).catch(err=>{
            console.log(`× . 创建错误：${err}`)
        })
        return
    }
    
    let cindex = 0; //记录生成文件
    let createArratFn =  createItemData.template[a.argvsGet('template') ||'init'].map(item => {
        cindex++;
        if (typeof item==='string'){
            // 空文件夹 | 空文件 
            let csrc = path.resolve(local, item)
            console.log(`√ _ ${cindex}.开始构建：${csrc}`)

            return (!path.extname(item).length) ? fs.ensureDir(csrc) : fs.ensureFile(csrc)
        }else{
            let keyFile = Object.keys(item)[0]
            let csrc = path.resolve(local, keyFile)
            console.log(`√ _ ${cindex}.开始构建：${csrc}`)

            if (typeof item[keyFile] === 'string'){
                return fs.outputFile(csrc, item[keyFile])
            }else{
                let cpsrc = path.resolve(local, keyFile)
                if (item[keyFile].src){
                    // 复制制定路径文件，到一个目录下
                    return fs.copy(path.resolve(local, item[keyFile].src), csrc)
                }
            }
        }
    });


    Promise.all(createArratFn).then(()=>{
        console.log(`√ . 创建完成 (${local})`)
    }).catch((err)=>{
        console.log(`× . 创建错误：${err}`)
    })


})
