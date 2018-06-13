function main() {
    let container = document.getElementById("container");
    let menu = new Menu();
    menu.ShowMenu(container);

    let test = new Test(1);
    test.main();

    let point = new Point(3,4);
    console.log(point.toString());
    breadth_first_search(0);
}

main();
console.log("index.js");