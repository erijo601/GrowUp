var Intro = /** @class */ (function () {
    function Intro() {
        this.timeMoveInOut = 750;
        this.timeSlowMotion = 3000;
        this.tieLeft = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-tie-left"].texture);
        this.tieRight = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-tie-right"].texture);
        this.titleMoustache = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-moustache-title"].texture);
        this.subtitleMoustache = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-moustache-subtitle"].texture);
        this.titleTie = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-tie-title"].texture);
        this.subtitleTie = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-tie-subtitle"].texture);
        this.titleHat = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-hat-title"].texture);
        this.subtitleHat = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-hat-subtitle"].texture);
        this.titleOffice = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-office-title"].texture);
        this.subtitleOffice = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-office-subtitle"].texture);
        this.titleWhiskey = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-whiskey-title"].texture);
        this.subtitleWhiskey = new PIXI.Sprite(PIXI.Loader.shared.resources["intro-whiskey-subtitle"].texture);
        this.tieRight.y = 377;
        this.tieLeft.y = 491;
        this.titleMoustache.y = 442;
        this.subtitleMoustache.y = 592;
        this.titleTie.y = 442;
        this.subtitleTie.y = 592;
        this.titleHat.y = 442;
        this.subtitleHat.y = 592;
        this.titleOffice.y = 442;
        this.subtitleOffice.y = 592;
        this.titleWhiskey.y = 442;
        this.subtitleWhiskey.y = 592;
        this.isPlaying = false;
    }
    Intro.prototype.startLevelMoustache = function () {
        this.currentTitle = this.titleMoustache;
        this.currentSubtitle = this.subtitleMoustache;
        this.start();
    };
    Intro.prototype.startLevelTie = function () {
        this.currentTitle = this.titleTie;
        this.currentSubtitle = this.subtitleTie;
        this.start();
    };
    Intro.prototype.startLevelHat = function () {
        this.currentTitle = this.titleHat;
        this.currentSubtitle = this.subtitleHat;
        this.start();
    };
    Intro.prototype.startLevelOffice = function () {
        this.currentTitle = this.titleOffice;
        this.currentSubtitle = this.subtitleOffice;
        this.start();
    };
    Intro.prototype.startLevelWhiskey = function () {
        this.currentTitle = this.titleOffice;
        this.currentSubtitle = this.subtitleOffice;
        this.start();
    };
    Intro.prototype.start = function () {
        this.tieRight.x = 1920;
        this.tieLeft.x = -this.tieRight.width;
        this.currentTitle.x = this.tieRight.x + 519 - this.currentTitle.width / 2;
        this.currentSubtitle.x = this.tieLeft.x + 760 - this.currentSubtitle.width / 2;
        this.tieLeft.visible = true;
        this.tieRight.visible = true;
        this.currentTitle.visible = true;
        this.currentSubtitle.visible = true;
        this.isPlaying = true;
        this.timeLeftMoveIn = this.timeMoveInOut;
        this.timeLeftMoveOut = this.timeMoveInOut;
        this.timeLeftSlowMotion = this.timeSlowMotion;
        this.tieLeft.zIndex = 1000;
        this.tieRight.zIndex = 1001;
        this.currentSubtitle.zIndex = 1002;
        this.currentTitle.zIndex = 1003;
        Game.app.stage.addChild(this.tieLeft);
        Game.app.stage.addChild(this.currentSubtitle);
        Game.app.stage.addChild(this.tieRight);
        Game.app.stage.addChild(this.currentTitle);
    };
    Intro.prototype.update = function (elapsedTime) {
        if (this.timeLeftMoveIn > 0) {
            this.timeLeftMoveIn -= elapsedTime;
            if (this.timeLeftMoveIn < 0) {
                this.timeLeftSlowMotion += this.timeLeftMoveIn;
            }
            var part = 1 - this.timeLeftMoveIn / this.timeMoveInOut;
            this.tieRight.x = 1920 - 1364 * EasingCurves.easeOutExpo(part);
            this.tieLeft.x = -this.tieLeft.width + (this.tieLeft.width + 180) * EasingCurves.easeOutExpo(part);
            this.currentTitle.x = this.tieRight.x + 519 - this.currentTitle.width / 2;
            this.currentSubtitle.x = this.tieLeft.x + 760 - this.currentSubtitle.width / 2;
        }
        else if (this.timeLeftSlowMotion > 0) {
            this.timeLeftSlowMotion -= elapsedTime;
            if (this.timeLeftSlowMotion < 0) {
                this.timeLeftMoveOut += this.timeLeftSlowMotion;
            }
            var part = 1 - this.timeLeftSlowMotion / this.timeSlowMotion;
            this.tieRight.x = 556 - (556 - 428) * part;
            this.tieLeft.x = 180 + (356 - 180) * part;
            this.currentTitle.x = this.tieRight.x + 519 - this.currentTitle.width / 2;
            this.currentSubtitle.x = this.tieLeft.x + 760 - this.currentSubtitle.width / 2;
        }
        else if (this.timeLeftMoveOut > 0) {
            this.timeLeftMoveOut -= elapsedTime;
            if (this.timeLeftMoveOut < 0) {
                this.timeLeftMoveOut = 0;
            }
            var part = 1 - this.timeLeftMoveOut / this.timeMoveInOut;
            this.tieRight.x = 428 - (428 + this.tieRight.width) * EasingCurves.easeInExpo(part);
            this.tieLeft.x = 356 + (1920 - 356) * EasingCurves.easeInExpo(part);
            this.currentTitle.x = this.tieRight.x + 519 - this.currentTitle.width / 2;
            this.currentSubtitle.x = this.tieLeft.x + 760 - this.currentSubtitle.width / 2;
        }
        else {
            this.isPlaying = false;
            Game.app.stage.removeChild(this.tieLeft);
            Game.app.stage.removeChild(this.currentSubtitle);
            Game.app.stage.removeChild(this.tieRight);
            Game.app.stage.removeChild(this.currentTitle);
        }
    };
    return Intro;
}());
//# sourceMappingURL=intro.js.map