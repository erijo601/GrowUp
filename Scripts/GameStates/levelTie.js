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
        _this.loopWidth = 310 * 1.2;
        _this.stateName = "LevelTie";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-background"].texture);
        _this.background.x = xOffset;
        _this.background.y = 0;
        _this.neck = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-neck"].texture);
        _this.neck.x = xOffset + 180;
        _this.neck.y = 0;
        _this.tieLoop = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-loop-front"].texture);
        _this.tieLoop.pivot.x = 190;
        _this.tieLoop.pivot.y = 53;
        _this.tieLoop.scale.x = 1.2;
        _this.tieLoop.zIndex = 11;
        _this.tieLoopBack = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-loop-back"].texture);
        _this.tieLoopBack.pivot.x = 190;
        _this.tieLoopBack.pivot.y = 53;
        _this.tieLoopBack.scale.x = 1.2;
        _this.tieLoopBack.zIndex = 9;
        _this.points = [];
        _this.baseX = xOffset + 388;
        var baseY = 370;
        var steps = 20;
        for (var n = 0; n < steps; n++) {
            _this.points.push(new PIXI.Point(0, baseY + n * 760 / steps));
        }
        ;
        var texture = PIXI.Loader.shared.resources["tie-rope"].texture;
        texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        _this.rope = new PIXI.SimpleRope(texture, _this.points, 1);
        _this.rope.zIndex = 10;
        _this.rope.x = _this.baseX;
        _this.rope.width = 60;
        _this.tieLoop.x = _this.baseX;
        _this.tieLoop.y = _this.points[9].y;
        _this.tieLoopBack.x = _this.baseX;
        _this.tieLoopBack.y = _this.points[9].y;
        _this.arm = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-arm"].texture);
        _this.arm.zIndex = 12;
        _this.arm.x = _this.tieLoop.x - 700 - 189;
        _this.arm.y = _this.tieLoop.y - 100;
        _this.timeLeftHandFrame = 150;
        _this.handFrame = 0;
        _this.handFrameDirection = 1;
        _this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-hand" + _this.handFrame].texture);
        _this.hand.zIndex = 12;
        _this.hand.x = _this.arm.x + 440;
        _this.hand.y = _this.arm.y;
        if (player == 2) {
            _this.arm.scale.x = -1; //  Mirror
            _this.hand.scale.x = -1;
        }
        _this.updateHand(0);
        return _this;
    }
    LevelTie.prototype.onEnter = function () {
        this.scoreCounter.onEnter();
        Game.app.stage.addChild(this.background);
        Game.app.stage.addChild(this.neck);
        Game.app.stage.addChild(this.tieLoopBack);
        Game.app.stage.addChild(this.rope);
        Game.app.stage.addChild(this.tieLoop);
        Game.app.stage.addChild(this.arm);
        Game.app.stage.addChild(this.hand);
        this.totalElapsedTime = 0;
        this.timeLeftHandFrame = 150;
        Game.sceneTransition.startShrinking();
        Game.soundPlayer.musicTie.play();
    };
    LevelTie.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        Game.app.stage.removeChild(this.neck);
        Game.app.stage.removeChild(this.tieLoop);
        Game.app.stage.removeChild(this.tieLoopBack);
        Game.app.stage.removeChild(this.rope);
        Game.app.stage.removeChild(this.hand);
        Game.app.stage.removeChild(this.arm);
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
        this.checkCollision(elapsedTime);
        this.updateHand(elapsedTime);
        this.scoreCounter.update(elapsedTime);
    };
    LevelTie.prototype.updateRope = function (elapsedTime) {
        var ropeSpeed = 300;
        var ropeInertia = 100;
        //  Control the rope by changing it last link
        //  TODO: Kör mer random (med ökande svårighetsgrad) på hur repet rör sig. Eller i takt med musiken om det går. 
        this.points[this.points.length - 1].x = 600 * Math.sin(Math.PI * 2 * this.totalElapsedTime / 3000);
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
    LevelTie.prototype.checkCollision = function (elapsedTime) {
        var tieX = this.baseX + this.points[9].x;
        var ropeWidth = 60;
        if (tieX - ropeWidth < this.tieLoop.x - this.loopWidth / 2) {
            //  Collision left!
            this.tieLoop.x = tieX - ropeWidth + this.loopWidth / 2;
            this.tieLoopBack.x = this.tieLoop.x;
        }
        else if (tieX + ropeWidth > this.tieLoop.x + this.loopWidth / 2) {
            //  Collision right!
            this.tieLoop.x = tieX + ropeWidth - this.loopWidth / 2;
            this.tieLoopBack.x = this.tieLoop.x;
        }
        else {
            //  No collision
            var speed = 700;
            if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {
                this.tieLoop.x += speed * elapsedTime / 1000;
                this.tieLoopBack.x = this.tieLoop.x;
            }
            if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {
                this.tieLoop.x -= speed * elapsedTime / 1000;
                this.tieLoopBack.x = this.tieLoop.x;
            }
        }
    };
    LevelTie.prototype.updateHand = function (elapsedTime) {
        this.arm.x = this.tieLoop.x - 700 - 189;
        this.hand.x = this.arm.x + 440;
        if (this.player == 2) {
            this.arm.x = this.tieLoop.x + 700 + 189;
            this.hand.x = this.arm.x - 440;
        }
        this.timeLeftHandFrame -= elapsedTime;
        if (this.timeLeftHandFrame <= 0) {
            this.timeLeftHandFrame += 250;
            this.handFrame += this.handFrameDirection;
            if (this.handFrame > 3) {
                this.handFrameDirection = -1;
                this.handFrame = 2;
            }
            else if (this.handFrame < 0) {
                this.handFrameDirection = 1;
                this.handFrame = 1;
            }
            this.hand.texture = PIXI.Loader.shared.resources["tie-hand" + this.handFrame].texture;
        }
    };
    return LevelTie;
}(GameState));
//# sourceMappingURL=levelTie.js.map