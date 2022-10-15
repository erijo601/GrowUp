class SmokeLetter {

    static speed: number = 750; //  Pixels per second
    static startX: number = 880;
    static startY: number = 730;

    public startX: number;
    public startY: number;
    public destX: number;
    public destY: number;
    public letter: string;

    public sprite: PIXI.Sprite;
    public spriteAlt: PIXI.Sprite;

    public cloud: PIXI.Sprite;
    public cloudAlt: PIXI.Sprite;

    private showingAlt: boolean;

    private totalTimeMoving: number;
    private timeLeftMoving: number;

    public totalFadeoutTime: number;
    public fadeoutTimeLeft: number;    

    public shouldRemove: boolean;

    constructor(letter: string, destX: number, destY: number) {

        this.showingAlt = false;

        this.cloud = new PIXI.Sprite(Game.loadingScreenLoader.resources["cloud"].texture);
        this.cloudAlt = new PIXI.Sprite(Game.loadingScreenLoader.resources["cloud-alt"].texture);

        this.cloud.pivot.x = this.cloud.width / 2;
        this.cloud.pivot.y = this.cloud.height / 2;

        this.cloudAlt.pivot.x = this.cloudAlt.width / 2;
        this.cloudAlt.pivot.y = this.cloudAlt.height / 2;

        this.sprite = new PIXI.Sprite(Game.loadingScreenLoader.resources["letter-" + letter].texture);
        this.spriteAlt = new PIXI.Sprite(Game.loadingScreenLoader.resources["letter-" + letter + "-alt"].texture);

        this.sprite.pivot.x = this.sprite.width / 2;
        this.sprite.pivot.y = this.sprite.height / 2;

        this.spriteAlt.pivot.x = this.spriteAlt.width / 2;
        this.spriteAlt.pivot.y = this.spriteAlt.height / 2;

        Game.app.stage.addChild(this.sprite);
        Game.app.stage.addChild(this.spriteAlt);
        Game.app.stage.addChild(this.cloud);
        Game.app.stage.addChild(this.cloudAlt);

        this.destX = destX;
        this.destY = destY;

        let dist = Math.sqrt((SmokeLetter.startX - this.destX) * (SmokeLetter.startX - this.destX) + (SmokeLetter.startY - this.destY) * (SmokeLetter.startY - this.destY));

        this.timeLeftMoving = 1000 * dist / SmokeLetter.speed;
        this.totalTimeMoving = this.timeLeftMoving;

        this.fadeoutTimeLeft = 0;
        this.shouldRemove = false;
    }

    public update(elapsedTime: number) {

        if (this.timeLeftMoving > 0) {

            this.timeLeftMoving -= elapsedTime;

            if (this.timeLeftMoving < 0) {

                this.timeLeftMoving = 0;
            }

            let part = 1 - (this.timeLeftMoving / this.totalTimeMoving);

            let x = SmokeLetter.startX + (this.destX - SmokeLetter.startX) * part;
            let y = SmokeLetter.startY + (this.destY - SmokeLetter.startY) * part;

            this.sprite.x = x;
            this.sprite.y = y;
            this.spriteAlt.x = x;
            this.spriteAlt.y = y;
            this.cloud.x = x;
            this.cloud.y = y;
            this.cloudAlt.x = x;
            this.cloudAlt.y = y;

            this.sprite.scale.x = 0.5 + 0.5 * part;
            this.sprite.scale.y = 0.5 + 0.5 * part;
            this.spriteAlt.scale.x = 0.5 + 0.5 * part;
            this.spriteAlt.scale.y = 0.5 + 0.5 * part;
            this.cloud.scale.x = 0.5 + 0.5 * part;
            this.cloud.scale.y = 0.5 + 0.5 * part;
            this.cloudAlt.scale.x = 0.5 + 0.5 * part;
            this.cloudAlt.scale.y = 0.5 + 0.5 * part;

            this.cloud.alpha = 1 - part;
            this.cloudAlt.alpha = 1 - part;
        }

        if (this.fadeoutTimeLeft > 0) {

            this.fadeoutTimeLeft -= elapsedTime;

            if (this.fadeoutTimeLeft < 0) {

                this.fadeoutTimeLeft = 0;
            }

            let part = this.fadeoutTimeLeft / this.totalFadeoutTime;

            this.sprite.alpha = part;
            this.spriteAlt.alpha = part;

            if (part == 0) {

                this.shouldRemove = true;
                this.removeFromStage();
            }
        }
    }

    public changeFrame() {

        if (this.showingAlt) {

            this.sprite.visible = this.spriteAlt.visible;
            this.spriteAlt.visible = false;
        }
        else {

            this.spriteAlt.visible = this.sprite.visible;
            this.sprite.visible = false;
        }

        this.showingAlt = !this.showingAlt;
    }

    public removeFromStage() {

        Game.app.stage.removeChild(this.sprite);
        Game.app.stage.removeChild(this.spriteAlt);
        Game.app.stage.removeChild(this.cloud);
        Game.app.stage.removeChild(this.cloudAlt);
    }
}