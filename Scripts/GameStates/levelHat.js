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
var LevelHat = /** @class */ (function (_super) {
    __extends(LevelHat, _super);
    function LevelHat(player, xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, player, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.gameEndsOnTime = 83000;
        _this.stateName = "LevelHat";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-background"].texture);
        _this.background.x = xOffset;
        _this.background.y = 165;
        if (_this.player == 1) {
            _this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            _this.pressEnter.x = 858 + 80;
            _this.pressEnter.y = 842;
            _this.pressEnter.pivot.x = _this.pressEnter.width / 2;
            _this.pressEnter.pivot.y = _this.pressEnter.height / 2;
            _this.pressEnter.zIndex = 1000;
            _this.pressEnter.visible = false;
        }
        _this.playerLegs = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-legs0"].texture);
        _this.playerLegs.y = _this.background.y + 400;
        _this.playerLegs.zIndex = 100;
        _this.playerLegs.pivot.x = _this.playerLegs.width / 2;
        _this.playerTorso = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-idle0"].texture);
        _this.playerTorso.y = _this.background.y + 152;
        _this.playerTorso.zIndex = 101;
        _this.playerTorso.pivot.x = _this.playerTorso.width / 2;
        _this.playerHair = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-hair-p" + _this.player].texture);
        _this.playerHair.y = _this.background.y + 251;
        _this.playerHair.zIndex = 102;
        _this.playerHair.pivot.x = _this.playerHair.width / 2;
        _this.grabTorso = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-grab-torso"].texture);
        _this.grabTorso.y = _this.background.y + 152;
        _this.grabTorso.zIndex = 101;
        _this.grabTorso.pivot.x = _this.grabTorso.width / 2;
        _this.grabTorso.visible = false;
        _this.grabLeftLowerArm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-grab-left-lower-arm"].texture);
        _this.grabLeftLowerArm.x = _this.playerTorso.x + 99;
        _this.grabLeftLowerArm.y = _this.playerTorso.y + 162;
        _this.grabLeftLowerArm.zIndex = 100;
        _this.grabLeftLowerArm.pivot.x = 108;
        _this.grabLeftLowerArm.pivot.y = 14;
        _this.grabLeftLowerArm.visible = false;
        _this.grabLeftUpperArm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-grab-left-upper-arm"].texture);
        _this.grabLeftUpperArm.x = _this.playerTorso.x + 99;
        _this.grabLeftUpperArm.y = _this.playerTorso.y + 161 + 14;
        _this.grabLeftUpperArm.zIndex = 101;
        _this.grabLeftUpperArm.pivot.x = 58;
        _this.grabLeftUpperArm.pivot.y = 14;
        _this.grabLeftUpperArm.visible = false;
        _this.grabRightLowerArm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-grab-right-lower-arm"].texture);
        _this.grabRightLowerArm.x = _this.playerTorso.x;
        _this.grabRightLowerArm.y = _this.playerTorso.y;
        _this.grabRightLowerArm.zIndex = 104;
        _this.grabRightLowerArm.pivot.x = 7;
        _this.grabRightLowerArm.pivot.y = 14;
        _this.grabRightLowerArm.visible = false;
        _this.grabRightUpperArm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-grab-right-upper-arm"].texture);
        _this.grabRightUpperArm.x = _this.playerTorso.x + 193;
        _this.grabRightUpperArm.y = _this.playerTorso.y + 144 + 28;
        _this.grabRightUpperArm.zIndex = 101;
        _this.grabRightUpperArm.pivot.x = 7;
        _this.grabRightUpperArm.pivot.y = 25;
        _this.grabRightUpperArm.visible = false;
        _this.hatFlying = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-flying"].texture);
        _this.hatFlying.zIndex = 103;
        _this.hatFlying.pivot.x = _this.hatFlying.width / 2;
        _this.hatFlying.pivot.y = _this.hatFlying.height / 2;
        _this.hatFlying.y = 330;
        _this.keydown = new PIXI.Sprite(PIXI.Loader.shared.resources["keydown-p1"].texture);
        _this.keydown.y = _this.playerTorso.y - 45;
        _this.keydown.zIndex = 1000;
        _this.keydown.visible = false;
        _this.hockeyPlayer = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-hockey0"].texture);
        _this.hockeyPlayer.pivot.x = _this.hockeyPlayer.width / 2;
        _this.hockeyPlayer.pivot.y = _this.hockeyPlayer.height;
        _this.hockeyPlayer.visible = false;
        _this.hockeyPlayerMoveTimeLeft = 0;
        _this.levelHatFilter = new LevelHatFilter();
        return _this;
    }
    LevelHat.prototype.onEnter = function () {
        this.scoreCounter.onEnter();
        Game.app.stage.addChild(this.background);
        Game.app.stage.addChild(this.playerLegs);
        Game.app.stage.addChild(this.playerTorso);
        Game.app.stage.addChild(this.playerHair);
        Game.app.stage.addChild(this.grabTorso);
        Game.app.stage.addChild(this.grabLeftLowerArm);
        Game.app.stage.addChild(this.grabLeftUpperArm);
        Game.app.stage.addChild(this.grabRightLowerArm);
        Game.app.stage.addChild(this.grabRightUpperArm);
        Game.app.stage.addChild(this.hatFlying);
        Game.app.stage.addChild(this.keydown);
        Game.app.stage.addChild(this.hockeyPlayer);
        this.totalElapsedTime = 0;
        this.timeHoldingHat = 0;
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        this.xPos = this.background.x + this.background.width / 2;
        this.xSpeed = 10;
        this.partGrab = 0;
        this.grabPulldownTimeLeft = 0;
        this.keydownFramePressed = false;
        this.hatFlying.x = this.xPos + (Math.random() > 0.5 ? 1 : -1) * MathHelper.randomInt(this.background.width / 4, this.background.width / 2);
        this.lastHatTarget = this.xOffset + MathHelper.randomInt(0, this.background.width);
        this.hatTarget = this.xOffset + MathHelper.randomInt(0, this.background.width);
        this.totalTimeTilHatTarget = 1000 * Math.abs(this.hatTarget - this.lastHatTarget) / 400;
        this.timeElapsedHatTarget = 0;
        this.timeLeftCurrentFrameLegs = MathHelper.randomInt(0, 99);
        this.currentFrameLegs = MathHelper.randomInt(0, 3);
        this.timeLeftCurrentFrameArms = MathHelper.randomInt(0, 250);
        this.currentFrameArms = MathHelper.randomInt(0, 1);
        this.grabKeydownAnimTimeLeft = 200;
        this.timeTilSpawnHockeyPlayer = 5000;
        this.xScale = 1;
        this.updatePlayerSprites(0);
        if (this.player == 1) {
            Game.sceneTransition.startShrinking();
            Game.app.stage.filters = [this.levelHatFilter];
            if (Game.twoPlayerGame) {
                this.levelHatFilter.iceRect = new PIXI.Rectangle(this.xOffset, this.playerLegs.y + this.playerLegs.height, this.background.width * 2 + 30, 200);
            }
            else {
                this.levelHatFilter.iceRect = new PIXI.Rectangle(this.xOffset, this.playerLegs.y + this.playerLegs.height, this.background.width, 200);
            }
        }
    };
    LevelHat.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        Game.app.stage.removeChild(this.playerLegs);
        Game.app.stage.removeChild(this.playerTorso);
        Game.app.stage.removeChild(this.playerHair);
        Game.app.stage.removeChild(this.grabTorso);
        Game.app.stage.removeChild(this.grabLeftLowerArm);
        Game.app.stage.removeChild(this.grabLeftUpperArm);
        Game.app.stage.removeChild(this.grabRightLowerArm);
        Game.app.stage.removeChild(this.grabRightUpperArm);
        Game.app.stage.removeChild(this.hatFlying);
        Game.app.stage.removeChild(this.keydown);
        Game.app.stage.removeChild(this.hockeyPlayer);
        this.scoreCounter.onExit();
        Game.soundPlayer.musicHat.stop();
        if (this.player == 1) {
            Game.app.stage.filters = [];
            Game.app.stage.removeChild(this.pressEnter);
            Game.scoreStatePlayer1.beforeOnEnter(Level.Hat, this.scoreCounter.getScore());
            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {
                Game.currentStatePlayer2.onExit();
            }
        }
        else {
            Game.scoreStatePlayer2.beforeOnEnter(Level.Hat, this.scoreCounter.getScore());
            Game.currentStatePlayer2 = Game.scoreStatePlayer2;
            Game.currentStatePlayer2.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer1.stateName == this.stateName) {
                Game.currentStatePlayer1.onExit();
            }
        }
    };
    LevelHat.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            if (this.player == 1) {
                Game.sceneTransition.update(elapsedTime);
            }
            if (Game.sceneTransition.isDone()) {
                Game.intro.startLevelHat();
                if (Game.soundPlayer.musicHat.playing() == false) {
                    Game.soundPlayer.musicHat.play();
                }
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
        this.timeTilSpawnHockeyPlayer -= elapsedTime;
        if (this.timeTilSpawnHockeyPlayer <= 0) {
            var hockeySpawnTimer = 5000;
            if (this.totalElapsedTime > this.gameEndsOnTime * 0.75) {
                hockeySpawnTimer = 3000;
            }
            else if (this.totalElapsedTime > this.gameEndsOnTime * 0.5) {
                hockeySpawnTimer = 4000;
            }
            this.timeTilSpawnHockeyPlayer += hockeySpawnTimer;
            this.spawnHockeyPlayer();
        }
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
        this.updateHat(elapsedTime);
        this.updateHockeyPlayer(elapsedTime);
        this.movePlayer(elapsedTime);
        this.updatePlayerSprites(elapsedTime);
    };
    LevelHat.prototype.updateHat = function (elapsedTime) {
        if (this.grabPulldownTimeLeft > 0) {
            this.grabPulldownTimeLeft -= elapsedTime;
            if (this.grabPulldownTimeLeft < 0) {
                this.grabPulldownTimeLeft = 0;
            }
            this.partGrab = 1 - this.grabPulldownTimeLeft / 200;
        }
        if (this.partGrab > 0) {
            this.timeHoldingHat += elapsedTime;
            var currentScore = Math.floor(this.timeHoldingHat / 500);
            if (currentScore > this.scoreCounter.getDesiredScore()) {
                this.scoreCounter.setNewScore(currentScore, 100);
            }
            this.keydown.x = this.playerTorso.x - 23;
            this.keydown.y = this.hatFlying.y - 80;
            this.grabKeydownAnimTimeLeft -= elapsedTime;
            if (this.grabKeydownAnimTimeLeft <= 0) {
                this.grabKeydownAnimTimeLeft += 150;
                this.keydownFramePressed = !this.keydownFramePressed;
                if (this.keydownFramePressed) {
                    this.keydown.texture = PIXI.Loader.shared.resources["keydown-pressed-p" + this.player].texture;
                }
                else {
                    this.keydown.texture = PIXI.Loader.shared.resources["keydown-p" + this.player].texture;
                }
            }
            if (this.grabPulldownTimeLeft <= 0) {
                this.partGrab -= elapsedTime / 2000;
            }
            if (Game.keyboard.current.isPressed(this.downKey) && !Game.keyboard.last.isPressed(this.downKey)) {
                this.grabDownPressCounter++;
                if (this.grabDownPressCounter > 3) {
                    this.grabDownPressCounter = 0;
                    this.partGrab += this.extraGrab;
                    if (this.partGrab > 1) {
                        this.partGrab = 1;
                    }
                    this.extraGrab *= 0.85;
                }
            }
            if (this.partGrab <= 0) {
                this.lastHatTarget = this.hatFlying.x;
                if (this.hatTarget > this.xOffset + this.background.width / 2) {
                    this.hatTarget = this.xOffset + MathHelper.randomInt(0, this.background.width / 2 - 50);
                }
                else {
                    this.hatTarget = this.xOffset + MathHelper.randomInt(this.background.width / 2 + 50, this.background.width);
                }
                this.timeElapsedHatTarget = 0;
                this.totalTimeTilHatTarget = 1000 * Math.abs(this.lastHatTarget - this.hatTarget) / 400;
            }
        }
        if (this.partGrab > 0) {
            this.hatFlying.angle = Math.sin(2 * Math.PI * this.totalElapsedTime / 200) * 20;
            this.hatFlying.x = this.grabTorso.x;
            this.hatFlying.y = this.grabTorso.y + 26 + 72 * this.partGrab;
            this.hatFlying.scale.x = this.grabTorso.scale.x;
            return;
        }
        this.keydown.visible = false;
        this.hatFlying.angle = 45 * Math.sin(2 * Math.PI * this.totalElapsedTime / 3000);
        this.hatFlying.y = 330 + 20 * Math.sin(2 * Math.PI * this.totalElapsedTime / 3000);
        this.timeElapsedHatTarget += elapsedTime;
        if (this.timeElapsedHatTarget >= this.totalTimeTilHatTarget) {
            this.lastHatTarget = this.hatTarget;
            if (this.hatTarget > this.xOffset + this.background.width / 2) {
                this.hatTarget = this.xOffset + MathHelper.randomInt(0, this.background.width / 2 - 50);
            }
            else {
                this.hatTarget = this.xOffset + MathHelper.randomInt(this.background.width / 2 + 50, this.background.width);
            }
            this.timeElapsedHatTarget = 0;
            this.totalTimeTilHatTarget = 1000 * Math.abs(this.lastHatTarget - this.hatTarget) / 400;
        }
        this.hatFlying.x = this.lastHatTarget + (this.hatTarget - this.lastHatTarget) * EasingCurves.easeInOutSine(this.timeElapsedHatTarget / this.totalTimeTilHatTarget);
    };
    LevelHat.prototype.movePlayer = function (elapsedTime) {
        var max = 300;
        var accTime = 1500; //  Tid det tar från 0 till max acc
        var acc = max * 1000 / accTime;
        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {
            this.xSpeed -= acc * elapsedTime / 1000;
            this.xScale = 1;
        }
        if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {
            this.xSpeed += acc * elapsedTime / 1000;
            this.xScale = -1;
        }
        if (!Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {
            if (this.xSpeed > 0) {
                this.xSpeed += acc * elapsedTime / 1000;
            }
            else {
                this.xSpeed -= acc * elapsedTime / 1000;
            }
        }
        if (this.xSpeed < -max) {
            this.xSpeed = -max;
        }
        else if (this.xSpeed > max) {
            this.xSpeed = max;
        }
        this.xPos += this.xSpeed * elapsedTime / 1000;
        if (this.xPos < this.xOffset + 187) {
            this.xPos = this.xOffset + 187;
            this.xSpeed = 0;
        }
        else if (this.xPos > this.xOffset + 930 + 187) {
            this.xPos = this.xOffset + 930 + 187;
            this.xSpeed = 0;
        }
        if (!this.isGrabbing && Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.last.isPressed(this.upKey)) {
            this.isGrabbing = true;
            this.currentFrameArms = 0;
            this.timeLeftCurrentFrameArms = 70;
            this.clapDirection = 1;
        }
    };
    LevelHat.prototype.updatePlayerSprites = function (elapsedTime) {
        this.playerLegs.x = this.xPos - 187;
        this.playerTorso.x = this.xPos - 187;
        this.playerHair.x = this.xPos - 187;
        this.playerLegs.scale.x = this.xScale;
        this.playerTorso.scale.x = this.xScale;
        this.playerHair.scale.x = this.xScale;
        if (this.partGrab <= 0) {
            this.playerTorso.visible = true;
            this.grabTorso.visible = false;
            this.grabLeftLowerArm.visible = false;
            this.grabLeftUpperArm.visible = false;
            this.grabRightLowerArm.visible = false;
            this.grabRightUpperArm.visible = false;
        }
        else {
            this.playerTorso.visible = false;
            this.grabTorso.visible = true;
            this.grabLeftLowerArm.visible = true;
            this.grabLeftUpperArm.visible = true;
            this.grabRightLowerArm.visible = true;
            this.grabRightUpperArm.visible = true;
            this.grabTorso.x = this.playerTorso.x;
            this.grabTorso.scale.x = this.playerTorso.scale.x;
            this.grabLeftUpperArm.scale.x = this.playerTorso.scale.x;
            this.grabRightUpperArm.scale.x = this.playerTorso.scale.x;
            this.grabLeftLowerArm.scale.x = this.playerTorso.scale.x;
            this.grabRightLowerArm.scale.x = this.playerTorso.scale.x;
            if (this.grabTorso.scale.x > 0) {
                this.grabLeftUpperArm.x = this.grabTorso.x + 14 - 44;
                this.grabRightUpperArm.x = this.grabTorso.x + 26;
                this.grabLeftUpperArm.angle = 75 + -55 * this.partGrab;
                this.grabRightUpperArm.angle = -75 + 55 * this.partGrab;
                this.grabLeftLowerArm.x = this.grabLeftUpperArm.x - Math.cos(this.grabLeftUpperArm.rotation) * 50;
                this.grabLeftLowerArm.y = this.grabLeftUpperArm.y - Math.sin(this.grabLeftUpperArm.rotation) * 50;
                this.grabLeftLowerArm.angle = 180 + -75 + 40 * this.partGrab;
                this.grabRightLowerArm.x = this.grabRightUpperArm.x + Math.cos(this.grabRightUpperArm.rotation) * 60;
                this.grabRightLowerArm.y = this.grabRightUpperArm.y + Math.sin(this.grabRightUpperArm.rotation) * 60;
                this.grabRightLowerArm.angle = -100 - 40 * this.partGrab;
            }
            else {
                this.grabLeftUpperArm.x = this.grabTorso.x - 14 + 44;
                this.grabRightUpperArm.x = this.grabTorso.x - 26;
                this.grabLeftUpperArm.angle = -75 + 55 * this.partGrab;
                this.grabRightUpperArm.angle = 75 + -55 * this.partGrab;
                this.grabLeftLowerArm.x = this.grabLeftUpperArm.x + Math.cos(this.grabLeftUpperArm.rotation) * 50;
                this.grabLeftLowerArm.y = this.grabLeftUpperArm.y + Math.sin(this.grabLeftUpperArm.rotation) * 50;
                this.grabLeftLowerArm.angle = -180 + 75 - 40 * this.partGrab;
                this.grabRightLowerArm.x = this.grabRightUpperArm.x - Math.cos(this.grabRightUpperArm.rotation) * 60;
                this.grabRightLowerArm.y = this.grabRightUpperArm.y - Math.sin(this.grabRightUpperArm.rotation) * 60;
                this.grabRightLowerArm.angle = 100 + 40 * this.partGrab;
            }
        }
        this.timeLeftCurrentFrameLegs -= elapsedTime;
        if (this.timeLeftCurrentFrameLegs <= 0) {
            this.timeLeftCurrentFrameLegs += 150;
            if (Game.keyboard.current.isPressed(this.rightKey) || Game.keyboard.current.isPressed(this.leftKey)) {
                this.timeLeftCurrentFrameLegs -= 100;
            }
            this.currentFrameLegs++;
            if (this.currentFrameLegs > 3) {
                this.currentFrameLegs = 0;
            }
        }
        this.playerLegs.texture = PIXI.Loader.shared.resources["level-hat-legs" + this.currentFrameLegs].texture;
        this.timeLeftCurrentFrameArms -= elapsedTime;
        if (this.timeLeftCurrentFrameArms <= 0) {
            if (this.isGrabbing) {
                this.timeLeftCurrentFrameArms += 70;
                this.currentFrameArms += this.clapDirection;
                if (this.currentFrameArms > 5) {
                    this.currentFrameArms = 4;
                    this.clapDirection = -1;
                    this.checkHatGrab();
                }
                else if (this.currentFrameArms < 0) {
                    this.currentFrameArms = 0;
                    this.isGrabbing = false;
                }
                this.playerTorso.texture = PIXI.Loader.shared.resources["level-hat-clap" + this.currentFrameArms].texture;
            }
            if (!this.isGrabbing) {
                this.currentFrameArms++;
                this.timeLeftCurrentFrameArms += 350;
                if (Game.keyboard.current.isPressed(this.rightKey) || Game.keyboard.current.isPressed(this.leftKey)) {
                    this.timeLeftCurrentFrameArms -= 200;
                }
                if (this.currentFrameArms > 1) {
                    this.currentFrameArms = 0;
                }
                this.playerTorso.texture = PIXI.Loader.shared.resources["level-hat-idle" + this.currentFrameArms].texture;
            }
        }
    };
    LevelHat.prototype.updateHockeyPlayer = function (elapsedTime) {
        if (!this.hockeyPlayer.visible) {
            return;
        }
        this.timeLeftCurrentFrameHockey -= elapsedTime;
        if (this.timeLeftCurrentFrameHockey <= 0) {
            this.timeLeftCurrentFrameHockey += 100;
            this.currentFrameHockey++;
            if (this.currentFrameHockey > 6) {
                this.currentFrameHockey = 0;
            }
            this.hockeyPlayer.texture = PIXI.Loader.shared.resources["level-hat-hockey" + this.currentFrameHockey].texture;
        }
        this.hockeyPlayerMoveTimeLeft -= elapsedTime;
        if (this.hockeyPlayerMoveTimeLeft < 400) {
            this.hockeyPlayerMoveTimeLeft -= elapsedTime;
        }
        if (this.hockeyPlayerMoveTimeLeft <= 0) {
            this.hockeyPlayerMoveTimeLeft = 0;
            this.hockeyPlayer.visible = false;
        }
        var part = EasingCurves.easeInQuart(1 - this.hockeyPlayerMoveTimeLeft / 3000);
        this.hockeyPlayer.y = 600 + 147 * part;
        this.hockeyPlayer.scale.x = 0.5 + 0.8 * part;
        this.hockeyPlayer.scale.y = 0.5 + 0.8 * part;
        this.hockeyPlayer.tint = ColorHelper.rgbToHex(255 * part, 255 * part, 255 * part);
        if (part > 0.90) {
            this.hockeyPlayer.zIndex = 106;
            var extraPart = (part - 0.9) / 0.1;
            this.hockeyPlayer.y += extraPart * 100;
            this.hockeyPlayer.scale.x += extraPart * 0.8;
            this.hockeyPlayer.scale.y += extraPart * 0.8;
            if (!this.hockeyPlayerTackle) {
                this.hockeyPlayerTackle = true;
                if (Math.abs(this.hockeyPlayer.x - this.playerTorso.x) < 200) {
                    if (this.hockeyPlayer.x >= this.playerTorso.x) {
                        this.xSpeed = -300;
                    }
                    else {
                        this.xSpeed = 300;
                    }
                    if (this.partGrab > 0) {
                        this.partGrab = 0;
                        this.lastHatTarget = this.hatFlying.x;
                        if (this.hatFlying.x > this.xOffset + this.background.width / 2) {
                            this.hatTarget = this.xOffset + MathHelper.randomInt(0, this.background.width / 2 - 50);
                        }
                        else {
                            this.hatTarget = this.xOffset + MathHelper.randomInt(this.background.width / 2 + 50, this.background.width);
                        }
                        this.timeElapsedHatTarget = 0;
                        this.totalTimeTilHatTarget = 1000 * Math.abs(this.lastHatTarget - this.hatTarget) / 400;
                    }
                }
            }
        }
        else {
            this.hockeyPlayer.zIndex = 99;
        }
    };
    LevelHat.prototype.spawnHockeyPlayer = function () {
        this.hockeyPlayerMoveTimeLeft = 3000;
        this.hockeyPlayer.x = MathHelper.randomInt(this.background.x + this.hockeyPlayer.width / 2, this.background.x + this.background.width - this.hockeyPlayer.width / 2);
        this.hockeyPlayer.visible = true;
        this.hockeyPlayerTackle = false;
        this.currentFrameHockey = 0;
        this.timeLeftCurrentFrameHockey = 100;
        this.hockeyPlayer.texture = PIXI.Loader.shared.resources["level-hat-hockey" + this.currentFrameHockey].texture;
        this.updateHockeyPlayer(0);
    };
    LevelHat.prototype.checkHatGrab = function () {
        if (Math.abs(this.playerTorso.x - this.hatFlying.x) < 50) {
            this.partGrab = 1;
            this.grabPulldownTimeLeft = 200;
            this.keydownFramePressed = false;
            this.keydown.visible = true;
            this.grabDownPressCounter = 0;
            this.extraGrab = 0.25;
        }
    };
    return LevelHat;
}(GameState));
//# sourceMappingURL=levelHat.js.map