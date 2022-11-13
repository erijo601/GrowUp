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
var LevelWhiskey = /** @class */ (function (_super) {
    __extends(LevelWhiskey, _super);
    function LevelWhiskey(player, xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, player, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.gameEndsOnTime = 86000;
        _this.stateName = "LevelWhiskey";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-background"].texture);
        _this.background.x = 0;
        _this.background.y = 0;
        _this.background.zIndex = 98;
        _this.glas = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-glas"].texture);
        _this.glas.x = 80;
        _this.glas.y = 286;
        _this.glas.zIndex = 200;
        _this.swirl = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-swirl0"].texture);
        _this.swirl.pivot.x = 54;
        _this.swirl.pivot.y = 30;
        _this.swirl.x = _this.glas.x + 123;
        _this.swirl.y = _this.glas.y + 123;
        _this.swirl.zIndex = 201;
        _this.mouth = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-mouth0-p" + _this.player].texture);
        _this.mouth.pivot.x = _this.mouth.width / 2;
        _this.mouth.pivot.y = 0;
        _this.mouth.x = _this.glas.x + 123;
        _this.mouth.y = _this.glas.y - _this.mouth.height;
        _this.mouth.zIndex = 199;
        _this.fire = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-fire0"].texture);
        _this.fire.x = _this.background.x + 322;
        _this.fire.y = _this.background.y + 231;
        _this.fire.zIndex = 99;
        _this.instructionsLeft = new PIXI.Sprite(PIXI.Loader.shared.resources["keyleft-p" + player].texture);
        _this.instructionsLeft.x = xOffset + 80 - 28 - _this.instructionsLeft.width;
        _this.instructionsLeft.y = 65 + 286 + 248 / 2 - _this.instructionsLeft.height / 2;
        _this.instructionsLeft.zIndex = 1000;
        _this.instructionsLeft.visible = false;
        _this.instructionsRight = new PIXI.Sprite(PIXI.Loader.shared.resources["keyleft-p" + player].texture);
        _this.instructionsRight.x = xOffset + 80 + _this.glas.width + 28;
        _this.instructionsRight.y = 65 + 286 + 248 / 2 - _this.instructionsRight.height / 2;
        _this.instructionsRight.zIndex = 1000;
        _this.instructionsRight.visible = false;
        _this.instructionsDown = new PIXI.Sprite(PIXI.Loader.shared.resources["keydown-p" + player].texture);
        _this.instructionsDown.pivot.x = _this.instructionsDown.width / 2;
        _this.instructionsDown.x = xOffset + 80 - 3 + _this.glas.width / 2;
        _this.instructionsDown.y = 65 + 286 - 92 - _this.instructionsDown.height - 8;
        _this.instructionsDown.zIndex = 1000;
        _this.instructionsDown.visible = false;
        _this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-hand0"].texture);
        _this.hand.x = 487;
        _this.hand.y = 430;
        _this.arm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-arm-p" + _this.player].texture);
        _this.arm.x = _this.hand.x + _this.hand.width;
        _this.arm.y = _this.hand.y;
        if (_this.player == 1) {
            _this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            _this.pressEnter.x = 858 + 80;
            _this.pressEnter.y = 842 + 100;
            _this.pressEnter.pivot.x = _this.pressEnter.width / 2;
            _this.pressEnter.pivot.y = _this.pressEnter.height / 2;
            _this.pressEnter.zIndex = 1000;
            _this.pressEnter.visible = false;
        }
        _this.renderTexture = PIXI.RenderTexture.create({ width: 950, height: 950 });
        _this.world = new PIXI.Sprite(_this.renderTexture);
        _this.world.x = xOffset;
        _this.world.y = 65;
        return _this;
    }
    LevelWhiskey.prototype.onEnter = function () {
        this.timeLeftCurrentFireFrame = MathHelper.randomInt(50, 100);
        this.currentFireFrame = MathHelper.randomInt(0, 3);
        this.scoreCounter.onEnter();
        Game.app.stage.addChild(this.world);
        Game.app.stage.addChild(this.instructionsLeft);
        Game.app.stage.addChild(this.instructionsRight);
        Game.app.stage.addChild(this.instructionsDown);
        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = true;
        this.instructionsDown.visible = false;
        this.mouth.visible = false;
        this.totalElapsedTime = 0;
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        Game.sceneTransition.startShrinking();
        Game.soundPlayer.musicWhiskey.play();
        this.renderWorld();
        this.swirlSpeed = 120;
        this.maxSwirlScore = 5;
        this.swirlScore = 0;
        this.currentSwirlImg = 0;
        this.hitSwirl = false;
        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = false;
    };
    LevelWhiskey.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        this.scoreCounter.onExit();
        Game.soundPlayer.musicWhiskey.stop();
        if (this.player == 1) {
            Game.app.stage.removeChild(this.pressEnter);
            Game.scoreStatePlayer1.beforeOnEnter(Level.Whiskey, this.scoreCounter.getScore());
            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {
                Game.currentStatePlayer2.onExit();
            }
        }
        else {
            Game.scoreStatePlayer2.beforeOnEnter(Level.Whiskey, this.scoreCounter.getScore());
            Game.currentStatePlayer2 = Game.scoreStatePlayer2;
            Game.currentStatePlayer2.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer1.stateName == this.stateName) {
                Game.currentStatePlayer1.onExit();
            }
        }
        Game.app.stage.removeChild(this.world);
        Game.app.stage.removeChild(this.instructionsLeft);
        Game.app.stage.removeChild(this.instructionsRight);
    };
    LevelWhiskey.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        this.timeLeftCurrentFireFrame -= elapsedTime;
        if (this.timeLeftCurrentFireFrame <= 0) {
            this.timeLeftCurrentFireFrame = 100;
            this.currentFireFrame++;
            if (this.currentFireFrame > 3) {
                this.currentFireFrame = 0;
            }
            this.fire.texture = PIXI.Loader.shared.resources["level-whiskey-fire" + this.currentFireFrame].texture;
        }
        this.updateGlas(elapsedTime);
        this.renderWorld();
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
                Game.intro.startLevelWhiskey();
            }
            return;
        }
        if (Game.sceneTransition.isGrowing) {
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
                this.onExit();
            }
        }
        this.totalElapsedTime += elapsedTime;
        this.scoreCounter.update(elapsedTime);
        if (this.totalElapsedTime > this.gameEndsOnTime) {
            if (this.player == 1) {
                this.pressEnter.visible = true;
                if (this.totalElapsedTime > this.gameEndsOnTime && this.totalElapsedTime < this.gameEndsOnTime + 300) {
                    this.pressEnter.alpha = (this.totalElapsedTime - this.gameEndsOnTime) / 300;
                }
                else if (this.totalElapsedTime > this.gameEndsOnTime + 300) {
                    this.pressEnter.alpha = 1;
                }
                this.pressEnter.scale.x = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
                this.pressEnter.scale.y = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
            }
            if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter') &&
                !Game.sceneTransition.isGrowing) {
                Game.sceneTransition.startGrowing();
            }
            return;
        }
    };
    LevelWhiskey.prototype.updateGlas = function (elapsedTime) {
        var lastAngle = this.swirl.angle;
        this.swirl.angle += this.swirlSpeed * elapsedTime / 1000;
        if (this.swirl.angle >= 360) {
            this.swirl.angle -= 360;
        }
        if (Math.abs(this.swirl.angle - 180) <= 15) {
            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth2-p" + this.player].texture;
        }
        else if (Math.abs(this.swirl.angle - 180) <= 30) {
            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth1-p" + this.player].texture;
        }
        else {
            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth0-p" + this.player].texture;
        }
        if (this.swirlScore == this.maxSwirlScore) {
            //  TODO: Check down key for score or miss
            //  När man trycker s, flytta glas/swirl upp 10 pixlar, stanna upp glaset/swirl-animationen en stund och animera stora huvudet
        }
        else {
            if (lastAngle < 90 && this.swirl.angle >= 90) {
                this.hitSwirl = false;
                this.instructionsLeft.visible = false;
                this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                this.instructionsRight.visible = true;
                this.glas.x = 80;
                this.swirl.x = this.glas.x + 123;
            }
            else if (lastAngle < 270 && this.swirl.angle >= 270) {
                this.hitSwirl = false;
                this.instructionsRight.visible = false;
                this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-p" + this.player].texture;
                this.instructionsLeft.visible = true;
                this.glas.x = 80;
                this.swirl.x = this.glas.x + 123;
            }
        }
        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.last.isPressed(this.leftKey) &&
            this.instructionsLeft.visible) {
            if (this.swirlScore < this.maxSwirlScore) {
                this.swirlScore++;
                var swirlImg = 0;
                this.glas.x = 80 + 10;
                this.swirl.x = this.glas.x + 123;
                if (this.swirlScore == this.maxSwirlScore) {
                    //  TODO: Rör det stora ansiktet mot glaset
                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;
                    this.instructionsDown.visible = true;
                    this.mouth.visible = true;
                    swirlImg = 4;
                }
                else {
                    this.swirlSpeed += 60;
                    swirlImg = Math.ceil(this.swirlScore / this.maxSwirlScore * 3);
                }
                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl" + swirlImg].texture;
            }
            this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-pressed-p" + this.player].texture;
        }
        else if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.last.isPressed(this.rightKey) &&
            this.instructionsRight.visible) {
            if (this.swirlScore < this.maxSwirlScore) {
                this.swirlScore++;
                var swirlImg = 0;
                this.glas.x = 80 - 10;
                this.swirl.x = this.glas.x + 123;
                if (this.swirlScore == this.maxSwirlScore) {
                    //  TODO: Rör det stora ansiktet mot glaset
                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;
                    this.instructionsDown.visible = true;
                    this.mouth.visible = true;
                    swirlImg = 4;
                }
                else {
                    this.swirlSpeed += 60;
                    swirlImg = Math.ceil(this.swirlScore / this.maxSwirlScore * 3);
                }
                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl" + swirlImg].texture;
            }
            this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-pressed-p" + this.player].texture;
        }
        if (this.glas.x > 80) {
            this.glas.x -= 50 * elapsedTime / 1000;
            if (this.glas.x < 80) {
                this.glas.x = 80;
            }
            this.swirl.x = this.glas.x + 123;
        }
        else if (this.glas.x < 80) {
            this.glas.x += 50 * elapsedTime / 1000;
            if (this.glas.x > 80) {
                this.glas.x = 80;
            }
            this.swirl.x = this.glas.x + 123;
        }
    };
    LevelWhiskey.prototype.renderWorld = function () {
        Game.app.renderer.render(this.background, this.renderTexture, true);
        Game.app.renderer.render(this.fire, this.renderTexture, false);
        Game.app.renderer.render(this.hand, this.renderTexture, false);
        Game.app.renderer.render(this.arm, this.renderTexture, false);
        Game.app.renderer.render(this.mouth, this.renderTexture, false);
        Game.app.renderer.render(this.glas, this.renderTexture, false);
        Game.app.renderer.render(this.swirl, this.renderTexture, false);
    };
    return LevelWhiskey;
}(GameState));
//# sourceMappingURL=levelWhiskey.js.map