class SceneTransition {

    private spriteMoustance: PIXI.Sprite;
    private spriteListBoxer: PIXI.Sprite[];
    private spriteListTie: PIXI.Sprite[];
    private tieListPos: Point[];

    private totalTime: number;
    private totalElapsedTime: number;

    public isGrowing: boolean;
    public isShrinking: boolean;

    public transitionType: TransitionType;
    public lastTransitionType: TransitionType;

    private boxerSpriteGap: number = 200;

    constructor() {

        this.spriteMoustance = new PIXI.Sprite(PIXI.Loader.shared.resources["screen-transition-moustache"].texture);
        this.spriteMoustance.x = 1920 / 2;
        this.spriteMoustance.y = 1080 / 2;
        this.spriteMoustance.pivot.x = this.spriteMoustance.width / 2;
        this.spriteMoustance.pivot.y = this.spriteMoustance.height / 2;
        this.spriteMoustance.zIndex = 10000;
        this.spriteMoustance.visible = false;

        this.spriteListBoxer = [];
        this.spriteListTie = [];
        this.tieListPos = [];

        for (let n = 0; n < Math.ceil(1920 / this.boxerSpriteGap); n++) {

            let sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["screen-transition-boxer"].texture);
            sprite.x = 0;
            sprite.zIndex = 10000 + n;
            sprite.scale.x = 1.2;
            sprite.scale.y = 1.2;

            this.spriteListBoxer.push(sprite);
        }

        for (let n = 0; n < 60; n++) {

            let sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["screen-transition-tie"].texture);
            sprite.x = 0;
            sprite.zIndex = 10000 + n;
            sprite.x = 0;
            sprite.y = 0;
            sprite.tint = (0.2 + 0.5 * Math.random()) * 0xFFFFFF;

            this.tieListPos.push(new Point(0, 0));

            this.spriteListTie.push(sprite);
        }

        this.isGrowing = false;
        this.isShrinking = false;

        this.totalTime = 1200;
        this.lastTransitionType = null;
    }

    public startGrowing() {

        let types = [];

        if (TransitionType.Moustache != this.lastTransitionType) {

            types.push(TransitionType.Moustache);
        }

        if (TransitionType.Boxer != this.lastTransitionType) {

            types.push(TransitionType.Boxer);
        }

        if (TransitionType.Tie != this.lastTransitionType) {

            types.push(TransitionType.Tie);
        }

        this.transitionType = types[MathHelper.randomInt(0, types.length - 1)];
        this.lastTransitionType = this.transitionType;

        this.isGrowing = true;
        this.isShrinking = false;
        this.totalElapsedTime = 0;

        if (this.transitionType == TransitionType.Moustache) {

            this.spriteMoustance.visible = true;
            this.spriteMoustance.angle = 0;
            this.spriteMoustance.scale.x = 0;
            this.spriteMoustance.scale.y = 0;

            Game.app.stage.addChild(this.spriteMoustance);
        }
        else if (this.transitionType == TransitionType.Boxer) {

            for (let n = 0; n < this.spriteListBoxer.length; n++) {

                this.spriteListBoxer[n].visible = true;
                this.spriteListBoxer[n].x = 0 - 816 - this.boxerSpriteGap * n;

                Game.app.stage.addChild(this.spriteListBoxer[n]);
            }
        }
        else if (this.transitionType == TransitionType.Tie) {

            for (let n = 0; n < this.spriteListTie.length; n++) {

                let back = 1080 + 935;

                this.tieListPos[n].x = MathHelper.randomInt(-802, 1920) + back;
                this.tieListPos[n].y = MathHelper.randomInt(0, 1080) - back;

                this.spriteListTie[n].visible = true;

                this.spriteListTie[n].x = this.tieListPos[n].x;
                this.spriteListTie[n].y = this.tieListPos[n].y;

                Game.app.stage.addChild(this.spriteListTie[n]);
            }
        }
    }

    public startShrinking() {

        this.isGrowing = false;
        this.isShrinking = true;
        this.totalElapsedTime = 0;

        if (this.transitionType == TransitionType.Moustache) {

            this.spriteMoustance.visible = true;
            this.spriteMoustance.angle = 0;
            this.spriteMoustance.scale.x = 16;
            this.spriteMoustance.scale.y = 16;
        }
    }

    public isDone(): boolean {

        if (this.totalElapsedTime >= this.totalTime) {

            return true;
        }

        return false;
    }

    public update(elapsedTime: number) {

        if (!this.isGrowing && !this.isShrinking) {

            return;
        }

        this.totalElapsedTime += elapsedTime;

        if (this.transitionType == TransitionType.Moustache) {

            this.updateMoustache();
        }
        else if (this.transitionType == TransitionType.Boxer) {

            this.updateBoxer();
        }
        else if (this.transitionType == TransitionType.Tie) {

            this.updateTie();
        }
    }

    private updateMoustache() {

        if (this.totalElapsedTime > this.totalTime) {

            this.totalElapsedTime = this.totalTime;

            if (this.isShrinking) {

                Game.app.stage.removeChild(this.spriteMoustance);
            }
        }

        let scale;

        if (this.isGrowing) {

            scale = 16 * EasingCurves.easeInQuint(this.totalElapsedTime / this.totalTime);
        }
        else {

            scale = 16 * EasingCurves.easeOutQuint(this.totalElapsedTime / this.totalTime);
        }

        let angle = 360 * 5 * (this.totalElapsedTime / this.totalTime);

        this.spriteMoustance.angle = angle;

        if (this.isGrowing) {

            this.spriteMoustance.scale.x = scale;
            this.spriteMoustance.scale.y = scale;
        }
        else {

            this.spriteMoustance.scale.x = 16 - scale;
            this.spriteMoustance.scale.y = 16 - scale;
        }
    }

    private updateBoxer() {

        if (this.totalElapsedTime > this.totalTime) {

            this.totalElapsedTime = this.totalTime;

            if (this.isShrinking) {

                for (let sprite of this.spriteListBoxer) {

                    Game.app.stage.removeChild(sprite);
                }
            }
        }

        let part = this.totalElapsedTime / this.totalTime;

        let firstx;

        if (this.isGrowing) {

            firstx = 1920 * part;
        }
        else {

            firstx = 1920 + 1920 * part;
        }

        for (let n = 0; n < this.spriteListBoxer.length; n++) {

            let x = firstx - this.boxerSpriteGap * n;
            let y = -25 * Math.sin(Math.PI * 2 * x / (1920 / 2));

            this.spriteListBoxer[n].x = x;
            this.spriteListBoxer[n].y = y;
        }
    }

    private updateTie() {

        if (this.totalElapsedTime > this.totalTime) {

            this.totalElapsedTime = this.totalTime;

            if (this.isShrinking) {

                for (let sprite of this.spriteListTie) {

                    Game.app.stage.removeChild(sprite);
                }
            }
        }

        let part = this.totalElapsedTime / this.totalTime;

        for (let n = 0; n < this.spriteListTie.length; n++) {

            let fally;

            if (this.isGrowing) {

                fally = (1080 + 935 + n * 20) * part;
            }
            else {

                fally = (1080 + 935 + n * 20) + ((1080 + 935 + n * 20) * part);
            }

            this.spriteListTie[n].x = this.tieListPos[n].x - fally;
            this.spriteListTie[n].y = this.tieListPos[n].y + fally;
        }
    }
}

enum TransitionType {
    Moustache,
    Boxer,
    Tie
}