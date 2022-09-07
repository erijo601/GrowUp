/// <reference path="../typings/pixi.js.d.ts"/>
/// <reference path="../typings/howler.d.ts" />

class Game {

    static app: PIXI.Application;

    static loadingScreenLoader: PIXI.Loader;

    static lastFrameTime: number;

    static mouse: Mouse;
    static keyboard: Keyboard;
    static soundPlayer: SoundPlayer;

    static doneLoading: boolean;

    static loadingState: GameState;
    static currentStatePlayer1: GameState;
    static currentStatePlayer2: GameState;

    static twoPlayerGame: boolean;

    constructor() {

        console.log('PRESS PLAY ON TAPE');
        Game.init();
    }
    
    static init() {

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;    //  Pixelated

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
    }

    static loadLoadingScreenResources() {

        //  Loading screen
        Game.loadingScreenLoader.add('fz0', 'img/Loading/fz0.png');
        Game.loadingScreenLoader.add('fz1', 'img/Loading/fz1.png');
        Game.loadingScreenLoader.add('fz2', 'img/Loading/fz2.png');
        Game.loadingScreenLoader.add('fz3', 'img/Loading/fz3.png');
        Game.loadingScreenLoader.add('fz4', 'img/Loading/fz4.png');
        Game.loadingScreenLoader.add('fz5', 'img/Loading/fz5.png');
        Game.loadingScreenLoader.add('fz6', 'img/Loading/fz6.png');
        Game.loadingScreenLoader.add('fz7', 'img/Loading/fz7.png');

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
    }

    static loadResources() {

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

        //  Level Moustache
        PIXI.Loader.shared.add('box', 'img/LevelMoustache/box.png');
        PIXI.Loader.shared.add('face-bg', 'img/LevelMoustache/face-bg.png');
    }

    static loadingScreenResourcesLoaded(resources: any) {

        Game.currentStatePlayer1 = new LoadingState();

        Game.lastFrameTime = Date.now();

        //  Game loop
        Game.app.ticker.add(Game.update);

        Game.loadResources();

        PIXI.Loader.shared.load(Game.resourcesLoaded);
    }

    static resourcesLoaded(resources: any) {

        const fpsCounter = new FpsCounter();
        Game.app.stage.addChild(fpsCounter);

        Game.doneLoading = true;
    }

    static resize() {

        let current = { width: Game.app.renderer.width, height: Game.app.renderer.height };
        let ratio = current.width / current.height;

        if (window.innerWidth / window.innerHeight >= ratio) {

            var width = window.innerHeight * ratio;
            var height = window.innerHeight;

        } else {

            var width = window.innerWidth;
            var height = window.innerWidth / ratio;
        }

        Game.app.view.style.width = `${width}px`;
        Game.app.view.style.height = `${height}px`;
    }

    static update(delta) {

        // delta is 1 if running at 100% performance. Creates frame-independent transformation

        let elapsedTime = Date.now() - Game.lastFrameTime;

        Game.currentStatePlayer1.update(elapsedTime);

        if (Game.currentStatePlayer2 != null) {

            Game.currentStatePlayer2.update(elapsedTime);
        }

        Game.keyboard.update();
        Game.lastFrameTime = Date.now();
    }

    static mouseEventHandler(event) {

        Game.mouse.last.x = Game.mouse.current.x;
        Game.mouse.last.y = Game.mouse.current.y;
        Game.mouse.last.leftButtonDown = Game.mouse.current.leftButtonDown;
        Game.mouse.last.rightButtonDown = Game.mouse.current.rightButtonDown;

        Game.mouse.current.x = event.clientX;
        Game.mouse.current.y = event.clientY;
        Game.mouse.current.leftButtonDown = (event.buttons == 1);
        Game.mouse.current.rightButtonDown = (event.buttons == 2);
    }

    static keyboardEventHandler(e) {

        e = e || window.event;

        let key = e.key.toLowerCase();
        
        if (event.type == "keydown") {

            Game.keyboard.current.pressed[key] = true;
        }
        else if (event.type == "keyup") {

            delete Game.keyboard.current.pressed[key];
        }

        Game.keyboard.isDirty = true;
    }
}