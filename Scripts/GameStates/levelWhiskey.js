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
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-background"].texture);
        _this.background.x = xOffset + 100;
        _this.background.y = 0;
        if (_this.player == 1) {
            _this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            _this.pressEnter.x = 858 + 80;
            _this.pressEnter.y = 842 + 100;
            _this.pressEnter.pivot.x = _this.pressEnter.width / 2;
            _this.pressEnter.pivot.y = _this.pressEnter.height / 2;
            _this.pressEnter.zIndex = 1000;
            _this.pressEnter.visible = false;
        }
        return _this;
    }
    LevelWhiskey.prototype.onEnter = function () {
        this.scoreCounter.onEnter();
        Game.app.stage.addChild(this.background);
        this.totalElapsedTime = 0;
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        Game.sceneTransition.startShrinking();
        Game.soundPlayer.musicWhiskey.play();
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
    };
    LevelWhiskey.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
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
    return LevelWhiskey;
}(GameState));
//# sourceMappingURL=levelWhiskey.js.map