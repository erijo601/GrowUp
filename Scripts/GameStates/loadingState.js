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
var LoadingState = (function (_super) {
    __extends(LoadingState, _super);
    function LoadingState() {
        var _this = _super.call(this, 1, 0, null, null, null, null) || this;
        _this.stateName = "LoadingState";
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
        _this.pipe.y = 677;
        _this.activeLetters = [];
        _this.onEnter();
        return _this;
    }
    LoadingState.prototype.onEnter = function () {
        Game.app.stage.addChild(this.pipe);
        this.totalTimeElasped = 0;
        this.timeLeftCurrentFrame = 500;
        this.nextLoadingLetter = 0;
        this.timeTilNextLoadingLetter = 500;
        this.noMoreLetters = false;
    };
    LoadingState.prototype.onExit = function () {
        this.pipe.visible = false;
        Game.app.stage.removeChild(this.pipe);
        for (var n = 0; n < this.activeLetters.length; n++) {
            this.activeLetters[n].removeFromStage();
        }
        Game.app.renderer.backgroundColor = 0xffffff;
        Game.currentStatePlayer1 = new TitleState(0, 'w', 's', 'a', 'd');
        Game.currentStatePlayer1.onEnter();
    };
    LoadingState.prototype.update = function (elapsedTime) {
        if (Game.doneLoading && !Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {
            this.onExit();
        }
        this.timeLeftCurrentFrame -= elapsedTime;
        if (this.timeLeftCurrentFrame <= 0) {
            for (var n_1 = 0; n_1 < this.activeLetters.length; n_1++) {
                this.activeLetters[n_1].changeFrame();
            }
            this.timeLeftCurrentFrame += 400;
        }
        if (this.timeTilNextLoadingLetter > 0 && !this.noMoreLetters) {
            this.timeTilNextLoadingLetter -= elapsedTime;
            if (this.timeTilNextLoadingLetter <= 0) {
                if (this.nextLoadingLetter == 7) {
                    for (var n_2 = 0; n_2 < this.activeLetters.length; n_2++) {
                        this.activeLetters[n_2].totalFadeoutTime = 1000;
                        this.activeLetters[n_2].fadeoutTimeLeft = 1000;
                    }
                    this.nextLoadingLetter = 0;
                    this.timeTilNextLoadingLetter += 1000;
                }
                else {
                    if (this.nextLoadingLetter == 0 && Game.doneLoading) {
                        this.noMoreLetters = true;
                    }
                    this.pipe.gotoAndPlay(0);
                    var that_1 = this;
                    this.pipe.onFrameChange = function (currentFrame) {
                        if (that_1.noMoreLetters) {
                            if (currentFrame == 1) {
                                that_1.pipe.animationSpeed = 0.2;
                            }
                            else if (currentFrame == 2) {
                                that_1.pipe.animationSpeed = 0.15;
                            }
                            else if (currentFrame == 3) {
                                that_1.pipe.animationSpeed = 0.125;
                            }
                            else if (currentFrame == 4) {
                                that_1.pipe.animationSpeed = 0.1;
                            }
                            else {
                                that_1.pipe.animationSpeed = 0.3;
                            }
                        }
                        if (currentFrame == 6) {
                            if (that_1.noMoreLetters) {
                                that_1.spawnPressEnterLetters();
                            }
                            else {
                                that_1.spawnLoadingLetter();
                            }
                        }
                    };
                    this.timeTilNextLoadingLetter += 650;
                }
            }
        }
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
                this.activeLetters.push(new SmokeLetter('l', 630, 446));
                break;
            case 1:
                this.activeLetters.push(new SmokeLetter('o', 722, 447));
                break;
            case 2:
                this.activeLetters.push(new SmokeLetter('a', 828, 443));
                break;
            case 3:
                this.activeLetters.push(new SmokeLetter('d', 931, 446));
                break;
            case 4:
                this.activeLetters.push(new SmokeLetter('i', 1010, 446));
                break;
            case 5:
                this.activeLetters.push(new SmokeLetter('n', 1100, 445));
                break;
            case 6:
                this.activeLetters.push(new SmokeLetter('g', 1202, 445));
                break;
        }
        this.nextLoadingLetter++;
        if (this.nextLoadingLetter > 7) {
            this.nextLoadingLetter = 7;
        }
    };
    LoadingState.prototype.spawnPressEnterLetters = function () {
        this.activeLetters.push(new SmokeLetter('p', 440, 446));
        this.activeLetters.push(new SmokeLetter('r', 535, 446));
        this.activeLetters.push(new SmokeLetter('e', 630, 446));
        this.activeLetters.push(new SmokeLetter('s', 722, 447));
        this.activeLetters.push(new SmokeLetter('s', 828, 443));
        this.activeLetters.push(new SmokeLetter('e', 1010, 446));
        this.activeLetters.push(new SmokeLetter('n', 1100, 445));
        this.activeLetters.push(new SmokeLetter('t', 1202, 445));
        this.activeLetters.push(new SmokeLetter('e', 1295, 445));
        this.activeLetters.push(new SmokeLetter('r', 1390, 445));
    };
    return LoadingState;
}(GameState));
