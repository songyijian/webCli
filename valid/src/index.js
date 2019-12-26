import "./css.scss"
import "./css.css"
import { isObj, isArray} from "./ism.js"

const a = "string";
let fnc = ()=>{ console.log("=>")};

console.log( "isArray", isArray([1, 2, 3]));
console.log( "isObj", isObj(a));
fnc();


[1,2,3].forEach(item=>{
  console.log(item)
})

var x = 'xxx';
var y = 'xxx';

fnc()
console.log(a)

console.log(x, y, process.env.NODE_ENV )


// console.log(NODE_ENV)


