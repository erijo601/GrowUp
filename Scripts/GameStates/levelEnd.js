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
var LevelEnd = /** @class */ (function (_super) {
    __extends(LevelEnd, _super);
    function LevelEnd(xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, 1, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.spriteFaceBackgroundP1 = null;
        _this.spriteFaceNoseP1 = null;
        _this.spriteFaceNeckP1 = null;
        _this.spriteFaceEyesP1 = null;
        _this.spriteFaceMoustaceP1 = null;
        _this.spriteFaceJawP1 = null;
        _this.spriteFaceBackgroundP2 = null;
        _this.spriteFaceNoseP2 = null;
        _this.spriteFaceNeckP2 = null;
        _this.spriteFaceEyesP2 = null;
        _this.spriteFaceMoustaceP2 = null;
        _this.spriteFaceJawP2 = null;
        _this.showPressEnterOnTime = 3000;
        _this.stateName = "LevelEnd";
        _this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
        _this.pressEnter.x = 858 + 80;
        _this.pressEnter.y = 842 + 100;
        _this.pressEnter.pivot.x = _this.pressEnter.width / 2;
        _this.pressEnter.pivot.y = _this.pressEnter.height / 2;
        _this.pressEnter.zIndex = 2000;
        _this.pressEnter.visible = false;
        _this.spriteWhataman = new PIXI.Sprite(PIXI.Loader.shared.resources["level-end-whataman"].texture);
        _this.spriteWhataman.x = 1920 / 2;
        _this.spriteWhataman.y = 40 + 27;
        _this.spriteWhataman.pivot.x = _this.spriteWhataman.width / 2;
        _this.spriteWhataman.pivot.y = _this.spriteWhataman.height / 2;
        _this.spriteWhataman.zIndex = 2000;
        _this.spriteGameover = new PIXI.Sprite(PIXI.Loader.shared.resources["level-end-gameover"].texture);
        _this.spriteGameover.x = (1920 - _this.spriteGameover.width) / 2;
        _this.spriteGameover.y = 980;
        _this.spriteGameover.zIndex = 2000;
        var facex = 507;
        var facey = 121;
        var scale = 2;
        if (Game.twoPlayerGame) {
            facex = 27;
        }
        //  Player 1
        _this.spriteFaceBackgroundP1 = new PIXI.Sprite(PIXI.Loader.shared.resources["face-background-p1"].texture);
        _this.spriteFaceBackgroundP1.x = facex;
        _this.spriteFaceBackgroundP1.y = facey;
        _this.spriteFaceBackgroundP1.scale.x = scale;
        _this.spriteFaceBackgroundP1.scale.y = scale;
        _this.spriteFaceBackgroundP1.zIndex = 1000;
        var img = Game.scoreStatePlayer1.getMoustacheImg();
        if (img != null) {
            _this.spriteFaceMoustaceP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            _this.spriteFaceMoustaceP1.x = facex;
            _this.spriteFaceMoustaceP1.y = facey;
            _this.spriteFaceMoustaceP1.scale.x = scale;
            _this.spriteFaceMoustaceP1.scale.y = scale;
            _this.spriteFaceMoustaceP1.zIndex = 1004;
        }
        img = Game.scoreStatePlayer1.getNeckImg();
        if (img != null) {
            _this.spriteFaceNeckP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            _this.spriteFaceNeckP1.x = facex;
            _this.spriteFaceNeckP1.y = facey;
            _this.spriteFaceNeckP1.scale.x = scale;
            _this.spriteFaceNeckP1.scale.y = scale;
            _this.spriteFaceNeckP1.zIndex = 1001;
        }
        img = Game.scoreStatePlayer1.getJawImg();
        if (img != null) {
            _this.spriteFaceJawP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            _this.spriteFaceJawP1.x = facex;
            _this.spriteFaceJawP1.y = facey;
            _this.spriteFaceJawP1.scale.x = scale;
            _this.spriteFaceJawP1.scale.y = scale;
            _this.spriteFaceJawP1.zIndex = 1002;
        }
        img = Game.scoreStatePlayer1.getEyesImg();
        if (img != null) {
            _this.spriteFaceEyesP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            _this.spriteFaceEyesP1.x = facex;
            _this.spriteFaceEyesP1.y = facey;
            _this.spriteFaceEyesP1.scale.x = scale;
            _this.spriteFaceEyesP1.scale.y = scale;
            _this.spriteFaceEyesP1.zIndex = 1003;
        }
        img = Game.scoreStatePlayer1.getNoseImg();
        if (img != null) {
            _this.spriteFaceNoseP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            _this.spriteFaceNoseP1.x = facex;
            _this.spriteFaceNoseP1.y = facey;
            _this.spriteFaceNoseP1.scale.x = scale;
            _this.spriteFaceNoseP1.scale.y = scale;
            _this.spriteFaceNoseP1.zIndex = 1005;
        }
        if (Game.twoPlayerGame) {
            facex = 897 + 30;
            //  Player 2
            _this.spriteFaceBackgroundP2 = new PIXI.Sprite(PIXI.Loader.shared.resources["face-background-p2"].texture);
            _this.spriteFaceBackgroundP2.x = facex;
            _this.spriteFaceBackgroundP2.y = facey;
            _this.spriteFaceBackgroundP2.scale.x = scale;
            _this.spriteFaceBackgroundP2.scale.y = scale;
            _this.spriteFaceBackgroundP2.zIndex = 1000;
            var img_1 = Game.scoreStatePlayer2.getMoustacheImg();
            if (img_1 != null) {
                _this.spriteFaceMoustaceP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img_1].texture);
                _this.spriteFaceMoustaceP2.x = facex;
                _this.spriteFaceMoustaceP2.y = facey;
                _this.spriteFaceMoustaceP2.scale.x = scale;
                _this.spriteFaceMoustaceP2.scale.y = scale;
                _this.spriteFaceMoustaceP2.zIndex = 1004;
            }
            img_1 = Game.scoreStatePlayer2.getNeckImg();
            if (img_1 != null) {
                _this.spriteFaceNeckP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img_1].texture);
                _this.spriteFaceNeckP2.x = facex;
                _this.spriteFaceNeckP2.y = facey;
                _this.spriteFaceNeckP2.scale.x = scale;
                _this.spriteFaceNeckP2.scale.y = scale;
                _this.spriteFaceNeckP2.zIndex = 1001;
            }
            img_1 = Game.scoreStatePlayer2.getJawImg();
            if (img_1 != null) {
                _this.spriteFaceJawP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img_1].texture);
                _this.spriteFaceJawP2.x = facex;
                _this.spriteFaceJawP2.y = facey;
                _this.spriteFaceJawP2.scale.x = scale;
                _this.spriteFaceJawP2.scale.y = scale;
                _this.spriteFaceJawP2.zIndex = 1002;
            }
            img_1 = Game.scoreStatePlayer2.getEyesImg();
            if (img_1 != null) {
                _this.spriteFaceEyesP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img_1].texture);
                _this.spriteFaceEyesP2.x = facex;
                _this.spriteFaceEyesP2.y = facey;
                _this.spriteFaceEyesP2.scale.x = scale;
                _this.spriteFaceEyesP2.scale.y = scale;
                _this.spriteFaceEyesP2.zIndex = 1003;
            }
            img_1 = Game.scoreStatePlayer2.getNoseImg();
            if (img_1 != null) {
                _this.spriteFaceNoseP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img_1].texture);
                _this.spriteFaceNoseP2.x = facex;
                _this.spriteFaceNoseP2.y = facey;
                _this.spriteFaceNoseP2.scale.x = scale;
                _this.spriteFaceNoseP2.scale.y = scale;
                _this.spriteFaceNoseP2.zIndex = 1005;
            }
        }
        return _this;
    }
    LevelEnd.prototype.onEnter = function () {
        this.totalElapsedTime = 0;
        this.pressEnter.visible = false;
        Game.app.stage.addChild(this.pressEnter);
        Game.app.stage.addChild(this.spriteWhataman);
        Game.app.stage.addChild(this.spriteGameover);
        Game.app.stage.addChild(this.spriteFaceBackgroundP1);
        Game.app.stage.addChild(this.spriteFaceEyesP1);
        Game.app.stage.addChild(this.spriteFaceJawP1);
        Game.app.stage.addChild(this.spriteFaceNoseP1);
        if (this.spriteFaceMoustaceP1 != null) {
            Game.app.stage.addChild(this.spriteFaceMoustaceP1);
        }
        if (this.spriteFaceNeckP1 != null) {
            Game.app.stage.addChild(this.spriteFaceNeckP1);
        }
        if (Game.twoPlayerGame) {
            Game.app.stage.addChild(this.spriteFaceBackgroundP2);
            Game.app.stage.addChild(this.spriteFaceEyesP2);
            Game.app.stage.addChild(this.spriteFaceJawP2);
            Game.app.stage.addChild(this.spriteFaceNoseP2);
            if (this.spriteFaceMoustaceP2 != null) {
                Game.app.stage.addChild(this.spriteFaceMoustaceP2);
            }
            if (this.spriteFaceNeckP2 != null) {
                Game.app.stage.addChild(this.spriteFaceNeckP2);
            }
        }
        Game.sceneTransition.startShrinking();
        Game.soundPlayer.musicEnd.play();
        Game.soundPlayer.musicEnd.fade(0, 1, 1000);
    };
    LevelEnd.prototype.onExit = function () {
        Game.soundPlayer.musicEnd.stop();
        Game.app.stage.removeChild(this.pressEnter);
        Game.app.stage.removeChild(this.spriteWhataman);
        Game.app.stage.removeChild(this.spriteGameover);
        Game.app.stage.removeChild(this.spriteFaceBackgroundP1);
        Game.app.stage.removeChild(this.spriteFaceEyesP1);
        Game.app.stage.removeChild(this.spriteFaceJawP1);
        Game.app.stage.removeChild(this.spriteFaceNoseP1);
        if (this.spriteFaceMoustaceP1 != null) {
            Game.app.stage.removeChild(this.spriteFaceMoustaceP1);
        }
        if (this.spriteFaceNeckP1 != null) {
            Game.app.stage.removeChild(this.spriteFaceNeckP1);
        }
        if (Game.twoPlayerGame) {
            Game.app.stage.removeChild(this.spriteFaceBackgroundP2);
            Game.app.stage.removeChild(this.spriteFaceEyesP2);
            Game.app.stage.removeChild(this.spriteFaceJawP2);
            Game.app.stage.removeChild(this.spriteFaceNoseP2);
            if (this.spriteFaceMoustaceP2 != null) {
                Game.app.stage.removeChild(this.spriteFaceMoustaceP2);
            }
            if (this.spriteFaceNeckP2 != null) {
                Game.app.stage.removeChild(this.spriteFaceNeckP2);
            }
        }
        Game.currentStatePlayer1 = new TitleState(0, 'w', 's', 'a', 'd');
        Game.currentStatePlayer1.onEnter();
    };
    LevelEnd.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        this.totalElapsedTime += elapsedTime;
        this.spriteWhataman.scale.x = 1 + 0.03 * Math.sin(2 * Math.PI * (this.totalElapsedTime / 600));
        this.spriteWhataman.scale.y = 1 + 0.03 * Math.cos(2 * Math.PI * (this.totalElapsedTime / 600));
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
            }
            return;
        }
        if (this.totalElapsedTime > this.showPressEnterOnTime) {
            this.pressEnter.visible = true;
            if (this.totalElapsedTime > this.showPressEnterOnTime && this.totalElapsedTime < this.showPressEnterOnTime + 300) {
                this.pressEnter.alpha = (this.totalElapsedTime - this.showPressEnterOnTime) / 300;
            }
            else if (this.totalElapsedTime > this.showPressEnterOnTime + 300) {
                this.pressEnter.alpha = 1;
            }
            this.pressEnter.scale.x = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
            this.pressEnter.scale.y = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
            if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter') &&
                !Game.sceneTransition.isGrowing) {
                this.onExit();
            }
            return;
        }
    };
    return LevelEnd;
}(GameState));
//# sourceMappingURL=levelEnd.js.map