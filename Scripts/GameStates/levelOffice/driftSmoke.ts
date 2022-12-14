class DriftSmoke {

    public sprite: PIXI.Sprite;
    public playerx: number;
    public playery: number;
    public moveDirection: number;
    public spinSpeed: number;
    public totalLifetime: number;

    constructor(playerx: number, playery: number, moveDirection: number, spinSpeed: number) {

        this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-driftsmoke"].texture);
        this.sprite.pivot.x = this.sprite.width / 2;
        this.sprite.pivot.y = this.sprite.height / 2;
        this.totalLifetime = 0;
        this.sprite.zIndex = 101;
        this.playerx = playerx + MathHelper.randomInt(-20, 20);
        this.playery = playery + MathHelper.randomInt(-20, 20);
        this.moveDirection = moveDirection;
        this.spinSpeed = spinSpeed;

        this.update(0);
    }

    public update(elapsedTime: number) {

        this.totalLifetime += elapsedTime;

        let partLife = this.totalLifetime / 500;

        if (partLife >= 1) {

            this.sprite.alpha = 0;
            return;
        }

        this.sprite.alpha = 1.0 - partLife;

        this.sprite.x = this.playerx + Math.cos(this.moveDirection) * (70 + 280 * partLife);
        this.sprite.y = this.playery + Math.sin(this.moveDirection) * (70 + 280 * partLife);

        this.sprite.scale.x = 0.5 + (1.5 * partLife);
        this.sprite.scale.y = 0.5 + (1.5 * partLife);

        this.sprite.rotation = this.spinSpeed * 1 * partLife;
    }
}
