class TitleState extends GameState {

    public logoBackground: PIXI.Sprite;
    public logoPipe: PIXI.Sprite;
    public logoSubtitle: PIXI.Sprite;
    public logoTitle: PIXI.Sprite;
    public gamemodeBackground: PIXI.Sprite;
    public onePlayer0: PIXI.Sprite;
    public onePlayer1: PIXI.Sprite;
    public onePlayerDisabled: PIXI.Sprite;
    public twoPlayers0: PIXI.Sprite;
    public twoPlayers1: PIXI.Sprite;
    public twoPlayersDisabled: PIXI.Sprite;

    public timeLeftCurrentFrame: number;
    public currentFrame: number;

    public totalTimeElasped: number;

    constructor(xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(xOffset, upKey, downKey, leftKey, rightKey);

        this.logoBackground = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-background"].texture);
        this.logoBackground.x = 580;
        this.logoBackground.y = 0;

        this.logoPipe = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-pipe"].texture);
        this.logoPipe.pivot.set(940 / 2, 393 / 2);
        this.logoPipe.x = 1920/2;
        this.logoPipe.y = 1080/2;

        this.logoSubtitle = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-subtitle"].texture);
        this.logoSubtitle.x = 683;
        this.logoSubtitle.y = 188;

        this.logoTitle = new PIXI.Sprite(PIXI.Loader.shared.resources["logo-title"].texture);
        this.logoTitle.pivot.set(940 / 2, 393 / 2);
        this.logoTitle.x = 1920/2;
        this.logoTitle.y = 1080/2;

        this.gamemodeBackground = new PIXI.Sprite(PIXI.Loader.shared.resources["gamemode-background"].texture);
        this.gamemodeBackground.x = 162;
        this.gamemodeBackground.y = 306;

        this.onePlayer0 = new PIXI.Sprite(PIXI.Loader.shared.resources["1player0"].texture);
        this.onePlayer0.x = 267;
        this.onePlayer0.y = 327;
        this.onePlayer0.visible = false;

        this.onePlayer1 = new PIXI.Sprite(PIXI.Loader.shared.resources["1player1"].texture);
        this.onePlayer1.x = 267;
        this.onePlayer1.y = 327;
        this.onePlayer1.visible = false;

        this.onePlayerDisabled = new PIXI.Sprite(PIXI.Loader.shared.resources["1player-disabled"].texture);
        this.onePlayerDisabled.x = 167;
        this.onePlayerDisabled.y = 315;
        this.onePlayerDisabled.visible = false;

        this.twoPlayers0 = new PIXI.Sprite(PIXI.Loader.shared.resources["2players0"].texture);
        this.twoPlayers0.x = 991;
        this.twoPlayers0.y = 358;
        this.twoPlayers0.visible = false;

        this.twoPlayers1 = new PIXI.Sprite(PIXI.Loader.shared.resources["2players1"].texture);
        this.twoPlayers1.x = 991;
        this.twoPlayers1.y = 358;
        this.twoPlayers1.visible = false;

        this.twoPlayersDisabled = new PIXI.Sprite(PIXI.Loader.shared.resources["2players-disabled"].texture);
        this.twoPlayersDisabled.x = 987;
        this.twoPlayersDisabled.y = 321;
        this.twoPlayersDisabled.visible = true;
    }

    public onEnter(): void {

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

    }

    public onExit(): void {

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
    }

    public update(elapsedTime: number): void {

        if (this.totalTimeElasped < 1900) {

            this.totalTimeElasped += elapsedTime;

            let part = this.totalTimeElasped / 1900;

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

            let part = (this.totalTimeElasped - 1900) / (2507 - 1900);

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

            let part = (this.totalTimeElasped - 2507) / (3000 - 2507);

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
    }
}