class LevelOffice extends GameState {

    private scoreCounter: ScoreCounter;
    private cutscene: Cutscene;

    private totalElapsedTime: number;

    private playerSprite: PIXI.Sprite;
    private playerLegsSprite: PIXI.Sprite;
    private pressEnter: PIXI.Sprite;

    private otherPlayerSprite: PIXI.Sprite;
    private otherPlayerLegsSprite: PIXI.Sprite;
    private otherPlayerWorldPosition: Position;

    private world: PIXI.Sprite;
    private renderTexture: PIXI.RenderTexture;

    private floor: PIXI.Graphics;

    private directionUpSprite: PIXI.Sprite;
    private directionDownSprite: PIXI.Sprite;
    private directionLeftSprite: PIXI.Sprite;
    private directionRightSprite: PIXI.Sprite;

    private cubicles: Cubicle[];
    private checkpoints: Checkpoint[];
    private nextCheckpoint: number;
    private elapsedTimeInCurrentCheckpoint: number;

    private playerSpeed: Position;
    private playerWorldPosition: Position;

    private timeLeftCurrentFrameLegs: number;
    private currentFrameLegs: number;

    private timeTilDriftSmoke: number;
    private driftSmokes: DriftSmoke[];

    private screenShakeTimeLeft: number;

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelOffice";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        this.cutscene = new Cutscene(xOffset, 130, player, this.upKey, this.downKey, this.leftKey, this.rightKey, this.scoreCounter);

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

        this.playerSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-background-p" + this.player].texture);
        this.playerSprite.pivot.x = 45;
        this.playerSprite.pivot.y = 92;
        this.playerSprite.x = this.world.x + this.world.width / 2;
        this.playerSprite.y = this.world.y + this.world.height / 2;
        this.playerSprite.zIndex = 100;

        this.playerLegsSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-idle-p" + this.player].texture);
        this.playerLegsSprite.pivot.x = 45;
        this.playerLegsSprite.pivot.y = 92;
        this.playerLegsSprite.x = this.world.x + this.world.width / 2;
        this.playerLegsSprite.y = this.world.y + this.world.height / 2;
        this.playerLegsSprite.zIndex = 99;

        if (Game.twoPlayerGame) {

            let otherPlayer = this.player == 1 ? 2 : 1;

            this.otherPlayerSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-background-p" + otherPlayer].texture);
            this.otherPlayerSprite.pivot.x = 45;
            this.otherPlayerSprite.pivot.y = 92;
            this.otherPlayerSprite.zIndex = 98;

            this.otherPlayerLegsSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-player-idle-p" + otherPlayer].texture);
            this.otherPlayerLegsSprite.pivot.x = 45;
            this.otherPlayerLegsSprite.pivot.y = 92;
            this.otherPlayerLegsSprite.zIndex = 97;
        }

        this.directionUpSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-up"].texture);
        this.directionUpSprite.x = this.world.x + this.world.width / 2 - 22;
        this.directionUpSprite.y = this.world.y;
        this.directionUpSprite.zIndex = 110;
        this.directionUpSprite.visible = false;

        this.directionDownSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-down"].texture);
        this.directionDownSprite.x = this.world.x + this.world.width / 2 - 22;
        this.directionDownSprite.y = this.world.y + this.world.height - 100;
        this.directionDownSprite.zIndex = 110;
        this.directionDownSprite.visible = false;

        this.directionLeftSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-left"].texture);
        this.directionLeftSprite.x = this.world.x;
        this.directionLeftSprite.y = this.world.y + this.world.height / 2 - 22;
        this.directionLeftSprite.zIndex = 110;
        this.directionLeftSprite.visible = false;

        this.directionRightSprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-finger-right"].texture);
        this.directionRightSprite.x = this.world.x + this.world.width - 100;
        this.directionRightSprite.y = this.world.y + this.world.height / 2 - 22;
        this.directionRightSprite.zIndex = 110;
        this.directionRightSprite.visible = false;

        this.floor = new PIXI.Graphics();

        this.floor.beginFill(ColorHelper.rgbToHex(123, 157, 156));
        this.floor.drawRect(0, 0, this.renderTexture.width, this.renderTexture.height);

        this.createCubicles();
        this.createCheckpoints();
    }

    public onEnter(): void {

        this.playerWorldPosition = new Position(600, 600);
        this.playerSprite.angle = 0;
        this.playerLegsSprite.angle = 0;
        this.playerSpeed = new Position(0, 0);
        this.timeLeftCurrentFrameLegs = 100;
        this.currentFrameLegs = 0;

        this.timeTilDriftSmoke = 250;
        this.driftSmokes = [];

        this.otherPlayerWorldPosition = new Position(600, 600);

        this.nextCheckpoint = 1;
        this.elapsedTimeInCurrentCheckpoint = 3000;

        Game.app.stage.addChild(this.world);

        Game.app.stage.addChild(this.playerLegsSprite);
        Game.app.stage.addChild(this.playerSprite);
        Game.app.stage.addChild(this.directionUpSprite);
        Game.app.stage.addChild(this.directionDownSprite);
        Game.app.stage.addChild(this.directionLeftSprite);
        Game.app.stage.addChild(this.directionRightSprite);

        this.scoreCounter.onEnter();

        this.totalElapsedTime = 0;

        if (this.player == 1) {

            this.pressEnter.visible = false;

            Game.app.stage.addChild(this.pressEnter);
        }

        Game.sceneTransition.startShrinking();

        this.movePlayer(0);
        this.renderWorld();
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.world);

        Game.app.stage.removeChild(this.playerLegsSprite);
        Game.app.stage.removeChild(this.playerSprite);
        Game.app.stage.removeChild(this.directionUpSprite);
        Game.app.stage.removeChild(this.directionDownSprite);
        Game.app.stage.removeChild(this.directionLeftSprite);
        Game.app.stage.removeChild(this.directionRightSprite);

        for (let driftSmoke of this.driftSmokes) {

            Game.app.stage.removeChild(driftSmoke.sprite);
        }

        this.scoreCounter.onExit();

        if (this.player == 1) {

            Game.app.stage.removeChild(this.pressEnter);

            Game.scoreStatePlayer1.beforeOnEnter(Level.Office, this.scoreCounter.getScore());

            Game.currentStatePlayer1 = Game.scoreStatePlayer1;
            Game.currentStatePlayer1.onEnter();

            if (Game.twoPlayerGame && Game.currentStatePlayer2.stateName == this.stateName) {

                Game.currentStatePlayer2.onExit();
            }
        }
        else {

            Game.scoreStatePlayer2.beforeOnEnter(Level.Office, this.scoreCounter.getScore());

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

                Game.intro.startLevelOffice();

                if (Game.soundPlayer.musicOffice.playing() == false) {
                    Game.soundPlayer.musicOffice.play();
                }
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

        this.scoreCounter.update(elapsedTime);

        this.totalElapsedTime += elapsedTime;

        let musicTime: any;        

        if (Game.soundPlayer.musicOffice.playing() == false) {

            musicTime = 122;
        }
        else {

            musicTime = Game.soundPlayer.musicOffice.seek();
        }

        if (musicTime > 120 ) { 

            if (this.player == 1) {

                this.pressEnter.visible = true;

                if (musicTime < 120.3) {

                    this.pressEnter.alpha = (musicTime - 120.3) / 0.3;
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

            return;
        }

        if (musicTime > 36.1 && musicTime < 54.319) {
            //  Cutscene!

            if (!this.cutscene.isVisible()) {

                this.cutscene.onEnter();
            }

            if (musicTime - 36.1 < 1.5) {

                let partShowStart = (musicTime - 36.1) / 1.5;

                this.cutscene.showStartText(partShowStart);
            }
            else if (musicTime > 54.319 - 1.5) {

                let partShowEnd = 1 - (54.319 - musicTime) / 1.5;

                this.cutscene.showEndText(partShowEnd);
            }
            else {

                this.cutscene.hideTexts();
            }

            this.cutscene.update(elapsedTime);

            return;
        }
        else if (this.cutscene.isVisible()) {

            this.cutscene.onExit();
        }

        this.movePlayer(elapsedTime);
        this.updateDriftSmokes(elapsedTime);

        this.checkCheckpoints(elapsedTime);

        this.renderWorld();

        if (this.screenShakeTimeLeft > 0) {

            this.screenShakeTimeLeft -= elapsedTime;

            if (this.screenShakeTimeLeft < 0) {

                this.screenShakeTimeLeft = 0;
            }

            let partShake = 1 - this.screenShakeTimeLeft / 1000;

            let shake = 20 * (1 - EasingCurves.easeOutElastic(partShake));

            this.world.x = this.xOffset + shake;
            this.world.y = 65 + shake;

            this.playerSprite.x = this.world.x + this.world.width / 2;
            this.playerSprite.y = this.world.y + this.world.height / 2;

            this.playerLegsSprite.x = this.world.x + this.world.width / 2;
            this.playerLegsSprite.y = this.world.y + this.world.height / 2;

            this.scoreCounter.setPos(this.xOffset + 4 + shake, 16 + shake);
        }
    }

    private createCubicles(): void {

        this.cubicles = [];

        let w = 300;    //  Samma som cubicle.png
        let h = 300;

        this.cubicles.push(new Cubicle(0 * w, 0 * h));
        this.cubicles.push(new Cubicle(1 * w, 0 * h));
        this.cubicles.push(new Cubicle(2 * w, 0 * h));
        this.cubicles.push(new Cubicle(3 * w, 0 * h));
        this.cubicles.push(new Cubicle(4 * w, 0 * h));
        this.cubicles.push(new Cubicle(5 * w, 0 * h));
        this.cubicles.push(new Cubicle(6 * w, 0 * h));
        this.cubicles.push(new Cubicle(7 * w, 0 * h));
        this.cubicles.push(new Cubicle(8 * w, 0 * h));
        this.cubicles.push(new Cubicle(9 * w, 0 * h));
        this.cubicles.push(new Cubicle(10 * w, 0 * h));
        this.cubicles.push(new Cubicle(11 * w, 0 * h));

        this.cubicles.push(new Cubicle(0 * w, 1 * h));
        this.cubicles.push(new Cubicle(10 * w, 1 * h));
        this.cubicles.push(new Cubicle(11 * w, 1 * h));

        this.cubicles.push(new Cubicle(0 * w, 2 * h));
        this.cubicles.push(new Cubicle(10 * w, 2 * h));
        this.cubicles.push(new Cubicle(11 * w, 2 * h));

        this.cubicles.push(new Cubicle(0 * w, 3 * h));
        this.cubicles.push(new Cubicle(3 * w, 3 * h));
        this.cubicles.push(new Cubicle(4 * w, 3 * h));
        this.cubicles.push(new Cubicle(5 * w, 3 * h));
        this.cubicles.push(new Cubicle(6 * w, 3 * h));
        this.cubicles.push(new Cubicle(7 * w, 3 * h));
        this.cubicles.push(new Cubicle(10 * w, 3 * h));
        this.cubicles.push(new Cubicle(11 * w, 3 * h));

        this.cubicles.push(new Cubicle(0 * w, 4 * h));
        this.cubicles.push(new Cubicle(3 * w, 4 * h));
        this.cubicles.push(new Cubicle(10 * w, 4 * h));
        this.cubicles.push(new Cubicle(11 * w, 4 * h));

        this.cubicles.push(new Cubicle(0 * w, 5 * h));
        this.cubicles.push(new Cubicle(3 * w, 5 * h));
        this.cubicles.push(new Cubicle(10 * w, 5 * h));
        this.cubicles.push(new Cubicle(11 * w, 5 * h));

        this.cubicles.push(new Cubicle(0 * w, 6 * h));
        this.cubicles.push(new Cubicle(3 * w, 6 * h));
        this.cubicles.push(new Cubicle(6 * w, 6 * h));
        this.cubicles.push(new Cubicle(7 * w, 6 * h));
        this.cubicles.push(new Cubicle(8 * w, 6 * h));
        this.cubicles.push(new Cubicle(9 * w, 6 * h));
        this.cubicles.push(new Cubicle(10 * w, 6 * h));
        this.cubicles.push(new Cubicle(11 * w, 6 * h));

        this.cubicles.push(new Cubicle(0 * w, 7 * h));
        this.cubicles.push(new Cubicle(3 * w, 7 * h));
        this.cubicles.push(new Cubicle(11 * w, 7 * h));

        this.cubicles.push(new Cubicle(0 * w, 8 * h));
        this.cubicles.push(new Cubicle(1 * w, 8 * h));
        this.cubicles.push(new Cubicle(3 * w, 8 * h));
        this.cubicles.push(new Cubicle(11 * w, 8 * h));

        this.cubicles.push(new Cubicle(0 * w, 9 * h));
        this.cubicles.push(new Cubicle(1 * w, 9 * h));
        this.cubicles.push(new Cubicle(3 * w, 9 * h));
        this.cubicles.push(new Cubicle(4 * w, 9 * h));
        this.cubicles.push(new Cubicle(5 * w, 9 * h));
        this.cubicles.push(new Cubicle(6 * w, 9 * h));
        this.cubicles.push(new Cubicle(7 * w, 9 * h));
        this.cubicles.push(new Cubicle(8 * w, 9 * h));
        this.cubicles.push(new Cubicle(11 * w, 9 * h));

        this.cubicles.push(new Cubicle(0 * w, 10 * h));
        this.cubicles.push(new Cubicle(1 * w, 10 * h));
        this.cubicles.push(new Cubicle(11 * w, 10 * h));

        this.cubicles.push(new Cubicle(0 * w, 11 * h));
        this.cubicles.push(new Cubicle(1 * w, 11 * h));
        this.cubicles.push(new Cubicle(11 * w, 11 * h));

        this.cubicles.push(new Cubicle(0 * w, 12 * h));
        this.cubicles.push(new Cubicle(1 * w, 12 * h));
        this.cubicles.push(new Cubicle(2 * w, 12 * h));
        this.cubicles.push(new Cubicle(3 * w, 12 * h));
        this.cubicles.push(new Cubicle(4 * w, 12 * h));
        this.cubicles.push(new Cubicle(5 * w, 12 * h));
        this.cubicles.push(new Cubicle(6 * w, 12 * h));
        this.cubicles.push(new Cubicle(7 * w, 12 * h));
        this.cubicles.push(new Cubicle(8 * w, 12 * h));
        this.cubicles.push(new Cubicle(9 * w, 12 * h));
        this.cubicles.push(new Cubicle(10 * w, 12 * h));
        this.cubicles.push(new Cubicle(11 * w, 12 * h));
    }

    private createCheckpoints(): void {

        let w = 300;    //  Samma som cubicle.png
        let h = 300;

        this.checkpoints = [];

        this.checkpoints.push(new Checkpoint(1 * w, 3 * h, 2 * w, 2 * h, Direction.Down));
        this.checkpoints.push(new Checkpoint(1 * w, 5 * h, 2 * w, 3 * h, Direction.Down));
        this.checkpoints.push(new Checkpoint(2 * w, 8 * h, 1 * w, 2 * h, Direction.Down));
        this.checkpoints.push(new Checkpoint(2 * w, 10 * h, 2 * w, 2 * h, Direction.Right));
        this.checkpoints.push(new Checkpoint(4 * w, 10 * h, 2 * w, 2 * h, Direction.Right));
        this.checkpoints.push(new Checkpoint(6 * w, 10 * h, 2 * w, 2 * h, Direction.Right));
        this.checkpoints.push(new Checkpoint(8 * w, 10 * h, 3 * w, 2 * h, Direction.Up));
        this.checkpoints.push(new Checkpoint(9 * w, 7 * h, 2 * w, 3 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(7 * w, 7 * h, 2 * w, 2 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(4 * w, 7 * h, 3 * w, 2 * h, Direction.Up));
        this.checkpoints.push(new Checkpoint(6 * w, 4 * h, 4 * w, 2 * h, Direction.Up));
        this.checkpoints.push(new Checkpoint(8 * w, 1 * h, 2 * w, 3 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(6 * w, 1 * h, 2 * w, 2 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(4 * w, 1 * h, 2 * w, 2 * h, Direction.Left));
        this.checkpoints.push(new Checkpoint(1 * w, 1 * h, 3 * w, 2 * h, Direction.Down));
    }

    private renderWorld(): void {

        Game.app.renderer.render(this.floor, this.renderTexture, true);

        for (let cubicle of this.cubicles) {
            
            Game.app.renderer.render(cubicle.background, this.renderTexture, false);

            for (let item of cubicle.items) {

                Game.app.renderer.render(item.sprite, this.renderTexture, false);
            }
        }

        if (Game.twoPlayerGame) {

            Game.app.renderer.render(this.otherPlayerLegsSprite, this.renderTexture, false);
            Game.app.renderer.render(this.otherPlayerSprite, this.renderTexture, false);
        }
    }

    public updateOtherPlayer(worldPosition: Position, angle: number, texture: string) : void {

        this.otherPlayerWorldPosition = worldPosition;
        this.otherPlayerSprite.angle = angle;
        this.otherPlayerLegsSprite.angle = angle;

        if (texture != "") {

            this.otherPlayerLegsSprite.texture = PIXI.Loader.shared.resources[texture].texture;
        }
    }

    private movePlayer(elapsedTime: number) {

        let turnSpeed = 1.2 * 360;    //  Degrees per second
        let accSpeed = 800;
        let naturalBreakAcc = -1000;
        let playerBreakAcc = -2500;
        let maxSpeed = 1200;

        let currentLegsTexture = "";

        if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.current.isPressed(this.rightKey)) {

            this.playerSprite.angle -= turnSpeed * elapsedTime / 1000;

            if (this.playerSprite.angle < 0) {

                this.playerSprite.angle += 360;
            }

            this.playerLegsSprite.angle = this.playerSprite.angle;
        }
        else if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.current.isPressed(this.leftKey)) {

            this.playerSprite.angle += turnSpeed * elapsedTime / 1000;

            if (this.playerSprite.angle >= 360) {

                this.playerSprite.angle -= 360;
            }

            this.playerLegsSprite.angle = this.playerSprite.angle;
        }

        if (Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.current.isPressed(this.downKey)) {

            let actualRotation = Math.atan2(this.playerSpeed.y, this.playerSpeed.x) - Math.PI / 2;

            if (actualRotation < 0) {

                actualRotation += Math.PI * 2;
            }

            let diffRotation = Math.abs(this.playerSprite.rotation - actualRotation);

            if (diffRotation > Math.PI) {

                diffRotation = Math.PI * 2 - diffRotation;
            }

            let boostSpeed = 3.0 * accSpeed * diffRotation / (Math.PI * 2);

            if (diffRotation > Math.PI / 2) {

                this.timeTilDriftSmoke -= elapsedTime;

                if (this.timeTilDriftSmoke <= 0) {

                    this.timeTilDriftSmoke += 50;

                    let driftSmoke = new DriftSmoke(this.playerSprite.x, this.playerSprite.y, this.playerSprite.rotation - Math.PI/2, this.playerSprite.rotation - actualRotation);

                    this.driftSmokes.push(driftSmoke);
                    Game.app.stage.addChild(driftSmoke.sprite);
                }
            }

            this.playerSpeed.x -= Math.sin(this.playerSprite.rotation) * (accSpeed + boostSpeed) * elapsedTime / 1000;
            this.playerSpeed.y += Math.cos(this.playerSprite.rotation) * (accSpeed + boostSpeed) * elapsedTime / 1000;

            let partSpeed = Math.sqrt(this.playerSpeed.x * this.playerSpeed.x + this.playerSpeed.y * this.playerSpeed.y) / maxSpeed;

            this.timeLeftCurrentFrameLegs -= elapsedTime * (1 + 3 * partSpeed);

            if (this.timeLeftCurrentFrameLegs <= 0) {

                this.timeLeftCurrentFrameLegs += 150;

                this.currentFrameLegs++;

                if (this.currentFrameLegs > 5) {

                    this.currentFrameLegs = 0;
                }

                currentLegsTexture = "level-office-player-run" + this.currentFrameLegs + "-p" + this.player;

                this.playerLegsSprite.texture = PIXI.Loader.shared.resources[currentLegsTexture].texture;
            }
        }
        else if (Game.keyboard.current.isPressed(this.downKey) && !Game.keyboard.current.isPressed(this.upKey)) {

            let actualRotation = Math.atan2(this.playerSpeed.y, this.playerSpeed.x) - Math.PI / 2;

            let oldSpeed = new Position(this.playerSpeed.x, this.playerSpeed.y);

            this.playerSpeed.x -= Math.sin(actualRotation) * playerBreakAcc * elapsedTime / 1000;
            this.playerSpeed.y += Math.cos(actualRotation) * playerBreakAcc * elapsedTime / 1000;

            if ((oldSpeed.x > 0 && this.playerSpeed.x < 0) || (oldSpeed.x < 0 && this.playerSpeed.x > 0)) {

                this.playerSpeed.x = 0;
            }

            if ((oldSpeed.y > 0 && this.playerSpeed.y < 0) || (oldSpeed.y < 0 && this.playerSpeed.y > 0)) {

                this.playerSpeed.y = 0;
            }

            currentLegsTexture = "level-office-player-break-p" + this.player;

            this.playerLegsSprite.texture = PIXI.Loader.shared.resources[currentLegsTexture].texture;
        }
        else {

            let actualRotation = Math.atan2(-this.playerSpeed.y, this.playerSpeed.x);

            let oldSpeed = new Position(this.playerSpeed.x, this.playerSpeed.y);

            this.playerSpeed.x -= Math.cos(actualRotation - Math.PI) * naturalBreakAcc * elapsedTime / 1000;
            this.playerSpeed.y += Math.sin(actualRotation - Math.PI) * naturalBreakAcc * elapsedTime / 1000;

            if ((oldSpeed.x > 0 && this.playerSpeed.x < 0) || (oldSpeed.x < 0 && this.playerSpeed.x > 0)) {

                this.playerSpeed.x = 0;
            }

            if ((oldSpeed.y > 0 && this.playerSpeed.y < 0) || (oldSpeed.y < 0 && this.playerSpeed.y > 0)) {

                this.playerSpeed.y = 0;
            }

            currentLegsTexture = "level-office-player-idle-p" + this.player;

            this.playerLegsSprite.texture = PIXI.Loader.shared.resources[currentLegsTexture].texture;
        }

        if (Math.sqrt(this.playerSpeed.x * this.playerSpeed.x + this.playerSpeed.y * this.playerSpeed.y) > maxSpeed) {

            //  Normalize
            let a = Math.atan2(-this.playerSpeed.y, this.playerSpeed.x);
            this.playerSpeed.x = Math.cos(a) * maxSpeed;
            this.playerSpeed.y = -Math.sin(a) * maxSpeed;
        }

        let newPosition = new Position(
            this.playerWorldPosition.x + this.playerSpeed.x * elapsedTime / 1000,
            this.playerWorldPosition.y + this.playerSpeed.y * elapsedTime / 1000);

        this.playerWorldPosition = this.CheckCollision(this.playerWorldPosition, newPosition);

        for (let cubicle of this.cubicles) {

            cubicle.update(this.playerWorldPosition);
        }

        if (Game.twoPlayerGame) {

            if (this.player == 1) {

                Game.currentStatePlayer2.updateOtherPlayer(this.playerWorldPosition, this.playerSprite.angle, currentLegsTexture);
            }
            else {

                Game.currentStatePlayer1.updateOtherPlayer(this.playerWorldPosition, this.playerSprite.angle, currentLegsTexture);
            }

            let otherPlayerRelativeToPlayer = new Position(
                this.otherPlayerWorldPosition.x - this.playerWorldPosition.x + 950 / 2,
                this.otherPlayerWorldPosition.y - this.playerWorldPosition.y + 950 / 2);

            this.otherPlayerSprite.x = otherPlayerRelativeToPlayer.x;
            this.otherPlayerSprite.y = otherPlayerRelativeToPlayer.y;

            this.otherPlayerLegsSprite.x = otherPlayerRelativeToPlayer.x;
            this.otherPlayerLegsSprite.y = otherPlayerRelativeToPlayer.y;
        }
    }

    private updateDriftSmokes(elapsedTime: number) {

        var i = this.driftSmokes.length;

        while (i--) {

            this.driftSmokes[i].update(elapsedTime);

            if (this.driftSmokes[i].sprite.alpha <= 0) {

                this.driftSmokes.splice(i, 1);
            }
        }
    }

    private CheckCollision(oldPlayerWorldPosition: Position, newPlayerWorldPosition: Position): Position {

        let i = 0;
        let noOfCollide = 0;

        for (; i < this.cubicles.length; i++) {

            if (noOfCollide > 2) {

                //  Jag BORDE aldrig få mer än max två kollisioner på en update, men det får jag för jag kodar som en röv.
                //  Skitsamma, sätt tillbaka positionen så att jag aldrig ska fastna i evighetsloopar.

                return oldPlayerWorldPosition;
            }

            let cubicle = this.cubicles[i];

            if (cubicle.isInside(newPlayerWorldPosition)) {

                //  Kolla kollisioner för x och y separat så att man kan glida längs väggarna

                let dx = newPlayerWorldPosition.x - oldPlayerWorldPosition.x;
                let dy = newPlayerWorldPosition.y - oldPlayerWorldPosition.y;

                let insideX;
                let insideY;

                if (dx > 0) {

                    insideX = newPlayerWorldPosition.x - cubicle.worldPosition.x;
                }
                else {

                    insideX = newPlayerWorldPosition.x - (cubicle.worldPosition.x + 300);
                }

                if (dy > 0) {

                    insideY = newPlayerWorldPosition.y - cubicle.worldPosition.y;
                }
                else {

                    insideY = newPlayerWorldPosition.y - (cubicle.worldPosition.y + 300);
                }

                let maxSpeed = 1000;
                let partMaxSpeed = Math.sqrt(this.playerSpeed.x * this.playerSpeed.x + this.playerSpeed.y * this.playerSpeed.y) / maxSpeed;

                if (partMaxSpeed > 0.25) {

                    this.screenShakeTimeLeft = 1000 * partMaxSpeed;
                }

                if (Math.abs(insideX) < 2 && Math.abs(insideY) < 2) {

                    //  Hit corner
                    newPlayerWorldPosition.x = oldPlayerWorldPosition.x;
                    newPlayerWorldPosition.y = oldPlayerWorldPosition.y;
                    this.playerSpeed.x = this.playerSpeed.x / -5;
                    this.playerSpeed.y = this.playerSpeed.y / -5;
                }
                else if (Math.abs(insideX) < Math.abs(insideY)) {

                    newPlayerWorldPosition.x -= insideX * 2;

                    //  Bounce back with a 5th of the speed
                    this.playerSpeed.x = this.playerSpeed.x / -5;

                    if (this.playerSpeed.y > 300) {

                        this.playerSpeed.y = 300;
                    }
                    else if (this.playerSpeed.y < -300) {

                        this.playerSpeed.y = -300;
                    }
                }
                else {

                    newPlayerWorldPosition.y -= insideY * 2;

                    this.playerSpeed.y = this.playerSpeed.y / -5;                    

                    if (this.playerSpeed.x > 300) {

                        this.playerSpeed.x = 300;
                    }
                    else if (this.playerSpeed.x < -300) {

                        this.playerSpeed.x = -300;
                    }
                }

                i = 0;  //  Start over
                noOfCollide++;
            }
        }

        return newPlayerWorldPosition;
    }

    private checkCheckpoints(elapsedTime: number) {

        this.elapsedTimeInCurrentCheckpoint += elapsedTime;

        this.directionUpSprite.visible = false;
        this.directionDownSprite.visible = false;
        this.directionLeftSprite.visible = false;
        this.directionRightSprite.visible = false;

        if (this.checkpoints[this.nextCheckpoint].isInside(this.playerWorldPosition)) {

            this.elapsedTimeInCurrentCheckpoint = 0;

            this.nextCheckpoint++;

            if (this.nextCheckpoint >= this.checkpoints.length) {

                this.nextCheckpoint = 0;
            }

            this.scoreCounter.setNewScore(this.scoreCounter.getDesiredScore() + 1, 100);
        }
        else if (this.elapsedTimeInCurrentCheckpoint > 1000) {

            for (let i = 0; i < this.checkpoints.length; i++) {

                if (this.checkpoints[i].isInside(this.playerWorldPosition)) {

                    if (this.checkpoints[i].directionNext == Direction.Up) {

                        this.directionUpSprite.visible = true;
                        this.directionUpSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }
                    else if (this.checkpoints[i].directionNext == Direction.Down) {

                        this.directionDownSprite.visible = true;
                        this.directionDownSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }
                    else if (this.checkpoints[i].directionNext == Direction.Left) {

                        this.directionLeftSprite.visible = true;
                        this.directionLeftSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }
                    else if (this.checkpoints[i].directionNext == Direction.Right) {

                        this.directionRightSprite.visible = true;
                        this.directionRightSprite.alpha = 0.5 + 0.5 * Math.sin(2 * Math.PI * this.totalElapsedTime / 500);
                    }

                    break;
                }
            }
        }
    }
}