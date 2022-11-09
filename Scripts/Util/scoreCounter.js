var ScoreCounter = /** @class */ (function () {
    function ScoreCounter(xOffset, x, y, score) {
        this.x = x;
        this.y = y;
        this.lastScore = score;
        this.currentScore = score;
        this.desiredScore = score;
        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["score-background"].texture);
        this.background.zIndex = 1000;
        this.background.visible = true;
        this.foreground = new PIXI.Sprite(PIXI.Loader.shared.resources["score-foreground"].texture);
        this.foreground.zIndex = 1002;
        this.foreground.visible = true;
        this.spriteOnes = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0"].texture);
        this.spriteOnes.zIndex = 1001;
        this.spriteOnes.visible = true;
        this.spriteOnesAlt = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0"].texture);
        this.spriteOnesAlt.zIndex = 1001;
        this.spriteOnesAlt.visible = false;
        this.spriteTens = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0"].texture);
        this.spriteTens.zIndex = 1001;
        this.spriteTens.visible = false;
        this.spriteTensAlt = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0"].texture);
        this.spriteTensAlt.zIndex = 1001;
        this.spriteTensAlt.visible = false;
        this.spriteHundreds = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0"].texture);
        this.spriteHundreds.zIndex = 1001;
        this.spriteHundreds.visible = false;
        this.spriteHundredsAlt = new PIXI.Sprite(PIXI.Loader.shared.resources["number-0"].texture);
        this.spriteHundredsAlt.zIndex = 1001;
        this.spriteHundredsAlt.visible = false;
        this.setPos(xOffset + x, y);
        this.changeSprites();
    }
    ScoreCounter.prototype.setPos = function (x, y) {
        this.background.x = x;
        this.background.y = y;
        this.foreground.x = x;
        this.foreground.y = y;
        this.spriteOnes.x = x + 102;
        this.spriteOnes.y = y + 19;
        this.spriteOnesAlt.x = x + 102;
        this.spriteOnesAlt.y = y + 19;
        this.spriteTens.x = x + 64;
        this.spriteTens.y = y + 19;
        this.spriteTensAlt.x = x + 64;
        this.spriteTensAlt.y = y + 19;
        this.spriteHundreds.x = 27;
        this.spriteHundreds.y = y + 19;
        this.spriteHundredsAlt.x = 27;
        this.spriteHundredsAlt.y = y + 19;
    };
    ScoreCounter.prototype.onEnter = function () {
        Game.app.stage.addChild(this.background);
        Game.app.stage.addChild(this.foreground);
        Game.app.stage.addChild(this.spriteOnes);
        Game.app.stage.addChild(this.spriteOnesAlt);
        Game.app.stage.addChild(this.spriteTens);
        Game.app.stage.addChild(this.spriteTensAlt);
        Game.app.stage.addChild(this.spriteHundreds);
        Game.app.stage.addChild(this.spriteHundredsAlt);
    };
    ScoreCounter.prototype.onExit = function () {
        Game.app.stage.removeChild(this.background);
        Game.app.stage.removeChild(this.foreground);
        Game.app.stage.removeChild(this.spriteOnes);
        Game.app.stage.removeChild(this.spriteOnesAlt);
        Game.app.stage.removeChild(this.spriteTens);
        Game.app.stage.removeChild(this.spriteTensAlt);
        Game.app.stage.removeChild(this.spriteHundreds);
        Game.app.stage.removeChild(this.spriteHundredsAlt);
    };
    ScoreCounter.prototype.getDesiredScore = function () {
        if (this.desiredScore < 0) {
            return 0;
        }
        return this.desiredScore;
    };
    ScoreCounter.prototype.getScore = function () {
        if (this.currentScore < 0) {
            return 0;
        }
        return this.currentScore;
    };
    ScoreCounter.prototype.setNewScore = function (score, totalTimeDigitChange) {
        if (score == 0) {
            //  Dirty hack. Scoreanimationen stannar på 1 när den egentligen ska räkna ner till 0. Detta hack fixar problemet.
            score = -1;
        }
        if (score == this.desiredScore) {
            return;
        }
        this.desiredScore = score;
        this.totalTimeDigitChange = totalTimeDigitChange;
        this.timeLeftDigitChange = totalTimeDigitChange;
        if (this.desiredScore > this.currentScore) {
            this.digitChangeDirection = 1;
        }
        else {
            this.digitChangeDirection = -1;
        }
        if (totalTimeDigitChange == 0) {
            this.currentScore = score;
        }
        this.changeSprites();
        if (totalTimeDigitChange == 0) {
            this.spriteOnes.y = this.y + 19;
            this.spriteOnesAlt.visible = false;
            this.spriteTens.y = this.y + 19;
            this.spriteTensAlt.visible = false;
            this.spriteHundreds.y = this.y + 19;
            this.spriteHundredsAlt.visible = false;
        }
        else {
            this.soundInstanceId = Game.soundPlayer.scoreWheel.play();
        }
    };
    ScoreCounter.prototype.update = function (elapsedTime) {
        if (this.isCounting() == false) {
            return;
        }
        this.timeLeftDigitChange -= elapsedTime;
        var needChangeSprites = false;
        while (this.timeLeftDigitChange <= 0) {
            needChangeSprites = true;
            var remainder = this.timeLeftDigitChange * -1;
            this.timeLeftDigitChange = this.totalTimeDigitChange;
            this.lastScore = this.currentScore;
            this.currentScore += this.digitChangeDirection;
            this.timeLeftDigitChange -= remainder;
            if (this.isCounting() == false) {
                this.spriteOnes.y = this.y + 19;
                this.spriteOnesAlt.visible = false;
                this.spriteTens.y = this.y + 19;
                this.spriteTensAlt.visible = false;
                this.spriteHundreds.y = this.y + 19;
                this.spriteHundredsAlt.visible = false;
                Game.soundPlayer.scoreWheel.stop(this.soundInstanceId);
                return;
            }
        }
        if (needChangeSprites) {
            this.changeSprites();
        }
        var animPart = 1 - this.timeLeftDigitChange / this.totalTimeDigitChange;
        this.spriteOnes.scale.y = 0.2 + 0.8 * animPart;
        this.spriteOnesAlt.scale.y = 1 - 0.8 * animPart;
        this.spriteOnes.y = this.y + 19 + 42 - 42 * animPart;
        this.spriteOnesAlt.y = this.y + 19 - 42 * animPart + 32 * (1 - this.spriteOnesAlt.scale.y);
        this.spriteOnesAlt.visible = true;
        if (this.currentScore > 0 && this.currentScore % 10 == 0) {
            this.spriteTens.scale.y = 0.2 + 0.8 * animPart;
            this.spriteTensAlt.scale.y = 1 - 0.8 * animPart;
            this.spriteTens.y = this.y + 19 + 42 - 42 * animPart;
            this.spriteTensAlt.y = this.y + 19 - 42 * animPart + 32 * (1 - this.spriteTensAlt.scale.y);
            this.spriteTensAlt.visible = true;
        }
        else {
            this.spriteTens.y = this.y + 19;
            this.spriteTens.scale.y = 1;
            this.spriteTensAlt.visible = false;
        }
        if (this.currentScore > 0 && this.currentScore % 100 == 0) {
            this.spriteHundreds.scale.y = 0.2 + 0.8 * animPart;
            this.spriteHundredsAlt.scale.y = 1 - 0.8 * animPart;
            this.spriteHundreds.y = this.y + 19 + 42 - 42 * animPart;
            this.spriteHundredsAlt.y = this.y + 19 - 42 * animPart + 32 * (1 - this.spriteHundredsAlt.scale.y);
            this.spriteHundredsAlt.visible = true;
        }
        else {
            this.spriteHundreds.y = this.y + 19;
            this.spriteHundreds.scale.y = 1;
            this.spriteHundredsAlt.visible = false;
        }
    };
    ScoreCounter.prototype.isCounting = function () {
        if (this.currentScore != this.desiredScore) {
            return true;
        }
        return false;
    };
    ScoreCounter.prototype.changeSprites = function () {
        var hundreds = Math.floor(this.currentScore / 100);
        var tens = Math.floor((this.currentScore - hundreds * 100) / 10);
        var ones = this.currentScore - hundreds * 100 - tens * 10;
        var lastHundreds = Math.floor(this.lastScore / 100);
        var lastTens = Math.floor((this.lastScore - lastHundreds * 100) / 10);
        var lastOnes = this.lastScore - lastHundreds * 100 - lastTens * 10;
        this.spriteOnes.texture = PIXI.Loader.shared.resources["number-" + ones].texture;
        this.spriteOnesAlt.texture = PIXI.Loader.shared.resources["number-" + lastOnes].texture;
        if (tens > 0 || hundreds > 0) {
            this.spriteTens.texture = PIXI.Loader.shared.resources["number-" + tens].texture;
            this.spriteTens.visible = true;
            this.spriteTensAlt.texture = PIXI.Loader.shared.resources["number-" + lastTens].texture;
            this.spriteTensAlt.visible = true;
        }
        else {
            this.spriteTens.visible = false;
        }
        if (hundreds > 0) {
            this.spriteHundreds.texture = PIXI.Loader.shared.resources["number-" + hundreds].texture;
            this.spriteHundreds.visible = true;
            this.spriteHundredsAlt.texture = PIXI.Loader.shared.resources["number-" + lastHundreds].texture;
            this.spriteHundredsAlt.visible = true;
        }
        else {
            this.spriteHundreds.visible = false;
        }
    };
    return ScoreCounter;
}());
//# sourceMappingURL=scoreCounter.js.map