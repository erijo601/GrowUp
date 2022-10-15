/// <reference path="../typings/pixi.js.d.ts"/>
/// <reference path="../typings/howler.d.ts" />
var Game = /** @class */ (function () {
    function Game() {
        console.log('PRESS PLAY ON TAPE');
        Game.init();
    }
    Game.init = function () {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; //  Pixelated
        Game.app = new PIXI.Application({
            resolution: devicePixelRatio,
            backgroundColor: 0x000000
        });
        //  The renderer is always drawing to a buffer of size 1920*1080, no matter what the actual window size is.
        //  This way I can pretend the screen is always 1920*1080 in game logic and stuff. The renderer then scales everything down to canvas size.
        Game.app.renderer.resize(1920, 1080);
        Game.app.stage.sortableChildren = true;
        document.body.appendChild(Game.app.view);
        Game.loadingScreenLoader = new PIXI.Loader();
        window.addEventListener('resize', Game.resize);
        Game.resize();
        Game.mouse = new Mouse();
        Game.keyboard = new Keyboard();
        Game.soundPlayer = new SoundPlayer();
        Game.doneLoading = false;
        window.addEventListener('mousemove', Game.mouseEventHandler, false);
        window.addEventListener('mousedown', Game.mouseEventHandler, false);
        window.addEventListener('mouseup', Game.mouseEventHandler, false);
        window.addEventListener('keydown', Game.keyboardEventHandler, false);
        window.addEventListener('keyup', Game.keyboardEventHandler, false);
        Game.loadLoadingScreenResources();
    };
    Game.loadLoadingScreenResources = function () {
        //  Loading screen
        Game.loadingScreenLoader.add('pipe0', 'img/Loading/pipe0.png');
        Game.loadingScreenLoader.add('pipe1', 'img/Loading/pipe1.png');
        Game.loadingScreenLoader.add('pipe2', 'img/Loading/pipe2.png');
        Game.loadingScreenLoader.add('pipe3', 'img/Loading/pipe3.png');
        Game.loadingScreenLoader.add('pipe4', 'img/Loading/pipe4.png');
        Game.loadingScreenLoader.add('cloud', 'img/Loading/cloud.png');
        Game.loadingScreenLoader.add('cloud-alt', 'img/Loading/cloud-alt.png');
        Game.loadingScreenLoader.add('letter-a', 'img/Loading/letter-a.png');
        Game.loadingScreenLoader.add('letter-a-alt', 'img/Loading/letter-a-alt.png');
        Game.loadingScreenLoader.add('letter-d', 'img/Loading/letter-d.png');
        Game.loadingScreenLoader.add('letter-d-alt', 'img/Loading/letter-d-alt.png');
        Game.loadingScreenLoader.add('letter-e', 'img/Loading/letter-e.png');
        Game.loadingScreenLoader.add('letter-e-alt', 'img/Loading/letter-e-alt.png');
        Game.loadingScreenLoader.add('letter-g', 'img/Loading/letter-g.png');
        Game.loadingScreenLoader.add('letter-g-alt', 'img/Loading/letter-g-alt.png');
        Game.loadingScreenLoader.add('letter-i', 'img/Loading/letter-i.png');
        Game.loadingScreenLoader.add('letter-i-alt', 'img/Loading/letter-i-alt.png');
        Game.loadingScreenLoader.add('letter-l', 'img/Loading/letter-l.png');
        Game.loadingScreenLoader.add('letter-l-alt', 'img/Loading/letter-l-alt.png');
        Game.loadingScreenLoader.add('letter-n', 'img/Loading/letter-n.png');
        Game.loadingScreenLoader.add('letter-n-alt', 'img/Loading/letter-n-alt.png');
        Game.loadingScreenLoader.add('letter-o', 'img/Loading/letter-o.png');
        Game.loadingScreenLoader.add('letter-o-alt', 'img/Loading/letter-o-alt.png');
        Game.loadingScreenLoader.add('letter-p', 'img/Loading/letter-p.png');
        Game.loadingScreenLoader.add('letter-p-alt', 'img/Loading/letter-p-alt.png');
        Game.loadingScreenLoader.add('letter-r', 'img/Loading/letter-r.png');
        Game.loadingScreenLoader.add('letter-r-alt', 'img/Loading/letter-r-alt.png');
        Game.loadingScreenLoader.add('letter-s', 'img/Loading/letter-s.png');
        Game.loadingScreenLoader.add('letter-s-alt', 'img/Loading/letter-s-alt.png');
        Game.loadingScreenLoader.add('letter-t', 'img/Loading/letter-t.png');
        Game.loadingScreenLoader.add('letter-t-alt', 'img/Loading/letter-t-alt.png');
        Game.loadingScreenLoader.load(Game.loadingScreenResourcesLoaded);
    };
    Game.loadResources = function () {
        //  Background
        PIXI.Loader.shared.add('background0', 'img/Background/0.png');
        PIXI.Loader.shared.add('background1', 'img/Background/1.png');
        PIXI.Loader.shared.add('background2', 'img/Background/2.png');
        PIXI.Loader.shared.add('background3', 'img/Background/3.png');
        PIXI.Loader.shared.add('background4', 'img/Background/4.png');
        PIXI.Loader.shared.add('background5', 'img/Background/5.png');
        //  Score
        PIXI.Loader.shared.add('score-background', 'img/Score/background.png');
        PIXI.Loader.shared.add('score-foreground', 'img/Score/foreground.png');
        PIXI.Loader.shared.add('number-0', 'img/Score/0.png');
        PIXI.Loader.shared.add('number-1', 'img/Score/1.png');
        PIXI.Loader.shared.add('number-2', 'img/Score/2.png');
        PIXI.Loader.shared.add('number-3', 'img/Score/3.png');
        PIXI.Loader.shared.add('number-4', 'img/Score/4.png');
        PIXI.Loader.shared.add('number-5', 'img/Score/5.png');
        PIXI.Loader.shared.add('number-6', 'img/Score/6.png');
        PIXI.Loader.shared.add('number-7', 'img/Score/7.png');
        PIXI.Loader.shared.add('number-8', 'img/Score/8.png');
        PIXI.Loader.shared.add('number-9', 'img/Score/9.png');
        //  Intro
        PIXI.Loader.shared.add('intro-tie-left', 'img/Intro/tie-left.png');
        PIXI.Loader.shared.add('intro-tie-right', 'img/Intro/tie-right.png');
        PIXI.Loader.shared.add('intro-moustache-title', 'img/Intro/moustache-title.png');
        PIXI.Loader.shared.add('intro-moustache-subtitle', 'img/Intro/moustache-subtitle.png');
        //  Title
        PIXI.Loader.shared.add('1player-disabled', 'img/Title/1player-disabled.png');
        PIXI.Loader.shared.add('1player0', 'img/Title/1player0.png');
        PIXI.Loader.shared.add('1player1', 'img/Title/1player1.png');
        PIXI.Loader.shared.add('2players-disabled', 'img/Title/2players-disabled.png');
        PIXI.Loader.shared.add('2players0', 'img/Title/2players0.png');
        PIXI.Loader.shared.add('2players1', 'img/Title/2players1.png');
        PIXI.Loader.shared.add('gamemode-background', 'img/Title/gamemode-background.png');
        PIXI.Loader.shared.add('logo-background', 'img/Title/logo-background.png');
        PIXI.Loader.shared.add('logo-pipe', 'img/Title/logo-pipe.png');
        PIXI.Loader.shared.add('logo-subtitle', 'img/Title/logo-subtitle.png');
        PIXI.Loader.shared.add('logo-title', 'img/Title/logo-title.png');
        //  Screen Transition
        PIXI.Loader.shared.add('screen-transition-boxer', 'img/ScreenTransition/screen-transition-boxer.png');
        PIXI.Loader.shared.add('screen-transition-moustache', 'img/ScreenTransition/screen-transition-moustache.png');
        PIXI.Loader.shared.add('screen-transition-tie', 'img/ScreenTransition/screen-transition-tie.png');
        //  Score Screen
        PIXI.Loader.shared.add('score-bg', 'img/ScoreState/score-bg.png');
        PIXI.Loader.shared.add('number-0-white', 'img/ScoreState/0.png');
        PIXI.Loader.shared.add('number-1-white', 'img/ScoreState/1.png');
        PIXI.Loader.shared.add('number-2-white', 'img/ScoreState/2.png');
        PIXI.Loader.shared.add('number-3-white', 'img/ScoreState/3.png');
        PIXI.Loader.shared.add('number-4-white', 'img/ScoreState/4.png');
        PIXI.Loader.shared.add('number-5-white', 'img/ScoreState/5.png');
        PIXI.Loader.shared.add('number-6-white', 'img/ScoreState/6.png');
        PIXI.Loader.shared.add('number-7-white', 'img/ScoreState/7.png');
        PIXI.Loader.shared.add('number-8-white', 'img/ScoreState/8.png');
        PIXI.Loader.shared.add('number-9-white', 'img/ScoreState/9.png');
        PIXI.Loader.shared.add('procent-white', 'img/ScoreState/procent.png');
        //  Level Moustache
        PIXI.Loader.shared.add('box-p1-0', 'img/LevelMoustache/box-p1-0.png');
        PIXI.Loader.shared.add('box-p1-1', 'img/LevelMoustache/box-p1-1.png');
        PIXI.Loader.shared.add('box-p1-2', 'img/LevelMoustache/box-p1-2.png');
        PIXI.Loader.shared.add('box-p1-3', 'img/LevelMoustache/box-p1-3.png');
        PIXI.Loader.shared.add('box-p1-left-0', 'img/LevelMoustache/box-p1-left-0.png');
        PIXI.Loader.shared.add('box-p1-left-1', 'img/LevelMoustache/box-p1-left-1.png');
        PIXI.Loader.shared.add('box-p1-right-0', 'img/LevelMoustache/box-p1-right-0.png');
        PIXI.Loader.shared.add('box-p1-right-1', 'img/LevelMoustache/box-p1-right-1.png');
        PIXI.Loader.shared.add('box-p2-0', 'img/LevelMoustache/box-p2-0.png');
        PIXI.Loader.shared.add('box-p2-1', 'img/LevelMoustache/box-p2-1.png');
        PIXI.Loader.shared.add('box-p2-2', 'img/LevelMoustache/box-p2-2.png');
        PIXI.Loader.shared.add('box-p2-3', 'img/LevelMoustache/box-p2-3.png');
        PIXI.Loader.shared.add('box-p2-left-0', 'img/LevelMoustache/box-p2-left-0.png');
        PIXI.Loader.shared.add('box-p2-left-1', 'img/LevelMoustache/box-p2-left-1.png');
        PIXI.Loader.shared.add('box-p2-right-0', 'img/LevelMoustache/box-p2-right-0.png');
        PIXI.Loader.shared.add('box-p2-right-1', 'img/LevelMoustache/box-p2-right-1.png');
        PIXI.Loader.shared.add('eye-left-0', 'img/LevelMoustache/eye-left-0.png');
        PIXI.Loader.shared.add('eye-left-1', 'img/LevelMoustache/eye-left-1.png');
        PIXI.Loader.shared.add('eye-left-2', 'img/LevelMoustache/eye-left-2.png');
        PIXI.Loader.shared.add('eye-right-0', 'img/LevelMoustache/eye-right-0.png');
        PIXI.Loader.shared.add('eye-right-1', 'img/LevelMoustache/eye-right-1.png');
        PIXI.Loader.shared.add('eye-right-2', 'img/LevelMoustache/eye-right-2.png');
        PIXI.Loader.shared.add('face-bg-1', 'img/LevelMoustache/face-bg-1.png');
        PIXI.Loader.shared.add('face-bg-2', 'img/LevelMoustache/face-bg-2.png');
        PIXI.Loader.shared.add('mouth-0', 'img/LevelMoustache/mouth-0.png');
        PIXI.Loader.shared.add('mouth-1', 'img/LevelMoustache/mouth-1.png');
        PIXI.Loader.shared.add('mouth-2', 'img/LevelMoustache/mouth-2.png');
        PIXI.Loader.shared.add('nose-0', 'img/LevelMoustache/nose-0.png');
        PIXI.Loader.shared.add('nose-0-front', 'img/LevelMoustache/nose-0-front.png');
        PIXI.Loader.shared.add('nose-1', 'img/LevelMoustache/nose-1.png');
        PIXI.Loader.shared.add('nose-1-front', 'img/LevelMoustache/nose-1-front.png');
        PIXI.Loader.shared.add('nose-2', 'img/LevelMoustache/nose-2.png');
        PIXI.Loader.shared.add('nose-2-front', 'img/LevelMoustache/nose-2-front.png');
        PIXI.Loader.shared.add('nose-front-base', 'img/LevelMoustache/nose-front-base.png');
    };
    Game.loadingScreenResourcesLoaded = function (resources) {
        Game.currentStatePlayer1 = new LoadingState();
        Game.lastFrameTime = Date.now();
        //  Game loop
        Game.app.ticker.add(Game.update);
        Game.loadResources();
        PIXI.Loader.shared.load(Game.resourcesLoaded);
    };
    Game.resourcesLoaded = function (resources) {
        var fpsCounter = new FpsCounter();
        Game.app.stage.addChild(fpsCounter);
        Game.background = new Background();
        Game.sceneTransition = new SceneTransition();
        Game.intro = new Intro();
        Game.doneLoading = true;
    };
    Game.resize = function () {
        var current = { width: Game.app.renderer.width, height: Game.app.renderer.height };
        var ratio = current.width / current.height;
        if (window.innerWidth / window.innerHeight >= ratio) {
            var width = window.innerHeight * ratio;
            var height = window.innerHeight;
        }
        else {
            var width = window.innerWidth;
            var height = window.innerWidth / ratio;
        }
        Game.app.view.style.width = "".concat(width, "px");
        Game.app.view.style.height = "".concat(height, "px");
    };
    Game.update = function (delta) {
        // delta is 1 if running at 100% performance. Creates frame-independent transformation
        var elapsedTime = Date.now() - Game.lastFrameTime;
        if (Game.background != undefined && Game.background.visible) {
            Game.background.update(elapsedTime);
        }
        if (Game.intro != undefined && Game.intro.isPlaying) {
            Game.intro.update(elapsedTime);
        }
        else {
            Game.currentStatePlayer1.update(elapsedTime);
            if (Game.currentStatePlayer2 != null) {
                Game.currentStatePlayer2.update(elapsedTime);
            }
        }
        Game.keyboard.update();
        Game.lastFrameTime = Date.now();
    };
    Game.mouseEventHandler = function (event) {
        Game.mouse.last.x = Game.mouse.current.x;
        Game.mouse.last.y = Game.mouse.current.y;
        Game.mouse.last.leftButtonDown = Game.mouse.current.leftButtonDown;
        Game.mouse.last.rightButtonDown = Game.mouse.current.rightButtonDown;
        Game.mouse.current.x = event.clientX;
        Game.mouse.current.y = event.clientY;
        Game.mouse.current.leftButtonDown = (event.buttons == 1);
        Game.mouse.current.rightButtonDown = (event.buttons == 2);
    };
    Game.keyboardEventHandler = function (e) {
        e = e || window.event;
        var key = e.key.toLowerCase();
        if (event.type == "keydown") {
            Game.keyboard.current.pressed[key] = true;
        }
        else if (event.type == "keyup") {
            delete Game.keyboard.current.pressed[key];
        }
        Game.keyboard.isDirty = true;
    };
    return Game;
}());
//# sourceMappingURL=game.js.map