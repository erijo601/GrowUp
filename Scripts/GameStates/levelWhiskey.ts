class LevelWhiskey extends GameState {

    public background: PIXI.Sprite;
    public fire: PIXI.Sprite;

    private scoreCounter: ScoreCounter;

    private world: PIXI.Sprite;
    private renderTexture: PIXI.RenderTexture;

    private totalElapsedTime: number;

    private timeLeftCurrentFireFrame: number;
    private currentFireFrame: number;

    private maxSwirlScore: number;
    private swirlScore: number;

    private glas: PIXI.Sprite;
    private swirl: PIXI.Sprite;
    private mouth: PIXI.Sprite;
    private pressEnter: PIXI.Sprite;
    private instructionsLeft: PIXI.Sprite;
    private instructionsRight: PIXI.Sprite;
    private instructionsUp: PIXI.Sprite;
    private arm: PIXI.Sprite;
    private hand: PIXI.Sprite;
    private face: PIXI.Sprite;
    private splash: PIXI.Sprite;
    private throat: PIXI.Sprite;

    private timeLeftDrinking: number;
    private timeLeftSplashing: number;

    private faceAimTimeElapsed: number;

    private swirlSpeed: number; //  Angles per second
    private totalTimeDrink: number = 1000;
    private totalTimeSplash: number = 500;

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

        this.instructionsUp = new PIXI.Sprite(PIXI.Loader.shared.resources["keyup-p" + player].texture);
        this.instructionsUp.pivot.x = this.instructionsUp.width / 2;
        this.instructionsUp.x = xOffset + 80 - 3 + this.glas.width / 2;
        this.instructionsUp.y = 65 + 286 - 92 - this.instructionsUp.height - 8;
        this.instructionsUp.zIndex = 1000;
        this.instructionsUp.visible = false;

        this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-hand0"].texture);
        this.hand.x = 487
        this.hand.y = 400;

        this.arm = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-arm-p" + this.player].texture);
        this.arm.x = this.hand.x + this.hand.width;
        this.arm.y = this.hand.y;

        this.face = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-face-p" + this.player].texture);
        this.face.x = 950;
        this.face.y = 54;
        this.face.visible = false;

        this.splash = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-splash0"].texture);
        this.splash.x = 950;
        this.splash.y = 99;
        this.splash.visible = false;

        this.throat = new PIXI.Sprite(PIXI.Loader.shared.resources["level-whiskey-throat"].texture);
        this.throat.x = 950;
        this.throat.y = 99;
        this.throat.visible = false;

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
        Game.app.stage.addChild(this.instructionsUp);

        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = true;
        this.instructionsUp.visible = false;
        this.mouth.visible = false;

        this.totalElapsedTime = 0;

        if (this.player == 1) {

            this.pressEnter.visible = false;

            Game.app.stage.addChild(this.pressEnter);
        }

        Game.sceneTransition.startShrinking();

        Game.soundPlayer.musicWhiskey.play();

        this.renderWorld();

        this.swirlSpeed = 160;
        this.maxSwirlScore = 5;
        this.swirlScore = 0;
        this.instructionsLeft.visible = true;
        this.instructionsRight.visible = false;
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.world);
        Game.app.stage.removeChild(this.instructionsLeft);
        Game.app.stage.removeChild(this.instructionsRight);
        Game.app.stage.removeChild(this.instructionsUp);

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

        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {

            if (this.player == 1) {

                Game.sceneTransition.update(elapsedTime);
            }

            if (Game.sceneTransition.isDone()) {

                Game.intro.startLevelWhiskey();
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

        let musicTime: any;

        if (Game.soundPlayer.musicWhiskey.playing() == false) {

            musicTime = 79;
        }
        else {

            musicTime = Game.soundPlayer.musicOffice.seek();
        }

        if (musicTime > 76) { 

            if (this.player == 1) {

                this.pressEnter.visible = true;

                if (musicTime < 76.3) {

                    this.pressEnter.alpha = (musicTime - 76) / 0.3;
                }
                else {

                    this.pressEnter.alpha = 1;
                }

                this.pressEnter.scale.x = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
                this.pressEnter.scale.y = 1 - 0.03 * Math.cos(2 * Math.PI * this.totalElapsedTime / 2000);
            }

            if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter') &&
                !Game.sceneTransition.isGrowing) {

                Game.sceneTransition.startGrowing();
            }

            this.renderWorld();

            return;
        }

        this.updateGlas(elapsedTime);

        this.renderWorld();
    }

    private updateGlas(elapsedTime: number): void {

        if (this.timeLeftDrinking > 0) {

            this.timeLeftDrinking -= elapsedTime;

            if (this.timeLeftDrinking <= 0) {

                this.scoreCounter.setNewScore(this.scoreCounter.getDesiredScore() + 10, 100);
                this.swirlScore = 0;
                this.maxSwirlScore += 2;
                this.throat.visible = false;
                this.mouth.visible = false;
                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl0"].texture;

                if (this.swirl.angle >= 90 && this.swirl.angle < 270) {

                    this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                    this.instructionsRight.visible = true;
                }
                else {

                    this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-p" + this.player].texture;
                    this.instructionsLeft.visible = true;
                }
            }
            else {

                let part = this.timeLeftDrinking / this.totalTimeDrink;

                if (part > 2 / 3) {

                    part = (part - 2 / 3) * 3;
                }
                else if (part > 1 / 3) {

                    part = (part - 1 / 3) * 3;
                }
                else {

                    part = part * 3;
                }                

                this.throat.visible = true;
                this.throat.x = this.face.x + 320 - 50 * part;
                this.throat.y = this.face.y + 245 + 16 * Math.sin(Math.PI * part);
            }

            return;
        }
        else if (this.timeLeftSplashing > 0) {

            this.timeLeftSplashing -= elapsedTime;

            if (this.timeLeftSplashing <= 0) {

                this.swirlScore = 0;
                this.splash.visible = false;
                this.mouth.visible = false;
                this.swirl.texture = PIXI.Loader.shared.resources["level-whiskey-swirl0"].texture;

                if (this.swirl.angle >= 90 && this.swirl.angle < 270) {

                    this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                    this.instructionsRight.visible = true;
                }
                else {

                    this.instructionsLeft.texture = PIXI.Loader.shared.resources["keyleft-p" + this.player].texture;
                    this.instructionsLeft.visible = true;
                }
            }
            else {

                this.splash.visible = true;

                let img = 3 - Math.floor(4 * this.timeLeftSplashing / this.totalTimeSplash);

                if (img < 0) {

                    //  Borde aldrig hända, men det vore tråkigt om allt kraschar pga några sjuka javascript-avrundningar
                    img = 0;
                }

                this.splash.texture = PIXI.Loader.shared.resources["level-whiskey-splash" + img].texture;
            }

            return;
        }

        let lastAngle = this.swirl.angle;

        this.swirl.angle += this.swirlSpeed * elapsedTime / 1000;

        if (this.swirl.angle >= 360) {

            this.swirl.angle -= 360;
        }

        let angle = Math.abs(this.swirl.angle - 180);

        if (angle <= 15) {

            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth2-p" + this.player].texture;
        }
        else if (angle <= 30) {

            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth1-p" + this.player].texture;
        }
        else {

            this.mouth.texture = PIXI.Loader.shared.resources["level-whiskey-mouth0-p" + this.player].texture;
        }

        let hand = 4 - Math.floor(angle / (180 / 5));

        this.hand.texture = PIXI.Loader.shared.resources["level-whiskey-hand" + hand].texture;

        if (this.swirlScore == this.maxSwirlScore) {

            if (Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.last.isPressed(this.upKey) &&
                this.instructionsUp.visible) {

                this.instructionsUp.visible = false;
                this.face.y = 88;
                this.swirlSpeed = 120;

                if (angle <= 17) {

                    this.timeLeftDrinking = this.totalTimeDrink;
                }
                else {

                    this.timeLeftSplashing = this.totalTimeSplash;
                    this.face.texture = PIXI.Loader.shared.resources["level-whiskey-face-splash-p" + this.player].texture;
                    this.splash.x = 413-20;
                    this.splash.y = 30;
                }

                return;
            }

            if (this.face.x > 520) {

                this.face.x -= elapsedTime * 800 / 1000;

                if (this.face.x <= 520) {

                    this.face.x = 520;
                    this.faceAimTimeElapsed = 0;
                    this.instructionsUp.visible = true;
                }
            }
            else {

                this.faceAimTimeElapsed += elapsedTime;

                if (this.faceAimTimeElapsed > 1000) {

                    this.faceAimTimeElapsed -= 1000;
                }

                this.face.y = 59 - (5 * Math.cos(2 * Math.PI * this.faceAimTimeElapsed / 1000));
            }
        }
        else {

            if (this.face.visible) {

                this.face.x += elapsedTime * 800 / 1000;

                if (this.face.x >= 950) {

                    this.face.x = 950;
                    this.face.visible = false;
                }
            }

            if (lastAngle < 90 && this.swirl.angle >= 90) {

                this.instructionsLeft.visible = false;
                this.instructionsRight.texture = PIXI.Loader.shared.resources["keyright-p" + this.player].texture;
                this.instructionsRight.visible = true;

                this.glas.x = 80;
                this.swirl.x = this.glas.x + 123;
            }
            else if (lastAngle < 270 && this.swirl.angle >= 270) {

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

                this.glas.x = 80 - 20;
                this.swirl.x = this.glas.x + 123;

                if (this.swirlScore == this.maxSwirlScore) {

                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;

                    this.face.texture = PIXI.Loader.shared.resources["level-whiskey-face-p" + this.player].texture;
                    this.face.visible = true;
                    this.face.x = 950;
                    this.face.y = 54;
                    this.mouth.visible = true;
                    swirlImg = 4;
                }
                else {

                    this.swirlSpeed += 50;

                    if (this.swirlSpeed > 700) {

                        this.swirlSpeed = 700;
                    }

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

                this.glas.x = 80 + 20;
                this.swirl.x = this.glas.x + 123;

                if (this.swirlScore == this.maxSwirlScore) {

                    this.instructionsLeft.visible = false;
                    this.instructionsRight.visible = false;

                    this.face.texture = PIXI.Loader.shared.resources["level-whiskey-face-p" + this.player].texture;
                    this.face.visible = true;
                    this.face.x = 950;
                    this.face.y = 54;
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
        Game.app.renderer.render(this.throat, this.renderTexture, false);
        Game.app.renderer.render(this.face, this.renderTexture, false);
        Game.app.renderer.render(this.splash, this.renderTexture, false);
        Game.app.renderer.render(this.glas, this.renderTexture, false);
        Game.app.renderer.render(this.swirl, this.renderTexture, false);
    }
}