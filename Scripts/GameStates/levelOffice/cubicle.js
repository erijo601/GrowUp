var Cubicle = /** @class */ (function () {
    function Cubicle(worldX, worldY) {
        this.worldPosition = new Position(worldX, worldY);
        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cubicle"].texture);
        this.items = [];
        //  TODO: Lite sumpmässigt innehåll och placering i cuben
    }
    Cubicle.prototype.onEnter = function () {
    };
    Cubicle.prototype.onExit = function () {
    };
    Cubicle.prototype.isInside = function (playerPosition) {
        if (playerPosition.x >= this.worldPosition.x && playerPosition.x <= this.worldPosition.x + 300 &&
            playerPosition.y >= this.worldPosition.y && playerPosition.y <= this.worldPosition.y + 300) {
            return true;
        }
        return false;
    };
    Cubicle.prototype.update = function (playerWorldPosition) {
        var cubicleRelativeToPlayer = new Position(this.worldPosition.x - playerWorldPosition.x + 950 / 2, this.worldPosition.y - playerWorldPosition.y + 950 / 2);
        this.background.x = cubicleRelativeToPlayer.x;
        this.background.y = cubicleRelativeToPlayer.y;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.update(cubicleRelativeToPlayer);
        }
    };
    return Cubicle;
}());
var CubicleItem = /** @class */ (function () {
    function CubicleItem(relativeToCubicleX, relativeToCubicleY) {
        this.relativeToCubicle = new Position(relativeToCubicleX, relativeToCubicleY);
    }
    CubicleItem.prototype.update = function (cubicleRelativeToPlayer) {
        this.sprite.x = cubicleRelativeToPlayer.x + this.relativeToCubicle.x + 950 / 2;
        this.sprite.y = cubicleRelativeToPlayer.y + this.relativeToCubicle.y + 950 / 2;
    };
    return CubicleItem;
}());
//# sourceMappingURL=cubicle.js.map