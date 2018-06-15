import {Menu} from './menu';
import {Test} from './test';
import {$} from './node_modules/jquery'
function main() {
  let container = document.getElementById("container");
  let menu  = new Menu();
  menu.ShowMenu(container);

  let test = new Test(1);
  test.main();  
}

 main();

console.log("index.js");