function main() {
    let container = document.getElementById("container");
    let menu  = new Menu();
    menu.ShowMenu(container);

    let test = new Test(1);
    test.main();

    $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
}

main();
console.log("index.js");