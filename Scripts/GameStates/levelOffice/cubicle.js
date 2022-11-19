var Cubicle = /** @class */ (function () {
    function Cubicle(worldX, worldY) {
        this.worldPosition = new Position(worldX, worldY);
        var angle = MathHelper.randomInt(0, 3) * 90;
        var bg = MathHelper.randomInt(0, 1);
        this.background = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cubicle" + bg].texture);
        this.background.pivot.x = 150;
        this.background.pivot.y = 150;
        this.background.angle = angle;
        this.items = [];
        var position;
        //  Desk stuff
        for (var i = 0; i < MathHelper.randomInt(0, 8); i++) {
            var stuff = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cubicle-item" + MathHelper.randomInt(0, 6)].texture);
            stuff.pivot.x = 0;
            stuff.pivot.y = stuff.height / 2;
            stuff.angle = MathHelper.randomInt(0, 360);
            position = new Position(MathHelper.randomInt(50, 250), MathHelper.randomInt(50, 250));
            this.items.push(new CubicleItem(stuff, position));
        }
        //  Computer
        var computer = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cubicle-computer"].texture);
        computer.pivot.x = 0;
        computer.pivot.y = computer.height / 2;
        computer.angle = angle;
        if (computer.angle == 90) {
            position = new Position(200, 10);
        }
        else if (computer.angle == 180) {
            position = new Position(290, 190);
        }
        else if (computer.angle == 270) {
            position = new Position(100, 290);
        }
        else {
            position = new Position(10, 110);
        }
        this.items.push(new CubicleItem(computer, position));
        //  Worker
        if (MathHelper.randomInt(0, 5) > 0) {
            var workerImg = MathHelper.randomInt(0, 2);
            var worker = new PIXI.Sprite(PIXI.Loader.shared.resources["level-office-cubicle-worker" + workerImg].texture);
            if (workerImg == 0) {
                worker.pivot.x = -20 + worker.width / 2;
            }
            else {
                worker.pivot.x = 48 + worker.width / 2;
            }
            worker.pivot.y = worker.height / 2;
            worker.angle = angle;
            if (worker.angle == 90) {
                position = new Position(195, 155);
            }
            else if (worker.angle == 180) {
                position = new Position(142, 196);
            }
            else if (worker.angle == 270) {
                position = new Position(100, 144);
            }
            else {
                position = new Position(156, 104);
            }
            this.items.push(new CubicleItem(worker, position));
        }
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
        this.background.x = cubicleRelativeToPlayer.x + this.background.pivot.x;
        this.background.y = cubicleRelativeToPlayer.y + this.background.pivot.y;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.update(cubicleRelativeToPlayer);
        }
    };
    return Cubicle;
}());
var CubicleItem = /** @class */ (function () {
    function CubicleItem(sprite, relativeToCubicle) {
        this.sprite = sprite;
        this.relativeToCubicle = relativeToCubicle;
    }
    CubicleItem.prototype.update = function (cubicleRelativeToPlayer) {
        this.sprite.x = cubicleRelativeToPlayer.x + this.relativeToCubicle.x;
        this.sprite.y = cubicleRelativeToPlayer.y + this.relativeToCubicle.y;
    };
    return CubicleItem;
}());
//# sourceMappingURL=cubicle.js.map