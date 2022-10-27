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
        _this.gameEndsOnTime = 92500;
        _this.stateName = "LevelHat";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-background"].texture);
        _this.background.x = xOffset;
        _this.background.y = 165;
        if (_this.player == 1) {
            _this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            _this.pressEnter.x = 858 + 80;
            _this.pressEnter.y = 842 + 100;
            _this.pressEnter.pivot.x = _this.pressEnter.width / 2;
            _this.pressEnter.pivot.y = _this.pressEnter.height / 2;
            _this.pressEnter.zIndex = 1000;
            _this.pressEnter.visible = false;
        }
        _this.playerLegs = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-legs0"].texture);
        _this.playerLegs.y = _this.background.y + 400;
        _this.playerLegs.zIndex = 100;
        _this.playerTorso = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-idle0"].texture);
        _this.playerTorso.y = _this.background.y + 152;
        _this.playerTorso.zIndex = 101;
        _this.playerHair = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-hair-p" + _this.player].texture);
        _this.playerHair.y = _this.background.y + 251;
        _this.playerHair.zIndex = 102;
        return _this;
    }
    LevelHat.prototype.onEnter = function () {
        this.scoreCounter.onEnter();
        Game.app.stage.addChild(this.background);
        Game.app.stage.addChild(this.playerLegs);
        Game.app.stage.addChild(this.playerTorso);
        Game.app.stage.addChild(this.playerHair);
        this.totalElapsedTime = 0;
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        this.xPos = 960 / 2;
        this.xSpeed = 0;
        this.updatePlayerSprites();
        Game.sceneTransition.startShrinking();
    };
    LevelHat.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        Game.app.stage.removeChild(this.playerLegs);
        Game.app.stage.removeChild(this.playerTorso);
        Game.app.stage.removeChild(this.playerHair);
        this.scoreCounter.onExit();
        Game.soundPlayer.musicHat.stop();
        if (this.player == 1) {
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
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
                Game.intro.startLevelHat();
                Game.soundPlayer.musicHat.play();
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
        this.movePlayer(elapsedTime);
    };
    LevelHat.prototype.movePlayer = function (elapsedTime) {
        var maxSpeed = 300;
        var accTime = 2000; //  Tid det tar från 0 till max acc
        var acc = maxSpeed * 1000 / accTime;
        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {
            this.xSpeed -= acc * elapsedTime / 1000;
        }
        if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {
            this.xSpeed += acc * elapsedTime / 1000;
        }
        if (this.xSpeed < -maxSpeed) {
            this.xSpeed = -maxSpeed;
        }
        else if (this.xSpeed > maxSpeed) {
            this.xSpeed = maxSpeed;
        }
        this.xPos += this.xSpeed * elapsedTime / 1000;
        if (this.xPos < this.xOffset + 187 - 158) {
            this.xPos = this.xOffset + 187 - 158;
            this.xSpeed = 0;
        }
        else if (this.xPos > this.xOffset + 960 - 187 + 158) {
            this.xPos = this.xOffset + 960 - 187 + 158;
            this.xSpeed = 0;
        }
        this.updatePlayerSprites();
    };
    LevelHat.prototype.updatePlayerSprites = function () {
        this.playerLegs.x = this.xPos - 187;
        this.playerTorso.x = this.xPos - 187;
        this.playerHair.x = this.xPos - 187;
    };
    return LevelHat;
}(GameState));
//# sourceMappingURL=levelHat.js.map