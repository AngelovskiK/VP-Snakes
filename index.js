function main() {
    let container = document.getElementById("container");
    let menu = new Menu();
    menu.ShowMenu(container);

    let test = new Test(1);
    test.main();

}

main();
console.log("index.js");