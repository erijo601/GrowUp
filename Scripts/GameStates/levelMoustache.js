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
var LevelMoustache = (function (_super) {
    __extends(LevelMoustache, _super);
    function LevelMoustache(player, xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, player, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.stateName = "LevelMoustache";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.faceBg = new PIXI.Sprite(PIXI.Loader.shared.resources["face-bg-" + player].texture);
        _this.faceBg.x = 72 + _this.xOffset;
        _this.faceBg.y = 0;
        _this.leftEye = [];
        var eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-left-0"].texture);
        eye.x = _this.faceBg.x + 142;
        eye.y = _this.faceBg.y + 147;
        _this.leftEye.push(eye);
        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-left-1"].texture);
        eye.x = _this.faceBg.x + 142;
        eye.y = _this.faceBg.y + 147;
        _this.leftEye.push(eye);
        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-left-2"].texture);
        eye.x = _this.faceBg.x + 142;
        eye.y = _this.faceBg.y + 147;
        _this.leftEye.push(eye);
        _this.rightEye = [];
        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-right-0"].texture);
        eye.x = _this.faceBg.x + 539;
        eye.y = _this.faceBg.y + 127;
        _this.rightEye.push(eye);
        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-right-1"].texture);
        eye.x = _this.faceBg.x + 539;
        eye.y = _this.faceBg.y + 127;
        _this.rightEye.push(eye);
        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-right-2"].texture);
        eye.x = _this.faceBg.x + 539;
        eye.y = _this.faceBg.y + 127;
        _this.rightEye.push(eye);
        _this.mouth = [];
        var mouthTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["mouth-0"].texture);
        mouthTmp.x = _this.faceBg.x + 148;
        mouthTmp.y = _this.faceBg.y + 698;
        _this.mouth.push(mouthTmp);
        mouthTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["mouth-1"].texture);
        mouthTmp.x = _this.faceBg.x + 148;
        mouthTmp.y = _this.faceBg.y + 698;
        _this.mouth.push(mouthTmp);
        mouthTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["mouth-2"].texture);
        mouthTmp.x = _this.faceBg.x + 148;
        mouthTmp.y = _this.faceBg.y + 698;
        _this.mouth.push(mouthTmp);
        _this.nose = [];
        var noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-0"].texture);
        noseTmp.x = _this.faceBg.x + 187;
        noseTmp.y = _this.faceBg.y + 568;
        _this.nose.push(noseTmp);
        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-1"].texture);
        noseTmp.x = _this.faceBg.x + 187;
        noseTmp.y = _this.faceBg.y + 568;
        _this.nose.push(noseTmp);
        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-2"].texture);
        noseTmp.x = _this.faceBg.x + 187;
        noseTmp.y = _this.faceBg.y + 568;
        _this.nose.push(noseTmp);
        _this.noseFrontBase = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-front-base"].texture);
        _this.noseFrontBase.x = _this.faceBg.x + 187;
        _this.noseFrontBase.y = _this.faceBg.y + 568;
        _this.noseFrontBase.zIndex = 100;
        _this.noseFrontBase.alpha = 0.5;
        _this.noseFront = [];
        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-0-front"].texture);
        noseTmp.x = _this.faceBg.x + 187;
        noseTmp.y = _this.faceBg.y + 568;
        noseTmp.zIndex = 100;
        noseTmp.alpha = 0.5;
        _this.noseFront.push(noseTmp);
        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-1-front"].texture);
        noseTmp.x = _this.faceBg.x + 187;
        noseTmp.y = _this.faceBg.y + 568;
        noseTmp.zIndex = 100;
        noseTmp.alpha = 0.5;
        _this.noseFront.push(noseTmp);
        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-2-front"].texture);
        noseTmp.x = _this.faceBg.x + 187;
        noseTmp.y = _this.faceBg.y + 568;
        noseTmp.zIndex = 100;
        noseTmp.alpha = 0.5;
        _this.noseFront.push(noseTmp);
        _this.totalTimeDropGrid = 8750;
        _this.totalTimeDropCurrentShape = 150;
        _this.spawnBag = [];
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
    LevelMoustache.prototype.fillSpawnBag = function () {
        this.spawnBag = [];
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new SquareShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new SquareShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new SquareShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new StraightShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new StraightShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new StraightShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new TShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new TShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new TShape(this.faceBg.x, this.faceBg.y, 10));
    };
    LevelMoustache.prototype.addStartPieces = function () {
        var columns = [];
        columns.push(0);
        columns.push(1);
        columns.push(2);
        columns.push(3);
        columns.push(4);
        columns.push(5);
        columns.push(6);
        columns.push(7);
        columns.push(8);
        columns.push(9);
        for (var n = 0; n < 2; n++) {
            var index = MathHelper.randomInt(0, columns.length - 1);
            var column = columns[index];
            columns.splice(index, 1);
            var shape = new DotShape(this.faceBg.x, this.faceBg.y, column, 19);
            shape.addSprites(this.player);
            this.grid.addShape(shape);
            shape = new DotShape(this.faceBg.x, this.faceBg.y, column, 18);
            shape.addSprites(this.player);
            this.grid.addShape(shape);
        }
        for (var n = 0; n < 3; n++) {
            var index = MathHelper.randomInt(0, columns.length - 1);
            var column = columns[index];
            columns.splice(index, 1);
            var shape = new DotShape(this.faceBg.x, this.faceBg.y, column, 19);
            shape.addSprites(this.player);
            this.grid.addShape(shape);
        }
        this.grid.updateRows(this.player, 1);
    };
    LevelMoustache.prototype.onEnter = function () {
        this.score = 0;
        this.grid = new Grid();
        this.scoreCounter.onEnter();
        Game.app.stage.addChild(this.faceBg);
        for (var _i = 0, _a = this.leftEye; _i < _a.length; _i++) {
            var sprite = _a[_i];
            sprite.visible = false;
            Game.app.stage.addChild(sprite);
        }
        for (var _b = 0, _c = this.rightEye; _b < _c.length; _b++) {
            var sprite = _c[_b];
            sprite.visible = false;
            Game.app.stage.addChild(sprite);
        }
        for (var _d = 0, _e = this.mouth; _d < _e.length; _d++) {
            var sprite = _e[_d];
            sprite.visible = false;
            Game.app.stage.addChild(sprite);
        }
        for (var _f = 0, _g = this.nose; _f < _g.length; _f++) {
            var sprite = _g[_f];
            sprite.visible = false;
            Game.app.stage.addChild(sprite);
        }
        Game.app.stage.addChild(this.noseFrontBase);
        for (var _h = 0, _j = this.noseFront; _h < _j.length; _h++) {
            var sprite = _j[_h];
            sprite.visible = false;
            Game.app.stage.addChild(sprite);
        }
        if (this.player == 1) {
            this.pressEnter.visible = false;
            Game.app.stage.addChild(this.pressEnter);
        }
        this.addStartPieces();
        this.currentShape = this.spawnShape();
        this.totalElapsedTime = 0;
        this.totalTimeDropGrid = 8750 * 2;
        this.timeLeftDropGrid = this.totalTimeDropGrid;
        this.timeLeftDropCurrentShape = this.totalTimeDropCurrentShape;
        this.timeTilAnimLeftEye = MathHelper.randomInt(2000, 6000);
        this.timeLeftCurrentLeftEyeFrame = 70;
        this.leftEyeAnimDirection = 1;
        this.currentLeftEyeFrame = 0;
        this.timeTilAnimRightEye = MathHelper.randomInt(2000, 6000);
        this.timeLeftCurrentRightEyeFrame = 70;
        this.rightEyeAnimDirection = 1;
        this.currentRightEyeFrame = 0;
        this.animateMouth = false;
        this.timeLeftCurrentMouthFrame = 90;
        this.mouthAnimDirection = 1;
        this.currentMouthFrame = 0;
        this.animateNose = false;
        this.timeLeftCurrentNoseFrame = 100;
        this.noseAnimDirection = 1;
        this.currentNoseFrame = 0;
        this.lastSmile = false;
        Game.sceneTransition.startShrinking();
    };
    LevelMoustache.prototype.onExit = function () {
        Game.app.stage.removeChild(this.faceBg);
        for (var _i = 0, _a = this.leftEye; _i < _a.length; _i++) {
            var sprite = _a[_i];
            Game.app.stage.removeChild(sprite);
        }
        for (var _b = 0, _c = this.rightEye; _b < _c.length; _b++) {
            var sprite = _c[_b];
            Game.app.stage.removeChild(sprite);
        }
        for (var _d = 0, _e = this.mouth; _d < _e.length; _d++) {
            var sprite = _e[_d];
            Game.app.stage.removeChild(sprite);
        }
        for (var _f = 0, _g = this.nose; _f < _g.length; _f++) {
            var sprite = _g[_f];
            Game.app.stage.removeChild(sprite);
        }
        Game.app.stage.removeChild(this.noseFrontBase);
        for (var _h = 0, _j = this.noseFront; _h < _j.length; _h++) {
            var sprite = _j[_h];
            Game.app.stage.removeChild(sprite);
        }
        this.grid.onExit();
        this.scoreCounter.onExit();
        Game.soundPlayer.musicMoustache.stop();
        if (this.player == 1) {
            Game.app.stage.removeChild(this.pressEnter);
            Game.scoreStatePlayer1.beforeOnEnter(Level.Moustache, this.scoreCounter.getScore());
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
    LevelMoustache.prototype.update = function (elapsedTime) {
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            if (this.player == 1) {
                Game.sceneTransition.update(elapsedTime);
            }
            if (Game.sceneTransition.isDone()) {
                Game.soundPlayer.musicMoustache.play();
                Game.intro.startLevelMoustache();
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
        if (this.totalElapsedTime > 90000) {
            if (this.player == 1) {
                this.pressEnter.visible = true;
                if (this.totalElapsedTime > 90000 && this.totalElapsedTime < 90300) {
                    this.pressEnter.alpha = (this.totalElapsedTime - 90000) / 300;
                }
                else if (this.totalElapsedTime > 90300) {
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
        this.scoreCounter.update(elapsedTime);
        if (this.timeTilAnimLeftEye > 0) {
            this.timeTilAnimLeftEye -= elapsedTime;
        }
        else {
            this.timeLeftCurrentLeftEyeFrame -= elapsedTime;
            if (this.timeLeftCurrentLeftEyeFrame <= 0) {
                this.timeLeftCurrentLeftEyeFrame = 70;
                this.leftEye[this.currentLeftEyeFrame].visible = false;
                this.currentLeftEyeFrame += this.leftEyeAnimDirection;
                if (this.currentLeftEyeFrame == 3) {
                    if (this.lastSmile) {
                        this.currentLeftEyeFrame = 2;
                        this.leftEye[this.currentLeftEyeFrame].visible = true;
                    }
                    else {
                        this.currentLeftEyeFrame = 1;
                        this.leftEyeAnimDirection = -1;
                        this.leftEye[this.currentLeftEyeFrame].visible = true;
                    }
                }
                else if (this.currentLeftEyeFrame == -1) {
                    this.currentLeftEyeFrame = 0;
                    this.leftEyeAnimDirection = 1;
                    this.timeTilAnimLeftEye = MathHelper.randomInt(2000, 6000);
                    if (MathHelper.randomInt(0, 1) == 0 && this.timeTilAnimRightEye > 0) {
                        this.timeTilAnimRightEye = this.timeTilAnimLeftEye;
                    }
                }
                else {
                    this.leftEye[this.currentLeftEyeFrame].visible = true;
                }
            }
            else {
                this.leftEye[this.currentLeftEyeFrame].visible = true;
            }
        }
        if (this.timeTilAnimRightEye > 0) {
            this.timeTilAnimRightEye -= elapsedTime;
        }
        else {
            this.timeLeftCurrentRightEyeFrame -= elapsedTime;
            if (this.timeLeftCurrentRightEyeFrame <= 0) {
                this.timeLeftCurrentRightEyeFrame = 70;
                this.rightEye[this.currentRightEyeFrame].visible = false;
                this.currentRightEyeFrame += this.rightEyeAnimDirection;
                if (this.currentRightEyeFrame == 3) {
                    if (this.lastSmile) {
                        this.currentRightEyeFrame = 2;
                        this.rightEye[this.currentRightEyeFrame].visible = true;
                    }
                    else {
                        this.currentRightEyeFrame = 1;
                        this.rightEyeAnimDirection = -1;
                        this.rightEye[this.currentRightEyeFrame].visible = true;
                    }
                }
                else if (this.currentRightEyeFrame == -1) {
                    this.currentRightEyeFrame = 0;
                    this.rightEyeAnimDirection = 1;
                    this.timeTilAnimRightEye = MathHelper.randomInt(2000, 6000);
                }
                else {
                    this.rightEye[this.currentRightEyeFrame].visible = true;
                }
            }
            else {
                this.rightEye[this.currentRightEyeFrame].visible = true;
            }
        }
        if (this.animateMouth) {
            this.timeLeftCurrentMouthFrame -= elapsedTime;
            if (this.timeLeftCurrentMouthFrame <= 0) {
                this.mouth[this.currentMouthFrame].visible = false;
                this.currentMouthFrame += this.mouthAnimDirection;
                if (this.currentMouthFrame == 2) {
                    if (this.lastSmile) {
                        this.timeLeftCurrentMouthFrame = 1980;
                    }
                    else {
                        this.timeLeftCurrentMouthFrame = 1100;
                    }
                }
                else {
                    this.timeLeftCurrentMouthFrame = 90;
                }
                if (this.currentMouthFrame == 3) {
                    this.currentMouthFrame = 1;
                    this.mouthAnimDirection = -1;
                    this.mouth[this.currentMouthFrame].visible = true;
                }
                else if (this.currentMouthFrame == -1) {
                    this.currentMouthFrame = 0;
                    this.mouthAnimDirection = 1;
                    this.animateMouth = false;
                }
                else {
                    this.mouth[this.currentMouthFrame].visible = true;
                }
            }
            else {
                this.mouth[this.currentMouthFrame].visible = true;
            }
        }
        if (!this.animateMouth && ((this.totalElapsedTime > 64662 && this.totalElapsedTime < 65000) ||
            (this.totalElapsedTime > 86628 && this.totalElapsedTime < 87000))) {
            this.animateMouth = true;
            this.timeLeftCurrentMouthFrame = 70;
            this.mouth[this.currentMouthFrame].visible = false;
            this.currentMouthFrame = 0;
            this.mouthAnimDirection = 1;
            this.mouth[this.currentMouthFrame].visible = true;
        }
        if (this.animateNose) {
            this.noseFrontBase.visible = false;
            this.timeLeftCurrentNoseFrame -= elapsedTime;
            if (this.timeLeftCurrentNoseFrame <= 0) {
                this.nose[this.currentNoseFrame].visible = false;
                this.noseFront[this.currentNoseFrame].visible = false;
                this.currentNoseFrame += this.noseAnimDirection;
                if (this.currentNoseFrame == 2) {
                    this.timeLeftCurrentNoseFrame = 500;
                }
                else {
                    this.timeLeftCurrentNoseFrame = 100;
                }
                if (this.currentNoseFrame == 3) {
                    this.currentNoseFrame = 1;
                    this.noseAnimDirection = -1;
                    this.nose[this.currentNoseFrame].visible = true;
                    this.noseFront[this.currentNoseFrame].visible = true;
                }
                else if (this.currentNoseFrame == -1) {
                    this.currentNoseFrame = 0;
                    this.noseAnimDirection = 1;
                    this.animateNose = false;
                }
                else {
                    this.nose[this.currentNoseFrame].visible = true;
                    this.noseFront[this.currentNoseFrame].visible = true;
                }
            }
            else {
                this.nose[this.currentNoseFrame].visible = true;
                this.noseFront[this.currentNoseFrame].visible = true;
            }
        }
        else {
            this.noseFrontBase.visible = true;
        }
        if (this.totalElapsedTime > 84500 && !this.lastSmile) {
            if (!this.lastSmile) {
                this.lastSmile = true;
                this.timeTilAnimLeftEye = 2160;
                this.timeLeftCurrentLeftEyeFrame = 70;
                this.leftEye[this.currentLeftEyeFrame].visible = false;
                this.currentLeftEyeFrame = 0;
                this.leftEyeAnimDirection = 1;
                this.timeTilAnimRightEye = 2160;
                this.timeLeftCurrentRightEyeFrame = 70;
                this.rightEye[this.currentRightEyeFrame].visible = false;
                this.currentRightEyeFrame = 0;
                this.rightEyeAnimDirection = 1;
            }
        }
        if (this.totalElapsedTime >= 87250 && this.totalElapsedTime < 87500) {
            var part = (this.totalElapsedTime - 87250) / 250;
            if (this.currentShape != undefined) {
                for (var _i = 0, _a = this.currentShape.sprites; _i < _a.length; _i++) {
                    var sprite = _a[_i];
                    sprite.alpha = 1 - part;
                }
            }
            this.grid.fadeNoseContent(1 - part);
        }
        else if (this.totalElapsedTime > 87500) {
            if (this.currentShape != undefined) {
                for (var _b = 0, _c = this.currentShape.sprites; _b < _c.length; _b++) {
                    var sprite = _c[_b];
                    Game.app.stage.removeChild(sprite);
                }
                this.currentShape = undefined;
            }
            return;
        }
        if (this.currentShape == undefined) {
            if (this.grid.getSmallestY() > 7) {
                this.currentShape = this.spawnShape();
            }
        }
        this.timeLeftDropGrid -= elapsedTime;
        if (this.timeLeftDropGrid <= 0) {
            this.totalTimeDropGrid = (8750 * 0.9);
            this.timeLeftDropGrid += this.totalTimeDropGrid;
            this.animateNose = true;
            this.score += this.grid.dropRows(this.player);
            this.scoreCounter.setNewScore(this.score, 100);
        }
        if (this.currentShape != undefined) {
            this.timeLeftDropCurrentShape -= elapsedTime;
            if (this.timeLeftDropCurrentShape <= 0) {
                this.timeLeftDropCurrentShape += this.totalTimeDropCurrentShape;
                this.dropCurrentShape();
            }
            if (this.currentShape != undefined) {
                var partTimeLeftCurrentRow = this.timeLeftDropCurrentShape / this.totalTimeDropCurrentShape;
                var alreadyMovedCurrentShape = false;
                var points;
                if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.last.isPressed(this.rightKey)) {
                    points = this.currentShape.moveRight();
                    if (this.grid.isPosValid(points)) {
                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }
                if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.last.isPressed(this.leftKey)) {
                    points = this.currentShape.moveLeft();
                    if (this.grid.isPosValid(points)) {
                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }
                if (Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.last.isPressed(this.upKey)) {
                    points = this.currentShape.rotate(true);
                    if (this.grid.isPosValid(points)) {
                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }
                if (Game.keyboard.current.isPressed(this.downKey) && !Game.keyboard.last.isPressed(this.downKey)) {
                    points = this.currentShape.rotate(true);
                    if (this.grid.isPosValid(points)) {
                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }
                if (!alreadyMovedCurrentShape) {
                    this.currentShape.setPos(this.player, this.currentShape.points, partTimeLeftCurrentRow);
                }
            }
        }
        var partTimeLeftGridRow = this.timeLeftDropGrid / this.totalTimeDropGrid;
        this.grid.updateRows(this.player, partTimeLeftGridRow);
    };
    LevelMoustache.prototype.dropCurrentShape = function () {
        var points = this.currentShape.drop();
        if (this.grid.isPosValid(points)) {
            this.currentShape.setPos(this.player, points, 1);
        }
        else {
            this.grid.addShape(this.currentShape);
            this.currentShape = undefined;
        }
    };
    LevelMoustache.prototype.spawnShape = function () {
        if (this.spawnBag.length == 0) {
            this.fillSpawnBag();
        }
        var i = MathHelper.randomInt(0, this.spawnBag.length - 1);
        var shape = this.spawnBag[i];
        this.spawnBag.splice(i, 1);
        shape.addSprites(this.player);
        return shape;
    };
    return LevelMoustache;
}(GameState));
