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
var TitleState = /** @class */ (function (_super) {
    __extends(TitleState, _super);
    function TitleState(xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.logoBackground = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-background"].texture);
        _this.logoBackground.x = 580;
        _this.logoBackground.y = 0;
        _this.logoPipe = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-pipe"].texture);
        _this.logoPipe.pivot.set(940 / 2, 393 / 2);
        _this.logoPipe.x = 1920 / 2;
        _this.logoPipe.y = 1080 / 2;
        _this.logoSubtitle = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-subtitle"].texture);
        _this.logoSubtitle.x = 683;
        _this.logoSubtitle.y = 188;
        _this.logoTitle = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-title"].texture);
        _this.logoTitle.pivot.set(940 / 2, 393 / 2);
        _this.logoTitle.x = 1920 / 2;
        _this.logoTitle.y = 1080 / 2;
        _this.gamemodeBackground = new PIXI.Sprite(PIXI.Loader.shared.resources["gamemode-background"].texture);
        _this.gamemodeBackground.x = 162;
        _this.gamemodeBackground.y = 306;
        _this.onePlayer0 = new PIXI.Sprite(PIXI.Loader.shared.resources["1player0"].texture);
        _this.onePlayer0.x = 267;
        _this.onePlayer0.y = 327;
        _this.onePlayer0.visible = false;
        _this.onePlayer1 = new PIXI.Sprite(PIXI.Loader.shared.resources["1player1"].texture);
        _this.onePlayer1.x = 267;
        _this.onePlayer1.y = 327;
        _this.onePlayer1.visible = false;
        _this.onePlayerDisabled = new PIXI.Sprite(PIXI.Loader.shared.resources["1player-disabled"].texture);
        _this.onePlayerDisabled.x = 167;
        _this.onePlayerDisabled.y = 315;
        _this.onePlayerDisabled.visible = false;
        _this.twoPlayers0 = new PIXI.Sprite(PIXI.Loader.shared.resources["2players0"].texture);
        _this.twoPlayers0.x = 991;
        _this.twoPlayers0.y = 358;
        _this.twoPlayers0.visible = false;
        _this.twoPlayers1 = new PIXI.Sprite(PIXI.Loader.shared.resources["2players1"].texture);
        _this.twoPlayers1.x = 991;
        _this.twoPlayers1.y = 358;
        _this.twoPlayers1.visible = false;
        _this.twoPlayersDisabled = new PIXI.Sprite(PIXI.Loader.shared.resources["2players-disabled"].texture);
        _this.twoPlayersDisabled.x = 987;
        _this.twoPlayersDisabled.y = 321;
        _this.twoPlayersDisabled.visible = true;
        return _this;
    }
    TitleState.prototype.onEnter = function () {
        this.gamemodeBackground.alpha = 0;
        this.gamemodeBackground.alpha = 0;
        this.onePlayer0.alpha = 0;
        this.onePlayer1.alpha = 0;
        this.onePlayerDisabled.alpha = 0;
        this.twoPlayers0.alpha = 0;
        this.twoPlayers1.alpha = 0;
        this.twoPlayersDisabled.alpha = 0;
        this.logoBackground.alpha = 0;
        this.logoSubtitle.alpha = 0;
        Game.app.stage.addChild(this.gamemodeBackground);
        Game.app.stage.addChild(this.onePlayer0);
        Game.app.stage.addChild(this.onePlayer1);
        Game.app.stage.addChild(this.onePlayerDisabled);
        Game.app.stage.addChild(this.twoPlayers0);
        Game.app.stage.addChild(this.twoPlayers1);
        Game.app.stage.addChild(this.twoPlayersDisabled);
        Game.app.stage.addChild(this.logoBackground);
        Game.app.stage.addChild(this.logoPipe);
        Game.app.stage.addChild(this.logoTitle);
        Game.app.stage.addChild(this.logoSubtitle);
        Game.twoPlayerGame = false;
        this.timeLeftCurrentFrame = 100;
        this.currentFrame = 0;
        this.totalTimeElasped = 0;
        Game.soundPlayer.titleIntro.play();
    };
    TitleState.prototype.onExit = function () {
        Game.app.stage.removeChild(this.gamemodeBackground);
        Game.app.stage.removeChild(this.onePlayer0);
        Game.app.stage.removeChild(this.onePlayer1);
        Game.app.stage.removeChild(this.onePlayerDisabled);
        Game.app.stage.removeChild(this.twoPlayers0);
        Game.app.stage.removeChild(this.twoPlayers1);
        Game.app.stage.removeChild(this.twoPlayersDisabled);
        Game.app.stage.removeChild(this.logoBackground);
        Game.app.stage.removeChild(this.logoPipe);
        Game.app.stage.removeChild(this.logoSubtitle);
        Game.app.stage.removeChild(this.logoTitle);
        if (Game.twoPlayerGame) {
            Game.currentStatePlayer1 = new LevelMoustache(0, 'w', 's', 'a', 'd');
            Game.currentStatePlayer2 = new LevelMoustache(960, 'arrowup', 'arrowdown', 'arrowleft', 'arrowright');
            Game.currentStatePlayer1.onEnter();
            Game.currentStatePlayer2.onEnter();
        }
        else {
            Game.currentStatePlayer1 = new LevelMoustache(480, 'w', 's', 'a', 'd');
            Game.currentStatePlayer1.onEnter();
        }
        Game.soundPlayer.titleIntro.stop();
        if (Game.soundPlayer.titleLoop.playing) {
            Game.soundPlayer.titleLoop.fade(1, 0, 1000);
        }
    };
    TitleState.prototype.update = function (elapsedTime) {
        if (this.totalTimeElasped < 1900) {
            this.totalTimeElasped += elapsedTime;
            var part = this.totalTimeElasped / 1900;
            this.logoPipe.scale.x = 0.5 + part / 2;
            this.logoPipe.scale.y = 0.5 + part / 2;
            this.logoPipe.angle = 2 * Math.sin(part * 3 * 2 * Math.PI);
            this.logoTitle.scale.x = 0.5 + part / 2;
            this.logoTitle.scale.y = 0.5 + part / 2;
            this.logoTitle.angle = -2 * Math.sin(part * 3 * 2 * Math.PI);
            return;
        }
        else if (this.totalTimeElasped < 2507) {
            this.totalTimeElasped += elapsedTime;
            var part = (this.totalTimeElasped - 1900) / (2507 - 1900);
            this.gamemodeBackground.alpha = part;
            this.gamemodeBackground.alpha = part;
            this.onePlayer0.alpha = part;
            this.onePlayer1.alpha = part;
            this.onePlayerDisabled.alpha = part;
            this.twoPlayers0.alpha = part;
            this.twoPlayers1.alpha = part;
            this.twoPlayersDisabled.alpha = part;
            this.logoPipe.scale.x = 1.0 - part / 4;
            this.logoPipe.scale.y = 1.0 - part / 4;
            this.logoPipe.angle = 360 * Math.sin(part * 5 * 2 * Math.PI);
            this.logoPipe.y = 540 - (540 - 150) * part;
            this.logoTitle.scale.x = 1.0 - part / 4;
            this.logoTitle.scale.y = 1.0 - part / 4;
            this.logoTitle.angle = 360 * Math.sin(part * 5 * 2 * Math.PI);
            this.logoTitle.y = 540 - (540 - 150) * part;
            this.logoBackground.alpha = part;
            return;
        }
        else if (this.totalTimeElasped < 3000) {
            this.totalTimeElasped += elapsedTime;
            var part = (this.totalTimeElasped - 2507) / (3000 - 2507);
            this.logoSubtitle.alpha = part;
            this.gamemodeBackground.alpha = 1;
            this.gamemodeBackground.alpha = 1;
            this.onePlayer0.alpha = 1;
            this.onePlayer1.alpha = 1;
            this.onePlayerDisabled.alpha = 1;
            this.twoPlayers0.alpha = 1;
            this.twoPlayers1.alpha = 1;
            this.twoPlayersDisabled.alpha = 1;
            this.logoPipe.scale.x = 0.75;
            this.logoPipe.scale.y = 0.75;
            this.logoPipe.angle = 0;
            this.logoPipe.y = 150;
            this.logoTitle.scale.x = 0.75;
            this.logoTitle.scale.y = 0.75;
            this.logoTitle.angle = 0;
            this.logoTitle.y = 150;
            this.logoBackground.alpha = 1;
        }
        else {
            this.gamemodeBackground.alpha = 1;
            this.gamemodeBackground.alpha = 1;
            this.onePlayer0.alpha = 1;
            this.onePlayer1.alpha = 1;
            this.onePlayerDisabled.alpha = 1;
            this.twoPlayers0.alpha = 1;
            this.twoPlayers1.alpha = 1;
            this.twoPlayersDisabled.alpha = 1;
            this.logoPipe.scale.x = 0.75;
            this.logoPipe.scale.y = 0.75;
            this.logoPipe.angle = 0;
            this.logoPipe.y = 150;
            this.logoTitle.scale.x = 0.75;
            this.logoTitle.scale.y = 0.75;
            this.logoTitle.angle = 0;
            this.logoTitle.y = 150;
            this.logoSubtitle.alpha = 1;
            this.logoBackground.alpha = 1;
        }
        this.timeLeftCurrentFrame -= elapsedTime;
        if (this.timeLeftCurrentFrame < 0) {
            this.timeLeftCurrentFrame = 300;
            this.currentFrame++;
            if (this.currentFrame > 3) {
                this.currentFrame = 0;
            }
            this.onePlayer0.visible = false;
            this.onePlayer1.visible = false;
            this.twoPlayers0.visible = false;
            this.twoPlayers1.visible = false;
            if (this.currentFrame == 0) {
                this.onePlayer0.visible = true;
                this.twoPlayers0.visible = true;
            }
            else if (this.currentFrame == 2) {
                this.onePlayer1.visible = true;
                this.twoPlayers1.visible = true;
            }
        }
        // elapsedTime in ms
        if (Game.keyboard.current.isPressed('a') && !Game.keyboard.last.isPressed('a') && Game.twoPlayerGame == true) {
            Game.twoPlayerGame = false;
            this.onePlayerDisabled.visible = false;
            this.twoPlayersDisabled.visible = true;
            Game.soundPlayer.titleSwoosh.play();
        }
        if (Game.keyboard.current.isPressed('d') && !Game.keyboard.last.isPressed('d') && Game.twoPlayerGame == false) {
            Game.twoPlayerGame = true;
            this.onePlayerDisabled.visible = true;
            this.twoPlayersDisabled.visible = false;
            Game.soundPlayer.titleSwoosh.play();
        }
        if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {
            this.onExit();
        }
    };
    return TitleState;
}(GameState));
//# sourceMappingURL=titleState.js.map