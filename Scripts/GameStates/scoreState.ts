class ScoreState extends GameState {

    private background: PIXI.Sprite;
    private scoreCounter: ScoreCounter;

    private pressEnter: PIXI.Sprite;

    private spriteMoustacheOnes: PIXI.Sprite;
    private spriteMoustacheTens: PIXI.Sprite;
    private spriteMoustacheHundreds: PIXI.Sprite;
    private spriteMoustacheProcent: PIXI.Sprite;

    private spriteTieOnes: PIXI.Sprite;
    private spriteTieTens: PIXI.Sprite;
    private spriteTieHundreds: PIXI.Sprite;
    private spriteTieProcent: PIXI.Sprite;

    private spriteHatOnes: PIXI.Sprite;
    private spriteHatTens: PIXI.Sprite;
    private spriteHatHundreds: PIXI.Sprite;
    private spriteHatProcent: PIXI.Sprite;

    private spriteOfficeOnes: PIXI.Sprite;
    private spriteOfficeTens: PIXI.Sprite;
    private spriteOfficeHundreds: PIXI.Sprite;
    private spriteOfficeProcent: PIXI.Sprite;

    private spriteWhiskeyOnes: PIXI.Sprite;
    private spriteWhiskeyTens: PIXI.Sprite;
    private spriteWhiskeyHundreds: PIXI.Sprite;
    private spriteWhiskeyProcent: PIXI.Sprite;

    private spriteTotalOnes: PIXI.Sprite;
    private spriteTotalTens: PIXI.Sprite;
    private spriteTotalHundreds: PIXI.Sprite;
    private spriteTotalProcent: PIXI.Sprite;

    private spriteFaceBackground: PIXI.Sprite;
    private spriteFaceNose: PIXI.Sprite;
    private spriteFaceNeck: PIXI.Sprite;
    private spriteFaceEyes: PIXI.Sprite;
    private spriteFaceMoustace: PIXI.Sprite;
    private spriteFaceJaw: PIXI.Sprite;

    public scoreLevelMoustache: number;
    public scoreLevelTie: number;
    public scoreLevelHat: number;
    public scoreLevelOffice: number;
    public scoreLevelWhiskey: number;
    public totalScore: number;

    private scoreCurrentLevel: number;
    private currentLevel: Level;

    private timeTilStartCounting: number;

    private elapsedTimePressEnter: number;

    private lastScoreCounterValue: number;

    constructor(player: number, xOffset: number, upKey: string, downKey: string, leftKey: string, rightKey: string) {

        super(player, xOffset, upKey, downKey, leftKey, rightKey);

        this.stateName = "ScoreState";

        this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);

        this.scoreLevelMoustache = -1;
        this.scoreLevelTie = -1;
        this.scoreLevelHat = -1;
        this.scoreLevelOffice = -1;
        this.scoreLevelWhiskey = -1;
        this.totalScore = 0;

        let boardx = xOffset + 176;

        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["score-bg"].texture);
        this.background.x = boardx;
        this.background.y = 0;

        this.spriteMoustacheOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteMoustacheOnes.x = boardx + 409;
        this.spriteMoustacheOnes.y = 141;
        this.spriteMoustacheOnes.zIndex = 1001;
        this.spriteMoustacheOnes.visible = false;

        this.spriteMoustacheTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteMoustacheTens.x = boardx + 391;
        this.spriteMoustacheTens.y = 141;
        this.spriteMoustacheTens.zIndex = 1001;
        this.spriteMoustacheTens.visible = false;

        this.spriteMoustacheHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteMoustacheHundreds.x = boardx + 373;
        this.spriteMoustacheHundreds.y = 141;
        this.spriteMoustacheHundreds.zIndex = 1001;
        this.spriteMoustacheHundreds.visible = false;

        this.spriteMoustacheProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        this.spriteMoustacheProcent.x = boardx + 427;
        this.spriteMoustacheProcent.y = 143;
        this.spriteMoustacheProcent.zIndex = 1001;
        this.spriteMoustacheProcent.visible = false;


        this.spriteTieOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteTieOnes.x = boardx + 409;
        this.spriteTieOnes.y = 193;
        this.spriteTieOnes.zIndex = 1001;
        this.spriteTieOnes.visible = false;

        this.spriteTieTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteTieTens.x = boardx + 391;
        this.spriteTieTens.y = 193;
        this.spriteTieTens.zIndex = 1001;
        this.spriteTieTens.visible = false;

        this.spriteTieHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteTieHundreds.x = boardx + 373;
        this.spriteTieHundreds.y = 193;
        this.spriteTieHundreds.zIndex = 1001;
        this.spriteTieHundreds.visible = false;

        this.spriteTieProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        this.spriteTieProcent.x = boardx + 427;
        this.spriteTieProcent.y = 195;
        this.spriteTieProcent.zIndex = 1001;
        this.spriteTieProcent.visible = false;


        this.spriteOfficeOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteOfficeOnes.x = boardx + 409;
        this.spriteOfficeOnes.y = 250;
        this.spriteOfficeOnes.zIndex = 1001;
        this.spriteOfficeOnes.visible = false;

        this.spriteOfficeTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteOfficeTens.x = boardx + 391;
        this.spriteOfficeTens.y = 250;
        this.spriteOfficeTens.zIndex = 1001;
        this.spriteOfficeTens.visible = false;

        this.spriteOfficeHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteOfficeHundreds.x = boardx + 373;
        this.spriteOfficeHundreds.y = 250;
        this.spriteOfficeHundreds.zIndex = 1001;
        this.spriteOfficeHundreds.visible = false;

        this.spriteOfficeProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        this.spriteOfficeProcent.x = boardx + 427;
        this.spriteOfficeProcent.y = 252;
        this.spriteOfficeProcent.zIndex = 1001;
        this.spriteOfficeProcent.visible = false;


        this.spriteWhiskeyOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteWhiskeyOnes.x = boardx + 409;
        this.spriteWhiskeyOnes.y = 303;
        this.spriteWhiskeyOnes.zIndex = 1001;
        this.spriteWhiskeyOnes.visible = false;

        this.spriteWhiskeyTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteWhiskeyTens.x = boardx + 391;
        this.spriteWhiskeyTens.y = 303;
        this.spriteWhiskeyTens.zIndex = 1001;
        this.spriteWhiskeyTens.visible = false;

        this.spriteWhiskeyHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteWhiskeyHundreds.x = boardx + 373;
        this.spriteWhiskeyHundreds.y = 303;
        this.spriteWhiskeyHundreds.zIndex = 1001;
        this.spriteWhiskeyHundreds.visible = false;

        this.spriteWhiskeyProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        this.spriteWhiskeyProcent.x = boardx + 427;
        this.spriteWhiskeyProcent.y = 305;
        this.spriteWhiskeyProcent.zIndex = 1001;
        this.spriteWhiskeyProcent.visible = false;


        this.spriteHatOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteHatOnes.x = boardx + 409;
        this.spriteHatOnes.y = 356;
        this.spriteHatOnes.zIndex = 1001;
        this.spriteHatOnes.visible = false;

        this.spriteHatTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteHatTens.x = boardx + 391;
        this.spriteHatTens.y = 356;
        this.spriteHatTens.zIndex = 1001;
        this.spriteHatTens.visible = false;

        this.spriteHatHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteHatHundreds.x = boardx + 373;
        this.spriteHatHundreds.y = 356;
        this.spriteHatHundreds.zIndex = 1001;
        this.spriteHatHundreds.visible = false;

        this.spriteHatProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        this.spriteHatProcent.x = boardx + 427;
        this.spriteHatProcent.y = 358;
        this.spriteHatProcent.zIndex = 1001;
        this.spriteHatProcent.visible = false;


        this.spriteTotalOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteTotalOnes.x = boardx + 404;
        this.spriteTotalOnes.y = 440;
        this.spriteTotalOnes.zIndex = 1001;
        this.spriteTotalOnes.visible = false;

        this.spriteTotalTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteTotalTens.x = boardx + 386;
        this.spriteTotalTens.y = 440;
        this.spriteTotalTens.zIndex = 1001;
        this.spriteTotalTens.visible = false;

        this.spriteTotalHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        this.spriteTotalHundreds.x = boardx + 368;
        this.spriteTotalHundreds.y = 440;
        this.spriteTotalHundreds.zIndex = 1001;
        this.spriteTotalHundreds.visible = false;

        this.spriteTotalProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        this.spriteTotalProcent.x = boardx + 422;
        this.spriteTotalProcent.y = 440;
        this.spriteTotalProcent.zIndex = 1001;
        this.spriteTotalProcent.visible = false;

        let facex = xOffset + 400;
        let facey = 500;

        this.spriteFaceBackground = new PIXI.Sprite(PIXI.Loader.shared.resources["face-background-p" + this.player].texture);
        this.spriteFaceBackground.x = facex;
        this.spriteFaceBackground.y = facey;
        this.spriteFaceBackground.zIndex = 1000;

        this.spriteFaceNeck = new PIXI.Sprite(PIXI.Loader.shared.resources["face-neck1"].texture);
        this.spriteFaceNeck.x = facex;
        this.spriteFaceNeck.y = facey;
        this.spriteFaceNeck.visible = false;
        this.spriteFaceNeck.zIndex = 1001;

        this.spriteFaceJaw = new PIXI.Sprite(PIXI.Loader.shared.resources["face-jaw0"].texture);
        this.spriteFaceJaw.x = facex;
        this.spriteFaceJaw.y = facey;
        this.spriteFaceJaw.zIndex = 1002;

        this.spriteFaceEyes = new PIXI.Sprite(PIXI.Loader.shared.resources["face-eyes0"].texture);
        this.spriteFaceEyes.x = facex;
        this.spriteFaceEyes.y = facey;
        this.spriteFaceEyes.zIndex = 1003;

        this.spriteFaceMoustace = new PIXI.Sprite(PIXI.Loader.shared.resources["face-moustache1-p" + this.player].texture);
        this.spriteFaceMoustace.x = facex;
        this.spriteFaceMoustace.y = facey;
        this.spriteFaceMoustace.visible = false;
        this.spriteFaceMoustace.zIndex = 1004;

        this.spriteFaceNose = new PIXI.Sprite(PIXI.Loader.shared.resources["face-nose0"].texture);
        this.spriteFaceNose.x = facex;
        this.spriteFaceNose.y = facey;
        this.spriteFaceNose.visible = true;
        this.spriteFaceNose.zIndex = 1005;


        this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
        this.pressEnter.x = 858 + 80;
        this.pressEnter.y = 842 + 100;
        this.pressEnter.pivot.x = this.pressEnter.width / 2;
        this.pressEnter.pivot.y = this.pressEnter.height / 2;
        this.pressEnter.zIndex = 1000;
        this.pressEnter.visible = false;
    }

    public beforeOnEnter(currentLevel: Level, scoreCurrentLevel: number): void {

        this.currentLevel = currentLevel;
        this.lastScoreCounterValue = scoreCurrentLevel;

        this.scoreCurrentLevel = scoreCurrentLevel;

        this.scoreCounter.setNewScore(scoreCurrentLevel, 0);

        if (this.currentLevel == Level.Moustache) {

            //  Värdet 0 gör räknaren synlig
            this.scoreLevelMoustache = 0;
        }
        else if (this.currentLevel == Level.Tie) {

            this.scoreLevelTie = 0;
        }
        else if (this.currentLevel == Level.Hat) {

            this.scoreLevelHat = 0;
        }
        else if (this.currentLevel == Level.Office) {

            this.scoreLevelOffice = 0;
        }
        else if (this.currentLevel == Level.Whiskey) {

            this.scoreLevelWhiskey = 0;
        }

        this.updateSprites();
    }

    public onEnter(): void {

        Game.app.stage.addChild(this.background);

        Game.app.stage.addChild(this.spriteMoustacheOnes);
        Game.app.stage.addChild(this.spriteMoustacheTens);
        Game.app.stage.addChild(this.spriteMoustacheHundreds);
        Game.app.stage.addChild(this.spriteMoustacheProcent);

        Game.app.stage.addChild(this.spriteTieOnes);
        Game.app.stage.addChild(this.spriteTieTens);
        Game.app.stage.addChild(this.spriteTieHundreds);
        Game.app.stage.addChild(this.spriteTieProcent);

        Game.app.stage.addChild(this.spriteHatOnes);
        Game.app.stage.addChild(this.spriteHatTens);
        Game.app.stage.addChild(this.spriteHatHundreds);
        Game.app.stage.addChild(this.spriteHatProcent);

        Game.app.stage.addChild(this.spriteOfficeOnes);
        Game.app.stage.addChild(this.spriteOfficeTens);
        Game.app.stage.addChild(this.spriteOfficeHundreds);
        Game.app.stage.addChild(this.spriteOfficeProcent);

        Game.app.stage.addChild(this.spriteWhiskeyOnes);
        Game.app.stage.addChild(this.spriteWhiskeyTens);
        Game.app.stage.addChild(this.spriteWhiskeyHundreds);
        Game.app.stage.addChild(this.spriteWhiskeyProcent);

        Game.app.stage.addChild(this.spriteTotalOnes);
        Game.app.stage.addChild(this.spriteTotalTens);
        Game.app.stage.addChild(this.spriteTotalHundreds);
        Game.app.stage.addChild(this.spriteTotalProcent);

        Game.app.stage.addChild(this.spriteFaceBackground);
        Game.app.stage.addChild(this.spriteFaceNeck);
        Game.app.stage.addChild(this.spriteFaceJaw);
        Game.app.stage.addChild(this.spriteFaceEyes);
        Game.app.stage.addChild(this.spriteFaceMoustace);
        Game.app.stage.addChild(this.spriteFaceNose);

        this.pressEnter.visible = false;
        Game.app.stage.addChild(this.pressEnter);

        this.scoreCounter.onEnter();

        this.timeTilStartCounting = 2000;
        this.elapsedTimePressEnter = 0;

        Game.sceneTransition.startShrinking();
    }

    public onExit(): void {

        Game.app.stage.removeChild(this.background);

        Game.app.stage.removeChild(this.spriteMoustacheOnes);
        Game.app.stage.removeChild(this.spriteMoustacheTens);
        Game.app.stage.removeChild(this.spriteMoustacheHundreds);
        Game.app.stage.removeChild(this.spriteMoustacheProcent);

        Game.app.stage.removeChild(this.spriteTieOnes);
        Game.app.stage.removeChild(this.spriteTieTens);
        Game.app.stage.removeChild(this.spriteTieHundreds);
        Game.app.stage.removeChild(this.spriteTieProcent);

        Game.app.stage.removeChild(this.spriteHatOnes);
        Game.app.stage.removeChild(this.spriteHatTens);
        Game.app.stage.removeChild(this.spriteHatHundreds);
        Game.app.stage.removeChild(this.spriteHatProcent);

        Game.app.stage.removeChild(this.spriteOfficeOnes);
        Game.app.stage.removeChild(this.spriteOfficeTens);
        Game.app.stage.removeChild(this.spriteOfficeHundreds);
        Game.app.stage.removeChild(this.spriteOfficeProcent);

        Game.app.stage.removeChild(this.spriteWhiskeyOnes);
        Game.app.stage.removeChild(this.spriteWhiskeyTens);
        Game.app.stage.removeChild(this.spriteWhiskeyHundreds);
        Game.app.stage.removeChild(this.spriteWhiskeyProcent);

        Game.app.stage.removeChild(this.spriteTotalOnes);
        Game.app.stage.removeChild(this.spriteTotalTens);
        Game.app.stage.removeChild(this.spriteTotalHundreds);
        Game.app.stage.removeChild(this.spriteTotalProcent);

        Game.app.stage.removeChild(this.spriteFaceBackground);
        Game.app.stage.removeChild(this.spriteFaceNeck);
        Game.app.stage.removeChild(this.spriteFaceJaw);
        Game.app.stage.removeChild(this.spriteFaceEyes);
        Game.app.stage.removeChild(this.spriteFaceMoustace);
        Game.app.stage.removeChild(this.spriteFaceNose);

        Game.app.stage.removeChild(this.pressEnter);

        this.scoreCounter.onExit();

        if (Game.twoPlayerGame) {

            if (this.player == 1) {

                if (this.currentLevel == Level.Moustache) {

                    Game.currentStatePlayer1 = new LevelTie(1, 0, 'w', 's', 'a', 'd');
                }
                else if (this.currentLevel == Level.Tie) {

                    Game.currentStatePlayer1 = new LevelOffice(1, 0, 'w', 's', 'a', 'd');
                }
                else if (this.currentLevel == Level.Office) {

                    Game.currentStatePlayer1 = new LevelWhiskey(1, 15, 'w', 's', 'a', 'd');
                }
                else if (this.currentLevel == Level.Whiskey) {

                    Game.currentStatePlayer1 = new LevelHat(1, 15, 'w', 's', 'a', 'd');
                }
                else if (this.currentLevel == Level.Hat) {

                    Game.currentStatePlayer1 = new LevelEnd(0, 'w', 's', 'a', 'd');
                }

                if (Game.currentStatePlayer2 != null && Game.currentStatePlayer2.stateName == this.stateName) {

                    Game.currentStatePlayer2.onExit();
                }

                Game.currentStatePlayer1.onEnter();

                if (Game.currentStatePlayer2 != null) {

                    Game.currentStatePlayer2.onEnter();
                }
            }
            else {

                if (this.currentLevel == Level.Moustache) {

                    Game.currentStatePlayer2 = new LevelTie(2, 960, 'arrowup', 'arrowdown', 'arrowleft', 'arrowright');
                }
                else if (this.currentLevel == Level.Tie) {

                    Game.currentStatePlayer2 = new LevelOffice(2, 960 + 30, 'arrowup', 'arrowdown', 'arrowleft', 'arrowright');
                }
                else if (this.currentLevel == Level.Office) {

                    Game.currentStatePlayer2 = new LevelWhiskey(2, 960 + 15, 'arrowup', 'arrowdown', 'arrowleft', 'arrowright');
                }
                else if (this.currentLevel == Level.Whiskey) {

                    Game.currentStatePlayer2 = new LevelHat(2, 960 + 15, 'arrowup', 'arrowdown', 'arrowleft', 'arrowright');
                }
                else if (this.currentLevel == Level.Hat) {

                    Game.currentStatePlayer2 = null;
                }
            }
        }
        else {

            if (this.currentLevel == Level.Moustache) {

                Game.currentStatePlayer1 = new LevelTie(1, 480, 'w', 's', 'a', 'd');
            }
            else if (this.currentLevel == Level.Tie) {

                Game.currentStatePlayer1 = new LevelOffice(1, 480 + 15, 'w', 's', 'a', 'd');
            }
            else if (this.currentLevel == Level.Office) {

                Game.currentStatePlayer1 = new LevelWhiskey(1, 480 + 15, 'w', 's', 'a', 'd');
            }
            else if (this.currentLevel == Level.Whiskey) {

                Game.currentStatePlayer1 = new LevelHat(1, 480 + 15, 'w', 's', 'a', 'd');
            }
            else if (this.currentLevel == Level.Hat) {

                Game.currentStatePlayer1 = new LevelEnd(0, 'w', 's', 'a', 'd');
            }

            Game.currentStatePlayer1.onEnter();
        }
    }

    public update(elapsedTime: number): void {

        // elapsedTime in ms

        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {

            if (this.player == 1) {

                Game.sceneTransition.update(elapsedTime);
            }

            if (Game.sceneTransition.isDone()) {

                if (this.player == 1) {

                    Game.soundPlayer.musicScoreScreen.play();
                }
            }

            return;
        }

        if (Game.sceneTransition.isGrowing && this.player == 1) {

            if (this.player == 1) {

                Game.sceneTransition.update(elapsedTime);
            }

            if (Game.sceneTransition.isDone()) {

                this.onExit();
                return;
            }
        }

        if (this.timeTilStartCounting > 0) {

            this.timeTilStartCounting -= elapsedTime;

            if (this.timeTilStartCounting <= 0) {

                elapsedTime += this.timeTilStartCounting;

                this.scoreCounter.setNewScore(0, 100);
            }
            else {

                return;
            }
        }

        this.scoreCounter.update(elapsedTime);

        if (Game.scoreStatePlayer1.scoreCounter.isCounting() == false &&
            (Game.twoPlayerGame == false || Game.scoreStatePlayer2.scoreCounter.isCounting() == false)) {

            this.pressEnter.visible = true;

            this.elapsedTimePressEnter += elapsedTime;

            this.pressEnter.alpha = this.elapsedTimePressEnter / 300;

            if (this.pressEnter.alpha > 1) {

                this.pressEnter.alpha = 1;
            }

            this.pressEnter.scale.x = 1 - 0.03 * Math.cos(2 * Math.PI * this.elapsedTimePressEnter / 2000);
            this.pressEnter.scale.y = 1 - 0.03 * Math.cos(2 * Math.PI * this.elapsedTimePressEnter / 2000);

            if (!Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {

                if (this.currentLevel == Level.Hat) {

                    this.onExit();
                }

                if (!Game.sceneTransition.isGrowing) {

                    Game.sceneTransition.startGrowing();

                    if (Game.soundPlayer.musicScoreScreen.playing) {

                        Game.soundPlayer.musicScoreScreen.fade(1, 0, 2500);
                    }
                }
            }

            //  Waiting for the player to press enter
            return;
        }

        this.scoreCounter.update(elapsedTime);

        if (this.currentLevel == Level.Moustache) {

            this.scoreLevelMoustache = this.scoreCurrentLevel - this.scoreCounter.getScore();

            let img = this.getMoustacheImg();

            if (img != null) {

                this.spriteFaceMoustace.texture = PIXI.Loader.shared.resources[img].texture;
                this.spriteFaceMoustace.visible = true;
            }
            else {

                this.spriteFaceMoustace.visible = false;
            }
        }
        else if (this.currentLevel == Level.Tie) {

            this.scoreLevelTie = this.scoreCurrentLevel - this.scoreCounter.getScore();

            let img = this.getNeckImg();

            if (img != null) {

                this.spriteFaceNeck.texture = PIXI.Loader.shared.resources[img].texture;
                this.spriteFaceNeck.visible = true;
            }
            else {

                this.spriteFaceNeck.visible = false;
            }
        }
        else if (this.currentLevel == Level.Hat) {

            this.scoreLevelHat = this.scoreCurrentLevel - this.scoreCounter.getScore();

            let img = this.getEyesImg();
            this.spriteFaceEyes.texture = PIXI.Loader.shared.resources[img].texture;
        }
        else if (this.currentLevel == Level.Office) {

            this.scoreLevelOffice = this.scoreCurrentLevel - this.scoreCounter.getScore();

            let img = this.getJawImg();
            this.spriteFaceJaw.texture = PIXI.Loader.shared.resources[img].texture;
        }
        else if (this.currentLevel == Level.Whiskey) {

            this.scoreLevelWhiskey = this.scoreCurrentLevel - this.scoreCounter.getScore();

            let img = this.getNoseImg();

            if (img != null) {

                this.spriteFaceNose.texture = PIXI.Loader.shared.resources[img].texture;
                this.spriteFaceNose.visible = true;
            }
            else {

                this.spriteFaceNose.visible = false;
            }
        }

        let scoreTotal = 0;

        scoreTotal += this.scoreLevelMoustache > -1 ? this.scoreLevelMoustache : 0;
        scoreTotal += this.scoreLevelTie > -1 ? this.scoreLevelTie : 0;
        scoreTotal += this.scoreLevelHat > -1 ? this.scoreLevelHat : 0;
        scoreTotal += this.scoreLevelOffice > -1 ? this.scoreLevelOffice : 0;
        scoreTotal += this.scoreLevelWhiskey > -1 ? this.scoreLevelWhiskey : 0;

        let maxScore = 0;
        maxScore += 100;    //  Max score on LevelMoustache is 100
        maxScore += 100;    //  Max score on LevelTie is 100
        maxScore += 100;    //  Max score on LevelHat is 100
        maxScore += 100;    //  Max score on LevelOffice is 100
        maxScore += 100;    //  Max score on LevelWhiskey is 100

        this.totalScore = Math.floor(100 * scoreTotal / maxScore);

        this.updateSprites();
    }

    private updateSprites() {

        if (this.scoreLevelMoustache > -1) {

            let hundreds = Math.floor(this.scoreLevelMoustache / 100);
            let tens = Math.floor((this.scoreLevelMoustache - hundreds * 100) / 10);
            let ones = this.scoreLevelMoustache - hundreds * 100 - tens * 10;

            this.spriteMoustacheProcent.visible = true;

            this.spriteMoustacheOnes.texture = PIXI.Loader.shared.resources["number-" + ones + "-white"].texture;
            this.spriteMoustacheOnes.visible = true;

            if (tens > 0 || hundreds > 0) {

                this.spriteMoustacheTens.texture = PIXI.Loader.shared.resources["number-" + tens + "-white"].texture;
                this.spriteMoustacheTens.visible = true;
            }
            else {

                this.spriteMoustacheTens.visible = false;
            }

            if (hundreds > 0) {

                this.spriteMoustacheHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds + "-white"].texture;
                this.spriteMoustacheHundreds.visible = true;
            }
            else {

                this.spriteMoustacheHundreds.visible = false;
            }
        }
        else {

            this.spriteMoustacheOnes.visible = false;
            this.spriteMoustacheTens.visible = false;
            this.spriteMoustacheHundreds.visible = false;
            this.spriteMoustacheProcent.visible = false;
        }

        if (this.scoreLevelTie > -1) {

            let hundreds = Math.floor(this.scoreLevelTie / 100);
            let tens = Math.floor((this.scoreLevelTie - hundreds * 100) / 10);
            let ones = this.scoreLevelTie - hundreds * 100 - tens * 10;

            this.spriteTieProcent.visible = true;

            this.spriteTieOnes.texture = PIXI.Loader.shared.resources["number-" + ones + "-white"].texture;
            this.spriteTieOnes.visible = true;

            if (tens > 0 || hundreds > 0) {

                this.spriteTieTens.texture = PIXI.Loader.shared.resources["number-" + tens + "-white"].texture;
                this.spriteTieTens.visible = true;
            }
            else {

                this.spriteTieTens.visible = false;
            }

            if (hundreds > 0) {

                this.spriteTieHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds + "-white"].texture;
                this.spriteTieHundreds.visible = true;
            }
            else {

                this.spriteTieHundreds.visible = false;
            }
        }
        else {

            this.spriteTieOnes.visible = false;
            this.spriteTieTens.visible = false;
            this.spriteTieHundreds.visible = false;
            this.spriteTieProcent.visible = false;
        }

        if (this.scoreLevelHat > -1) {

            let hundreds = Math.floor(this.scoreLevelHat / 100);
            let tens = Math.floor((this.scoreLevelHat - hundreds * 100) / 10);
            let ones = this.scoreLevelHat - hundreds * 100 - tens * 10;

            this.spriteHatProcent.visible = true;

            this.spriteHatOnes.texture = PIXI.Loader.shared.resources["number-" + ones + "-white"].texture;
            this.spriteHatOnes.visible = true;

            if (tens > 0 || hundreds > 0) {

                this.spriteHatTens.texture = PIXI.Loader.shared.resources["number-" + tens + "-white"].texture;
                this.spriteHatTens.visible = true;
            }
            else {

                this.spriteHatTens.visible = false;
            }

            if (hundreds > 0) {

                this.spriteHatHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds + "-white"].texture;
                this.spriteHatHundreds.visible = true;
            }
            else {

                this.spriteHatHundreds.visible = false;
            }
        }
        else {

            this.spriteHatOnes.visible = false;
            this.spriteHatTens.visible = false;
            this.spriteHatHundreds.visible = false;
            this.spriteHatProcent.visible = false;
        }

        if (this.scoreLevelOffice > -1) {

            let hundreds = Math.floor(this.scoreLevelOffice / 100);
            let tens = Math.floor((this.scoreLevelOffice - hundreds * 100) / 10);
            let ones = this.scoreLevelOffice - hundreds * 100 - tens * 10;

            this.spriteOfficeProcent.visible = true;

            this.spriteOfficeOnes.texture = PIXI.Loader.shared.resources["number-" + ones + "-white"].texture;
            this.spriteOfficeOnes.visible = true;

            if (tens > 0 || hundreds > 0) {

                this.spriteOfficeTens.texture = PIXI.Loader.shared.resources["number-" + tens + "-white"].texture;
                this.spriteOfficeTens.visible = true;
            }
            else {

                this.spriteOfficeTens.visible = false;
            }

            if (hundreds > 0) {

                this.spriteOfficeHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds + "-white"].texture;
                this.spriteOfficeHundreds.visible = true;
            }
            else {

                this.spriteOfficeHundreds.visible = false;
            }
        }
        else {

            this.spriteOfficeOnes.visible = false;
            this.spriteOfficeTens.visible = false;
            this.spriteOfficeHundreds.visible = false;
            this.spriteOfficeProcent.visible = false;
        }

        if (this.scoreLevelWhiskey > -1) {

            let hundreds = Math.floor(this.scoreLevelWhiskey / 100);
            let tens = Math.floor((this.scoreLevelWhiskey - hundreds * 100) / 10);
            let ones = this.scoreLevelWhiskey - hundreds * 100 - tens * 10;

            this.spriteWhiskeyProcent.visible = true;

            this.spriteWhiskeyOnes.texture = PIXI.Loader.shared.resources["number-" + ones + "-white"].texture;
            this.spriteWhiskeyOnes.visible = true;

            if (tens > 0 || hundreds > 0) {

                this.spriteWhiskeyTens.texture = PIXI.Loader.shared.resources["number-" + tens + "-white"].texture;
                this.spriteWhiskeyTens.visible = true;
            }
            else {

                this.spriteWhiskeyTens.visible = false;
            }

            if (hundreds > 0) {

                this.spriteWhiskeyHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds + "-white"].texture;
                this.spriteWhiskeyHundreds.visible = true;
            }
            else {

                this.spriteWhiskeyHundreds.visible = false;
            }
        }
        else {

            this.spriteWhiskeyOnes.visible = false;
            this.spriteWhiskeyTens.visible = false;
            this.spriteWhiskeyHundreds.visible = false;
            this.spriteWhiskeyProcent.visible = false;
        }

        let hundreds = Math.floor(this.totalScore / 100);
        let tens = Math.floor(this.totalScore / 10);
        let ones = this.totalScore - hundreds * 100 - tens * 10;

        this.spriteTotalProcent.visible = true;

        this.spriteTotalOnes.texture = PIXI.Loader.shared.resources["number-" + ones + "-white"].texture;
        this.spriteTotalOnes.visible = true;

        if (tens > 0 || hundreds > 0) {

            this.spriteTotalTens.texture = PIXI.Loader.shared.resources["number-" + tens + "-white"].texture;
            this.spriteTotalTens.visible = true;
        }
        else {

            this.spriteTotalTens.visible = false;
        }

        if (hundreds > 0) {

            this.spriteTotalHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds + "-white"].texture;
            this.spriteTotalHundreds.visible = true;
        }
        else {

            this.spriteTotalHundreds.visible = false;
        }
    }

    public getMoustacheImg() : string {

        if (this.scoreLevelMoustache < 50) {

            return null;
        }
        else if (this.scoreLevelMoustache < 60) {

            return "face-moustache1-p" + this.player;
        }
        else if (this.scoreLevelMoustache < 70) {

            return "face-moustache2-p" + this.player;
        }
        else if (this.scoreLevelMoustache < 80) {

            return "face-moustache3-p" + this.player;
        }
        else if (this.scoreLevelMoustache < 90) {

            return "face-moustache4-p" + this.player;
        }
        else {

            return "face-moustache5-p" + this.player;
        }
    }

    public getEyesImg(): string {

        if (this.scoreLevelHat < 50) {

            return "face-eyes0";
        }
        else if (this.scoreLevelHat < 60) {

            return "face-eyes1";
        }
        else if (this.scoreLevelHat < 70) {

            return "face-eyes2";
        }
        else if (this.scoreLevelHat < 80) {

            return "face-eyes3";
        }
        else {

            return "face-eyes4";
        }
    }

    public getJawImg(): string {

        if (this.scoreLevelOffice < 50) {

            return "face-jaw0";
        }
        else if (this.scoreLevelOffice < 60) {

            return "face-jaw1";
        }
        else if (this.scoreLevelOffice < 70) {

            return "face-jaw2";
        }
        else if (this.scoreLevelOffice < 80) {

            return "face-jaw3";
        }
        else {

            return "face-jaw4";
        }
    }

    public getNeckImg(): string {

        if (this.scoreLevelTie < 50) {

            return null;
        }
        else if (this.scoreLevelTie < 60) {

            return "face-neck1";
        }
        else if (this.scoreLevelTie < 70) {

            return "face-neck2";
        }
        else if (this.scoreLevelTie < 80) {

            return "face-neck3";
        }
        else {

            return "face-neck4";
        }
    }

    public getNoseImg(): string {

        if (this.scoreLevelWhiskey < 20) {

            return "face-nose0";
        }
        else if (this.scoreLevelWhiskey < 40) {

            return "face-nose1";
        }
        else if (this.scoreLevelWhiskey < 60) {

            return "face-nose2";
        }
        else if (this.scoreLevelWhiskey < 80) {

            return "face-nose3";
        }
        else {

            return "face-nose4";
        }
    }
}

enum Level {
    Moustache,
    Tie,
    Hat,
    Office,
    Whiskey
}