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
        _this.totalTimeDrink = 1000;
        _this.totalTimeSplash = 500;
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
        _this.instructionsUp = new PIXI.Sprite(PIXI.Loader.shared.resources["keyup-p" + player].texture);
        _this.instructionsUp.pivot.x = _this.instructionsUp.width / 2;
        _this.instructionsUp.x = xOffset + 80 - 3 + _this.glas.width / 2;
        _this.instructionsUp.y = 65 + 286 - 92 - _this.instructionsUp.height - 8;
        _this.instructionsUp.zIndex = 1000;
        _this.instructionsUp.visible = false;
        _this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-hand0"].texture);
        _this.hand.x = 487;
        _this.hand.y = 400;
        _this.arm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-arm-p" + _this.player].texture);
        _this.arm.x = _this.hand.x + _this.hand.width;
        _this.arm.y = _this.hand.y;
        _this.face = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-face-p" + _this.player].texture);
        _this.face.x = 950;
        _this.face.y = 54;
        _this.face.visible = false;
        _this.splash = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-splash0"].texture);
        _this.splash.x = 950;
        _this.splash.y = 99;
        _this.splash.visible = false;
        _this.throat = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-throat"].texture);
        _this.throat.x = 950;
        _this.throat.y = 99;
        _this.throat.visible = false;
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
        Game.app.stage.addChild(this.instructionsUp);
        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = true;
        this.instructionsUp.visible = false;
        this.mouth.visible = false;
        this.totalElapsedTime = 0;
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        Game.sceneTransition.startShrinking();
        Game.soundPlayer.musicWhiskey.play();
        this.renderWorld();
        this.swirlSpeed = 160;
        this.maxSwirlScore = 5;
        this.swirlScore = 0;
        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = false;
    };
    LevelWhiskey.prototype.onExit = function () {
        Game.app.stage.removeChild(this.world);
        Game.app.stage.removeChild(this.instructionsLeft);
        Game.app.stage.removeChild(this.instructionsRight);
        Game.app.stage.removeChild(this.instructionsUp);
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
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            if (this.player == 1) {
                Game.sceneTransition.update(elapsedTime);
            }
            if (Game.sceneTransition.isDone()) {
                Game.intro.startLevelWhiskey();
            }
            return;
        }
        if (Game.sceneTransition.isGrowing) {
            if (this.player == 1) {
                Game.sceneTransition.update(elapsedTime);
            }
            if (Game.sceneTransition.isDone()) {
                this.onExit();
            }
        }
        this.totalElapsedTime += elapsedTime;
        this.scoreCounter.update(elapsedTime);
        var musicTime;
        if (Game.soundPlayer.musicWhiskey.playing() == false) {
            musicTime = 79;
        }
        else {
            musicTime = Game.soundPlayer.musicOffice.seek();
        }
        if (musicTime > 76) {
            if (this.player == 1) {
                this.pressEnter.visible = true;
                if (musicTime < 76.3) {
                    this.pressEnter.alpha = (musicTime - 76) / 0.3;
                }
                else {
                    this.pressEnter.alpha = 1;
                }
                this.pressEnter.scale.x = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
                this.pressEnter.scale.y = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
            }
            if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter') &&
                !Game.sceneTransition.isGrowing) {
                Game.sceneTransition.startGrowing();
            }
            this.renderWorld();
            return;
        }
        this.updateGlas(elapsedTime);
        this.renderWorld();
    };
    LevelWhiskey.prototype.updateGlas = function (elapsedTime) {
        if (this.timeLeftDrinking > 0) {
            this.timeLeftDrinking -= elapsedTime;
            if (this.timeLeftDrinking <= 0) {
                this.scoreCounter.setNewScore(this.scoreCounter.getDesiredScore() + 10, 100);
                this.swirlScore = 0;
                this.maxSwirlScore += 2;
                this.throat.visible = false;
                this.mouth.visible = false;
                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl0"].texture;
                if (this.swirl.angle >= 90 && this.swirl.angle < 270) {
                    this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                    this.instructionsRight.visible = true;
                }
                else {
                    this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-p" + this.player].texture;
                    this.instructionsLeft.visible = true;
                }
            }
            else {
                var part = this.timeLeftDrinking / this.totalTimeDrink;
                if (part > 2 / 3) {
                    part = (part - 2 / 3) * 3;
                }
                else if (part > 1 / 3) {
                    part = (part - 1 / 3) * 3;
                }
                else {
                    part = part * 3;
                }
                this.throat.visible = true;
                this.throat.x = this.face.x + 320 - 50 * part;
                this.throat.y = this.face.y + 245 + 16 * Math.sin(Math.PI * part);
            }
            return;
        }
        else if (this.timeLeftSplashing > 0) {
            this.timeLeftSplashing -= elapsedTime;
            if (this.timeLeftSplashing <= 0) {
                this.swirlScore = 0;
                this.splash.visible = false;
                this.mouth.visible = false;
                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl0"].texture;
                if (this.swirl.angle >= 90 && this.swirl.angle < 270) {
                    this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                    this.instructionsRight.visible = true;
                }
                else {
                    this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-p" + this.player].texture;
                    this.instructionsLeft.visible = true;
                }
            }
            else {
                this.splash.visible = true;
                var img = 3 - Math.floor(4 * this.timeLeftSplashing / this.totalTimeSplash);
                if (img < 0) {
                    //  Borde aldrig hända, men det vore tråkigt om allt kraschar pga några sjuka javascript-avrundningar
                    img = 0;
                }
                this.splash.texture = PIXI.Loader.shared.resources["level-whiskey-splash" + img].texture;
            }
            return;
        }
        var lastAngle = this.swirl.angle;
        this.swirl.angle += this.swirlSpeed * elapsedTime / 1000;
        if (this.swirl.angle >= 360) {
            this.swirl.angle -= 360;
        }
        var angle = Math.abs(this.swirl.angle - 180);
        if (angle <= 15) {
            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth2-p" + this.player].texture;
        }
        else if (angle <= 30) {
            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth1-p" + this.player].texture;
        }
        else {
            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth0-p" + this.player].texture;
        }
        var hand = 4 - Math.floor(angle / (180 / 5));
        this.hand.texture = PIXI.Loader.shared.resources["level-whiskey-hand" + hand].texture;
        if (this.swirlScore == this.maxSwirlScore) {
            if (Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.last.isPressed(this.upKey) &&
                this.instructionsUp.visible) {
                this.instructionsUp.visible = false;
                this.face.y = 88;
                this.swirlSpeed = 120;
                if (angle <= 17) {
                    this.timeLeftDrinking = this.totalTimeDrink;
                }
                else {
                    this.timeLeftSplashing = this.totalTimeSplash;
                    this.face.texture = PIXI.Loader.shared.resources["level-whiskey-face-splash-p" + this.player].texture;
                    this.splash.x = 413 - 20;
                    this.splash.y = 30;
                }
                return;
            }
            if (this.face.x > 520) {
                this.face.x -= elapsedTime * 800 / 1000;
                if (this.face.x <= 520) {
                    this.face.x = 520;
                    this.faceAimTimeElapsed = 0;
                    this.instructionsUp.visible = true;
                }
            }
            else {
                this.faceAimTimeElapsed += elapsedTime;
                if (this.faceAimTimeElapsed > 1000) {
                    this.faceAimTimeElapsed -= 1000;
                }
                this.face.y = 59 - (5 * Math.cos(2 * Math.PI * this.faceAimTimeElapsed / 1000));
            }
        }
        else {
            if (this.face.visible) {
                this.face.x += elapsedTime * 800 / 1000;
                if (this.face.x >= 950) {
                    this.face.x = 950;
                    this.face.visible = false;
                }
            }
            if (lastAngle < 90 && this.swirl.angle >= 90) {
                this.instructionsLeft.visible = false;
                this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                this.instructionsRight.visible = true;
                this.glas.x = 80;
                this.swirl.x = this.glas.x + 123;
            }
            else if (lastAngle < 270 && this.swirl.angle >= 270) {
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
                this.glas.x = 80 - 20;
                this.swirl.x = this.glas.x + 123;
                if (this.swirlScore == this.maxSwirlScore) {
                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;
                    this.face.texture = PIXI.Loader.shared.resources["level-whiskey-face-p" + this.player].texture;
                    this.face.visible = true;
                    this.face.x = 950;
                    this.face.y = 54;
                    this.mouth.visible = true;
                    swirlImg = 4;
                }
                else {
                    this.swirlSpeed += 50;
                    if (this.swirlSpeed > 700) {
                        this.swirlSpeed = 700;
                    }
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
                this.glas.x = 80 + 20;
                this.swirl.x = this.glas.x + 123;
                if (this.swirlScore == this.maxSwirlScore) {
                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;
                    this.face.texture = PIXI.Loader.shared.resources["level-whiskey-face-p" + this.player].texture;
                    this.face.visible = true;
                    this.face.x = 950;
                    this.face.y = 54;
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
        Game.app.renderer.render(this.throat, this.renderTexture, false);
        Game.app.renderer.render(this.face, this.renderTexture, false);
        Game.app.renderer.render(this.splash, this.renderTexture, false);
        Game.app.renderer.render(this.glas, this.renderTexture, false);
        Game.app.renderer.render(this.swirl, this.renderTexture, false);
    };
    return LevelWhiskey;
}(GameState));
//# sourceMappingURL=levelWhiskey.js.map