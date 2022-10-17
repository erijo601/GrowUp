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
var LevelTie = /** @class */ (function (_super) {
    __extends(LevelTie, _super);
    function LevelTie(player, xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, player, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.stateName = "LevelTie";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-background"].texture);
        _this.background.x = xOffset;
        _this.background.y = 0;
        _this.points = [];
        var baseX = xOffset + _this.background.width / 2;
        var baseY = 130;
        var steps = 20;
        for (var n = 0; n < steps; n++) {
            _this.points.push(new PIXI.Point(0, baseY + n * (1080 - baseY) / steps));
        }
        ;
        var texture = PIXI.Loader.shared.resources["tie-rope"].texture;
        texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        _this.rope = new PIXI.SimpleRope(texture, _this.points, 1);
        _this.rope.x = baseX;
        _this.rope.width = 60;
        return _this;
    }
    LevelTie.prototype.onEnter = function () {
        this.scoreCounter.onEnter();
        Game.app.stage.addChild(this.background);
        Game.app.stage.addChild(this.rope);
        this.totalElapsedTime = 0;
        Game.sceneTransition.startShrinking();
        Game.soundPlayer.musicTie.play();
    };
    LevelTie.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        this.scoreCounter.onExit();
        Game.soundPlayer.musicTie.stop();
        if (this.player == 1) {
            Game.scoreStatePlayer1.beforeOnEnter(Level.Tie, this.scoreCounter.getScore());
            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {
                Game.currentStatePlayer2.onExit();
            }
        }
        else {
            Game.scoreStatePlayer2.beforeOnEnter(Level.Moustache, this.scoreCounter.getScore());
            Game.currentStatePlayer2 = Game.scoreStatePlayer2;
            Game.currentStatePlayer2.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer1.stateName == this.stateName) {
                Game.currentStatePlayer1.onExit();
            }
        }
    };
    LevelTie.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
                //Game.soundPlayer.musicTie.play();
                Game.intro.startLevelTie();
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
        this.updateRope(elapsedTime);
        this.scoreCounter.update(elapsedTime);
    };
    LevelTie.prototype.updateRope = function (elapsedTime) {
        var ropeSpeed = 300;
        var ropeInertia = 150;
        //  Control the rope by changing it last link
        this.points[this.points.length - 1].x = 400 * Math.sin(Math.PI * 2 * this.totalElapsedTime / 3000);
        //  The first link is static (knot), the last link is controlling the movement. All other links follows the last
        for (var n = 1; n < this.points.length - 1; n++) {
            var currentPoint = this.points[n];
            var nextPoint = this.points[n + 1];
            var delta = nextPoint.x - currentPoint.x;
            if (currentPoint.x > nextPoint.x) {
                currentPoint.x += delta * elapsedTime / ropeInertia;
                if (currentPoint.x < nextPoint.x) {
                    currentPoint.x = nextPoint.x;
                }
            }
            else if (currentPoint.x < nextPoint.x) {
                currentPoint.x += delta * elapsedTime / ropeInertia;
                if (currentPoint.x > nextPoint.x) {
                    currentPoint.x = nextPoint.x;
                }
            }
        }
    };
    return LevelTie;
}(GameState));
//# sourceMappingURL=levelTie.js.map