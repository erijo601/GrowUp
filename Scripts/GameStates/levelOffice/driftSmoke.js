var DriftSmoke = /** @class */ (function () {
    function DriftSmoke(playerx, playery, moveDirection, spinSpeed) {
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
    DriftSmoke.prototype.update = function (elapsedTime) {
        this.totalLifetime += elapsedTime;
        var partLife = this.totalLifetime / 500;
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
    };
    return DriftSmoke;
}());
//# sourceMappingURL=driftSmoke.js.map