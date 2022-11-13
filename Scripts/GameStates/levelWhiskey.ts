﻿class LevelWhiskey extends GameState {

    public background: PIXI.Sprite;
    public fire: PIXI.Sprite;

    private scoreCounter: ScoreCounter;

    private world: PIXI.Sprite;
    private renderTexture: PIXI.RenderTexture;

    private totalElapsedTime: number;
    private gameEndsOnTime: number = 86000;

    private timeLeftCurrentFireFrame: number;
    private currentFireFrame: number;
    private hitSwirl: boolean;

    private maxSwirlScore: number;
    private swirlScore: number;
    private currentSwirlImg: number;

    private glas: PIXI.Sprite;
    private swirl: PIXI.Sprite;
    private mouth: PIXI.Sprite;
    private pressEnter: PIXI.Sprite;
    private instructionsLeft: PIXI.Sprite;
    private instructionsRight: PIXI.Sprite;
    private instructionsDown: PIXI.Sprite;
    private arm: PIXI.Sprite;
    private hand: PIXI.Sprite;

    private swirlSpeed: number; //  Angles per second

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelWhiskey";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-background"].texture);
        this.background.x = 0;
        this.background.y = 0;
        this.background.zIndex = 98;

        this.glas = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-glas"].texture);
        this.glas.x = 80;
        this.glas.y = 286;
        this.glas.zIndex = 200;

        this.swirl = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-swirl0"].texture);
        this.swirl.pivot.x = 54;
        this.swirl.pivot.y = 30;
        this.swirl.x = this.glas.x + 123;
        this.swirl.y = this.glas.y + 123;
        this.swirl.zIndex = 201;

        this.mouth = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-mouth0-p" + this.player].texture);
        this.mouth.pivot.x = this.mouth.width / 2;
        this.mouth.pivot.y = 0;
        this.mouth.x = this.glas.x + 123;
        this.mouth.y = this.glas.y - this.mouth.height;
        this.mouth.zIndex = 199;

        this.fire = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-fire0"].texture);
        this.fire.x = this.background.x + 322;
        this.fire.y = this.background.y + 231;
        this.fire.zIndex = 99;

        this.instructionsLeft = new PIXI.Sprite(PIXI.Loader.shared.resources["keyleft-p" + player].texture);
        this.instructionsLeft.x = xOffset + 80 - 28 - this.instructionsLeft.width;
        this.instructionsLeft.y = 65 + 286 + 248 / 2 - this.instructionsLeft.height / 2;
        this.instructionsLeft.zIndex = 1000;
        this.instructionsLeft.visible = false;

        this.instructionsRight = new PIXI.Sprite(PIXI.Loader.shared.resources["keyleft-p" + player].texture);
        this.instructionsRight.x = xOffset + 80 + this.glas.width + 28;
        this.instructionsRight.y = 65 + 286 + 248 / 2 - this.instructionsRight.height / 2;
        this.instructionsRight.zIndex = 1000;
        this.instructionsRight.visible = false;

        this.instructionsDown = new PIXI.Sprite(PIXI.Loader.shared.resources["keydown-p" + player].texture);
        this.instructionsDown.pivot.x = this.instructionsDown.width / 2;
        this.instructionsDown.x = xOffset + 80 - 3 + this.glas.width / 2;
        this.instructionsDown.y = 65 + 286 - 92 - this.instructionsDown.height - 8;
        this.instructionsDown.zIndex = 1000;
        this.instructionsDown.visible = false;

        this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-hand0"].texture);
        this.hand.x = 487
        this.hand.y = 430;

        this.arm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-arm-p" + this.player].texture);
        this.arm.x = this.hand.x + this.hand.width;
        this.arm.y = this.hand.y;

        if (this.player == 1) {

            this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            this.pressEnter.x = 858 + 80;
            this.pressEnter.y = 842 + 100;
            this.pressEnter.pivot.x = this.pressEnter.width / 2;
            this.pressEnter.pivot.y = this.pressEnter.height / 2;
            this.pressEnter.zIndex = 1000;
            this.pressEnter.visible = false;
        }

        this.renderTexture = PIXI.RenderTexture.create({ width: 950, height: 950 });
        this.world = new PIXI.Sprite(this.renderTexture);
        this.world.x = xOffset;
        this.world.y = 65;
    }

    public onEnter(): void {

        this.timeLeftCurrentFireFrame = MathHelper.randomInt(50, 100);
        this.currentFireFrame = MathHelper.randomInt(0, 3);

        this.scoreCounter.onEnter();

        Game.app.stage.addChild(this.world);
        Game.app.stage.addChild(this.instructionsLeft);
        Game.app.stage.addChild(this.instructionsRight);
        Game.app.stage.addChild(this.instructionsDown);

        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = true;
        this.instructionsDown.visible = false;
        this.mouth.visible = false;

        this.totalElapsedTime = 0;

        if (this.player == 1) {

            this.pressEnter.visible = false;

            Game.app.stage.addChild(this.pressEnter);
        }

        Game.sceneTransition.startShrinking();

        Game.soundPlayer.musicWhiskey.play();

        this.renderWorld();

        this.swirlSpeed = 120;
        this.maxSwirlScore = 5;
        this.swirlScore = 0;
        this.currentSwirlImg = 0;
        this.hitSwirl = false;
        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = false;
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.background);

        this.scoreCounter.onExit();

        Game.soundPlayer.musicWhiskey.stop();

        if (this.player == 1) {

            Game.app.stage.removeChild(this.pressEnter);

            Game.scoreStatePlayer1.beforeOnEnter(Level.Whiskey, this.scoreCounter.getScore());

            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();

            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {

                Game.currentStatePlayer2.onExit();
            }
        }
        else {

            Game.scoreStatePlayer2.beforeOnEnter(Level.Whiskey, this.scoreCounter.getScore());

            Game.currentStatePlayer2 = Game.scoreStatePlayer2;
            Game.currentStatePlayer2.onEnter();

            if (Game.twoPlayerGame && Game.currentStatePlayer1.stateName == this.stateName) {

                Game.currentStatePlayer1.onExit();
            }
        }

        Game.app.stage.removeChild(this.world);
        Game.app.stage.removeChild(this.instructionsLeft);
        Game.app.stage.removeChild(this.instructionsRight);
    }

    public update(elapsedTime: number): void {

        // elapsedTime in ms

        this.timeLeftCurrentFireFrame -= elapsedTime;

        if (this.timeLeftCurrentFireFrame <= 0) {

            this.timeLeftCurrentFireFrame = 100;
            this.currentFireFrame++;

            if (this.currentFireFrame > 3) {

                this.currentFireFrame = 0;
            }

            this.fire.texture = PIXI.Loader.shared.resources["level-whiskey-fire" + this.currentFireFrame].texture;
        }

        this.updateGlas(elapsedTime);

        this.renderWorld();

        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {

            Game.sceneTransition.update(elapsedTime);

            if (Game.sceneTransition.isDone()) {

                Game.intro.startLevelWhiskey();
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
    }

    private updateGlas(elapsedTime: number): void {

        let lastAngle = this.swirl.angle;

        this.swirl.angle += this.swirlSpeed * elapsedTime / 1000;

        if (this.swirl.angle >= 360) {

            this.swirl.angle -= 360;
        }

        if (Math.abs(this.swirl.angle - 180) <= 15) {

            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth2-p" + this.player].texture;
        }
        else if (Math.abs(this.swirl.angle - 180) <= 30) {

            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth1-p" + this.player].texture;
        }
        else {

            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth0-p" + this.player].texture;
        }

        if (this.swirlScore == this.maxSwirlScore) {

            //  TODO: Check down key for score or miss


            //  När man trycker s, flytta glas/swirl upp 10 pixlar, stanna upp glaset/swirl-animationen en stund och animera stora huvudet
        }
        else {

            if (lastAngle < 90 && this.swirl.angle >= 90) {

                this.hitSwirl = false;
                this.instructionsLeft.visible = false;
                this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                this.instructionsRight.visible = true;

                this.glas.x = 80;
                this.swirl.x = this.glas.x + 123;
            }
            else if (lastAngle < 270 && this.swirl.angle >= 270) {

                this.hitSwirl = false;
                this.instructionsRight.visible = false;
                this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-p" + this.player].texture;
                this.instructionsLeft.visible = true;

                this.glas.x = 80;
                this.swirl.x = this.glas.x + 123;
            }
        }

        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.last.isPressed(this.leftKey) &&
            this.instructionsLeft.visible) {

            if (this.swirlScore < this.maxSwirlScore) {

                this.swirlScore++;
                let swirlImg = 0;

                this.glas.x = 80 - 10;
                this.swirl.x = this.glas.x + 123;

                if (this.swirlScore == this.maxSwirlScore) {

                    //  TODO: Rör det stora ansiktet mot glaset

                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;
                    this.instructionsDown.visible = true;

                    this.mouth.visible = true;
                    swirlImg = 4;
                }
                else {

                    this.swirlSpeed += 60;
                    swirlImg = Math.ceil(this.swirlScore / this.maxSwirlScore * 3);
                }

                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl" + swirlImg].texture;
            }

            this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-pressed-p" + this.player].texture;
        }
        else if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.last.isPressed(this.rightKey) &&
            this.instructionsRight.visible) {

            if (this.swirlScore < this.maxSwirlScore) {

                this.swirlScore++;
                let swirlImg = 0;

                this.glas.x = 80 + 10;
                this.swirl.x = this.glas.x + 123;

                if (this.swirlScore == this.maxSwirlScore) {

                    //  TODO: Rör det stora ansiktet mot glaset

                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;
                    this.instructionsDown.visible = true;

                    this.mouth.visible = true;
                    swirlImg = 4;
                }
                else {

                    this.swirlSpeed += 60;
                    swirlImg = Math.ceil(this.swirlScore / this.maxSwirlScore * 3);
                }

                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl" + swirlImg].texture;
            }

            this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-pressed-p" + this.player].texture;
        }

        if (this.glas.x > 80) {

            this.glas.x -= 50 * elapsedTime / 1000;

            if (this.glas.x < 80) {

                this.glas.x = 80;
            }

            this.swirl.x = this.glas.x + 123;
        }
        else if (this.glas.x < 80) {

            this.glas.x += 50 * elapsedTime / 1000;

            if (this.glas.x > 80) {

                this.glas.x = 80;
            }

            this.swirl.x = this.glas.x + 123;
        }
    }

    private renderWorld(): void {

        Game.app.renderer.render(this.background, this.renderTexture, true);
        Game.app.renderer.render(this.fire, this.renderTexture, false);
        Game.app.renderer.render(this.hand, this.renderTexture, false);
        Game.app.renderer.render(this.arm, this.renderTexture, false);
        Game.app.renderer.render(this.mouth, this.renderTexture, false);
        Game.app.renderer.render(this.glas, this.renderTexture, false);
        Game.app.renderer.render(this.swirl, this.renderTexture, false);
    }
}