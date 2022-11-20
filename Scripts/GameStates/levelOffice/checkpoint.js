var Checkpoint = /** @class */ (function () {
    function Checkpoint(worldX, worldY, width, height, directionNext) {
        this.worldPosition = new PIXI.Rectangle(worldX, worldY, width, height);
        this.directionNext = directionNext;
    }
    Checkpoint.prototype.isInside = function (playerPosition) {
        if (this.worldPosition.x <= playerPosition.x && this.worldPosition.x + this.worldPosition.width >= playerPosition.x &&
            this.worldPosition.y <= playerPosition.y && this.worldPosition.y + this.worldPosition.height >= playerPosition.y) {
            return true;
        }
        return false;
    };
    return Checkpoint;
}());
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
//# sourceMappingURL=checkpoint.js.map