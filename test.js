/* Constructor Patter */

let Utility = function () {

    let message = "Message";

    function log(msg) {
        console.log(msg);
    }

    return {
        log: log
    }

};