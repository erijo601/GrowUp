class LevelHat extends GameState {

    public background: PIXI.Sprite;

    private scoreCounter: ScoreCounter;

    private totalElapsedTime: number;
    private gameEndsOnTime: number = 92500;

    private pressEnter: PIXI.Sprite;

    private playerTorso: PIXI.Sprite;
    private playerLegs: PIXI.Sprite;
    private playerHair: PIXI.Sprite;

    private xPos: number;
    private xSpeed: number;

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelHat";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-background"].texture);
        this.background.x = xOffset;
        this.background.y = 165;

        if (this.player == 1) {

            this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            this.pressEnter.x = 858 + 80;
            this.pressEnter.y = 842 + 100;
            this.pressEnter.pivot.x = this.pressEnter.width / 2;
            this.pressEnter.pivot.y = this.pressEnter.height / 2;
            this.pressEnter.zIndex = 1000;
            this.pressEnter.visible = false;
        }

        this.playerLegs = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-legs0"].texture);
        this.playerLegs.y = this.background.y + 400;
        this.playerLegs.zIndex = 100;

        this.playerTorso = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-idle0"].texture);
        this.playerTorso.y = this.background.y + 152;
        this.playerTorso.zIndex = 101;        

        this.playerHair = new PIXI.Sprite(PIXI.Loader.shared.resources["level-hat-hair-p" + this.player].texture);
        this.playerHair.y = this.background.y + 251;
        this.playerHair.zIndex = 102;
    }

    public onEnter(): void {

        this.scoreCounter.onEnter();

        Game.app.stage.addChild(this.background);
        Game.app.stage.addChild(this.playerLegs);
        Game.app.stage.addChild(this.playerTorso);
        Game.app.stage.addChild(this.playerHair);

        this.totalElapsedTime = 0;

        if (this.player == 1) {

            this.pressEnter.visible = false;

            Game.app.stage.addChild(this.pressEnter);
        }

        this.xPos = 960 / 2;
        this.xSpeed = 0;

        this.updatePlayerSprites();

        Game.sceneTransition.startShrinking();
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.background);
        Game.app.stage.removeChild(this.playerLegs);
        Game.app.stage.removeChild(this.playerTorso);
        Game.app.stage.removeChild(this.playerHair);

        this.scoreCounter.onExit();

        Game.soundPlayer.musicHat.stop();

        if (this.player == 1) {

            Game.app.stage.removeChild(this.pressEnter);

            Game.scoreStatePlayer1.beforeOnEnter(Level.Hat, this.scoreCounter.getScore());

            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();

            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {

                Game.currentStatePlayer2.onExit();
            }
        }
        else {

            Game.scoreStatePlayer2.beforeOnEnter(Level.Hat, this.scoreCounter.getScore());

            Game.currentStatePlayer2 = Game.scoreStatePlayer2;
            Game.currentStatePlayer2.onEnter();

            if (Game.twoPlayerGame && Game.currentStatePlayer1.stateName == this.stateName) {

                Game.currentStatePlayer1.onExit();
            }
        }
    }

    public update(elapsedTime: number): void {

        // elapsedTime in ms

        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {

            Game.sceneTransition.update(elapsedTime);

            if (Game.sceneTransition.isDone()) {

                Game.intro.startLevelHat();
                Game.soundPlayer.musicHat.play();
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

        this.movePlayer(elapsedTime);








    }

    private movePlayer(elapsedTime: number) {

        let maxSpeed = 300;
        let accTime = 2000; //  Tid det tar från 0 till max acc
        let acc = maxSpeed * 1000 / accTime;

        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {

            this.xSpeed -= acc * elapsedTime / 1000;
        }

        if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {

            this.xSpeed += acc * elapsedTime / 1000;
        }

        if (this.xSpeed < -maxSpeed) {

            this.xSpeed = -maxSpeed;
        }
        else if (this.xSpeed > maxSpeed) {

            this.xSpeed = maxSpeed;
        }

        this.xPos += this.xSpeed * elapsedTime / 1000;

        if (this.xPos < this.xOffset + 187 - 158) {

            this.xPos = this.xOffset + 187 - 158;
            this.xSpeed = 0;
        }
        else if (this.xPos > this.xOffset + 960 - 187 + 158) {

            this.xPos = this.xOffset + 960 - 187 + 158;
            this.xSpeed = 0;
        }

        this.updatePlayerSprites();
    }

    private updatePlayerSprites() {

        this.playerLegs.x = this.xPos - 187;
        this.playerTorso.x = this.xPos - 187;
        this.playerHair.x = this.xPos - 187;



    }
}