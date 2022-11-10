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
var LevelOffice = /** @class */ (function (_super) {
    __extends(LevelOffice, _super);
    function LevelOffice(player, xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, player, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.gameEndsOnTime = 82500;
        _this.stateName = "LevelOffice";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.cutscene = new Cutscene(xOffset, 130, player, _this.upKey, _this.downKey, _this.leftKey, _this.rightKey, _this.scoreCounter);
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
        _this.playerSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-background-p" + _this.player].texture);
        _this.playerSprite.pivot.x = 45;
        _this.playerSprite.pivot.y = 92;
        _this.playerSprite.x = _this.world.x + _this.world.width / 2;
        _this.playerSprite.y = _this.world.y + _this.world.height / 2;
        _this.playerSprite.zIndex = 100;
        _this.playerLegsSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-idle-p" + _this.player].texture);
        _this.playerLegsSprite.pivot.x = 45;
        _this.playerLegsSprite.pivot.y = 92;
        _this.playerLegsSprite.x = _this.world.x + _this.world.width / 2;
        _this.playerLegsSprite.y = _this.world.y + _this.world.height / 2;
        _this.playerLegsSprite.zIndex = 99;
        if (Game.twoPlayerGame) {
            var otherPlayer = _this.player == 1 ? 2 : 1;
            _this.otherPlayerSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-background-p" + otherPlayer].texture);
            _this.otherPlayerSprite.pivot.x = 45;
            _this.otherPlayerSprite.pivot.y = 92;
            _this.otherPlayerSprite.zIndex = 98;
            _this.otherPlayerLegsSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-idle-p" + otherPlayer].texture);
            _this.otherPlayerLegsSprite.pivot.x = 45;
            _this.otherPlayerLegsSprite.pivot.y = 92;
            _this.otherPlayerLegsSprite.zIndex = 97;
        }
        _this.directionUpSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-up"].texture);
        _this.directionUpSprite.x = _this.world.x + _this.world.width / 2 - 22;
        _this.directionUpSprite.y = _this.world.y;
        _this.directionUpSprite.zIndex = 110;
        _this.directionUpSprite.visible = false;
        _this.directionDownSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-down"].texture);
        _this.directionDownSprite.x = _this.world.x + _this.world.width / 2 - 22;
        _this.directionDownSprite.y = _this.world.y + _this.world.height - 100;
        _this.directionDownSprite.zIndex = 110;
        _this.directionDownSprite.visible = false;
        _this.directionLeftSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-left"].texture);
        _this.directionLeftSprite.x = _this.world.x;
        _this.directionLeftSprite.y = _this.world.y + _this.world.height / 2 - 22;
        _this.directionLeftSprite.zIndex = 110;
        _this.directionLeftSprite.visible = false;
        _this.directionRightSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-right"].texture);
        _this.directionRightSprite.x = _this.world.x + _this.world.width - 100;
        _this.directionRightSprite.y = _this.world.y + _this.world.height / 2 - 22;
        _this.directionRightSprite.zIndex = 110;
        _this.directionRightSprite.visible = false;
        _this.floor = new PIXI.Graphics();
        _this.floor.beginFill(ColorHelper.rgbToHex(123, 157, 156));
        _this.floor.drawRect(0, 0, _this.renderTexture.width, _this.renderTexture.height);
        _this.createCubicles();
        _this.createCheckpoints();
        return _this;
    }
    LevelOffice.prototype.onEnter = function () {
        this.playerWorldPosition = new Position(600, 600);
        this.playerSprite.angle = 0;
        this.playerLegsSprite.angle = 0;
        this.playerSpeed = new Position(0, 0);
        this.timeLeftCurrentFrameLegs = 100;
        this.currentFrameLegs = 0;
        this.otherPlayerWorldPosition = new Position(600, 600);
        this.nextCheckpoint = 1;
        this.elapsedTimeInCurrentCheckpoint = 3000;
        Game.app.stage.addChild(this.world);
        Game.app.stage.addChild(this.playerLegsSprite);
        Game.app.stage.addChild(this.playerSprite);
        Game.app.stage.addChild(this.directionUpSprite);
        Game.app.stage.addChild(this.directionDownSprite);
        Game.app.stage.addChild(this.directionLeftSprite);
        Game.app.stage.addChild(this.directionRightSprite);
        this.scoreCounter.onEnter();
        this.totalElapsedTime = 0;
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        Game.sceneTransition.startShrinking();
        this.movePlayer(0);
        this.renderWorld();
    };
    LevelOffice.prototype.onExit = function () {
        Game.app.stage.removeChild(this.world);
        Game.app.stage.removeChild(this.playerLegsSprite);
        Game.app.stage.removeChild(this.playerSprite);
        Game.app.stage.removeChild(this.directionUpSprite);
        Game.app.stage.removeChild(this.directionDownSprite);
        Game.app.stage.removeChild(this.directionLeftSprite);
        Game.app.stage.removeChild(this.directionRightSprite);
        this.scoreCounter.onExit();
        if (this.player == 1) {
            Game.app.stage.removeChild(this.pressEnter);
            Game.scoreStatePlayer1.beforeOnEnter(Level.Office, this.scoreCounter.getScore());
            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {
                Game.currentStatePlayer2.onExit();
            }
        }
        else {
            Game.scoreStatePlayer2.beforeOnEnter(Level.Office, this.scoreCounter.getScore());
            Game.currentStatePlayer2 = Game.scoreStatePlayer2;
            Game.currentStatePlayer2.onEnter();
            if (Game.twoPlayerGame && Game.currentStatePlayer1.stateName == this.stateName) {
                Game.currentStatePlayer1.onExit();
            }
        }
    };
    LevelOffice.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
                Game.intro.startLevelOffice();
                Game.soundPlayer.musicOffice.play();
            }
            return;
        }
        if (Game.sceneTransition.isGrowing) {
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
                this.onExit();
            }
        }
        this.scoreCounter.update(elapsedTime);
        this.totalElapsedTime += elapsedTime;
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
        var cutsceneStart = 21000;
        var cutsceneEnd = 39332;
        var textDuration = 1500;
        var musicTime;
        musicTime = Game.soundPlayer.musicOffice.seek();
        if (musicTime > 36.1 && musicTime < 54.319) {
            //if (this.totalElapsedTime > cutsceneStart && this.totalElapsedTime < cutsceneEnd) {
            //  Cutscene!
            if (!this.cutscene.isVisible()) {
                this.cutscene.onEnter();
            }
            //if (this.totalElapsedTime - cutsceneStart < textDuration) {
            if (musicTime - 36.1 < 1.5) {
                //let partShowStart = (this.totalElapsedTime - cutsceneStart) / textDuration;
                var partShowStart = (musicTime - 36.1) / 1.5;
                this.cutscene.showStartText(partShowStart);
            }
            //else if (this.totalElapsedTime > cutsceneEnd - textDuration) {
            else if (musicTime > 54.319 - 1.5) {
                //let partShowEnd = 1 - (cutsceneEnd - this.totalElapsedTime) / textDuration;
                var partShowEnd = 1 - (54.319 - musicTime) / 1.5;
                this.cutscene.showEndText(partShowEnd);
            }
            else {
                this.cutscene.hideTexts();
            }
            this.cutscene.update(elapsedTime);
            return;
        }
        else if (this.cutscene.isVisible()) {
            this.cutscene.onExit();
        }
        this.movePlayer(elapsedTime);
        this.checkCheckpoints(elapsedTime);
        this.renderWorld();
        if (this.screenShakeTimeLeft > 0) {
            this.screenShakeTimeLeft -= elapsedTime;
            if (this.screenShakeTimeLeft < 0) {
                this.screenShakeTimeLeft = 0;
            }
            var partShake = 1 - this.screenShakeTimeLeft / 1000;
            var shake = 20 * (1 - EasingCurves.easeOutElastic(partShake));
            this.world.x = this.xOffset + shake;
            this.world.y = 65 + shake;
            this.playerSprite.x = this.world.x + this.world.width / 2;
            this.playerSprite.y = this.world.y + this.world.height / 2;
            this.playerLegsSprite.x = this.world.x + this.world.width / 2;
            this.playerLegsSprite.y = this.world.y + this.world.height / 2;
            this.scoreCounter.setPos(this.xOffset + 4 + shake, 16 + shake);
        }
    };
    LevelOffice.prototype.createCubicles = function () {
        this.cubicles = [];
        var w = 300; //  Samma som cubicle.png
        var h = 300;
        this.cubicles.push(new Cubicle(0 * w, 0 * h));
        this.cubicles.push(new Cubicle(1 * w, 0 * h));
        this.cubicles.push(new Cubicle(2 * w, 0 * h));
        this.cubicles.push(new Cubicle(3 * w, 0 * h));
        this.cubicles.push(new Cubicle(4 * w, 0 * h));
        this.cubicles.push(new Cubicle(5 * w, 0 * h));
        this.cubicles.push(new Cubicle(6 * w, 0 * h));
        this.cubicles.push(new Cubicle(7 * w, 0 * h));
        this.cubicles.push(new Cubicle(8 * w, 0 * h));
        this.cubicles.push(new Cubicle(9 * w, 0 * h));
        this.cubicles.push(new Cubicle(10 * w, 0 * h));
        this.cubicles.push(new Cubicle(11 * w, 0 * h));
        this.cubicles.push(new Cubicle(0 * w, 1 * h));
        this.cubicles.push(new Cubicle(10 * w, 1 * h));
        this.cubicles.push(new Cubicle(11 * w, 1 * h));
        this.cubicles.push(new Cubicle(0 * w, 2 * h));
        this.cubicles.push(new Cubicle(10 * w, 2 * h));
        this.cubicles.push(new Cubicle(11 * w, 2 * h));
        this.cubicles.push(new Cubicle(0 * w, 3 * h));
        this.cubicles.push(new Cubicle(3 * w, 3 * h));
        this.cubicles.push(new Cubicle(4 * w, 3 * h));
        this.cubicles.push(new Cubicle(5 * w, 3 * h));
        this.cubicles.push(new Cubicle(6 * w, 3 * h));
        this.cubicles.push(new Cubicle(7 * w, 3 * h));
        this.cubicles.push(new Cubicle(10 * w, 3 * h));
        this.cubicles.push(new Cubicle(11 * w, 3 * h));
        this.cubicles.push(new Cubicle(0 * w, 4 * h));
        this.cubicles.push(new Cubicle(3 * w, 4 * h));
        this.cubicles.push(new Cubicle(10 * w, 4 * h));
        this.cubicles.push(new Cubicle(11 * w, 4 * h));
        this.cubicles.push(new Cubicle(0 * w, 5 * h));
        this.cubicles.push(new Cubicle(3 * w, 5 * h));
        this.cubicles.push(new Cubicle(10 * w, 5 * h));
        this.cubicles.push(new Cubicle(11 * w, 5 * h));
        this.cubicles.push(new Cubicle(0 * w, 6 * h));
        this.cubicles.push(new Cubicle(3 * w, 6 * h));
        this.cubicles.push(new Cubicle(6 * w, 6 * h));
        this.cubicles.push(new Cubicle(7 * w, 6 * h));
        this.cubicles.push(new Cubicle(8 * w, 6 * h));
        this.cubicles.push(new Cubicle(9 * w, 6 * h));
        this.cubicles.push(new Cubicle(10 * w, 6 * h));
        this.cubicles.push(new Cubicle(11 * w, 6 * h));
        this.cubicles.push(new Cubicle(0 * w, 7 * h));
        this.cubicles.push(new Cubicle(3 * w, 7 * h));
        this.cubicles.push(new Cubicle(11 * w, 7 * h));
        this.cubicles.push(new Cubicle(0 * w, 8 * h));
        this.cubicles.push(new Cubicle(1 * w, 8 * h));
        this.cubicles.push(new Cubicle(3 * w, 8 * h));
        this.cubicles.push(new Cubicle(11 * w, 8 * h));
        this.cubicles.push(new Cubicle(0 * w, 9 * h));
        this.cubicles.push(new Cubicle(1 * w, 9 * h));
        this.cubicles.push(new Cubicle(3 * w, 9 * h));
        this.cubicles.push(new Cubicle(4 * w, 9 * h));
        this.cubicles.push(new Cubicle(5 * w, 9 * h));
        this.cubicles.push(new Cubicle(6 * w, 9 * h));
        this.cubicles.push(new Cubicle(7 * w, 9 * h));
        this.cubicles.push(new Cubicle(8 * w, 9 * h));
        this.cubicles.push(new Cubicle(11 * w, 9 * h));
        this.cubicles.push(new Cubicle(0 * w, 10 * h));
        this.cubicles.push(new Cubicle(1 * w, 10 * h));
        this.cubicles.push(new Cubicle(11 * w, 10 * h));
        this.cubicles.push(new Cubicle(0 * w, 11 * h));
        this.cubicles.push(new Cubicle(1 * w, 11 * h));
        this.cubicles.push(new Cubicle(11 * w, 11 * h));
        this.cubicles.push(new Cubicle(0 * w, 12 * h));
        this.cubicles.push(new Cubicle(1 * w, 12 * h));
        this.cubicles.push(new Cubicle(2 * w, 12 * h));
        this.cubicles.push(new Cubicle(3 * w, 12 * h));
        this.cubicles.push(new Cubicle(4 * w, 12 * h));
        this.cubicles.push(new Cubicle(5 * w, 12 * h));
        this.cubicles.push(new Cubicle(6 * w, 12 * h));
        this.cubicles.push(new Cubicle(7 * w, 12 * h));
        this.cubicles.push(new Cubicle(8 * w, 12 * h));
        this.cubicles.push(new Cubicle(9 * w, 12 * h));
        this.cubicles.push(new Cubicle(10 * w, 12 * h));
        this.cubicles.push(new Cubicle(11 * w, 12 * h));
    };
    LevelOffice.prototype.createCheckpoints = function () {
        var w = 300; //  Samma som cubicle.png
        var h = 300;
        this.checkpoints = [];
        this.checkpoints.push(new Checkpoint(1 * w, 3 * h, 2 * w, 2 * h, Direction.Down));
        this.checkpoints.push(new Checkpoint(1 * w, 5 * h, 2 * w, 3 * h, Direction.Down));
        this.checkpoints.push(new Checkpoint(2 * w, 8 * h, 1 * w, 2 * h, Direction.Down));
        this.checkpoints.push(new Checkpoint(2 * w, 10 * h, 2 * w, 2 * h, Direction.Right));
        this.checkpoints.push(new Checkpoint(4 * w, 10 * h, 2 * w, 2 * h, Direction.Right));
        this.checkpoints.push(new Checkpoint(6 * w, 10 * h, 2 * w, 2 * h, Direction.Right));
        this.checkpoints.push(new Checkpoint(8 * w, 10 * h, 3 * w, 2 * h, Direction.Up));
        this.checkpoints.push(new Checkpoint(9 * w, 7 * h, 2 * w, 3 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(7 * w, 7 * h, 2 * w, 2 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(4 * w, 7 * h, 3 * w, 2 * h, Direction.Up));
        this.checkpoints.push(new Checkpoint(6 * w, 4 * h, 4 * w, 2 * h, Direction.Up));
        this.checkpoints.push(new Checkpoint(8 * w, 1 * h, 2 * w, 3 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(6 * w, 1 * h, 2 * w, 2 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(4 * w, 1 * h, 2 * w, 2 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(1 * w, 1 * h, 3 * w, 2 * h, Direction.Down));
    };
    LevelOffice.prototype.renderWorld = function () {
        Game.app.renderer.render(this.floor, this.renderTexture, true);
        for (var _i = 0, _a = this.cubicles; _i < _a.length; _i++) {
            var cubicle = _a[_i];
            Game.app.renderer.render(cubicle.background, this.renderTexture, false);
            for (var _b = 0, _c = cubicle.items; _b < _c.length; _b++) {
                var item = _c[_b];
                Game.app.renderer.render(item.sprite, this.renderTexture, false);
            }
        }
        if (Game.twoPlayerGame) {
            Game.app.renderer.render(this.otherPlayerLegsSprite, this.renderTexture, false);
            Game.app.renderer.render(this.otherPlayerSprite, this.renderTexture, false);
        }
    };
    LevelOffice.prototype.updateOtherPlayer = function (worldPosition, angle, texture) {
        this.otherPlayerWorldPosition = worldPosition;
        this.otherPlayerSprite.angle = angle;
        this.otherPlayerLegsSprite.angle = angle;
        if (texture != "") {
            this.otherPlayerLegsSprite.texture = PIXI.Loader.shared.resources[texture].texture;
        }
    };
    LevelOffice.prototype.movePlayer = function (elapsedTime) {
        var turnSpeed = 360; //  Degrees per second
        var accSpeed = 1500;
        var naturalBreakAcc = -1000;
        var playerBreakAcc = -2500;
        var maxSpeed = 1200;
        var currentLegsTexture = "";
        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {
            this.playerSprite.angle -= turnSpeed * elapsedTime / 1000;
            this.playerLegsSprite.angle = this.playerSprite.angle;
        }
        else if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {
            this.playerSprite.angle += turnSpeed * elapsedTime / 1000;
            this.playerLegsSprite.angle = this.playerSprite.angle;
        }
        if (Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.current.isPressed(this.downKey)) {
            this.playerSpeed.x -= Math.sin(this.playerSprite.rotation) * accSpeed * elapsedTime / 1000;
            this.playerSpeed.y += Math.cos(this.playerSprite.rotation) * accSpeed * elapsedTime / 1000;
            var partSpeed = Math.sqrt(this.playerSpeed.x * this.playerSpeed.x + this.playerSpeed.y * this.playerSpeed.y) / maxSpeed;
            this.timeLeftCurrentFrameLegs -= elapsedTime * (1 + 3 * partSpeed);
            if (this.timeLeftCurrentFrameLegs <= 0) {
                this.timeLeftCurrentFrameLegs += 150;
                this.currentFrameLegs++;
                if (this.currentFrameLegs > 5) {
                    this.currentFrameLegs = 0;
                }
                currentLegsTexture = "level-office-player-run" + this.currentFrameLegs + "-p" + this.player;
                this.playerLegsSprite.texture = PIXI.Loader.shared.resources[currentLegsTexture].texture;
            }
        }
        else if (Game.keyboard.current.isPressed(this.downKey) && !Game.keyboard.current.isPressed(this.upKey)) {
            var actualRotation = Math.atan2(this.playerSpeed.y, this.playerSpeed.x) - Math.PI / 2;
            var oldSpeed = new Position(this.playerSpeed.x, this.playerSpeed.y);
            this.playerSpeed.x -= Math.sin(actualRotation) * playerBreakAcc * elapsedTime / 1000;
            this.playerSpeed.y += Math.cos(actualRotation) * playerBreakAcc * elapsedTime / 1000;
            if ((oldSpeed.x > 0 && this.playerSpeed.x < 0) || (oldSpeed.x < 0 && this.playerSpeed.x > 0)) {
                this.playerSpeed.x = 0;
            }
            if ((oldSpeed.y > 0 && this.playerSpeed.y < 0) || (oldSpeed.y < 0 && this.playerSpeed.y > 0)) {
                this.playerSpeed.y = 0;
            }
            currentLegsTexture = "level-office-player-break-p" + this.player;
            this.playerLegsSprite.texture = PIXI.Loader.shared.resources[currentLegsTexture].texture;
        }
        else {
            var actualRotation = Math.atan2(-this.playerSpeed.y, this.playerSpeed.x);
            var oldSpeed = new Position(this.playerSpeed.x, this.playerSpeed.y);
            this.playerSpeed.x -= Math.cos(actualRotation - Math.PI) * naturalBreakAcc * elapsedTime / 1000;
            this.playerSpeed.y += Math.sin(actualRotation - Math.PI) * naturalBreakAcc * elapsedTime / 1000;
            if ((oldSpeed.x > 0 && this.playerSpeed.x < 0) || (oldSpeed.x < 0 && this.playerSpeed.x > 0)) {
                this.playerSpeed.x = 0;
            }
            if ((oldSpeed.y > 0 && this.playerSpeed.y < 0) || (oldSpeed.y < 0 && this.playerSpeed.y > 0)) {
                this.playerSpeed.y = 0;
            }
            currentLegsTexture = "level-office-player-idle-p" + this.player;
            this.playerLegsSprite.texture = PIXI.Loader.shared.resources[currentLegsTexture].texture;
        }
        if (Math.sqrt(this.playerSpeed.x * this.playerSpeed.x + this.playerSpeed.y * this.playerSpeed.y) > maxSpeed) {
            //  Normalize
            var a = Math.atan2(-this.playerSpeed.y, this.playerSpeed.x);
            this.playerSpeed.x = Math.cos(a) * maxSpeed;
            this.playerSpeed.y = -Math.sin(a) * maxSpeed;
        }
        var newPosition = new Position(this.playerWorldPosition.x + this.playerSpeed.x * elapsedTime / 1000, this.playerWorldPosition.y + this.playerSpeed.y * elapsedTime / 1000);
        this.playerWorldPosition = this.CheckCollision(this.playerWorldPosition, newPosition);
        for (var _i = 0, _a = this.cubicles; _i < _a.length; _i++) {
            var cubicle = _a[_i];
            cubicle.update(this.playerWorldPosition);
        }
        if (Game.twoPlayerGame) {
            if (this.player == 1) {
                Game.currentStatePlayer2.updateOtherPlayer(this.playerWorldPosition, this.playerSprite.angle, currentLegsTexture);
            }
            else {
                Game.currentStatePlayer1.updateOtherPlayer(this.playerWorldPosition, this.playerSprite.angle, currentLegsTexture);
            }
            var otherPlayerRelativeToPlayer = new Position(this.otherPlayerWorldPosition.x - this.playerWorldPosition.x + 950 / 2, this.otherPlayerWorldPosition.y - this.playerWorldPosition.y + 950 / 2);
            this.otherPlayerSprite.x = otherPlayerRelativeToPlayer.x;
            this.otherPlayerSprite.y = otherPlayerRelativeToPlayer.y;
            this.otherPlayerLegsSprite.x = otherPlayerRelativeToPlayer.x;
            this.otherPlayerLegsSprite.y = otherPlayerRelativeToPlayer.y;
        }
    };
    LevelOffice.prototype.CheckCollision = function (oldPlayerWorldPosition, newPlayerWorldPosition) {
        var i = 0;
        var noOfCollide = 0;
        for (; i < this.cubicles.length; i++) {
            if (noOfCollide > 2) {
                //  Jag BORDE aldrig få mer än max två kollisioner på en update, men det får jag för jag kodar som en röv.
                //  Skitsamma, sätt tillbaka positionen så att jag aldrig ska fastna i evighetsloopar.
                return oldPlayerWorldPosition;
            }
            var cubicle = this.cubicles[i];
            if (cubicle.isInside(newPlayerWorldPosition)) {
                //  Kolla kollisioner för x och y separat så att man kan glida längs väggarna
                var dx = newPlayerWorldPosition.x - oldPlayerWorldPosition.x;
                var dy = newPlayerWorldPosition.y - oldPlayerWorldPosition.y;
                var insideX = void 0;
                var insideY = void 0;
                if (dx > 0) {
                    insideX = newPlayerWorldPosition.x - cubicle.worldPosition.x;
                }
                else {
                    insideX = newPlayerWorldPosition.x - (cubicle.worldPosition.x + 300);
                }
                if (dy > 0) {
                    insideY = newPlayerWorldPosition.y - cubicle.worldPosition.y;
                }
                else {
                    insideY = newPlayerWorldPosition.y - (cubicle.worldPosition.y + 300);
                }
                var maxSpeed = 1000;
                var partMaxSpeed = Math.sqrt(this.playerSpeed.x * this.playerSpeed.x + this.playerSpeed.y * this.playerSpeed.y) / maxSpeed;
                if (partMaxSpeed > 0.25) {
                    this.screenShakeTimeLeft = 1000 * partMaxSpeed;
                }
                if (Math.abs(insideX) < 2 && Math.abs(insideY) < 2) {
                    //  Hit corner
                    newPlayerWorldPosition.x = oldPlayerWorldPosition.x;
                    newPlayerWorldPosition.y = oldPlayerWorldPosition.y;
                    this.playerSpeed.x = this.playerSpeed.x / -5;
                    this.playerSpeed.y = this.playerSpeed.y / -5;
                }
                else if (Math.abs(insideX) < Math.abs(insideY)) {
                    newPlayerWorldPosition.x -= insideX * 2;
                    //  Bounce back with a 5th of the speed
                    this.playerSpeed.x = this.playerSpeed.x / -5;
                    if (this.playerSpeed.y > 300) {
                        this.playerSpeed.y = 300;
                    }
                    else if (this.playerSpeed.y < -300) {
                        this.playerSpeed.y = -300;
                    }
                }
                else {
                    newPlayerWorldPosition.y -= insideY * 2;
                    this.playerSpeed.y = this.playerSpeed.y / -5;
                    if (this.playerSpeed.x > 300) {
                        this.playerSpeed.x = 300;
                    }
                    else if (this.playerSpeed.x < -300) {
                        this.playerSpeed.x = -300;
                    }
                }
                i = 0; //  Start over
                noOfCollide++;
            }
        }
        return newPlayerWorldPosition;
    };
    LevelOffice.prototype.checkCheckpoints = function (elapsedTime) {
        this.elapsedTimeInCurrentCheckpoint += elapsedTime;
        this.directionUpSprite.visible = false;
        this.directionDownSprite.visible = false;
        this.directionLeftSprite.visible = false;
        this.directionRightSprite.visible = false;
        if (this.checkpoints[this.nextCheckpoint].isInside(this.playerWorldPosition)) {
            this.elapsedTimeInCurrentCheckpoint = 0;
            this.nextCheckpoint++;
            if (this.nextCheckpoint >= this.checkpoints.length) {
                this.nextCheckpoint = 0;
            }
            this.scoreCounter.setNewScore(this.scoreCounter.getDesiredScore() + 1, 200);
        }
        else if (this.elapsedTimeInCurrentCheckpoint > 1000) {
            for (var i = 0; i < this.checkpoints.length; i++) {
                if (this.checkpoints[i].isInside(this.playerWorldPosition)) {
                    if (this.checkpoints[i].directionNext == Direction.Up) {
                        this.directionUpSprite.visible = true;
                        this.directionUpSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }
                    else if (this.checkpoints[i].directionNext == Direction.Down) {
                        this.directionDownSprite.visible = true;
                        this.directionDownSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }
                    else if (this.checkpoints[i].directionNext == Direction.Left) {
                        this.directionLeftSprite.visible = true;
                        this.directionLeftSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }
                    else if (this.checkpoints[i].directionNext == Direction.Right) {
                        this.directionRightSprite.visible = true;
                        this.directionRightSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }
                    break;
                }
            }
        }
    };
    return LevelOffice;
}(GameState));
//# sourceMappingURL=levelOffice.js.map