var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ScoreState = /** @class */ (function (_super) {
    __extends(ScoreState, _super);
    function ScoreState(player, xOffset, upKey, downKey, leftKey, rightKey) {
        var _this = _super.call(this, player, xOffset, upKey, downKey, leftKey, rightKey) || this;
        _this.stateName = "ScoreState";
        _this.scoreCounter = new ScoreCounter(xOffset, 4, 16, 0);
        _this.scoreLevelMoustache = -1;
        _this.scoreLevelTie = -1;
        _this.scoreLevelHat = -1;
        _this.scoreLevelOffice = -1;
        _this.scoreLevelWhiskey = -1;
        _this.totalScore = 0;
        var boardx = xOffset + 176;
        _this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["score-bg"].texture);
        _this.background.x = boardx;
        _this.background.y = 0;
        _this.spriteMoustacheOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteMoustacheOnes.x = boardx + 409;
        _this.spriteMoustacheOnes.y = 141;
        _this.spriteMoustacheOnes.zIndex = 1001;
        _this.spriteMoustacheOnes.visible = false;
        _this.spriteMoustacheTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteMoustacheTens.x = boardx + 391;
        _this.spriteMoustacheTens.y = 141;
        _this.spriteMoustacheTens.zIndex = 1001;
        _this.spriteMoustacheTens.visible = false;
        _this.spriteMoustacheHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteMoustacheHundreds.x = boardx + 373;
        _this.spriteMoustacheHundreds.y = 141;
        _this.spriteMoustacheHundreds.zIndex = 1001;
        _this.spriteMoustacheHundreds.visible = false;
        _this.spriteMoustacheProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        _this.spriteMoustacheProcent.x = boardx + 427;
        _this.spriteMoustacheProcent.y = 143;
        _this.spriteMoustacheProcent.zIndex = 1001;
        _this.spriteMoustacheProcent.visible = false;
        _this.spriteTieOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteTieOnes.x = boardx + 409;
        _this.spriteTieOnes.y = 193;
        _this.spriteTieOnes.zIndex = 1001;
        _this.spriteTieOnes.visible = false;
        _this.spriteTieTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteTieTens.x = boardx + 391;
        _this.spriteTieTens.y = 193;
        _this.spriteTieTens.zIndex = 1001;
        _this.spriteTieTens.visible = false;
        _this.spriteTieHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteTieHundreds.x = boardx + 373;
        _this.spriteTieHundreds.y = 193;
        _this.spriteTieHundreds.zIndex = 1001;
        _this.spriteTieHundreds.visible = false;
        _this.spriteTieProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        _this.spriteTieProcent.x = boardx + 427;
        _this.spriteTieProcent.y = 195;
        _this.spriteTieProcent.zIndex = 1001;
        _this.spriteTieProcent.visible = false;
        _this.spriteOfficeOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteOfficeOnes.x = boardx + 409;
        _this.spriteOfficeOnes.y = 250;
        _this.spriteOfficeOnes.zIndex = 1001;
        _this.spriteOfficeOnes.visible = false;
        _this.spriteOfficeTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteOfficeTens.x = boardx + 391;
        _this.spriteOfficeTens.y = 250;
        _this.spriteOfficeTens.zIndex = 1001;
        _this.spriteOfficeTens.visible = false;
        _this.spriteOfficeHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteOfficeHundreds.x = boardx + 373;
        _this.spriteOfficeHundreds.y = 250;
        _this.spriteOfficeHundreds.zIndex = 1001;
        _this.spriteOfficeHundreds.visible = false;
        _this.spriteOfficeProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        _this.spriteOfficeProcent.x = boardx + 427;
        _this.spriteOfficeProcent.y = 252;
        _this.spriteOfficeProcent.zIndex = 1001;
        _this.spriteOfficeProcent.visible = false;
        _this.spriteWhiskeyOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteWhiskeyOnes.x = boardx + 409;
        _this.spriteWhiskeyOnes.y = 303;
        _this.spriteWhiskeyOnes.zIndex = 1001;
        _this.spriteWhiskeyOnes.visible = false;
        _this.spriteWhiskeyTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteWhiskeyTens.x = boardx + 391;
        _this.spriteWhiskeyTens.y = 303;
        _this.spriteWhiskeyTens.zIndex = 1001;
        _this.spriteWhiskeyTens.visible = false;
        _this.spriteWhiskeyHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteWhiskeyHundreds.x = boardx + 373;
        _this.spriteWhiskeyHundreds.y = 303;
        _this.spriteWhiskeyHundreds.zIndex = 1001;
        _this.spriteWhiskeyHundreds.visible = false;
        _this.spriteWhiskeyProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        _this.spriteWhiskeyProcent.x = boardx + 427;
        _this.spriteWhiskeyProcent.y = 305;
        _this.spriteWhiskeyProcent.zIndex = 1001;
        _this.spriteWhiskeyProcent.visible = false;
        _this.spriteHatOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteHatOnes.x = boardx + 409;
        _this.spriteHatOnes.y = 356;
        _this.spriteHatOnes.zIndex = 1001;
        _this.spriteHatOnes.visible = false;
        _this.spriteHatTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteHatTens.x = boardx + 391;
        _this.spriteHatTens.y = 356;
        _this.spriteHatTens.zIndex = 1001;
        _this.spriteHatTens.visible = false;
        _this.spriteHatHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteHatHundreds.x = boardx + 373;
        _this.spriteHatHundreds.y = 356;
        _this.spriteHatHundreds.zIndex = 1001;
        _this.spriteHatHundreds.visible = false;
        _this.spriteHatProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        _this.spriteHatProcent.x = boardx + 427;
        _this.spriteHatProcent.y = 358;
        _this.spriteHatProcent.zIndex = 1001;
        _this.spriteHatProcent.visible = false;
        _this.spriteTotalOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteTotalOnes.x = boardx + 404;
        _this.spriteTotalOnes.y = 440;
        _this.spriteTotalOnes.zIndex = 1001;
        _this.spriteTotalOnes.visible = false;
        _this.spriteTotalTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteTotalTens.x = boardx + 386;
        _this.spriteTotalTens.y = 440;
        _this.spriteTotalTens.zIndex = 1001;
        _this.spriteTotalTens.visible = false;
        _this.spriteTotalHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0-white"].texture);
        _this.spriteTotalHundreds.x = boardx + 368;
        _this.spriteTotalHundreds.y = 440;
        _this.spriteTotalHundreds.zIndex = 1001;
        _this.spriteTotalHundreds.visible = false;
        _this.spriteTotalProcent = new PIXI.Sprite(PIXI.Loader.shared.resources["procent-white"].texture);
        _this.spriteTotalProcent.x = boardx + 422;
        _this.spriteTotalProcent.y = 440;
        _this.spriteTotalProcent.zIndex = 1001;
        _this.spriteTotalProcent.visible = false;
        var facex = xOffset + 400;
        var facey = 500;
        _this.spriteFaceBackground = new PIXI.Sprite(PIXI.Loader.shared.resources["face-background-p" + _this.player].texture);
        _this.spriteFaceBackground.x = facex;
        _this.spriteFaceBackground.y = facey;
        _this.spriteFaceBackground.zIndex = 1000;
        _this.spriteFaceNeck = new PIXI.Sprite(PIXI.Loader.shared.resources["face-neck1"].texture);
        _this.spriteFaceNeck.x = facex;
        _this.spriteFaceNeck.y = facey;
        _this.spriteFaceNeck.visible = false;
        _this.spriteFaceNeck.zIndex = 1001;
        _this.spriteFaceJaw = new PIXI.Sprite(PIXI.Loader.shared.resources["face-jaw0"].texture);
        _this.spriteFaceJaw.x = facex;
        _this.spriteFaceJaw.y = facey;
        _this.spriteFaceJaw.zIndex = 1002;
        _this.spriteFaceEyes = new PIXI.Sprite(PIXI.Loader.shared.resources["face-eyes0"].texture);
        _this.spriteFaceEyes.x = facex;
        _this.spriteFaceEyes.y = facey;
        _this.spriteFaceEyes.zIndex = 1003;
        _this.spriteFaceMoustace = new PIXI.Sprite(PIXI.Loader.shared.resources["face-moustache1-p" + _this.player].texture);
        _this.spriteFaceMoustace.x = facex;
        _this.spriteFaceMoustace.y = facey;
        _this.spriteFaceMoustace.visible = false;
        _this.spriteFaceMoustace.zIndex = 1004;
        _this.spriteFaceNose = new PIXI.Sprite(PIXI.Loader.shared.resources["face-nose0"].texture);
        _this.spriteFaceNose.x = facex;
        _this.spriteFaceNose.y = facey;
        _this.spriteFaceNose.visible = true;
        _this.spriteFaceNose.zIndex = 1005;
        _this.pressEnter = new PIXI.Sprite(PIXI.Loader.shared.resources["enter"].texture);
        _this.pressEnter.x = 858 + 80;
        _this.pressEnter.y = 842 + 100;
        _this.pressEnter.pivot.x = _this.pressEnter.width / 2;
        _this.pressEnter.pivot.y = _this.pressEnter.height / 2;
        _this.pressEnter.zIndex = 2000;
        _this.pressEnter.visible = false;
        return _this;
    }
    ScoreState.prototype.beforeOnEnter = function (currentLevel, scoreCurrentLevel) {
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
    };
    ScoreState.prototype.onEnter = function () {
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
    };
    ScoreState.prototype.onExit = function () {
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
    };
    ScoreState.prototype.update = function (elapsedTime) {
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
                    if (Game.soundPlayer.musicScoreScreen.playing()) {
                        Game.soundPlayer.musicScoreScreen.fade(1, 0, 500);
                    }
                    this.onExit();
                }
                else if (!Game.sceneTransition.isGrowing) {
                    Game.sceneTransition.startGrowing();
                    if (Game.soundPlayer.musicScoreScreen.playing()) {
                        Game.soundPlayer.musicScoreScreen.fade(1, 0, 500);
                    }
                }
            }
            //  Waiting for the player to press enter
            return;
        }
        this.scoreCounter.update(elapsedTime);
        if (this.currentLevel == Level.Moustache) {
            this.scoreLevelMoustache = this.scoreCurrentLevel - this.scoreCounter.getScore();
            var img = this.getMoustacheImg();
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
            var img = this.getNeckImg();
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
            var img = this.getEyesImg();
            this.spriteFaceEyes.texture = PIXI.Loader.shared.resources[img].texture;
        }
        else if (this.currentLevel == Level.Office) {
            this.scoreLevelOffice = this.scoreCurrentLevel - this.scoreCounter.getScore();
            var img = this.getJawImg();
            this.spriteFaceJaw.texture = PIXI.Loader.shared.resources[img].texture;
        }
        else if (this.currentLevel == Level.Whiskey) {
            this.scoreLevelWhiskey = this.scoreCurrentLevel - this.scoreCounter.getScore();
            var img = this.getNoseImg();
            if (img != null) {
                this.spriteFaceNose.texture = PIXI.Loader.shared.resources[img].texture;
                this.spriteFaceNose.visible = true;
            }
            else {
                this.spriteFaceNose.visible = false;
            }
        }
        var scoreTotal = 0;
        scoreTotal += this.scoreLevelMoustache > -1 ? this.scoreLevelMoustache : 0;
        scoreTotal += this.scoreLevelTie > -1 ? this.scoreLevelTie : 0;
        scoreTotal += this.scoreLevelHat > -1 ? this.scoreLevelHat : 0;
        scoreTotal += this.scoreLevelOffice > -1 ? this.scoreLevelOffice : 0;
        scoreTotal += this.scoreLevelWhiskey > -1 ? this.scoreLevelWhiskey : 0;
        var maxScore = 0;
        maxScore += 100; //  Max score on LevelMoustache is 100
        maxScore += 100; //  Max score on LevelTie is 100
        maxScore += 100; //  Max score on LevelHat is 100
        maxScore += 100; //  Max score on LevelOffice is 100
        maxScore += 100; //  Max score on LevelWhiskey is 100
        this.totalScore = Math.floor(100 * scoreTotal / maxScore);
        this.updateSprites();
    };
    ScoreState.prototype.updateSprites = function () {
        if (this.scoreLevelMoustache > -1) {
            var hundreds_1 = Math.floor(this.scoreLevelMoustache / 100);
            var tens_1 = Math.floor((this.scoreLevelMoustache - hundreds_1 * 100) / 10);
            var ones_1 = this.scoreLevelMoustache - hundreds_1 * 100 - tens_1 * 10;
            this.spriteMoustacheProcent.visible = true;
            this.spriteMoustacheOnes.texture = PIXI.Loader.shared.resources["number-" + ones_1 + "-white"].texture;
            this.spriteMoustacheOnes.visible = true;
            if (tens_1 > 0 || hundreds_1 > 0) {
                this.spriteMoustacheTens.texture = PIXI.Loader.shared.resources["number-" + tens_1 + "-white"].texture;
                this.spriteMoustacheTens.visible = true;
            }
            else {
                this.spriteMoustacheTens.visible = false;
            }
            if (hundreds_1 > 0) {
                this.spriteMoustacheHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds_1 + "-white"].texture;
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
            var hundreds_2 = Math.floor(this.scoreLevelTie / 100);
            var tens_2 = Math.floor((this.scoreLevelTie - hundreds_2 * 100) / 10);
            var ones_2 = this.scoreLevelTie - hundreds_2 * 100 - tens_2 * 10;
            this.spriteTieProcent.visible = true;
            this.spriteTieOnes.texture = PIXI.Loader.shared.resources["number-" + ones_2 + "-white"].texture;
            this.spriteTieOnes.visible = true;
            if (tens_2 > 0 || hundreds_2 > 0) {
                this.spriteTieTens.texture = PIXI.Loader.shared.resources["number-" + tens_2 + "-white"].texture;
                this.spriteTieTens.visible = true;
            }
            else {
                this.spriteTieTens.visible = false;
            }
            if (hundreds_2 > 0) {
                this.spriteTieHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds_2 + "-white"].texture;
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
            var hundreds_3 = Math.floor(this.scoreLevelHat / 100);
            var tens_3 = Math.floor((this.scoreLevelHat - hundreds_3 * 100) / 10);
            var ones_3 = this.scoreLevelHat - hundreds_3 * 100 - tens_3 * 10;
            this.spriteHatProcent.visible = true;
            this.spriteHatOnes.texture = PIXI.Loader.shared.resources["number-" + ones_3 + "-white"].texture;
            this.spriteHatOnes.visible = true;
            if (tens_3 > 0 || hundreds_3 > 0) {
                this.spriteHatTens.texture = PIXI.Loader.shared.resources["number-" + tens_3 + "-white"].texture;
                this.spriteHatTens.visible = true;
            }
            else {
                this.spriteHatTens.visible = false;
            }
            if (hundreds_3 > 0) {
                this.spriteHatHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds_3 + "-white"].texture;
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
            var hundreds_4 = Math.floor(this.scoreLevelOffice / 100);
            var tens_4 = Math.floor((this.scoreLevelOffice - hundreds_4 * 100) / 10);
            var ones_4 = this.scoreLevelOffice - hundreds_4 * 100 - tens_4 * 10;
            this.spriteOfficeProcent.visible = true;
            this.spriteOfficeOnes.texture = PIXI.Loader.shared.resources["number-" + ones_4 + "-white"].texture;
            this.spriteOfficeOnes.visible = true;
            if (tens_4 > 0 || hundreds_4 > 0) {
                this.spriteOfficeTens.texture = PIXI.Loader.shared.resources["number-" + tens_4 + "-white"].texture;
                this.spriteOfficeTens.visible = true;
            }
            else {
                this.spriteOfficeTens.visible = false;
            }
            if (hundreds_4 > 0) {
                this.spriteOfficeHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds_4 + "-white"].texture;
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
            var hundreds_5 = Math.floor(this.scoreLevelWhiskey / 100);
            var tens_5 = Math.floor((this.scoreLevelWhiskey - hundreds_5 * 100) / 10);
            var ones_5 = this.scoreLevelWhiskey - hundreds_5 * 100 - tens_5 * 10;
            this.spriteWhiskeyProcent.visible = true;
            this.spriteWhiskeyOnes.texture = PIXI.Loader.shared.resources["number-" + ones_5 + "-white"].texture;
            this.spriteWhiskeyOnes.visible = true;
            if (tens_5 > 0 || hundreds_5 > 0) {
                this.spriteWhiskeyTens.texture = PIXI.Loader.shared.resources["number-" + tens_5 + "-white"].texture;
                this.spriteWhiskeyTens.visible = true;
            }
            else {
                this.spriteWhiskeyTens.visible = false;
            }
            if (hundreds_5 > 0) {
                this.spriteWhiskeyHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds_5 + "-white"].texture;
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
        var hundreds = Math.floor(this.totalScore / 100);
        var tens = Math.floor(this.totalScore / 10);
        var ones = this.totalScore - hundreds * 100 - tens * 10;
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
    };
    ScoreState.prototype.getMoustacheImg = function () {
        if (this.scoreLevelMoustache < 50) {
            return null;
        }
        else if (this.scoreLevelMoustache < 58) {
            return "face-moustache1-p" + this.player;
        }
        else if (this.scoreLevelMoustache < 66) {
            return "face-moustache2-p" + this.player;
        }
        else if (this.scoreLevelMoustache < 74) {
            return "face-moustache3-p" + this.player;
        }
        else if (this.scoreLevelMoustache < 85) {
            return "face-moustache4-p" + this.player;
        }
        else {
            return "face-moustache5-p" + this.player;
        }
    };
    ScoreState.prototype.getEyesImg = function () {
        if (this.scoreLevelHat < 15) {
            return "face-eyes0";
        }
        else if (this.scoreLevelHat < 30) {
            return "face-eyes1";
        }
        else if (this.scoreLevelHat < 45) {
            return "face-eyes2";
        }
        else if (this.scoreLevelHat < 60) {
            return "face-eyes3";
        }
        else {
            return "face-eyes4";
        }
    };
    ScoreState.prototype.getJawImg = function () {
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
    };
    ScoreState.prototype.getNeckImg = function () {
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
    };
    ScoreState.prototype.getNoseImg = function () {
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
    };
    return ScoreState;
}(GameState));
var Level;
(function (Level) {
    Level[Level["Moustache"] = 0] = "Moustache";
    Level[Level["Tie"] = 1] = "Tie";
    Level[Level["Hat"] = 2] = "Hat";
    Level[Level["Office"] = 3] = "Office";
    Level[Level["Whiskey"] = 4] = "Whiskey";
})(Level || (Level = {}));
//# sourceMappingURL=scoreState.js.map