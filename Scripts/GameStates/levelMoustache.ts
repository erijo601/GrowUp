class LevelMoustache extends GameState {

    private score: number;

    private spawnBag: Shape[];

    private grid: Grid;
    private currentShape: Shape;

    private scoreCounter: ScoreCounter;

    private faceBg: PIXI.Sprite;

    private leftEye: PIXI.Sprite[];
    private rightEye: PIXI.Sprite[];
    private mouth: PIXI.Sprite[];
    private nose: PIXI.Sprite[];
    private noseFront: PIXI.Sprite[];
    private noseFrontBase: PIXI.Sprite;
    private pressEnter: PIXI.Sprite;

    private totalElapsedTime: number;

    private timeLeftDropGrid: number;
    private totalTimeDropGrid: number;

    private timeLeftDropCurrentShape: number;
    private totalTimeDropCurrentShape: number;

    private timeTilAnimLeftEye: number;
    private timeLeftCurrentLeftEyeFrame: number;
    private leftEyeAnimDirection: number;
    private currentLeftEyeFrame: number;

    private timeTilAnimRightEye: number;
    private timeLeftCurrentRightEyeFrame: number;
    private rightEyeAnimDirection: number;
    private currentRightEyeFrame: number;

    private animateMouth: boolean;
    private timeLeftCurrentMouthFrame: number;
    private mouthAnimDirection: number;
    private currentMouthFrame: number;

    private animateNose: boolean;
    private timeLeftCurrentNoseFrame: number;
    private noseAnimDirection: number;
    private currentNoseFrame: number;

    private lastSmile: boolean;

    //  Musikintro (4.5s) - slipsar
    //  Musikoutro (3.0s) - gubben ler
    //  Återstående musik = ingame = 1m35s - 7.5s = 1m27.5s
    //  10 rader = 87.5s / 10 = 8.75s mellan varje raddrop

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "LevelMoustache";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);

        this.faceBg = new PIXI.Sprite(PIXI.Loader.shared.resources["face-bg-" + player].texture);
        this.faceBg.x = 72 + this.xOffset;
        this.faceBg.y = 0;

        this.leftEye = [];

        let eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-left-0"].texture);
        eye.x = this.faceBg.x + 142;
        eye.y = this.faceBg.y + 147;
        this.leftEye.push(eye);

        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-left-1"].texture);
        eye.x = this.faceBg.x + 142;
        eye.y = this.faceBg.y + 147;
        this.leftEye.push(eye);

        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-left-2"].texture);
        eye.x = this.faceBg.x + 142;
        eye.y = this.faceBg.y + 147;
        this.leftEye.push(eye);

        this.rightEye = [];

        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-right-0"].texture);
        eye.x = this.faceBg.x + 539;
        eye.y = this.faceBg.y + 127;
        this.rightEye.push(eye);

        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-right-1"].texture);
        eye.x = this.faceBg.x + 539;
        eye.y = this.faceBg.y + 127;
        this.rightEye.push(eye);

        eye = new PIXI.Sprite(PIXI.Loader.shared.resources["eye-right-2"].texture);
        eye.x = this.faceBg.x + 539;
        eye.y = this.faceBg.y + 127;
        this.rightEye.push(eye);

        this.mouth = [];

        let mouthTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["mouth-0"].texture);
        mouthTmp.x = this.faceBg.x + 148;
        mouthTmp.y = this.faceBg.y + 698;
        this.mouth.push(mouthTmp);

        mouthTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["mouth-1"].texture);
        mouthTmp.x = this.faceBg.x + 148;
        mouthTmp.y = this.faceBg.y + 698;
        this.mouth.push(mouthTmp);

        mouthTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["mouth-2"].texture);
        mouthTmp.x = this.faceBg.x + 148;
        mouthTmp.y = this.faceBg.y + 698;
        this.mouth.push(mouthTmp);

        this.nose = [];

        let noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-0"].texture);
        noseTmp.x = this.faceBg.x + 187;
        noseTmp.y = this.faceBg.y + 568;
        this.nose.push(noseTmp);

        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-1"].texture);
        noseTmp.x = this.faceBg.x + 187;
        noseTmp.y = this.faceBg.y + 568;
        this.nose.push(noseTmp);

        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-2"].texture);
        noseTmp.x = this.faceBg.x + 187;
        noseTmp.y = this.faceBg.y + 568;
        this.nose.push(noseTmp);

        this.noseFrontBase = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-front-base"].texture);
        this.noseFrontBase.x = this.faceBg.x + 187;
        this.noseFrontBase.y = this.faceBg.y + 568;
        this.noseFrontBase.zIndex = 100;
        this.noseFrontBase.alpha = 0.5;

        this.noseFront = [];

        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-0-front"].texture);
        noseTmp.x = this.faceBg.x + 187;
        noseTmp.y = this.faceBg.y + 568;
        noseTmp.zIndex = 100;
        noseTmp.alpha = 0.5;
        this.noseFront.push(noseTmp);

        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-1-front"].texture);
        noseTmp.x = this.faceBg.x + 187;
        noseTmp.y = this.faceBg.y + 568;
        noseTmp.zIndex = 100;
        noseTmp.alpha = 0.5;
        this.noseFront.push(noseTmp);

        noseTmp = new PIXI.Sprite(PIXI.Loader.shared.resources["nose-2-front"].texture);
        noseTmp.x = this.faceBg.x + 187;
        noseTmp.y = this.faceBg.y + 568;
        noseTmp.zIndex = 100;
        noseTmp.alpha = 0.5;
        this.noseFront.push(noseTmp);

        this.totalTimeDropGrid = 8750;

        this.totalTimeDropCurrentShape = 150;

        this.spawnBag = [];

        if (this.player == 1) {

            this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
            this.pressEnter.x = 858 + 80;
            this.pressEnter.y = 842 + 100;
            this.pressEnter.pivot.x = this.pressEnter.width / 2;
            this.pressEnter.pivot.y = this.pressEnter.height / 2;
            this.pressEnter.zIndex = 1000;
            this.pressEnter.visible = false;
        }
    }

    private fillSpawnBag() {

        this.spawnBag = [];

        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, true, 10));

        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new LShape(this.faceBg.x, this.faceBg.y, false, 10));

        this.spawnBag.push(new SquareShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new SquareShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new SquareShape(this.faceBg.x, this.faceBg.y, 10));

        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, true, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, true, 10));

        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, false, 10));
        this.spawnBag.push(new StepShape(this.faceBg.x, this.faceBg.y, false, 10));

        this.spawnBag.push(new StraightShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new StraightShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new StraightShape(this.faceBg.x, this.faceBg.y, 10));

        this.spawnBag.push(new TShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new TShape(this.faceBg.x, this.faceBg.y, 10));
        this.spawnBag.push(new TShape(this.faceBg.x, this.faceBg.y, 10));
    }

    private addStartPieces() {

        let columns = [];
        columns.push(0);
        columns.push(1);
        columns.push(2);
        columns.push(3);
        columns.push(4);
        columns.push(5);
        columns.push(6);
        columns.push(7);
        columns.push(8);
        columns.push(9);

        for (let n = 0; n < 2; n++) {

            let index = MathHelper.randomInt(0, columns.length - 1);
            let column = columns[index];
            columns.splice(index, 1);

            let shape = new DotShape(this.faceBg.x, this.faceBg.y, column, 19);
            shape.addSprites(this.player);
            this.grid.addShape(shape);

            shape = new DotShape(this.faceBg.x, this.faceBg.y, column, 18);
            shape.addSprites(this.player);
            this.grid.addShape(shape);
        }

        for (let n = 0; n < 3; n++) {

            let index = MathHelper.randomInt(0, columns.length - 1);
            let column = columns[index];
            columns.splice(index, 1);

            let shape = new DotShape(this.faceBg.x, this.faceBg.y, column, 19);
            shape.addSprites(this.player);
            this.grid.addShape(shape);
        }

        this.grid.updateRows(this.player, 1);
    }

    public onEnter(): void {

        this.score = 0;

        this.grid = new Grid();

        this.scoreCounter.onEnter();

        Game.app.stage.addChild(this.faceBg);

        //   Lägg till alla ansiktsframes FÖRE shape

        for (let sprite of this.leftEye) {

            sprite.visible = false;

            Game.app.stage.addChild(sprite);
        }

        for (let sprite of this.rightEye) {

            sprite.visible = false;

            Game.app.stage.addChild(sprite);
        }

        for (let sprite of this.mouth) {

            sprite.visible = false;

            Game.app.stage.addChild(sprite);
        }

        for (let sprite of this.nose) {

            sprite.visible = false;

            Game.app.stage.addChild(sprite);
        }

        Game.app.stage.addChild(this.noseFrontBase);

        for (let sprite of this.noseFront) {

            sprite.visible = false;

            Game.app.stage.addChild(sprite);
        }

        if (this.player == 1) {

            this.pressEnter.visible = false;

            Game.app.stage.addChild(this.pressEnter);
        }

        this.addStartPieces();

        this.currentShape = this.spawnShape();

        //Game.soundPlayer.musicMoustache.play();

        this.totalElapsedTime = 0;

        this.totalTimeDropGrid = 8750 * 2; //  Dubbla tiden innan första droppen
        this.timeLeftDropGrid = this.totalTimeDropGrid;
        this.timeLeftDropCurrentShape = this.totalTimeDropCurrentShape;

        this.timeTilAnimLeftEye = MathHelper.randomInt(2000, 6000);
        this.timeLeftCurrentLeftEyeFrame = 70;
        this.leftEyeAnimDirection = 1;
        this.currentLeftEyeFrame = 0;

        this.timeTilAnimRightEye = MathHelper.randomInt(2000, 6000);
        this.timeLeftCurrentRightEyeFrame = 70;
        this.rightEyeAnimDirection = 1;
        this.currentRightEyeFrame = 0;

        this.animateMouth = false;
        this.timeLeftCurrentMouthFrame = 90;
        this.mouthAnimDirection = 1;
        this.currentMouthFrame = 0;

        this.animateNose = false;
        this.timeLeftCurrentNoseFrame = 100;
        this.noseAnimDirection = 1;
        this.currentNoseFrame = 0;

        this.lastSmile = false;

        //Game.intro.startLevelMoustache();

        Game.sceneTransition.startShrinking();
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.faceBg);

        for (let sprite of this.leftEye) {

            Game.app.stage.removeChild(sprite);
        }

        for (let sprite of this.rightEye) {

            Game.app.stage.removeChild(sprite);
        }

        for (let sprite of this.mouth) {

            Game.app.stage.removeChild(sprite);
        }

        for (let sprite of this.nose) {

            Game.app.stage.removeChild(sprite);
        }

        Game.app.stage.removeChild(this.noseFrontBase);

        for (let sprite of this.noseFront) {

            Game.app.stage.removeChild(sprite);
        }

        this.grid.onExit();

        this.scoreCounter.onExit();

        Game.soundPlayer.musicMoustache.stop();

        if (this.player == 1) {

            Game.app.stage.removeChild(this.pressEnter);

            Game.scoreStatePlayer1.beforeOnEnter(Level.Moustache, this.scoreCounter.getScore());

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

            if (this.player == 1) {

                Game.sceneTransition.update(elapsedTime);
            }

            if (Game.sceneTransition.isDone()) {

                Game.soundPlayer.musicMoustache.play();
                Game.intro.startLevelMoustache();
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

        if (this.totalElapsedTime > 90000) {

            if (this.player == 1) {

                this.pressEnter.visible = true;

                if (this.totalElapsedTime > 90000 && this.totalElapsedTime < 90300) {

                    this.pressEnter.alpha = (this.totalElapsedTime - 90000) / 300;
                }
                else if (this.totalElapsedTime > 90300) {

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

        this.scoreCounter.update(elapsedTime);

        if (this.timeTilAnimLeftEye > 0) {

            this.timeTilAnimLeftEye -= elapsedTime;
        }
        else {

            this.timeLeftCurrentLeftEyeFrame -= elapsedTime;

            if (this.timeLeftCurrentLeftEyeFrame <= 0) {

                this.timeLeftCurrentLeftEyeFrame = 70;

                this.leftEye[this.currentLeftEyeFrame].visible = false;

                this.currentLeftEyeFrame += this.leftEyeAnimDirection;

                if (this.currentLeftEyeFrame == 3) {

                    if (this.lastSmile) {
                        //  Frys
                        this.currentLeftEyeFrame = 2;
                        this.leftEye[this.currentLeftEyeFrame].visible = true;
                    }
                    else {

                        //  Börja animera baklänges
                        this.currentLeftEyeFrame = 1;
                        this.leftEyeAnimDirection = -1;
                        this.leftEye[this.currentLeftEyeFrame].visible = true;
                    }
                }
                else if (this.currentLeftEyeFrame == -1) {

                    //  Animationen slut
                    this.currentLeftEyeFrame = 0;
                    this.leftEyeAnimDirection = 1;
                    this.timeTilAnimLeftEye = MathHelper.randomInt(2000, 6000);

                    if (MathHelper.randomInt(0, 1) == 0 && this.timeTilAnimRightEye > 0) {

                        this.timeTilAnimRightEye = this.timeTilAnimLeftEye;
                    }
                }
                else {

                    this.leftEye[this.currentLeftEyeFrame].visible = true;
                }
            }
            else {

                this.leftEye[this.currentLeftEyeFrame].visible = true;
            }
        }

        if (this.timeTilAnimRightEye > 0) {

            this.timeTilAnimRightEye -= elapsedTime;
        }
        else {

            this.timeLeftCurrentRightEyeFrame -= elapsedTime;

            if (this.timeLeftCurrentRightEyeFrame <= 0) {

                this.timeLeftCurrentRightEyeFrame = 70;

                this.rightEye[this.currentRightEyeFrame].visible = false;

                this.currentRightEyeFrame += this.rightEyeAnimDirection;

                if (this.currentRightEyeFrame == 3) {

                    if (this.lastSmile) {
                        //  Frys
                        this.currentRightEyeFrame = 2;
                        this.rightEye[this.currentRightEyeFrame].visible = true;
                    }
                    else {
                        //  Börja animera baklänges
                        this.currentRightEyeFrame = 1;
                        this.rightEyeAnimDirection = -1;
                        this.rightEye[this.currentRightEyeFrame].visible = true;
                    }
                }
                else if (this.currentRightEyeFrame == -1) {

                    //  Animationen slut
                    this.currentRightEyeFrame = 0;
                    this.rightEyeAnimDirection = 1;
                    this.timeTilAnimRightEye = MathHelper.randomInt(2000, 6000);
                }
                else {

                    this.rightEye[this.currentRightEyeFrame].visible = true;
                }
            }
            else {

                this.rightEye[this.currentRightEyeFrame].visible = true;
            }
        }

        if (this.animateMouth) {

            this.timeLeftCurrentMouthFrame -= elapsedTime;

            if (this.timeLeftCurrentMouthFrame <= 0) {

                this.mouth[this.currentMouthFrame].visible = false;

                this.currentMouthFrame += this.mouthAnimDirection;

                if (this.currentMouthFrame == 2) {

                    if (this.lastSmile) {
                        this.timeLeftCurrentMouthFrame = 1980;
                    }
                    else {
                        this.timeLeftCurrentMouthFrame = 1100;
                    }
                }
                else {

                    this.timeLeftCurrentMouthFrame = 90;
                }

                if (this.currentMouthFrame == 3) {

                    //  Börja animera baklänges
                    this.currentMouthFrame = 1;
                    this.mouthAnimDirection = -1;
                    this.mouth[this.currentMouthFrame].visible = true;
                }
                else if (this.currentMouthFrame == -1) {

                    //  Animationen slut
                    this.currentMouthFrame = 0;
                    this.mouthAnimDirection = 1;
                    this.animateMouth = false;
                }
                else {

                    this.mouth[this.currentMouthFrame].visible = true;
                }
            }
            else {

                this.mouth[this.currentMouthFrame].visible = true;
            }
        }

        if (!this.animateMouth && ((this.totalElapsedTime > 64662 && this.totalElapsedTime < 65000) ||
            (this.totalElapsedTime > 86628 && this.totalElapsedTime < 87000))) {

            this.animateMouth = true;
            this.timeLeftCurrentMouthFrame = 70;
            this.mouth[this.currentMouthFrame].visible = false;
            this.currentMouthFrame = 0;
            this.mouthAnimDirection = 1;
            this.mouth[this.currentMouthFrame].visible = true;
        }

        if (this.animateNose) {

            this.noseFrontBase.visible = false;

            this.timeLeftCurrentNoseFrame -= elapsedTime;

            if (this.timeLeftCurrentNoseFrame <= 0) {

                this.nose[this.currentNoseFrame].visible = false;
                this.noseFront[this.currentNoseFrame].visible = false;

                this.currentNoseFrame += this.noseAnimDirection;

                if (this.currentNoseFrame == 2) {

                    this.timeLeftCurrentNoseFrame = 500;
                }
                else {

                    this.timeLeftCurrentNoseFrame = 100;
                }

                if (this.currentNoseFrame == 3) {

                    //  Börja animera baklänges
                    this.currentNoseFrame = 1;
                    this.noseAnimDirection = -1;
                    this.nose[this.currentNoseFrame].visible = true;
                    this.noseFront[this.currentNoseFrame].visible = true;
                }
                else if (this.currentNoseFrame == -1) {

                    //  Animationen slut
                    this.currentNoseFrame = 0;
                    this.noseAnimDirection = 1;
                    this.animateNose = false;
                }
                else {

                    this.nose[this.currentNoseFrame].visible = true;
                    this.noseFront[this.currentNoseFrame].visible = true;
                }
            }
            else {

                this.nose[this.currentNoseFrame].visible = true;
                this.noseFront[this.currentNoseFrame].visible = true;
            }
        }
        else {

            this.noseFrontBase.visible = true;
        }

        if (this.totalElapsedTime > 84500 && !this.lastSmile) {

            if (!this.lastSmile) {

                this.lastSmile = true;

                this.timeTilAnimLeftEye = 2160;
                this.timeLeftCurrentLeftEyeFrame = 70;
                this.leftEye[this.currentLeftEyeFrame].visible = false;
                this.currentLeftEyeFrame = 0;
                this.leftEyeAnimDirection = 1;

                this.timeTilAnimRightEye = 2160;
                this.timeLeftCurrentRightEyeFrame = 70;
                this.rightEye[this.currentRightEyeFrame].visible = false;
                this.currentRightEyeFrame = 0;
                this.rightEyeAnimDirection = 1;
            }
        }

        if (this.totalElapsedTime >= 87250 && this.totalElapsedTime < 87500) {

            let part = (this.totalElapsedTime - 87250) / 250;

            if (this.currentShape != undefined) {

                for (let sprite of this.currentShape.sprites) {

                    sprite.alpha = 1 - part;
                }
            }

            this.grid.fadeNoseContent(1 - part);
        }
        else if (this.totalElapsedTime > 87500) {

            if (this.currentShape != undefined) {

                for (let sprite of this.currentShape.sprites) {

                    Game.app.stage.removeChild(sprite);
                }

                this.currentShape = undefined;
            }

            return;
        }

        if (this.currentShape == undefined) {

            if (this.grid.getSmallestY() > 7) {
                this.currentShape = this.spawnShape();
            }
        }

        this.timeLeftDropGrid -= elapsedTime;

        if (this.timeLeftDropGrid <= 0) {

            this.totalTimeDropGrid = (8750 * 0.9);//  * 0.9 för att kompensera den dubbla tiden första droppen

            this.timeLeftDropGrid += this.totalTimeDropGrid;  

            this.animateNose = true;

            this.score += this.grid.dropRows(this.player);

            this.scoreCounter.setNewScore(this.score, 200);
        }

        if (this.currentShape != undefined) {

            this.timeLeftDropCurrentShape -= elapsedTime;

            if (this.timeLeftDropCurrentShape <= 0) {

                this.timeLeftDropCurrentShape += this.totalTimeDropCurrentShape;

                this.dropCurrentShape();
            }

            if (this.currentShape != undefined) {

                let partTimeLeftCurrentRow = this.timeLeftDropCurrentShape / this.totalTimeDropCurrentShape;
                let alreadyMovedCurrentShape = false;

                var points;

                if (Game.keyboard.current.isPressed(this.rightKey) && !Game.keyboard.last.isPressed(this.rightKey)) {

                    points = this.currentShape.moveRight();

                    if (this.grid.isPosValid(points)) {

                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }

                if (Game.keyboard.current.isPressed(this.leftKey) && !Game.keyboard.last.isPressed(this.leftKey)) {

                    points = this.currentShape.moveLeft();

                    if (this.grid.isPosValid(points)) {

                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }

                if (Game.keyboard.current.isPressed(this.upKey) && !Game.keyboard.last.isPressed(this.upKey)) {

                    points = this.currentShape.rotate(true);

                    if (this.grid.isPosValid(points)) {

                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }

                if (Game.keyboard.current.isPressed(this.downKey) && !Game.keyboard.last.isPressed(this.downKey)) {

                    points = this.currentShape.rotate(true);

                    if (this.grid.isPosValid(points)) {

                        this.currentShape.setPos(this.player, points, partTimeLeftCurrentRow);
                        alreadyMovedCurrentShape = true;
                    }
                }

                if (!alreadyMovedCurrentShape) {

                    this.currentShape.setPos(this.player, this.currentShape.points, partTimeLeftCurrentRow);
                }
            }
        }

        let partTimeLeftGridRow = this.timeLeftDropGrid / this.totalTimeDropGrid;

        this.grid.updateRows(this.player, partTimeLeftGridRow);
    }

    private dropCurrentShape() {

        let points = this.currentShape.drop();

        if (this.grid.isPosValid(points)) {

            this.currentShape.setPos(this.player, points, 1);
        }
        else {

            this.grid.addShape(this.currentShape);

            this.currentShape = undefined;
        }
    }

    private spawnShape() : Shape {

        if (this.spawnBag.length == 0) {

            this.fillSpawnBag();
        }

        let i = MathHelper.randomInt(0, this.spawnBag.length - 1);

        let shape = this.spawnBag[i];

        this.spawnBag.splice(i, 1);

        shape.addSprites(this.player);

        return shape;
    }
}