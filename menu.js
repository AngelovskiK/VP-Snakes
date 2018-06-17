var GAME_NAME = "Serpent Works";
var DIFFICULTY = 2;
var YOUTUBE_VIDEO;
/*
* Type Of AI
* 0 - Uninformed Search => BFS
* 1 - Informed Search   => A*
* */
var TYPE_OF_AI = 1;
var Menu = /** @class */ (function () {
    function Menu() {
        this.game = new Game();
        this.width = 640;
        this.height = 480;
    }
    Menu.prototype.ShowMenu = function (container) {
        var _this = this;
        //SET UP BUTTONS AND CLICK EVENTS
        container.innerHTML = "";
        var left_column = document.createElement("div");
        left_column.className = "col-md-2";
        var menu = document.createElement("div");
        menu.className = "col-md-8";
        var title_div = document.createElement("div");
        title_div.className = "col-md-12";
        var lblTitle = document.createElement("label");
        lblTitle.appendChild(document.createTextNode(GAME_NAME));
        lblTitle.className = "title";
        title_div.appendChild(lblTitle);
        menu.appendChild(title_div);
        var difficulty_menu_left = document.createElement("div");
        var difficulty_menu_center = document.createElement("div");
        var difficulty_menu_right = document.createElement("div");
        difficulty_menu_left.className = "col-md-4";
        difficulty_menu_center.className = "col-md-4";
        difficulty_menu_right.className = "col-md-4";
        var btnEasy = document.createElement("button");
        btnEasy.appendChild(document.createTextNode("Easy"));
        btnEasy.className = "" + (DIFFICULTY == 1 ? 'btn btn-block btn-danger difficultyItem chosenDifficultyItem' : 'btn btn-block btn-danger difficultyItem');
        btnEasy.addEventListener("click", function (e) {
            DIFFICULTY = 1;
            btnEasy.className = 'btn btn-block btn-danger difficultyItem chosenDifficultyItem';
            btnNormal.className = 'btn btn-block btn-danger difficultyItem';
            btnHard.className = 'btn btn-block btn-danger difficultyItem ';
        });
        difficulty_menu_left.appendChild(btnEasy);
        var btnNormal = document.createElement("button");
        btnNormal.appendChild(document.createTextNode("Normal"));
        btnNormal.className = "" + (DIFFICULTY == 2 ? 'btn btn-block btn-danger difficultyItem chosenDifficultyItem' : 'btn btn-block btn-danger difficultyItem');
        btnNormal.addEventListener("click", function (e) {
            DIFFICULTY = 2;
            btnEasy.className = 'btn btn-block btn-danger difficultyItem';
            btnNormal.className = 'btn btn-block btn-danger difficultyItem chosenDifficultyItem';
            btnHard.className = 'btn btn-block btn-danger difficultyItem';
        });
        difficulty_menu_center.appendChild(btnNormal);
        var btnHard = document.createElement("button");
        btnHard.appendChild(document.createTextNode("Hard"));
        btnHard.className = "" + (DIFFICULTY == 3 ? 'btn btn-block btn-danger difficultyItem chosenDifficultyItem' : 'btn btn-block btn-danger difficultyItem');
        btnHard.addEventListener("click", function (e) {
            DIFFICULTY = 3;
            btnEasy.className = 'btn btn-block btn-danger difficultyItem';
            btnNormal.className = 'btn btn-block btn-danger difficultyItem';
            btnHard.className = 'btn btn-block btn-danger difficultyItem chosenDifficultyItem';
        });
        difficulty_menu_right.appendChild(btnHard);
        menu.appendChild(difficulty_menu_left);
        menu.appendChild(difficulty_menu_center);
        menu.appendChild(difficulty_menu_right);
        var difficulty_menu_col_md_4 = document.createElement("div");
        var difficulty_menu_col_md_8 = document.createElement("div");
        difficulty_menu_col_md_4.className = "col-md-4";
        difficulty_menu_col_md_8.className = "col-md-8";
        var select = document.createElement("select");
        var stack_div = document.createElement("div");
        stack_div.className = "col-md-12";
        var btnSinglePlayer = document.createElement("button");
        btnSinglePlayer.appendChild(document.createTextNode("One Player"));
        btnSinglePlayer.className = 'btn btn-block btn-danger menuItem';
        btnSinglePlayer.addEventListener("click", function (e) {
            _this.StartSinglePlayer(container);
        });
        var btnTwoPlayer = document.createElement("button");
        btnTwoPlayer.appendChild(document.createTextNode("Two Player"));
        btnTwoPlayer.className = 'btn btn-block btn-danger menuItem';
        btnTwoPlayer.addEventListener("click", function (e) {
            // this.StartMultiPlayer(container);
            _this.StartMultiPlayer(container);
        });
        var btnTwoPlayerBot = document.createElement("button");
        btnTwoPlayerBot.appendChild(document.createTextNode("Two Player with AI friend"));
        btnTwoPlayerBot.className = 'btn btn-block btn-danger menuItem';
        btnTwoPlayerBot.addEventListener("click", function (e) {
            // this.StartMultiPlayer(container);
            _this.StartMultiPlayerWithAI(container);
        });
        var btnSinglePlayerHighScores = document.createElement("button");
        btnSinglePlayerHighScores.appendChild(document.createTextNode("One Player High Scores"));
        btnSinglePlayerHighScores.className = 'btn btn-block btn-danger menuItem';
        btnSinglePlayerHighScores.addEventListener("click", function (e) {
            _this.ShowHighScores(container);
        });
        var btnTwoPlayerHighScores = document.createElement("button");
        btnTwoPlayerHighScores.appendChild(document.createTextNode("Two Player High Scores"));
        btnTwoPlayerHighScores.className = 'btn btn-block btn-danger menuItem';
        btnTwoPlayerHighScores.addEventListener("click", function (e) {
            _this.ShowTwoPlayerHighScores(container);
        });
        var btnBFSSnake = document.createElement("button");
        btnBFSSnake.appendChild(document.createTextNode("Uninformed Search Serpent [BFS]"));
        btnBFSSnake.className = 'btn btn-block btn-danger menuItem';
        btnBFSSnake.addEventListener("click", function (e) {
            TYPE_OF_AI = 0;
            _this.ShowBFSSnake(container);
        });
        var btnAStarSnake = document.createElement("button");
        btnAStarSnake.appendChild(document.createTextNode("Informed Search Serpent [A*]"));
        btnAStarSnake.className = 'btn btn-block btn-danger menuItem';
        btnAStarSnake.addEventListener("click", function (e) {
            TYPE_OF_AI = 1;
            _this.ShowAStarSnake(container);
        });
        var btnSettings = document.createElement("button");
        btnSettings.appendChild(document.createTextNode("Settings"));
        btnSettings.className = 'btn btn-block btn-danger menuItem';
        btnSettings.addEventListener("click", function (e) {
            _this.ShowSettings(container);
        });
        var btnInstructions = document.createElement("button");
        btnInstructions.appendChild(document.createTextNode("Instructions"));
        btnInstructions.className = 'btn btn-block btn-danger menuItem';
        btnInstructions.addEventListener("click", function (e) {
            _this.ShowInstructions(container);
        });
        var btnExit = document.createElement("button");
        btnExit.appendChild(document.createTextNode("Exit"));
        btnExit.className = 'btn btn-block btn-danger menuItem';
        btnExit.addEventListener("click", function (e) {
            window.location.replace("http://google.com");
        });
        stack_div.appendChild(btnSinglePlayer);
        stack_div.appendChild(btnTwoPlayer);
        stack_div.appendChild(btnTwoPlayerBot);
        stack_div.appendChild(btnSinglePlayerHighScores);
        stack_div.appendChild(btnTwoPlayerHighScores);
        stack_div.appendChild(btnBFSSnake);
        stack_div.appendChild(btnAStarSnake);
        stack_div.appendChild(btnInstructions);
        stack_div.appendChild(btnSettings);
        stack_div.appendChild(btnExit);
        menu.appendChild(stack_div);
        container.appendChild(left_column);
        container.appendChild(menu);
    };
    Menu.prototype.StartSinglePlayer = function (container) {
        var board = new Board(container, WIDTH, HEIGHT, DIFFICULTY, TYPE_OF_AI);
        board.startSinglePlayer();
    };
    Menu.prototype.StartMultiPlayer = function (container) {
        var board = new Board(container, WIDTH, HEIGHT, DIFFICULTY, TYPE_OF_AI);
        board.startMultiPlayer();
    };
    Menu.prototype.StartMultiPlayerWithAI = function (container) {
        var board = new Board(container, WIDTH, HEIGHT, DIFFICULTY, TYPE_OF_AI);
        board.startMultiPlayerWithAI();
    };
    Menu.prototype.ShowHighScores = function (container) {
        var _this = this;
        container.innerHTML = "";
        var left_column = document.createElement("div");
        left_column.className = "col-md-2";
        var menu = document.createElement("div");
        menu.className = "col-md-8";
        var ordered_list = document.createElement("ol");
        $.ajax({
            url: 'https://asocial-setting.000webhostapp.com/scores.php?type=sp',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                data.forEach(function (element) {
                    ordered_list.innerHTML += "<li> " + element.name + " - " + element.score + " - " + Math.floor(element.time / 60) + ":" + element.time % 60 + " </li>";
                });
            },
            failure: function (e) { console.log(e); }
        });
        var backButton = document.createElement("button");
        backButton.appendChild(document.createTextNode("Go Back"));
        backButton.addEventListener("click", function () { return _this.ShowMenu(container); });
        backButton.className = 'btn btn-block btn-danger menuItem';
        menu.appendChild(ordered_list);
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
        var ordered_list = document.createElement("ol");
        $.ajax({
            url: 'https://asocial-setting.000webhostapp.com/scores.php?type=tp',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                data.forEach(function (element) {
                    ordered_list.innerHTML += "<li> " + element.name + " - " + element.score + " </li>";
                });
            }
        });
        var backButton = document.createElement("button");
        backButton.appendChild(document.createTextNode("Go Back"));
        backButton.addEventListener("click", function () { return _this.ShowMenu(container); });
        backButton.className = 'btn btn-block btn-danger menuItem';
        menu.appendChild(ordered_list);
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
    Menu.prototype.ShowBFSSnake = function (container) {
        var board = new Board(container, WIDTH, HEIGHT, DIFFICULTY, TYPE_OF_AI);
        board.start();
    };
    Menu.prototype.ShowAStarSnake = function (container) {
        // start game, set up canvas, and create quit button
        var board = new Board(container, WIDTH, HEIGHT, DIFFICULTY, TYPE_OF_AI);
        board.start();
    };
    Menu.prototype.ShowInstructions = function (container) {
        var _this = this;
        container.innerHTML = "";
        var left_column = document.createElement("div");
        left_column.className = "col-md-2";
        var menu = document.createElement("div");
        menu.className = "col-md-8";
        var lines = [
            "Don't run the snake into its own tail: you will die.",
            'Use your cursor keys: up, left, right, and down.',
            'Keyboard "P" may also be used for "Play" and "Pause"',
            'Eat the colored apples to gain points.',
            "You win if the length of your snake equals all the points of the board"
        ];
        container.innerHTML += "<h1>Instructions</h1><br/>";
        var i = 1;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            container.innerHTML += "<span>" + i + ". " + line + "</span><br/>";
            i += 1;
        }
        var backButton = document.createElement("button");
        backButton.appendChild(document.createTextNode("Go Back"));
        backButton.addEventListener("click", function () { return _this.ShowMenu(container); });
        backButton.className = 'btn btn-block btn-danger menuItem';
        menu.appendChild(backButton);
        container.appendChild(left_column);
        container.appendChild(menu);
    };
    Menu.prototype.ShowSettings = function (container) {
        var _this = this;
        container.innerHTML = "";
        var left_column = document.createElement("div");
        left_column.className = "col-md-2";
        var menu = document.createElement("div");
        menu.className = "col-md-8";
        container.innerHTML += "\n        <div class=\"col-md-12\">\n            <div class=\"col-md-2\"></div>\n            <div class=\"col-md-8\">\n                <h1>Settings</h1><br/>\n                \n                <span id=\"current_difficulty\">Current Difficulty " + (DIFFICULTY == 1 ? "Easy" : DIFFICULTY == 2 ? "Normal" : "Hard") + "</span><br><br>\n                <div class=\"form-group\">\n                  <span for=\"sel1\">Select Difficulty:</span>\n                  <select class=\"form-control\" id=\"selectDifficulty\" onchange=\"Menu.changeDifficulty()\">\n                        <option value=\"1\">Easy</option>\n                        <option value=\"2\">Normal</option>\n                        <option value=\"3\">Hard</option>\n                  </select>\n                </div><br>\n                \n                <span id=\"current_resolution\">Current Resolution " + WIDTH + " x " + HEIGHT + "</span><br><br>\n                <div class=\"form-group\">\n                  <span for=\"sel1\">Select Resolution:</span>\n                  <select class=\"form-control\" id=\"resolution\" onchange=\"Menu.changeResolution()\">\n<option value=\"" + (this.width - (this.width * 0.25)) + "," + (this.height - (this.height * 0.25)) + "\">" + (this.width - (this.width * 0.25)) + " x " + (this.height - (this.height * 0.25)) + "</option>\n<option value=\"" + (this.width - (this.width * 0.125)) + "," + (this.height - (this.height * 0.125)) + "\">" + (this.width - (this.width * 0.125)) + " x " + (this.height - (this.height * 0.125)) + "</option>                  \n<option value=\"" + this.width + "," + this.height + "\">" + this.width + " x " + this.height + "</option>\n<option value=\"" + (this.width + (this.width * 0.125)) + "," + (this.height + (this.height * 0.125)) + "\">" + (this.width + (this.width * 0.125)) + " x " + (this.height + (this.height * 0.125)) + "</option>\n<option value=\"" + (this.width + (this.width * 0.25)) + "," + (this.height + (this.height * 0.25)) + "\">" + (this.width + (this.width * 0.25)) + " x " + (this.height + (this.height * 0.25)) + "</option>\n                  </select>\n                </div>\n                \n                <span id=\"current_youtube_video\">Current YouTube Video " + YOUTUBE_VIDEO + "</span><br><br>\n                <div class=\"form-group\">\n                  <span for=\"sel1\">Enter a YouTube Link:</span>\n                  <input type=\"url\" class=\"form-control\" id=\"selectYouTubeLink\" onkeypress=\"Menu.changeYouTubeVideo(event)\">\n                  <span id=\"spanYouTubeValidation\" class=\"bg-danger text-danger\"></span>\n                </div><br>\n            </div>\n            \n            \n            <div class=\"col-md-2\"></div>    \n        </div>\n        ";
        var btnPlayVideo = document.createElement("button");
        btnPlayVideo.appendChild(document.createTextNode("Play Music"));
        btnPlayVideo.addEventListener("click", function () { return $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*'); });
        btnPlayVideo.className = 'btn btn-block btn-danger menuItem';
        var btnPauseVideo = document.createElement("button");
        btnPauseVideo.appendChild(document.createTextNode("Pause Music"));
        btnPauseVideo.addEventListener("click", function () { return $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); });
        btnPauseVideo.className = 'btn btn-block btn-danger menuItem';
        var btnBack = document.createElement("button");
        btnBack.appendChild(document.createTextNode("Go Back"));
        btnBack.addEventListener("click", function () { return _this.ShowMenu(container); });
        btnBack.className = 'btn btn-block btn-danger menuItem';
        menu.appendChild(btnPlayVideo);
        menu.appendChild(btnPauseVideo);
        menu.appendChild(btnBack);
        container.appendChild(left_column);
        container.appendChild(menu);
    };
    Menu.changeResolution = function () {
        // console.log($("#resolution")[0].value);
        var width_and_height = $("#resolution")[0].value.split(",");
        WIDTH = parseInt(width_and_height[0]);
        HEIGHT = parseInt(width_and_height[1]);
        console.log(WIDTH, HEIGHT);
        var msg = "Resolution changed to " + WIDTH + " x " + HEIGHT;
        document.getElementById("current_resolution").innerHTML = msg.toString();
    };
    Menu.changeDifficulty = function () {
        var new_difficulty = document.getElementById("selectDifficulty").value;
        DIFFICULTY = new_difficulty;
        console.log(DIFFICULTY);
        var msg = "Difficulty changed to " + (DIFFICULTY == 1 ? "Easy" : DIFFICULTY == 2 ? "Normal" : "Hard");
        document.getElementById("current_difficulty").innerHTML = msg.toString();
    };
    Menu.changeYouTubeVideo = function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            var current_src = document.getElementsByClassName("youtube-video")[0].getAttribute("src");
            var video_url_parts = void 0;
            var new_video_url = document.getElementById("selectYouTubeLink").value;
            if (this.ValidURL(new_video_url)) {
                console.log("Valid");
                document.getElementById("spanYouTubeValidation").className = "bg-success text-success";
                document.getElementById("spanYouTubeValidation").innerText = "Valid URL";
            }
            else {
                console.log("Invalid");
                document.getElementById("spanYouTubeValidation").className = "bg-danger text-danger";
                document.getElementById("spanYouTubeValidation").innerText = "Invalid URL";
            }
            if (new_video_url.indexOf("=") !== -1) {
                console.log("includes = ");
                video_url_parts = new_video_url.split("=");
            }
            else {
                console.log("does not includes = ");
                video_url_parts = new_video_url.split("/");
            }
            console.log(video_url_parts[video_url_parts.length - 1]);
            var video_id = video_url_parts[video_url_parts.length - 1];
            var new_src = "https://www.youtube.com/embed/" + video_id + "?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1";
            document.getElementsByClassName("youtube-video")[0].setAttribute("src", new_src);
            $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        }
    };
    Menu.ValidURL = function (str) {
        var pattern = "/^(?:\\w+:)?\\/\\/([^\\s\\.]+\\.\\S{2}|localhost[\\:?\\d]*)\\S*$/";
        console.log(str);
        var substring = "https://youtu.be";
        var regular = "https://www.youtube.com/watch?v=";
        if (str.indexOf(substring) !== -1 || str.indexOf(regular) !== -1) {
            return true;
        }
        return false;
    };
    return Menu;
}());
//# sourceMappingURL=menu.js.map