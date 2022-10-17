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
        this.scoreCounter.onEnter();
        this.timeTilStartCounting = 2000;
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
        this.scoreCounter.onExit();
        //  TODO: Ladda nästa bana
        //Game.currentStatePlayer1 = new TitleState(this.xOffset, this.upKey, this.downKey, this.leftKey, this.rightKey);
        //Game.currentStatePlayer1.onEnter();
    };
    ScoreState.prototype.update = function (elapsedTime) {
        // elapsedTime in ms
        if (Game.sceneTransition.isShrinking && !Game.sceneTransition.isDone()) {
            Game.sceneTransition.update(elapsedTime);
            if (Game.sceneTransition.isDone()) {
                Game.soundPlayer.musicScoreScreen.play();
            }
            return;
        }
        this.scoreCounter.update(elapsedTime);
        if (Game.scoreStatePlayer1.scoreCounter.isCounting() == false &&
            (Game.twoPlayerGame == false || Game.scoreStatePlayer2.scoreCounter.isCounting() == false) &&
            !Game.keyboard.current.isPressed('enter') && Game.keyboard.last.isPressed('enter')) {
            if (!Game.sceneTransition.isGrowing) {
                Game.sceneTransition.startGrowing();
                if (Game.soundPlayer.musicScoreScreen.playing) {
                    Game.soundPlayer.musicScoreScreen.fade(1, 0, 2500);
                }
            }
        }
        if (Game.sceneTransition.isGrowing) {
            Game.sceneTransition.update(elapsedTime);
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
        if (!this.scoreCounter.isCounting()) {
            //  Waiting for the player to press enter
            return;
        }
        this.scoreCounter.update(elapsedTime);
        //  TODO: Gör score till PROCENT, inte absoluta poäng
        if (this.currentLevel == Level.Moustache) {
            //  Maxpoäng är 100 så här är score = procent
            this.scoreLevelMoustache = this.scoreCurrentLevel - this.scoreCounter.getScore();
        }
        else if (this.currentLevel == Level.Hat) {
            this.scoreLevelHat = this.scoreCurrentLevel - this.scoreCounter.getScore();
        }
        else if (this.currentLevel == Level.Office) {
            this.scoreLevelOffice = this.scoreCurrentLevel - this.scoreCounter.getScore();
        }
        else if (this.currentLevel == Level.Whiskey) {
            this.scoreLevelWhiskey = this.scoreCurrentLevel - this.scoreCounter.getScore();
        }
        var scoreTotal = 0;
        scoreTotal += this.scoreLevelMoustache > -1 ? this.scoreLevelMoustache : 0;
        scoreTotal += this.scoreLevelHat > -1 ? this.scoreLevelHat : 0;
        scoreTotal += this.scoreLevelOffice > -1 ? this.scoreLevelOffice : 0;
        scoreTotal += this.scoreLevelWhiskey > -1 ? this.scoreLevelWhiskey : 0;
        var maxScore = 0;
        maxScore += 100; //  Max score on LevelMoustache is 100
        this.totalScore = Math.floor(100 * scoreTotal / maxScore);
        this.updateSprites();
    };
    ScoreState.prototype.updateSprites = function () {
        if (this.scoreLevelMoustache > -1) {
            var hundreds_1 = Math.floor(this.scoreLevelMoustache / 100);
            var tens_1 = Math.floor(this.scoreLevelMoustache / 10);
            var ones_1 = this.scoreLevelMoustache - hundreds_1 * 100 - tens_1 * 10;
            this.spriteMoustacheProcent.visible = true;
            this.spriteMoustacheOnes.texture = PIXI.Loader.shared.resources["number-" + ones_1 + "-white"].texture;
            this.spriteMoustacheOnes.visible = true;
            if (tens_1 > 0) {
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
        //  TODO: All other scores
        var hundreds = Math.floor(this.totalScore / 100);
        var tens = Math.floor(this.totalScore / 10);
        var ones = this.totalScore - hundreds * 100 - tens * 10;
        this.spriteTotalProcent.visible = true;
        this.spriteTotalOnes.texture = PIXI.Loader.shared.resources["number-" + ones + "-white"].texture;
        this.spriteTotalOnes.visible = true;
        if (tens > 0) {
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