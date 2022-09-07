var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LoadingState = /** @class */ (function (_super) {
    __extends(LoadingState, _super);
    function LoadingState() {
        var _this = _super.call(this, 0, null, null, null, null) || this;
        var fzTextures = [];
        for (var n = 0; n < 8; n++) {
            fzTextures.push(Game.loadingScreenLoader.resources["fz" + n].texture);
        }
        fzTextures.push(Game.loadingScreenLoader.resources["fz0"].texture);
        _this.logoFz = new PIXI.AnimatedSprite(fzTextures);
        _this.logoFz.loop = false;
        _this.logoFz.animationSpeed = 0.2;
        _this.logoFz.x = 730;
        _this.logoFz.y = 70;
        var that = _this;
        _this.logoFz.onComplete = function () {
            that.logoTimer = setTimeout(function () { that.logoFz.gotoAndPlay(0); }, 2000);
        };
        var pipeTextures = [];
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe0"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe1"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe1"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe2"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe2"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe3"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe4"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe3"].texture);
        pipeTextures.push(Game.loadingScreenLoader.resources["pipe0"].texture);
        _this.pipe = new PIXI.AnimatedSprite(pipeTextures);
        _this.pipe.loop = false;
        _this.pipe.animationSpeed = 0.3;
        _this.pipe.x = 786;
        _this.pipe.y = 777;
        _this.activeLetters = [];
        _this.onEnter();
        return _this;
    }
    LoadingState.prototype.onEnter = function () {
        Game.app.stage.addChild(this.logoFz);
        Game.app.stage.addChild(this.pipe);
        this.logoFz.gotoAndPlay(0);
        this.totalTimeElasped = 0;
        this.timeLeftCurrentFrame = 500;
        this.nextLoadingLetter = 0;
        this.timeTilNextLoadingLetter = 500;
    };
    LoadingState.prototype.onExit = function () {
        Game.app.stage.removeChild(this.logoFz);
        for (var n = 0; n < this.activeLetters.length; n++) {
            this.activeLetters[n].removeFromStage();
        }
        clearTimeout(this.logoTimer);
        Game.app.renderer.backgroundColor = 0xffffff;
        Game.currentStatePlayer1 = new TitleState(0, 'w', 's', 'a', 'd');
        Game.currentStatePlayer1.onEnter();
    };
    LoadingState.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        if (Game.doneLoading && !Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {
            this.onExit();
        }
        //  Alternate between letter and letter-alt
        this.timeLeftCurrentFrame -= elapsedTime;
        if (this.timeLeftCurrentFrame <= 0) {
            for (var n_1 = 0; n_1 < this.activeLetters.length; n_1++) {
                this.activeLetters[n_1].changeFrame();
            }
            this.timeLeftCurrentFrame += 500;
        }
        //  Spawn new loading letters
        if (this.timeTilNextLoadingLetter > 0) {
            this.timeTilNextLoadingLetter -= elapsedTime;
            if (this.timeTilNextLoadingLetter <= 0) {
                if (this.nextLoadingLetter == 7) {
                    for (var n_2 = 0; n_2 < this.activeLetters.length; n_2++) {
                        this.activeLetters[n_2].totalFadeoutTime = 3000;
                        this.activeLetters[n_2].fadeoutTimeLeft = 3000;
                    }
                    this.nextLoadingLetter = 0;
                    this.timeTilNextLoadingLetter += 3000;
                }
                else {
                    this.pipe.gotoAndPlay(0);
                    var that_1 = this;
                    this.pipe.onFrameChange = function (currentFrame) {
                        if (currentFrame == 6) {
                            //  TODO: Jag ska inte alltid spawna loading letter här. En gång på slutet ska jag spawna press enter letters (alla samtidigt)
                            that_1.spawnLoadingLetter();
                        }
                    };
                    this.timeTilNextLoadingLetter += 800;
                }
            }
        }
        //  Update all active letters
        var n = this.activeLetters.length;
        while (n--) {
            this.activeLetters[n].update(elapsedTime);
            if (this.activeLetters[n].shouldRemove) {
                this.activeLetters.splice(n, 1);
            }
        }
    };
    LoadingState.prototype.spawnLoadingLetter = function () {
        switch (this.nextLoadingLetter) {
            case 0:
                this.activeLetters.push(new SmokeLetter('l', 630, 546));
                break;
            case 1:
                this.activeLetters.push(new SmokeLetter('o', 722, 547));
                break;
            case 2:
                this.activeLetters.push(new SmokeLetter('a', 828, 543));
                break;
            case 3:
                this.activeLetters.push(new SmokeLetter('d', 931, 546));
                break;
            case 4:
                this.activeLetters.push(new SmokeLetter('i', 1027, 546));
                break;
            case 5:
                this.activeLetters.push(new SmokeLetter('n', 1100, 545));
                break;
            case 6:
                this.activeLetters.push(new SmokeLetter('g', 1202, 550));
                break;
        }
        this.nextLoadingLetter++;
        if (this.nextLoadingLetter > 7) {
            this.nextLoadingLetter = 7;
        }
    };
    return LoadingState;
}(GameState));
//# sourceMappingURL=loadingState.js.map