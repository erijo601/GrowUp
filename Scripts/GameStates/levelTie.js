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
        _this.gameEndsOnTime = 86000;
        _this.loopWidth = 310 * 1.2;
        _this.stateName = "LevelTie";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-background"].texture);
        _this.background.x = xOffset + 100;
        _this.background.y = 0;
        _this.neck = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-neck"].texture);
        _this.neck.x = xOffset + 180 + 100;
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
        _this.baseX = xOffset + 388 + 100;
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
        _this.timeLeftMiniFrame = 150;
        _this.miniFrame = 0;
        _this.miniFrameDirection = 1;
        _this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-hand" + _this.handFrame].texture);
        _this.hand.zIndex = 12;
        _this.hand.x = _this.arm.x + 440;
        _this.hand.y = _this.arm.y;
        _this.mini = new PIXI.Sprite(PIXI.Loader.shared.resources["p" + _this.player + "-mini-tie" + _this.miniFrame].texture);
        _this.mini.zIndex = 13;
        _this.mini.x = _this.xOffset + 130;
        _this.mini.y = 170;
        if (_this.player == 2) {
            _this.arm.scale.x = -1; //  Mirror
            _this.hand.scale.x = -1;
            _this.mini.x = 1920 - 549 + 150;
        }
        if (_this.player == 1) {
            _this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            _this.pressEnter.x = 858 + 80;
            _this.pressEnter.y = 842 + 100;
            _this.pressEnter.pivot.x = _this.pressEnter.width / 2;
            _this.pressEnter.pivot.y = _this.pressEnter.height / 2;
            _this.pressEnter.zIndex = 1000;
            _this.pressEnter.visible = false;
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
        Game.app.stage.addChild(this.mini);
        this.totalElapsedTime = 0;
        this.totalTimeScore = 0;
        this.stranglePart = 0;
        this.isStrangle = false;
        this.timeLeftHandFrame = 150;
        this.timeLeftMiniFrame = 100;
        this.handFrame = 0;
        this.miniFrame = 0;
        this.betweenFrame = -1;
        this.betweenFrameDirection = -1;
        this.ropeTargetX = MathHelper.randomInt(0, 960);
        this.setRopeSpeed();
        //  Undvik synk mellan p1 och p2
        if (this.player == 2) {
            this.timeLeftHandFrame = 50;
            this.timeLeftMiniFrame = 75;
            this.miniFrame = 1;
            this.handFrame = 2;
        }
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        Game.sceneTransition.startShrinking();
        if (Game.soundPlayer.musicTie.playing() == false) {
            Game.soundPlayer.musicTie.play();
        }
    };
    LevelTie.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        Game.app.stage.removeChild(this.neck);
        Game.app.stage.removeChild(this.tieLoop);
        Game.app.stage.removeChild(this.tieLoopBack);
        Game.app.stage.removeChild(this.rope);
        Game.app.stage.removeChild(this.hand);
        Game.app.stage.removeChild(this.arm);
        Game.app.stage.removeChild(this.mini);
        this.scoreCounter.onExit();
        Game.soundPlayer.musicTie.stop();
        if (this.player == 1) {
            Game.app.stage.removeChild(this.pressEnter);
            Game.scoreStatePlayer1.beforeOnEnter(Level.Tie, this.scoreCounter.getScore());
            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {
                Game.currentStatePlayer2.onExit();
            }
        }
        else {
            Game.scoreStatePlayer2.beforeOnEnter(Level.Tie, this.scoreCounter.getScore());
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
            if (this.player == 1) {
                Game.sceneTransition.update(elapsedTime);
            }
            if (Game.sceneTransition.isDone()) {
                Game.intro.startLevelTie();
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
        this.updateRope(elapsedTime);
        this.checkCollision(elapsedTime);
        this.updateHand(elapsedTime);
        this.updateMini(elapsedTime);
    };
    LevelTie.prototype.setRopeSpeed = function () {
        var partLevelDone = this.totalElapsedTime / this.gameEndsOnTime;
        if (partLevelDone > 0.75) {
            partLevelDone = 1;
        }
        var minSpeed = Math.floor(300 + 700 * partLevelDone);
        var maxSpeed = Math.floor(500 + 700 * partLevelDone);
        this.ropeSpeed = MathHelper.randomInt(minSpeed, maxSpeed);
        if (this.ropeTargetX < 0) {
            this.ropeTargetX = MathHelper.randomInt(100, 650);
        }
        else {
            this.ropeTargetX = MathHelper.randomInt(-650, -100);
        }
    };
    LevelTie.prototype.updateRope = function (elapsedTime) {
        var ropeInertia = 100;
        //  Control the rope by changing it last link
        if (this.points[this.points.length - 1].x < this.ropeTargetX) {
            this.points[this.points.length - 1].x += this.ropeSpeed * elapsedTime / 1000;
            if (this.points[this.points.length - 1].x >= this.ropeTargetX) {
                this.setRopeSpeed();
            }
        }
        else {
            this.points[this.points.length - 1].x -= this.ropeSpeed * elapsedTime / 1000;
            if (this.points[this.points.length - 1].x <= this.ropeTargetX) {
                this.setRopeSpeed();
            }
        }
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
            this.tieLoop.x = tieX - ropeWidth + this.loopWidth / 2 - 1;
            this.tieLoopBack.x = this.tieLoop.x;
            this.stranglePart += elapsedTime / 3000;
            if (!this.isStrangle && (this.betweenFrame < 0 || this.betweenFrame > 1)) {
                this.betweenFrame = 0;
                this.betweenFrameDirection = 1;
                if (this.player == 1) {
                    this.mini.x = this.xOffset;
                }
                else {
                    this.mini.x = 1920 - 549;
                }
                this.mini.texture = PIXI.Loader.shared.resources["p" + this.player + "-mini-between" + this.betweenFrame].texture;
            }
            this.isStrangle = true;
        }
        else if (tieX + ropeWidth > this.tieLoop.x + this.loopWidth / 2) {
            //  Collision right!
            this.tieLoop.x = tieX + ropeWidth - this.loopWidth / 2 + 1;
            this.tieLoopBack.x = this.tieLoop.x;
            this.stranglePart += elapsedTime / 3000;
            if (!this.isStrangle && (this.betweenFrame < 0 || this.betweenFrame > 1)) {
                this.betweenFrame = 0;
                this.betweenFrameDirection = 1;
                if (this.player == 1) {
                    this.mini.x = this.xOffset;
                }
                else {
                    this.mini.x = 1920 - 549;
                }
                this.mini.texture = PIXI.Loader.shared.resources["p" + this.player + "-mini-between" + this.betweenFrame].texture;
            }
            this.isStrangle = true;
        }
        else {
            //  No collision
            this.totalTimeScore += elapsedTime;
            var newScore = Math.floor(100 * this.totalTimeScore / this.gameEndsOnTime);
            if (newScore > this.scoreCounter.getDesiredScore()) {
                this.scoreCounter.setNewScore(newScore, 100);
            }
            this.stranglePart -= elapsedTime / 3000;
            var speed = 700;
            if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {
                this.tieLoop.x += speed * elapsedTime / 1000;
                this.tieLoopBack.x = this.tieLoop.x;
            }
            if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {
                this.tieLoop.x -= speed * elapsedTime / 1000;
                this.tieLoopBack.x = this.tieLoop.x;
            }
            if (this.isStrangle && (this.betweenFrame < 0 || this.betweenFrame > 1)) {
                this.betweenFrame = 1;
                this.betweenFrameDirection = -1;
                if (this.player == 1) {
                    this.mini.x = this.xOffset;
                }
                else {
                    this.mini.x = 1920 - 549;
                }
                this.mini.texture = PIXI.Loader.shared.resources["p" + this.player + "-mini-between" + this.betweenFrame].texture;
            }
            this.isStrangle = false;
        }
        if (this.stranglePart > 1) {
            this.stranglePart = 1;
        }
        else if (this.stranglePart < 0) {
            this.stranglePart = 0;
        }
        var r;
        var g;
        var b;
        if (this.stranglePart < 0.5) {
            r = 255;
            g = 255 * (1 - this.stranglePart * 2);
            b = 255 * (1 - this.stranglePart * 2);
        }
        else {
            r = 255;
            g = 0;
            b = 255 * (this.stranglePart * 2);
        }
        this.neck.tint = ColorHelper.rgbToHex(r, g, b);
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
    LevelTie.prototype.updateMini = function (elapsedTime) {
        this.timeLeftMiniFrame -= elapsedTime;
        if (this.isStrangle || (this.betweenFrame > -1 && this.betweenFrame < 2)) {
            this.timeLeftMiniFrame -= elapsedTime * 0.5;
        }
        if (this.timeLeftMiniFrame <= 0) {
            this.timeLeftMiniFrame += 150;
            this.miniFrame += this.miniFrameDirection;
            if (this.miniFrame > 2) {
                this.miniFrameDirection = -1;
                this.miniFrame = 1;
            }
            else if (this.miniFrame < 0) {
                this.miniFrameDirection = 1;
                this.miniFrame = 1;
            }
            if (this.betweenFrame > -1 && this.betweenFrame < 2) {
                this.betweenFrame += this.betweenFrameDirection;
            }
            if (this.betweenFrame > -1 && this.betweenFrame < 2) {
                if (this.player == 1) {
                    this.mini.x = this.xOffset;
                }
                else {
                    this.mini.x = 1920 - 549;
                }
                this.mini.texture = PIXI.Loader.shared.resources["p" + this.player + "-mini-between" + this.betweenFrame].texture;
            }
            else if (this.isStrangle) {
                if (this.player == 1) {
                    this.mini.x = this.xOffset;
                }
                else {
                    this.mini.x = 1920 - 549;
                }
                this.mini.texture = PIXI.Loader.shared.resources["p" + this.player + "-mini-strangle" + this.miniFrame].texture;
            }
            else {
                if (this.player == 1) {
                    this.mini.x = this.xOffset + 130;
                }
                else {
                    this.mini.x = 1920 - 549 + 150;
                }
                this.mini.texture = PIXI.Loader.shared.resources["p" + this.player + "-mini-tie" + this.miniFrame].texture;
            }
        }
    };
    return LevelTie;
}(GameState));
//# sourceMappingURL=levelTie.js.map