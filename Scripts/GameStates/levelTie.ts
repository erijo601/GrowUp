class LevelTie extends GameState {

    public background: PIXI.Sprite;
    public neck: PIXI.Sprite;

    private scoreCounter: ScoreCounter;

    private totalElapsedTime: number;
    private totalTimeScore: number;
    private gameEndsOnTime: number = 86000;
    private stranglePart: number;

    private points: PIXI.Point[];
    private rope: PIXI.SimpleRope;

    private ropeSpeed: number;
    private ropeTargetX: number;

    private baseX: number;  //  I mitten av spelplanen, där slipsen hänger

    private isStrangle: boolean;

    private pressEnter: PIXI.Sprite;
    private tieLoop: PIXI.Sprite;
    private tieLoopBack: PIXI.Sprite;
    private arm: PIXI.Sprite;
    private hand: PIXI.Sprite;
    private mini: PIXI.Sprite;
    private betweenFrame: number;
    private betweenFrameDirection: number;
    private loopWidth: number = 310 * 1.2;

    private timeLeftHandFrame: number;
    private handFrame: number;
    private handFrameDirection: number;

    private timeLeftMiniFrame: number;
    private miniFrame: number;
    private miniFrameDirection: number;

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelTie";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-background"].texture);
        this.background.x = xOffset + 100;
        this.background.y = 0;

        this.neck = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-neck"].texture);
        this.neck.x = xOffset + 180 + 100;
        this.neck.y = 0;

        this.tieLoop = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-loop-front"].texture);
        this.tieLoop.pivot.x = 190;
        this.tieLoop.pivot.y = 53;
        this.tieLoop.scale.x = 1.2;
        this.tieLoop.zIndex = 11;

        this.tieLoopBack = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-loop-back"].texture);
        this.tieLoopBack.pivot.x = 190;
        this.tieLoopBack.pivot.y = 53;
        this.tieLoopBack.scale.x = 1.2;
        this.tieLoopBack.zIndex = 9;

        this.points = [];

        this.baseX = xOffset + 388 + 100;
        let baseY = 370;
        let steps = 20;

        for (let n = 0; n < steps; n++) {

            this.points.push(new PIXI.Point(0, baseY + n * 760 / steps));
        };

        let texture = PIXI.Loader.shared.resources["tie-rope"].texture;
        texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        this.rope = new PIXI.SimpleRope(texture, this.points, 1);
        this.rope.zIndex = 10;
        this.rope.x = this.baseX;
        this.rope.width = 60;

        this.tieLoop.x = this.baseX;
        this.tieLoop.y = this.points[9].y;

        this.tieLoopBack.x = this.baseX;
        this.tieLoopBack.y = this.points[9].y;

        this.arm = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-arm"].texture);
        this.arm.zIndex = 12;
        this.arm.x = this.tieLoop.x - 700 - 189;
        this.arm.y = this.tieLoop.y - 100;

        this.timeLeftHandFrame = 150;
        this.handFrame = 0;
        this.handFrameDirection = 1;

        this.timeLeftMiniFrame = 150;
        this.miniFrame = 0;
        this.miniFrameDirection = 1;

        this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-hand" + this.handFrame].texture);
        this.hand.zIndex = 12;
        this.hand.x = this.arm.x + 440 ;
        this.hand.y = this.arm.y;

        this.mini = new PIXI.Sprite(PIXI.Loader.shared.resources["p" + this.player + "-mini-tie" + this.miniFrame].texture);
        this.mini.zIndex = 13;
        this.mini.x = this.xOffset + 130;
        this.mini.y = 170;

        if (this.player == 2) {

            this.arm.scale.x = -1;  //  Mirror
            this.hand.scale.x = -1;

            this.mini.x = 1920 - 549 + 150;
        }

        if (this.player == 1) {

            this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            this.pressEnter.x = 858 + 80;
            this.pressEnter.y = 842 + 100;
            this.pressEnter.pivot.x = this.pressEnter.width / 2;
            this.pressEnter.pivot.y = this.pressEnter.height / 2;
            this.pressEnter.zIndex = 1000;
            this.pressEnter.visible = false;
        }

        this.updateHand(0);
    }

    public onEnter(): void {

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

        Game.soundPlayer.musicTie.play();
    }

    public onExit(): void {

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
    }

    public update(elapsedTime: number): void {

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
    }

    private setRopeSpeed() {

        let partLevelDone = this.totalElapsedTime / this.gameEndsOnTime;

        if (partLevelDone > 0.75) {

            partLevelDone = 1;
        }

        let minSpeed = Math.floor(300 + 700 * partLevelDone);
        let maxSpeed = Math.floor(500 + 700 * partLevelDone);

        this.ropeSpeed = MathHelper.randomInt(minSpeed, maxSpeed);

        if (this.ropeTargetX < 0) {

            this.ropeTargetX = MathHelper.randomInt(100, 650);
        }
        else {

            this.ropeTargetX = MathHelper.randomInt(-650, -100);
        }
    }

    private updateRope(elapsedTime: number) {

        let ropeInertia = 100;

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

        for (let n = 1; n < this.points.length - 1; n++) {

            let currentPoint = this.points[n];
            let nextPoint = this.points[n + 1];

            let delta = nextPoint.x - currentPoint.x;

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
    }

    private checkCollision(elapsedTime: number) {

        let tieX = this.baseX + this.points[9].x;
        let ropeWidth = 60;

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

            let newScore = Math.floor(100 * this.totalTimeScore / this.gameEndsOnTime);

            if (newScore > this.scoreCounter.getDesiredScore()) {

                this.scoreCounter.setNewScore(newScore, 100);
            }

            this.stranglePart -= elapsedTime / 3000;

            let speed = 700;

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

        let r;
        let g;
        let b;

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
    }

    public updateHand(elapsedTime: number) {

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
    }

    public updateMini(elapsedTime: number) {

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
    }
}