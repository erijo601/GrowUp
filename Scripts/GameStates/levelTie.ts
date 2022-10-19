class LevelTie extends GameState {

    public background: PIXI.Sprite;
    public neck: PIXI.Sprite;

    private scoreCounter: ScoreCounter;

    private totalElapsedTime: number;

    private points: PIXI.Point[];
    private rope: PIXI.SimpleRope;

    private baseX: number;  //  I mitten av spelplanen, där slipsen hänger

    private tieLoop: PIXI.Sprite;
    private tieLoopBack: PIXI.Sprite;
    private arm: PIXI.Sprite;
    private hand: PIXI.Sprite;
    private loopWidth: number = 310*1.2;

    private timeLeftHandFrame: number;
    private handFrame: number;
    private handFrameDirection: number;

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelTie";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-background"].texture);
        this.background.x = xOffset;
        this.background.y = 0;

        this.neck = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-neck"].texture);
        this.neck.x = xOffset + 180;
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

        this.baseX = xOffset + 388;
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

        this.hand = new PIXI.Sprite(PIXI.Loader.shared.resources["tie-hand" + this.handFrame].texture);
        this.hand.zIndex = 12;
        this.hand.x = this.arm.x + 440 ;
        this.hand.y = this.arm.y;

        if (player == 2) {

            this.arm.scale.x = -1;  //  Mirror
            this.hand.scale.x = -1;
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

        this.totalElapsedTime = 0;

        this.timeLeftHandFrame = 150;

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

        this.scoreCounter.onExit();

        Game.soundPlayer.musicTie.stop();

        if (this.player == 1) {

            Game.scoreStatePlayer1.beforeOnEnter(Level.Tie, this.scoreCounter.getScore());

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
    }

    public update(elapsedTime: number): void {

        // elapsedTime in ms

        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {

            Game.sceneTransition.update(elapsedTime);

            if (Game.sceneTransition.isDone()) {

                //Game.soundPlayer.musicTie.play();
                Game.intro.startLevelTie();
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

        this.updateRope(elapsedTime);

        this.checkCollision(elapsedTime);

        this.updateHand(elapsedTime);

        this.scoreCounter.update(elapsedTime);
    }

    private updateRope(elapsedTime: number) {

        let ropeSpeed = 300;
        let ropeInertia = 100;

        //  Control the rope by changing it last link

        //  TODO: Kör mer random (med ökande svårighetsgrad) på hur repet rör sig. Eller i takt med musiken om det går. 

        this.points[this.points.length - 1].x = 600 * Math.sin(Math.PI * 2 * this.totalElapsedTime / 3000);

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

            this.tieLoop.x = tieX - ropeWidth + this.loopWidth / 2;
            this.tieLoopBack.x = this.tieLoop.x;
        }
        else if (tieX + ropeWidth > this.tieLoop.x + this.loopWidth / 2) {

            //  Collision right!

            this.tieLoop.x = tieX + ropeWidth - this.loopWidth / 2;
            this.tieLoopBack.x = this.tieLoop.x;
        }
        else {

            //  No collision

            let speed = 700;

            if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {

                this.tieLoop.x += speed * elapsedTime / 1000;
                this.tieLoopBack.x = this.tieLoop.x;
            }

            if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {

                this.tieLoop.x -= speed * elapsedTime / 1000;
                this.tieLoopBack.x = this.tieLoop.x;
            }
        }        
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
}