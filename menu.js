var GAME_NAME = "Serpent Works";
var difficultySelection = 2;
var Menu = /** @class */ (function () {
    function Menu() {
        this.game = new Game();
    }
    Menu.prototype.ShowMenu = function (container) {
        var _this = this;
        //SET UP BUTTONS AND CLICK EVENTS
        container.innerHTML = "";
        var left_column = document.createElement("div");
        left_column.className = "col-md-2";
        var menu = document.createElement("div");
        menu.className = "col-md-8";
        var lblTitle = document.createElement("label");
        lblTitle.appendChild(document.createTextNode(GAME_NAME));
        lblTitle.className = "title";
        var btnSinglePlayer = document.createElement("button");
        btnSinglePlayer.appendChild(document.createTextNode("1 Player"));
        btnSinglePlayer.className = 'btn btn-block btn-danger menuItem';
        btnSinglePlayer.addEventListener("click", function (e) {
            _this.StartSinglePlayer(container);
        });
        var btnTwoPlayer = document.createElement("button");
        btnTwoPlayer.appendChild(document.createTextNode("2 Player"));
        btnTwoPlayer.className = 'btn btn-block btn-danger menuItem';
        btnTwoPlayer.addEventListener("click", function (e) {
            _this.StartMultiPlayer(container);
        });
        var btnSinglePlayerHighScores = document.createElement("button");
        btnSinglePlayerHighScores.appendChild(document.createTextNode("1 Player High Scores"));
        btnSinglePlayerHighScores.className = 'btn btn-block btn-danger menuItem';
        btnSinglePlayerHighScores.addEventListener("click", function (e) {
            _this.ShowHighScores(container);
        });
        var btnTwoPlayerHighScores = document.createElement("button");
        btnTwoPlayerHighScores.appendChild(document.createTextNode("2 Player High Scores"));
        btnTwoPlayerHighScores.className = 'btn btn-block btn-danger menuItem';
        btnTwoPlayerHighScores.addEventListener("click", function (e) {
            _this.ShowTwoPlayerHighScores(container);
        });
        var btnAISnake = document.createElement("button");
        btnAISnake.appendChild(document.createTextNode("AI Snake"));
        btnAISnake.className = 'btn btn-block btn-danger menuItem';
        btnAISnake.addEventListener("click", function (e) {
            _this.ShowAISnake(container);
        });
        menu.appendChild(lblTitle);
        menu.appendChild(btnSinglePlayer);
        menu.appendChild(btnTwoPlayer);
        menu.appendChild(btnSinglePlayerHighScores);
        menu.appendChild(btnTwoPlayerHighScores);
        menu.appendChild(btnAISnake);
        container.appendChild(left_column);
        container.appendChild(menu);
    };
    Menu.prototype.StartSinglePlayer = function (container) {
        var _this = this;
        // start game, set up canvas, and create quit button
        isPaused = false;
        var cycle;
        container.innerHTML = '';
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', WIDTH.toString());
        canvas.setAttribute('height', HEIGHT.toString());
        canvas.id = 'game';
        container.appendChild(canvas);
        var quitButton = document.createElement("button");
        quitButton.className = 'quit';
        quitButton.appendChild(document.createTextNode("✖"));
        quitButton.addEventListener("click", function () { return _this.ShowMenu(container); });
        container.appendChild(quitButton);
        var ctx = canvas.getContext("2d");
        ctx.font = "22px Arial";
        //initialize the player
        var player = [];
        var px = 5;
        var py = 5;
        var length = 5;
        var dx = 1;
        var dy = 0;
        //initialize the apple
        var apple = this.game.createApple(player);
        var sApple;
        setInterval(this.game.createSpecialApple(player, function (a) {
            sApple = a;
        }), 15000);
        console.log("apple: ", apple);
        var interval = 60;
        document.addEventListener("keydown", function (e) {
            //handle direction changes and pauses
            switch (e.keyCode) {
                //left
                case 37:
                    dx = -1;
                    dy = 0;
                    break;
                //up
                case 38:
                    dx = 0;
                    dy = -1;
                    break;
                //right
                case 39:
                    dx = 1;
                    dy = 0;
                    break;
                //down
                case 40:
                    dx = 0;
                    dy = 1;
                    break;
                //pause
                case 80:
                    isPaused = !isPaused;
                    if (isPaused)
                        clearInterval(cycle);
                    else
                        cycle = setInterval(play, interval);
                    break;
            }
        });
        cycle = setInterval(play, interval);
        var game = this.game;
        var getName = this.getName;
        var ShowMenu = this.ShowMenu;
        function play() {
            //refresh
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            //draw head and apple
            ctx.fillStyle = "#0000FF";
            ctx.fillRect(10 + px * BLOCK_SIZE, 40 + py * BLOCK_SIZE, BLOCK_SIZE_H, BLOCK_SIZE_V);
            ctx.fillStyle = "#FF00FF";
            ctx.fillRect(10 + sApple.x * BLOCK_SIZE, 40 + sApple.y * BLOCK_SIZE, BLOCK_SIZE_H, BLOCK_SIZE_V);
            //check death
            if (game.check(px, py, player)) {
                //create body and draw it
                player.push({ x: px, y: py });
                while (player.length > length)
                    player.shift();
                game.drawPlayer(ctx, player, '#0000FF');
                //move player
                px += dx;
                py += dy;
                //wrap screen
                if (px === hSize)
                    px = 0;
                else if (px === -1)
                    px = hSize - 1;
                if (py === vSize)
                    py = 0;
                else if (py === -1)
                    py = vSize - 1;
                //check if apple is eaten
                if (px === apple.x && py === apple.y) {
                    length++;
                    if (length % 5 === 0) {
                        //speed game up every 5th apple
                        clearInterval(cycle);
                        interval *= 0.985;
                        cycle = setInterval(play, interval);
                    }
                    apple = game.createApple(player);
                }
                if (px === sApple.x && py === sApple.y) {
                    switch (sApple.type) {
                        case "big":
                            length += 2;
                            break;
                        case "minimize":
                            length -= Math.round(length / 10);
                            break;
                        case "speed":
                            interval *= 0.945;
                            clearInterval(cycle);
                            cycle = setInterval(play, interval);
                            setTimeout(function () {
                                interval *= 1 / 0.945;
                                clearInterval(cycle);
                                cycle = setInterval(play, interval);
                            }, 5000);
                            break;
                        case "slow":
                            interval *= 1.055;
                            clearInterval(cycle);
                            cycle = setInterval(play, interval);
                            setTimeout(function () {
                                interval *= 1 / 1.055;
                                clearInterval(cycle);
                                cycle = setInterval(play, interval);
                            }, 5000);
                            break;
                    }
                    game.createSpecialApple(player, function (a) {
                        sApple = a;
                    });
                }
                ctx.fillText("Player 1 - Length: " + length + " Speed: " + interval, BLOCK_SIZE_H, BLOCK_SIZE_V);
            }
            else {
                getName(canvas, ctx, "Enter name: ", function (name) {
                    game.addHighScore(length, name);
                    ShowMenu(container);
                });
                clearInterval(cycle);
            }
        }
    };
    Menu.prototype.StartMultiPlayer = function (container) {
        var _this = this;
        //initalize game canas, same as single player
        isPaused = false;
        container.innerHTML = '';
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', WIDTH.toString());
        canvas.setAttribute('height', HEIGHT.toString());
        canvas.id = 'game';
        var ctx = canvas.getContext("2d");
        ctx.font = "22px Tahoma";
        var quitButton = document.createElement("button");
        quitButton.className = 'quit red';
        quitButton.appendChild(document.createTextNode("✖"));
        quitButton.addEventListener("click", function () {
            _this.ShowMenu(container);
        });
        container.appendChild(quitButton);
        container.appendChild(canvas);
        //set up both players starting stats
        var player1 = [];
        var p1x = 5;
        var p1y = 5;
        var length1 = 5;
        var player2 = [];
        var p2x = 15;
        var p2y = 15;
        var length2 = 5;
        //create and set up each player's apple
        var apple1 = this.game.createApple2(player1, player2);
        var apple2 = this.game.createApple2(player1, player2);
        var apple1img = document.getElementById("apple");
        var apple2img = document.getElementById("apple2");
        var sApple;
        setInterval(this.game.createSpecialApple2(player1, player2, function (a) {
            sApple = a;
        }), 15000);
        var d1x = 1;
        var d1y = 0;
        var d2x = -1;
        var d2y = 0;
        document.addEventListener("keydown", function (e) {
            // change either player's direction or pause
            switch (e.keyCode) {
                case 37:
                    d1x = -1;
                    d1y = 0;
                    break;
                case 38:
                    d1x = 0;
                    d1y = -1;
                    break;
                case 39:
                    d1x = 1;
                    d1y = 0;
                    break;
                case 40:
                    d1x = 0;
                    d1y = 1;
                    break;
                case 65:
                    d2x = -1;
                    d2y = 0;
                    break;
                case 87:
                    d2x = 0;
                    d2y = -1;
                    break;
                case 68:
                    d2x = 1;
                    d2y = 0;
                    break;
                case 83:
                    d2x = 0;
                    d2y = 1;
                    break;
                case 80:
                    isPaused = !isPaused;
                    if (isPaused)
                        clearInterval(cycle);
                    else
                        cycle = setInterval(game, 60);
                    break;
            }
        });
        var interval = 60;
        var cycle = setInterval(play, interval);
        var game = this.game;
        var getName = this.getName;
        var ShowMenu = this.ShowMenu;
        function play() {
            //refresh
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            // draw player 1's head and apple
            ctx.fillStyle = "#0000FF";
            ctx.fillRect(10 + p1x * BLOCK_SIZE, 40 + p1y * BLOCK_SIZE, 15, 15);
            ctx.drawImage(this.game.apple1img, 10 + apple1.x * BLOCK_SIZE, 40 + apple1.y * BLOCK_SIZE);
            // draw player 2's head and apple
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(10 + p2x * BLOCK_SIZE, 40 + p2y * BLOCK_SIZE, 15, 15);
            ctx.drawImage(this.game.apple2img, 10 + apple2.x * BLOCK_SIZE, 40 + apple2.y * BLOCK_SIZE);
            // draw special apple
            ctx.fillStyle = "#FF00FF";
            ctx.fillRect(10 + sApple.x * BLOCK_SIZE, 40 + sApple.y * BLOCK_SIZE, 15, 15);
            //check colissions
            if (this.game.check2(p1x, p1y, player1, player2) && this.game.check2(p2x, p2y, player1, player2)) {
                //shift boddies and draw them
                player1.push({ x: p1x, y: p1y });
                player2.push({ x: p2x, y: p2y });
                if (player1.length > length1)
                    player1.shift();
                if (player2.length > length2)
                    player2.shift();
                this.game.drawPlayer(ctx, player1, '#0000FF');
                p1x += d1x;
                p1y += d1y;
                this.game.drawPlayer(ctx, player2, '#FF0000');
                p2x += d2x;
                p2y += d2y;
                //wrap both players
                if (p1x === hSize)
                    p1x = 0;
                else if (p1x === -1)
                    p1x = hSize - 1;
                if (p1y === vSize)
                    p1y = 0;
                else if (p1y === -1)
                    p1y = vSize - 1;
                if (p2x === hSize)
                    p2x = 0;
                else if (p2x === -1)
                    p2x = hSize - 1;
                if (p2y === vSize)
                    p2y = 0;
                else if (p2y === -1)
                    p2y = vSize - 1;
                //if any of them has eaten an apple, grow them
                if (p1x === apple1.x && p1y === apple1.y) {
                    length1++;
                    apple1 = this.game.createApple(player1);
                }
                if (p1x === sApple.x && p1y === sApple.y) {
                    switch (sApple.type) {
                        case "big":
                            length1 += 2;
                            break;
                        case "minimize":
                            length1 -= Math.round(length / 10);
                            break;
                        case "speed":
                            interval *= 0.955;
                            clearInterval(cycle);
                            cycle = setInterval(game, interval);
                            setTimeout(function () {
                                interval *= 1 / 0.955;
                                clearInterval(cycle);
                                cycle = setInterval(game, interval);
                            }, 5000);
                            break;
                        case "slow":
                            interval *= 1.045;
                            clearInterval(cycle);
                            cycle = setInterval(game, interval);
                            setTimeout(function () {
                                interval *= 1 / 1.045;
                                clearInterval(cycle);
                                cycle = setInterval(game, interval);
                            }, 5000);
                            break;
                    }
                    this.game.createSpecialApple2(player1, player2, function (a) { return sApple = a; });
                }
                if (p2x === apple2.x && p2y === apple2.y) {
                    length2++;
                    apple2 = this.game.createApple(player2);
                }
                if (p2x === sApple.x && p2y === sApple.y) {
                    switch (sApple.type) {
                        case "big":
                            length2 += 2;
                            break;
                        case "minimize":
                            length2 -= Math.round(length / 10);
                            break;
                        case "speed":
                            interval *= 0.945;
                            clearInterval(cycle);
                            cycle = setInterval(game, interval);
                            setTimeout(function () {
                                interval *= 1 / 0.945;
                                clearInterval(cycle);
                                cycle = setInterval(game, interval);
                            }, 5000);
                            break;
                        case "slow":
                            interval *= 1.055;
                            clearInterval(cycle);
                            cycle = setInterval(game, interval);
                            setTimeout(function () {
                                interval *= 1 / 1.055;
                                clearInterval(cycle);
                                cycle = setInterval(game, interval);
                            }, 5000);
                            break;
                    }
                    this.game.createSpecialApple2(player1, player2, function (a) { return sApple = a; });
                }
                this.game.drawPlayer(ctx, player2, '#0000FF');
                ctx.fillText("Player 1 - Length: " + length1, 15, 18);
                this.game.drawPlayer(ctx, player2, '#FF0000');
                ctx.fillText("Player 2 - Length: " + length2, 315, 18);
            }
            else {
                this.getName(canvas, ctx, "Enter team name: ", function (name) {
                    this.game.add2playerHighScore(length1 + length2, name);
                    this.game.ShowMenu(container);
                });
                clearInterval(cycle);
            }
        }
    };
    Menu.prototype.ShowHighScores = function (container) {
        var _this = this;
        container.innerHTML = "";
        var left_column = document.createElement("div");
        left_column.className = "col-md-2";
        var menu = document.createElement("div");
        menu.className = "col-md-8";
        for (var score in HighScores) {
            container.innerHTML += (parseInt(score) + 1) + '. ' + HighScores[score].name + ' - ' + HighScores[score].score + '<br/>';
        }
        var backButton = document.createElement("button");
        backButton.appendChild(document.createTextNode("Go Back"));
        backButton.addEventListener("click", function () { return _this.ShowMenu(container); });
        backButton.className = 'btn btn-block btn-danger menuItem';
        menu.appendChild(backButton);
        container.appendChild(left_column);
        container.appendChild(menu);
    };
    Menu.prototype.ShowTwoPlayerHighScores = function (container) {
        var _this = this;
        container.innerHTML = "";
        var left_column = document.createElement("div");
        left_column.className = "col-md-2";
        var menu = document.createElement("div");
        menu.className = "col-md-8";
        for (var score in TwoPlayerHighScores) {
            container.innerHTML += (parseInt(score) + 1) + '. ' + TwoPlayerHighScores[score].name + ' - ' + TwoPlayerHighScores[score].score + '<br/>';
        }
        var backButton = document.createElement("button");
        backButton.appendChild(document.createTextNode("Go Back"));
        backButton.addEventListener("click", function () { return _this.ShowMenu(container); });
        backButton.className = 'btn btn-block btn-danger menuItem';
        menu.appendChild(backButton);
        container.appendChild(left_column);
        container.appendChild(menu);
    };
    Menu.prototype.getName = function (canvas, ctx, text, cb) {
        //setup screen
        var name = '';
        ctx.fillStyle = 'white';
        ctx.fillRect(100, 180, 440, 60);
        ctx.fillStyle = 'black';
        ctx.fillText(text + name, 110, 210);
        //listen to keystrokes
        document.addEventListener("keyup", listenToName, true);
        function listenToName(e) {
            // if character or number add to name, if backspace shorten last char, if enter
            // callback function and remove this event listener
            if (e.key.length == 1 && e.key.match(/[a-z0-9]/i))
                name += e.key;
            else if (e.key == 'Backspace')
                name = name.slice(0, -1);
            else if (e.key == 'Enter') {
                cb(name);
                document.removeEventListener("keyup", listenToName, true);
            }
            //refresh name dialog
            ctx.fillStyle = 'white';
            ctx.fillRect(100, 180, 440, 60);
            ctx.fillStyle = 'black';
            ctx.fillText(text + name, 110, 210);
        }
    };
    Menu.prototype.ShowAISnake = function (container) {
        // start game, set up canvas, and create quit button
        var traversal = new Traversal();
        var board = new Board(container, WIDTH, HEIGHT, difficultySelection);
        board.start();
    };
    return Menu;
}());
//# sourceMappingURL=menu.js.map