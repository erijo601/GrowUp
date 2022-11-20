/// <reference path="../typings/pixi.js.d.ts"/>
/// <reference path="../typings/howler.d.ts" />
var Game = /** @class */ (function () {
    function Game() {
        console.log('PRESS PLAY ON TAPE');
        Game.init();
    }
    Game.init = function () {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
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
        Game.progressText = new PIXI.Text("", {
            fill: "white",
            stroke: "#a6a6a6",
            strokeThickness: 2,
            align: "center"
        });
        Game.progressText.x = 1920 / 2;
        Game.progressText.y = 980;
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
        PIXI.Loader.shared.add('intro-tie-title', 'img/Intro/tie-title.png');
        PIXI.Loader.shared.add('intro-tie-subtitle', 'img/Intro/tie-subtitle.png');
        PIXI.Loader.shared.add('intro-hat-title', 'img/Intro/hat-title.png');
        PIXI.Loader.shared.add('intro-hat-subtitle', 'img/Intro/hat-subtitle.png');
        PIXI.Loader.shared.add('intro-office-title', 'img/Intro/office-title.png');
        PIXI.Loader.shared.add('intro-office-subtitle', 'img/Intro/office-subtitle.png');
        PIXI.Loader.shared.add('intro-whiskey-title', 'img/Intro/whiskey-title.png');
        PIXI.Loader.shared.add('intro-whiskey-subtitle', 'img/Intro/whiskey-subtitle.png');
        //  Title
        PIXI.Loader.shared.add('1player-disabled', 'img/Title/1player-disabled.png');
        PIXI.Loader.shared.add('1player0', 'img/Title/1player0.png');
        PIXI.Loader.shared.add('1player1', 'img/Title/1player1.png');
        PIXI.Loader.shared.add('2players-disabled', 'img/Title/2players-disabled.png');
        PIXI.Loader.shared.add('2players0', 'img/Title/2players0.png');
        PIXI.Loader.shared.add('2players1', 'img/Title/2players1.png');
        PIXI.Loader.shared.add('enter', 'img/Title/enter.png');
        PIXI.Loader.shared.add('gamemode-background', 'img/Title/gamemode-background.png');
        PIXI.Loader.shared.add('instructions-p1', 'img/Title/instructions-p1.png');
        PIXI.Loader.shared.add('instructions-p2', 'img/Title/instructions-p2.png');
        PIXI.Loader.shared.add('logo-background', 'img/Title/logo-background.png');
        PIXI.Loader.shared.add('logo-pipe', 'img/Title/logo-pipe.png');
        PIXI.Loader.shared.add('logo-subtitle', 'img/Title/logo-subtitle.png');
        PIXI.Loader.shared.add('logo-title', 'img/Title/logo-title.png');
        PIXI.Loader.shared.add('keydown-p1', 'img/Title/keydown-p1.png');
        PIXI.Loader.shared.add('keydown-pressed-p1', 'img/Title/keydown-pressed-p1.png');
        PIXI.Loader.shared.add('keydown-p2', 'img/Title/keydown-p2.png');
        PIXI.Loader.shared.add('keydown-pressed-p2', 'img/Title/keydown-pressed-p2.png');
        PIXI.Loader.shared.add('keyup-p1', 'img/Title/keyup-p1.png');
        PIXI.Loader.shared.add('keyup-pressed-p1', 'img/Title/keyup-pressed-p1.png');
        PIXI.Loader.shared.add('keyup-p2', 'img/Title/keyup-p2.png');
        PIXI.Loader.shared.add('keyup-pressed-p2', 'img/Title/keyup-pressed-p2.png');
        PIXI.Loader.shared.add('keyleft-p1', 'img/Title/keyleft-p1.png');
        PIXI.Loader.shared.add('keyleft-pressed-p1', 'img/Title/keyleft-pressed-p1.png');
        PIXI.Loader.shared.add('keyleft-p2', 'img/Title/keyleft-p2.png');
        PIXI.Loader.shared.add('keyleft-pressed-p2', 'img/Title/keyleft-pressed-p2.png');
        PIXI.Loader.shared.add('keyright-p1', 'img/Title/keyright-p1.png');
        PIXI.Loader.shared.add('keyright-pressed-p1', 'img/Title/keyright-pressed-p1.png');
        PIXI.Loader.shared.add('keyright-p2', 'img/Title/keyright-p2.png');
        PIXI.Loader.shared.add('keyright-pressed-p2', 'img/Title/keyright-pressed-p2.png');
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
        //  Level Tie
        PIXI.Loader.shared.add('tie-arm', 'img/LevelTie/arm.png');
        PIXI.Loader.shared.add('tie-hand0', 'img/LevelTie/hand0.png');
        PIXI.Loader.shared.add('tie-hand1', 'img/LevelTie/hand1.png');
        PIXI.Loader.shared.add('tie-hand2', 'img/LevelTie/hand2.png');
        PIXI.Loader.shared.add('tie-hand3', 'img/LevelTie/hand3.png');
        PIXI.Loader.shared.add('level-tie-background', 'img/LevelTie/level-tie-background.png');
        PIXI.Loader.shared.add('level-tie-neck', 'img/LevelTie/level-tie-neck.png');
        PIXI.Loader.shared.add('tie-rope', 'img/LevelTie/tie-rope.png');
        PIXI.Loader.shared.add('tie-loop-back', 'img/LevelTie/tie-loop-back.png');
        PIXI.Loader.shared.add('tie-loop-front', 'img/LevelTie/tie-loop-front.png');
        PIXI.Loader.shared.add('p1-mini-strangle0', 'img/LevelTie/p1-mini-strangle0.png');
        PIXI.Loader.shared.add('p1-mini-strangle1', 'img/LevelTie/p1-mini-strangle1.png');
        PIXI.Loader.shared.add('p1-mini-strangle2', 'img/LevelTie/p1-mini-strangle2.png');
        PIXI.Loader.shared.add('p2-mini-strangle0', 'img/LevelTie/p2-mini-strangle0.png');
        PIXI.Loader.shared.add('p2-mini-strangle1', 'img/LevelTie/p2-mini-strangle1.png');
        PIXI.Loader.shared.add('p2-mini-strangle2', 'img/LevelTie/p2-mini-strangle2.png');
        PIXI.Loader.shared.add('p1-mini-tie0', 'img/LevelTie/p1-mini-tie0.png');
        PIXI.Loader.shared.add('p1-mini-tie1', 'img/LevelTie/p1-mini-tie1.png');
        PIXI.Loader.shared.add('p1-mini-tie2', 'img/LevelTie/p1-mini-tie2.png');
        PIXI.Loader.shared.add('p2-mini-tie0', 'img/LevelTie/p2-mini-tie0.png');
        PIXI.Loader.shared.add('p2-mini-tie1', 'img/LevelTie/p2-mini-tie1.png');
        PIXI.Loader.shared.add('p2-mini-tie2', 'img/LevelTie/p2-mini-tie2.png');
        PIXI.Loader.shared.add('p1-mini-between0', 'img/LevelTie/p1-mini-between0.png');
        PIXI.Loader.shared.add('p1-mini-between1', 'img/LevelTie/p1-mini-between1.png');
        PIXI.Loader.shared.add('p2-mini-between0', 'img/LevelTie/p2-mini-between0.png');
        PIXI.Loader.shared.add('p2-mini-between1', 'img/LevelTie/p2-mini-between1.png');
        //  Level Hat
        PIXI.Loader.shared.add('level-hat-background', 'img/LevelHat/level-hat-background.png');
        PIXI.Loader.shared.add('level-hat-clap0', 'img/LevelHat/clap0.png');
        PIXI.Loader.shared.add('level-hat-clap1', 'img/LevelHat/clap1.png');
        PIXI.Loader.shared.add('level-hat-clap2', 'img/LevelHat/clap2.png');
        PIXI.Loader.shared.add('level-hat-clap3', 'img/LevelHat/clap3.png');
        PIXI.Loader.shared.add('level-hat-clap4', 'img/LevelHat/clap4.png');
        PIXI.Loader.shared.add('level-hat-clap5', 'img/LevelHat/clap5.png');
        PIXI.Loader.shared.add('level-hat-hair-p1', 'img/LevelHat/hair-p1.png');
        PIXI.Loader.shared.add('level-hat-hair-p2', 'img/LevelHat/hair-p2.png');
        PIXI.Loader.shared.add('level-hat-idle0', 'img/LevelHat/idle0.png');
        PIXI.Loader.shared.add('level-hat-idle1', 'img/LevelHat/idle1.png');
        PIXI.Loader.shared.add('level-hat-legs0', 'img/LevelHat/legs0.png');
        PIXI.Loader.shared.add('level-hat-legs1', 'img/LevelHat/legs1.png');
        PIXI.Loader.shared.add('level-hat-legs2', 'img/LevelHat/legs2.png');
        PIXI.Loader.shared.add('level-hat-legs3', 'img/LevelHat/legs3.png');
        PIXI.Loader.shared.add('level-hat-grab-torso', 'img/LevelHat/level-hat-grab-torso.png');
        PIXI.Loader.shared.add('level-hat-grab-left-lower-arm', 'img/LevelHat/grab-left-lower-arm.png');
        PIXI.Loader.shared.add('level-hat-grab-left-upper-arm', 'img/LevelHat/grab-left-upper-arm.png');
        PIXI.Loader.shared.add('level-hat-grab-right-lower-arm', 'img/LevelHat/grab-right-lower-arm.png');
        PIXI.Loader.shared.add('level-hat-grab-right-upper-arm', 'img/LevelHat/grab-right-upper-arm.png');
        PIXI.Loader.shared.add('level-hat-flying', 'img/LevelHat/hat-flying.png');
        PIXI.Loader.shared.add('level-hat-hockey0', 'img/LevelHat/hockey0.png');
        PIXI.Loader.shared.add('level-hat-hockey1', 'img/LevelHat/hockey1.png');
        PIXI.Loader.shared.add('level-hat-hockey2', 'img/LevelHat/hockey2.png');
        PIXI.Loader.shared.add('level-hat-hockey3', 'img/LevelHat/hockey3.png');
        PIXI.Loader.shared.add('level-hat-hockey4', 'img/LevelHat/hockey4.png');
        PIXI.Loader.shared.add('level-hat-hockey5', 'img/LevelHat/hockey5.png');
        PIXI.Loader.shared.add('level-hat-hockey6', 'img/LevelHat/hockey6.png');
        //  Level Office
        PIXI.Loader.shared.add('level-office-player-background-p1', 'img/LevelOffice/player-background-p1.png');
        PIXI.Loader.shared.add('level-office-player-background-p2', 'img/LevelOffice/player-background-p2.png');
        PIXI.Loader.shared.add('level-office-player-idle-p1', 'img/LevelOffice/player-idle-p1.png');
        PIXI.Loader.shared.add('level-office-player-idle-p2', 'img/LevelOffice/player-idle-p2.png');
        PIXI.Loader.shared.add('level-office-player-break-p1', 'img/LevelOffice/player-break-p1.png');
        PIXI.Loader.shared.add('level-office-player-break-p2', 'img/LevelOffice/player-break-p2.png');
        PIXI.Loader.shared.add('level-office-player-run0-p1', 'img/LevelOffice/player-run0-p1.png');
        PIXI.Loader.shared.add('level-office-player-run1-p1', 'img/LevelOffice/player-run1-p1.png');
        PIXI.Loader.shared.add('level-office-player-run2-p1', 'img/LevelOffice/player-run2-p1.png');
        PIXI.Loader.shared.add('level-office-player-run3-p1', 'img/LevelOffice/player-run3-p1.png');
        PIXI.Loader.shared.add('level-office-player-run4-p1', 'img/LevelOffice/player-run4-p1.png');
        PIXI.Loader.shared.add('level-office-player-run5-p1', 'img/LevelOffice/player-run5-p1.png');
        PIXI.Loader.shared.add('level-office-player-run0-p2', 'img/LevelOffice/player-run0-p2.png');
        PIXI.Loader.shared.add('level-office-player-run1-p2', 'img/LevelOffice/player-run1-p2.png');
        PIXI.Loader.shared.add('level-office-player-run2-p2', 'img/LevelOffice/player-run2-p2.png');
        PIXI.Loader.shared.add('level-office-player-run3-p2', 'img/LevelOffice/player-run3-p2.png');
        PIXI.Loader.shared.add('level-office-player-run4-p2', 'img/LevelOffice/player-run4-p2.png');
        PIXI.Loader.shared.add('level-office-player-run5-p2', 'img/LevelOffice/player-run5-p2.png');
        PIXI.Loader.shared.add('level-office-finger-down', 'img/LevelOffice/finger-down.png');
        PIXI.Loader.shared.add('level-office-finger-left', 'img/LevelOffice/finger-left.png');
        PIXI.Loader.shared.add('level-office-finger-right', 'img/LevelOffice/finger-right.png');
        PIXI.Loader.shared.add('level-office-finger-up', 'img/LevelOffice/finger-up.png');
        PIXI.Loader.shared.add('level-office-cutscene-background-p1', 'img/LevelOffice/cutscene-background-p1.png');
        PIXI.Loader.shared.add('level-office-cutscene-background-p2', 'img/LevelOffice/cutscene-background-p2.png');
        PIXI.Loader.shared.add('level-office-cutscene-coffee0', 'img/LevelOffice/cutscene-coffee0.png');
        PIXI.Loader.shared.add('level-office-cutscene-coffee1', 'img/LevelOffice/cutscene-coffee1.png');
        PIXI.Loader.shared.add('level-office-cutscene-cup', 'img/LevelOffice/cutscene-cup.png');
        PIXI.Loader.shared.add('level-office-cutscene-eye', 'img/LevelOffice/cutscene-eye.png');
        PIXI.Loader.shared.add('level-office-cutscene-hand-coffee-p1', 'img/LevelOffice/cutscene-hand-coffee-p1.png');
        PIXI.Loader.shared.add('level-office-cutscene-hand-empty-p1', 'img/LevelOffice/cutscene-hand-empty-p1.png');
        PIXI.Loader.shared.add('level-office-cutscene-hand-point-p1', 'img/LevelOffice/cutscene-hand-point-p1.png');
        PIXI.Loader.shared.add('level-office-cutscene-hand-coffee-p2', 'img/LevelOffice/cutscene-hand-coffee-p2.png');
        PIXI.Loader.shared.add('level-office-cutscene-hand-empty-p2', 'img/LevelOffice/cutscene-hand-empty-p2.png');
        PIXI.Loader.shared.add('level-office-cutscene-hand-point-p2', 'img/LevelOffice/cutscene-hand-point-p2.png');
        PIXI.Loader.shared.add('level-office-cutscene-head-p1', 'img/LevelOffice/cutscene-head-p1.png');
        PIXI.Loader.shared.add('level-office-cutscene-head-p2', 'img/LevelOffice/cutscene-head-p2.png');
        PIXI.Loader.shared.add('level-office-cutscene-text-end', 'img/LevelOffice/cutscene-text-end.png');
        PIXI.Loader.shared.add('level-office-cutscene-text-start', 'img/LevelOffice/cutscene-text-start.png');
        PIXI.Loader.shared.add('level-office-cubicle-computer', 'img/LevelOffice/cubicle-computer.png');
        PIXI.Loader.shared.add('level-office-cubicle-item0', 'img/LevelOffice/cubicle-item0.png');
        PIXI.Loader.shared.add('level-office-cubicle-item1', 'img/LevelOffice/cubicle-item1.png');
        PIXI.Loader.shared.add('level-office-cubicle-item2', 'img/LevelOffice/cubicle-item2.png');
        PIXI.Loader.shared.add('level-office-cubicle-item3', 'img/LevelOffice/cubicle-item3.png');
        PIXI.Loader.shared.add('level-office-cubicle-item4', 'img/LevelOffice/cubicle-item4.png');
        PIXI.Loader.shared.add('level-office-cubicle-item5', 'img/LevelOffice/cubicle-item5.png');
        PIXI.Loader.shared.add('level-office-cubicle-item6', 'img/LevelOffice/cubicle-item6.png');
        PIXI.Loader.shared.add('level-office-cubicle-worker0', 'img/LevelOffice/cubicle-worker0.png');
        PIXI.Loader.shared.add('level-office-cubicle-worker1', 'img/LevelOffice/cubicle-worker1.png');
        PIXI.Loader.shared.add('level-office-cubicle-worker2', 'img/LevelOffice/cubicle-worker2.png');
        PIXI.Loader.shared.add('level-office-cubicle0', 'img/LevelOffice/cubicle0.png');
        PIXI.Loader.shared.add('level-office-cubicle1', 'img/LevelOffice/cubicle1.png');
        PIXI.Loader.shared.add('level-office-driftsmoke', 'img/LevelOffice/driftsmoke.png');
        //  Level Whiskey
        PIXI.Loader.shared.add('level-whiskey-background', 'img/LevelWhiskey/background.png');
        PIXI.Loader.shared.add('level-whiskey-fire0', 'img/LevelWhiskey/fire0.png');
        PIXI.Loader.shared.add('level-whiskey-fire1', 'img/LevelWhiskey/fire1.png');
        PIXI.Loader.shared.add('level-whiskey-fire2', 'img/LevelWhiskey/fire2.png');
        PIXI.Loader.shared.add('level-whiskey-fire3', 'img/LevelWhiskey/fire3.png');
        PIXI.Loader.shared.add('level-whiskey-glas', 'img/LevelWhiskey/glas.png');
        PIXI.Loader.shared.add('level-whiskey-swirl0', 'img/LevelWhiskey/swirl0.png');
        PIXI.Loader.shared.add('level-whiskey-swirl1', 'img/LevelWhiskey/swirl1.png');
        PIXI.Loader.shared.add('level-whiskey-swirl2', 'img/LevelWhiskey/swirl2.png');
        PIXI.Loader.shared.add('level-whiskey-swirl3', 'img/LevelWhiskey/swirl3.png');
        PIXI.Loader.shared.add('level-whiskey-swirl4', 'img/LevelWhiskey/swirl4.png');
        PIXI.Loader.shared.add('level-whiskey-mouth0-p1', 'img/LevelWhiskey/mouth0-p1.png');
        PIXI.Loader.shared.add('level-whiskey-mouth1-p1', 'img/LevelWhiskey/mouth1-p1.png');
        PIXI.Loader.shared.add('level-whiskey-mouth2-p1', 'img/LevelWhiskey/mouth2-p1.png');
        PIXI.Loader.shared.add('level-whiskey-mouth0-p2', 'img/LevelWhiskey/mouth0-p2.png');
        PIXI.Loader.shared.add('level-whiskey-mouth1-p2', 'img/LevelWhiskey/mouth1-p2.png');
        PIXI.Loader.shared.add('level-whiskey-mouth2-p2', 'img/LevelWhiskey/mouth2-p2.png');
        PIXI.Loader.shared.add('level-whiskey-arm-p1', 'img/LevelWhiskey/arm-p1.png');
        PIXI.Loader.shared.add('level-whiskey-arm-p2', 'img/LevelWhiskey/arm-p2.png');
        PIXI.Loader.shared.add('level-whiskey-hand0', 'img/LevelWhiskey/hand0.png');
        PIXI.Loader.shared.add('level-whiskey-hand1', 'img/LevelWhiskey/hand1.png');
        PIXI.Loader.shared.add('level-whiskey-hand2', 'img/LevelWhiskey/hand2.png');
        PIXI.Loader.shared.add('level-whiskey-hand3', 'img/LevelWhiskey/hand3.png');
        PIXI.Loader.shared.add('level-whiskey-hand4', 'img/LevelWhiskey/hand4.png');
        PIXI.Loader.shared.add('level-whiskey-face-p1', 'img/LevelWhiskey/face-p1.png');
        PIXI.Loader.shared.add('level-whiskey-face-p2', 'img/LevelWhiskey/face-p2.png');
        PIXI.Loader.shared.add('level-whiskey-face-splash-p1', 'img/LevelWhiskey/face-splash-p1.png');
        PIXI.Loader.shared.add('level-whiskey-face-splash-p2', 'img/LevelWhiskey/face-splash-p2.png');
        PIXI.Loader.shared.add('level-whiskey-splash0', 'img/LevelWhiskey/splash0.png');
        PIXI.Loader.shared.add('level-whiskey-splash1', 'img/LevelWhiskey/splash1.png');
        PIXI.Loader.shared.add('level-whiskey-splash2', 'img/LevelWhiskey/splash2.png');
        PIXI.Loader.shared.add('level-whiskey-splash3', 'img/LevelWhiskey/splash3.png');
        PIXI.Loader.shared.add('level-whiskey-throat', 'img/LevelWhiskey/throat.png');
        //  Level End
        PIXI.Loader.shared.add('level-end-gameover', 'img/LevelEnd/gameover.png');
        PIXI.Loader.shared.add('level-end-whataman', 'img/LevelEnd/whataman.png');
        //  Face
        PIXI.Loader.shared.add('face-background-p1', 'img/Face/background-p1.png');
        PIXI.Loader.shared.add('face-background-p2', 'img/Face/background-p2.png');
        PIXI.Loader.shared.add('face-eyes0', 'img/Face/eyes0.png');
        PIXI.Loader.shared.add('face-eyes1', 'img/Face/eyes1.png');
        PIXI.Loader.shared.add('face-eyes2', 'img/Face/eyes2.png');
        PIXI.Loader.shared.add('face-eyes3', 'img/Face/eyes3.png');
        PIXI.Loader.shared.add('face-eyes4', 'img/Face/eyes4.png');
        PIXI.Loader.shared.add('face-jaw0', 'img/Face/jaw0.png');
        PIXI.Loader.shared.add('face-jaw1', 'img/Face/jaw1.png');
        PIXI.Loader.shared.add('face-jaw2', 'img/Face/jaw2.png');
        PIXI.Loader.shared.add('face-jaw3', 'img/Face/jaw3.png');
        PIXI.Loader.shared.add('face-jaw4', 'img/Face/jaw4.png');
        PIXI.Loader.shared.add('face-moustache1-p1', 'img/Face/moustache1-p1.png');
        PIXI.Loader.shared.add('face-moustache1-p2', 'img/Face/moustache1-p2.png');
        PIXI.Loader.shared.add('face-moustache2-p1', 'img/Face/moustache2-p1.png');
        PIXI.Loader.shared.add('face-moustache2-p2', 'img/Face/moustache2-p2.png');
        PIXI.Loader.shared.add('face-moustache3-p1', 'img/Face/moustache3-p1.png');
        PIXI.Loader.shared.add('face-moustache3-p2', 'img/Face/moustache3-p2.png');
        PIXI.Loader.shared.add('face-moustache4-p1', 'img/Face/moustache4-p1.png');
        PIXI.Loader.shared.add('face-moustache4-p2', 'img/Face/moustache4-p2.png');
        PIXI.Loader.shared.add('face-moustache5-p1', 'img/Face/moustache5-p1.png');
        PIXI.Loader.shared.add('face-moustache5-p2', 'img/Face/moustache5-p2.png');
        PIXI.Loader.shared.add('face-neck1', 'img/Face/neck1.png');
        PIXI.Loader.shared.add('face-neck2', 'img/Face/neck2.png');
        PIXI.Loader.shared.add('face-neck3', 'img/Face/neck3.png');
        PIXI.Loader.shared.add('face-neck4', 'img/Face/neck4.png');
        PIXI.Loader.shared.add('face-nose0', 'img/Face/nose0.png');
        PIXI.Loader.shared.add('face-nose1', 'img/Face/nose1.png');
        PIXI.Loader.shared.add('face-nose2', 'img/Face/nose2.png');
        PIXI.Loader.shared.add('face-nose3', 'img/Face/nose3.png');
        PIXI.Loader.shared.add('face-nose4', 'img/Face/nose4.png');
    };
    Game.loadingScreenResourcesLoaded = function (resources) {
        Game.currentStatePlayer1 = new LoadingState();
        Game.lastFrameTime = Date.now();
        //  Game loop
        Game.app.ticker.add(Game.update);
        Game.app.stage.addChild(Game.progressText);
        Game.loadResources();
        PIXI.Loader.shared.onProgress.add(Game.showProgress);
        PIXI.Loader.shared.load(Game.resourcesLoaded);
    };
    Game.showProgress = function (e) {
        Game.progressText.text = Math.ceil(e.progress).toString() + '%';
    };
    Game.resourcesLoaded = function (resources) {
        Game.app.stage.removeChild(Game.progressText);
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