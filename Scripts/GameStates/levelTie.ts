class LevelTie extends GameState {

    public background: PIXI.Sprite;

    private scoreCounter: ScoreCounter;

    private totalElapsedTime: number;

    private points: PIXI.Point[];
    private rope: PIXI.SimpleRope;

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelTie";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-tie-background"].texture);
        this.background.x = xOffset;
        this.background.y = 0;

        this.points = [];

        let baseX = xOffset + this.background.width / 2;
        let baseY = 130;
        let steps = 20;

        for (let n = 0; n < steps; n++) {

            this.points.push(new PIXI.Point(0, baseY + n * (1080 - baseY) / steps));
        };

        let texture = PIXI.Loader.shared.resources["tie-rope"].texture;
        texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

        this.rope = new PIXI.SimpleRope(texture, this.points, 1);

        this.rope.x = baseX;

        this.rope.width = 60;
    }

    public onEnter(): void {

        this.scoreCounter.onEnter();

        Game.app.stage.addChild(this.background);

        Game.app.stage.addChild(this.rope);

        this.totalElapsedTime = 0;

        Game.sceneTransition.startShrinking();

        Game.soundPlayer.musicTie.play();
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.background);

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



        this.scoreCounter.update(elapsedTime);

    }

    private updateRope(elapsedTime: number) {

        let ropeSpeed = 300;
        let ropeInertia = 150;

        //  Control the rope by changing it last link

        this.points[this.points.length - 1].x = 400 * Math.sin(Math.PI * 2 * this.totalElapsedTime / 3000);

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
}