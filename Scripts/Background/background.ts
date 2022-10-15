class Background {

    private backgroundItems: BackgroundItem[];

    private timeTilImageChange: number;
    private fadeOutLeft: number;
    private fadeInLeft: number;
    private fadeTotal: number;

    private currentImageNumber: number;

    private speed: number = 1080 / 40;
    private gap: number = 350;

    public visible: boolean;

    constructor() {

        this.visible = false;
        this.timeTilImageChange = 15000;

        this.currentImageNumber = MathHelper.randomInt(0, 5);

        this.backgroundItems = [];

        let stepsX = Math.ceil((1920 + 100 + 1080) / this.gap) * 2;
        let stepsY = Math.ceil((1080 + 100) / this.gap);

        for (let y = 0; y <= stepsY; y++) {

            for (let x = -8; x <= stepsX; x++) {

                let yCoord = y * this.gap;
                let xCoord = x * this.gap / 2;

                if (x % 2 == 0) {

                    yCoord += this.gap / 2;
                }

                this.backgroundItems.push(new BackgroundItem(xCoord, yCoord, this.currentImageNumber));
            }
        }
    }

    public update(elapsedTime: number): void {

        this.timeTilImageChange -= elapsedTime;

        if (this.timeTilImageChange <= 0) {

            this.timeTilImageChange = 15000;

            this.fadeOut(1000);
            this.fadeIn(1000);
        }

        let alpha = 1;

        if (this.fadeOutLeft > 0) {

            this.fadeOutLeft -= elapsedTime;

            if (this.fadeOutLeft < 0) {

                this.fadeOutLeft = 0;

                let newImageNumbers = [];

                for (let n = 0; n <= 5; n++) {

                    if (n != this.currentImageNumber) {

                        newImageNumbers.push(n);
                    }
                }

                this.currentImageNumber = newImageNumbers[MathHelper.randomInt(0, 4)];

                for (let item of this.backgroundItems) {

                    item.sprite.texture = PIXI.Loader.shared.resources["background" + this.currentImageNumber].texture;
                }
            }

            let part = 1 - this.fadeOutLeft / this.fadeTotal;
            alpha = 1 - part;
        }
        else if (this.fadeInLeft > 0) {

            this.fadeInLeft -= elapsedTime;

            if (this.fadeInLeft < 0) {

                this.fadeInLeft = 0;
            }

            let part = 1 - this.fadeInLeft / this.fadeTotal;
            alpha = part;
        }

        for (let item of this.backgroundItems) {

            item.sprite.alpha = alpha;
            item.sprite.x -= this.speed * elapsedTime / 1000;
            item.sprite.y += this.speed * elapsedTime / 1000;

            if (item.sprite.y > 1080 || item.sprite.x < -100) {

                let backSteps = Math.ceil(1180 / this.gap);

                item.sprite.x += backSteps * this.gap;
                item.sprite.y -= backSteps * this.gap;
            }
        }
    }

    public fadeIn(time: number) {

        this.fadeInLeft = time;
        this.fadeTotal = time;
        this.visible = true;
    }

    public fadeOut(time: number) {

        this.fadeOutLeft = time;
        this.fadeTotal = time;
    }
}

class BackgroundItem {

    public sprite: PIXI.Sprite;

    constructor(x: number, y: number, imageNumber: number) {

        this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["background" + imageNumber].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.alpha = 0;  //  Starts invisible. Fade in later.

        Game.app.stage.addChild(this.sprite);
    }
}