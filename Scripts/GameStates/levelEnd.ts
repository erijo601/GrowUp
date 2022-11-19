class LevelEnd extends GameState {

    private totalElapsedTime: number;

    private pressEnter: PIXI.Sprite;
    private spriteWhataman: PIXI.Sprite;
    private spriteGameover: PIXI.Sprite;

    private spriteFaceBackgroundP1: PIXI.Sprite = null;
    private spriteFaceNoseP1: PIXI.Sprite = null;
    private spriteFaceNeckP1: PIXI.Sprite = null;
    private spriteFaceEyesP1: PIXI.Sprite = null;
    private spriteFaceMoustaceP1: PIXI.Sprite = null;
    private spriteFaceJawP1: PIXI.Sprite = null;

    private spriteFaceBackgroundP2: PIXI.Sprite = null;
    private spriteFaceNoseP2: PIXI.Sprite = null;
    private spriteFaceNeckP2: PIXI.Sprite = null;
    private spriteFaceEyesP2: PIXI.Sprite = null;
    private spriteFaceMoustaceP2: PIXI.Sprite = null;
    private spriteFaceJawP2: PIXI.Sprite = null;

    private showPressEnterOnTime: number = 3000;

    constructor(xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(1, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelEnd";

        this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
        this.pressEnter.x = 858 + 80;
        this.pressEnter.y = 842 + 100;
        this.pressEnter.pivot.x = this.pressEnter.width / 2;
        this.pressEnter.pivot.y = this.pressEnter.height / 2;
        this.pressEnter.zIndex = 2000;
        this.pressEnter.visible = false;

        this.spriteWhataman = new PIXI.Sprite(PIXI.Loader.shared.resources["level-end-whataman"].texture);
        this.spriteWhataman.x = 1920 / 2;
        this.spriteWhataman.y = 40+27;
        this.spriteWhataman.pivot.x = this.spriteWhataman.width / 2;
        this.spriteWhataman.pivot.y = this.spriteWhataman.height / 2;
        this.spriteWhataman.zIndex = 2000;

        this.spriteGameover = new PIXI.Sprite(PIXI.Loader.shared.resources["level-end-gameover"].texture);
        this.spriteGameover.x = (1920 - this.spriteGameover.width) / 2;
        this.spriteGameover.y = 980;
        this.spriteGameover.zIndex = 2000;

        let facex = 507;
        let facey = 121;
        let scale = 2;

        if (Game.twoPlayerGame) {

            facex = 27;
        }

        //  Player 1

        this.spriteFaceBackgroundP1 = new PIXI.Sprite(PIXI.Loader.shared.resources["face-background-p1"].texture);
        this.spriteFaceBackgroundP1.x = facex;
        this.spriteFaceBackgroundP1.y = facey;
        this.spriteFaceBackgroundP1.scale.x = scale;
        this.spriteFaceBackgroundP1.scale.y = scale;
        this.spriteFaceBackgroundP1.zIndex = 1000;

        let img = Game.scoreStatePlayer1.getMoustacheImg();

        if (img != null) {

            this.spriteFaceMoustaceP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            this.spriteFaceMoustaceP1.x = facex;
            this.spriteFaceMoustaceP1.y = facey;
            this.spriteFaceMoustaceP1.scale.x = scale;
            this.spriteFaceMoustaceP1.scale.y = scale;
            this.spriteFaceMoustaceP1.zIndex = 1004;
        }

        img = Game.scoreStatePlayer1.getNeckImg();

        if (img != null) {

            this.spriteFaceNeckP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            this.spriteFaceNeckP1.x = facex;
            this.spriteFaceNeckP1.y = facey;
            this.spriteFaceNeckP1.scale.x = scale;
            this.spriteFaceNeckP1.scale.y = scale;
            this.spriteFaceNeckP1.zIndex = 1001;
        }

        img = Game.scoreStatePlayer1.getJawImg();

        if (img != null) {

            this.spriteFaceJawP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            this.spriteFaceJawP1.x = facex;
            this.spriteFaceJawP1.y = facey;
            this.spriteFaceJawP1.scale.x = scale;
            this.spriteFaceJawP1.scale.y = scale;
            this.spriteFaceJawP1.zIndex = 1002;
        }

        img = Game.scoreStatePlayer1.getEyesImg();

        if (img != null) {

            this.spriteFaceEyesP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            this.spriteFaceEyesP1.x = facex;
            this.spriteFaceEyesP1.y = facey;
            this.spriteFaceEyesP1.scale.x = scale;
            this.spriteFaceEyesP1.scale.y = scale;
            this.spriteFaceEyesP1.zIndex = 1003;
        }

        img = Game.scoreStatePlayer1.getNoseImg();

        if (img != null) {

            this.spriteFaceNoseP1 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
            this.spriteFaceNoseP1.x = facex;
            this.spriteFaceNoseP1.y = facey;
            this.spriteFaceNoseP1.scale.x = scale;
            this.spriteFaceNoseP1.scale.y = scale;
            this.spriteFaceNoseP1.zIndex = 1005;
        }

        if (Game.twoPlayerGame) {

            facex = 897+30;

            //  Player 2

            this.spriteFaceBackgroundP2 = new PIXI.Sprite(PIXI.Loader.shared.resources["face-background-p2"].texture);
            this.spriteFaceBackgroundP2.x = facex;
            this.spriteFaceBackgroundP2.y = facey;
            this.spriteFaceBackgroundP2.scale.x = scale;
            this.spriteFaceBackgroundP2.scale.y = scale;
            this.spriteFaceBackgroundP2.zIndex = 1000;

            let img = Game.scoreStatePlayer2.getMoustacheImg();

            if (img != null) {

                this.spriteFaceMoustaceP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
                this.spriteFaceMoustaceP2.x = facex;
                this.spriteFaceMoustaceP2.y = facey;
                this.spriteFaceMoustaceP2.scale.x = scale;
                this.spriteFaceMoustaceP2.scale.y = scale;
                this.spriteFaceMoustaceP2.zIndex = 1004;
            }

            img = Game.scoreStatePlayer2.getNeckImg();

            if (img != null) {

                this.spriteFaceNeckP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
                this.spriteFaceNeckP2.x = facex;
                this.spriteFaceNeckP2.y = facey;
                this.spriteFaceNeckP2.scale.x = scale;
                this.spriteFaceNeckP2.scale.y = scale;
                this.spriteFaceNeckP2.zIndex = 1001;
            }

            img = Game.scoreStatePlayer2.getJawImg();

            if (img != null) {

                this.spriteFaceJawP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
                this.spriteFaceJawP2.x = facex;
                this.spriteFaceJawP2.y = facey;
                this.spriteFaceJawP2.scale.x = scale;
                this.spriteFaceJawP2.scale.y = scale;
                this.spriteFaceJawP2.zIndex = 1002;
            }

            img = Game.scoreStatePlayer2.getEyesImg();

            if (img != null) {

                this.spriteFaceEyesP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
                this.spriteFaceEyesP2.x = facex;
                this.spriteFaceEyesP2.y = facey;
                this.spriteFaceEyesP2.scale.x = scale;
                this.spriteFaceEyesP2.scale.y = scale;
                this.spriteFaceEyesP2.zIndex = 1003;
            }

            img = Game.scoreStatePlayer2.getNoseImg();

            if (img != null) {

                this.spriteFaceNoseP2 = new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture);
                this.spriteFaceNoseP2.x = facex;
                this.spriteFaceNoseP2.y = facey;
                this.spriteFaceNoseP2.scale.x = scale;
                this.spriteFaceNoseP2.scale.y = scale;
                this.spriteFaceNoseP2.zIndex = 1005;
            }
        }
    }

    public onEnter(): void {

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
    }

    public onExit(): void {

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
    }

    public update(elapsedTime: number): void {

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
    }
}