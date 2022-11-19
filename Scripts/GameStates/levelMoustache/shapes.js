var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = (function () {
    function Shape(faceBgx, faceBgy) {
        this.boxW = 24;
        this.boxH = 19;
        this.rotation = 0;
        this.faceBgx = faceBgx;
        this.faceBgy = faceBgy;
        this.sprites = [];
    }
    Shape.prototype.move = function (x, y) {
        var newPoints = [];
        for (var i = 0; i < this.points.length; i++) {
            newPoints.push(new Point(this.points[i].x + x, this.points[i].y + y));
        }
        return newPoints;
    };
    Shape.prototype.onExit = function () {
        for (var n = 0; n < this.sprites.length; n++) {
            Game.app.stage.removeChild(this.sprites[n]);
        }
    };
    Shape.prototype.addSprites = function (player) {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var img = "box-p" + player + "-" + MathHelper.randomInt(0, 3);
            this.sprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources[img].texture));
        }
        this.updateSprites(player, 1);
        for (var n = 0; n < this.sprites.length; n++) {
            Game.app.stage.addChild(this.sprites[n]);
        }
    };
    Shape.prototype.setPos = function (player, newPoints, partTimeLeftCurrentRow) {
        this.points = newPoints;
        this.updateSprites(player, partTimeLeftCurrentRow);
    };
    Shape.prototype.drop = function () {
        return this.move(0, 1);
    };
    Shape.prototype.moveLeft = function () {
        return this.move(-1, 0);
    };
    Shape.prototype.moveRight = function () {
        return this.move(1, 0);
    };
    Shape.prototype.rotate = function (clockwise) {
        throw new Error("This method is abstract");
    };
    Shape.prototype.updateSprites = function (player, partTimeLeftCurrentRow) {
        for (var i = 0; i < this.points.length; i++) {
            var sprite = this.sprites[i];
            var point = this.points[i];
            var row = point.y;
            if (row < 0) {
                row = 0;
            }
            var deltax = void 0;
            var deltay = void 0;
            if (row == 0) {
                deltax = 0;
                deltay = -19 * partTimeLeftCurrentRow;
            }
            else if (row == 20) {
                deltax = ((Grid.rowInfos[row - 1].x + point.x * Grid.rowInfos[row - 1].w) -
                    (Grid.rowInfos[row].x + point.x * Grid.rowInfos[row].w)) * EasingCurves.easeInExpo(partTimeLeftCurrentRow);
                deltay = (Grid.rowInfos[row - 1].y - Grid.rowInfos[row].y) * EasingCurves.easeInExpo(partTimeLeftCurrentRow);
            }
            else {
                deltax = ((Grid.rowInfos[row - 1].x + point.x * Grid.rowInfos[row - 1].w) -
                    (Grid.rowInfos[row].x + point.x * Grid.rowInfos[row].w)) * partTimeLeftCurrentRow;
                deltay = (Grid.rowInfos[row - 1].y - Grid.rowInfos[row].y) * partTimeLeftCurrentRow;
            }
            sprite.x = this.faceBgx + Grid.rowInfos[row].x + point.x * Grid.rowInfos[row].w + deltax;
            sprite.y = this.faceBgy + Grid.rowInfos[row].y + deltay;
            sprite.scale.x = 0.5 * Grid.rowInfos[row].w / 33.9;
            sprite.scale.y = 0.5;
            if (partTimeLeftCurrentRow == 1) {
                if (row == 20 && point.x == 0) {
                    var img = "box-p" + player + "-left-" + MathHelper.randomInt(0, 1);
                    sprite.texture = PIXI.Loader.shared.resources[img].texture;
                }
                else if (row == 20 && point.x == 9) {
                    var img = "box-p" + player + "-right-" + MathHelper.randomInt(0, 1);
                    sprite.texture = PIXI.Loader.shared.resources[img].texture;
                }
                else if (row == 26 && (point.x == 0 || point.x == 9)) {
                    var img = "box-p" + player + "-" + MathHelper.randomInt(0, 3);
                    sprite.texture = PIXI.Loader.shared.resources[img].texture;
                }
            }
        }
    };
    return Shape;
}());
var SquareShape = (function (_super) {
    __extends(SquareShape, _super);
    function SquareShape(faceBgx, faceBgy, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        var x = cols / 2;
        var y = -2;
        _this.points = [];
        _this.points.push(new Point(x, y));
        _this.points.push(new Point(x + 1, y));
        _this.points.push(new Point(x, y + 1));
        _this.points.push(new Point(x + 1, y + 1));
        return _this;
    }
    SquareShape.prototype.rotate = function (clockwise) {
        return this.points;
    };
    return SquareShape;
}(Shape));
var LShape = (function (_super) {
    __extends(LShape, _super);
    function LShape(faceBgx, faceBgy, leftHanded, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        _this.leftHanded = leftHanded;
        var x = cols / 2;
        var y = -2;
        _this.points = [];
        _this.points.push(new Point(x, y - 1));
        _this.points.push(new Point(x, y));
        _this.points.push(new Point(x, y + 1));
        _this.points.push(new Point(x + (leftHanded ? -1 : 1), y + 1));
        return _this;
    }
    LShape.prototype.rotate = function (clockwise) {
        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 4;
        var newPoints = [];
        switch (this.rotation) {
            case 0:
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? -1 : 1), this.points[1].y + 1));
                break;
            case 1:
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y + (this.leftHanded ? -1 : 1)));
                break;
            case 2:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? 1 : -1), this.points[1].y - 1));
                break;
            case 3:
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y + (this.leftHanded ? 1 : -1)));
                break;
        }
        return newPoints;
    };
    return LShape;
}(Shape));
var StepShape = (function (_super) {
    __extends(StepShape, _super);
    function StepShape(faceBgx, faceBgy, leftHanded, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        _this.leftHanded = leftHanded;
        var x = cols / 2;
        var y = -1;
        _this.points = [];
        _this.points.push(new Point(x + (leftHanded ? 1 : -1), y));
        _this.points.push(new Point(x, y));
        _this.points.push(new Point(x, y - 1));
        _this.points.push(new Point(x + (leftHanded ? -1 : 1), y - 1));
        return _this;
    }
    StepShape.prototype.rotate = function (clockwise) {
        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 2;
        var newPoints = [];
        switch (this.rotation) {
            case 0:
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? 1 : -1), this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + (this.leftHanded ? -1 : 1), this.points[1].y - 1));
                break;
            case 1:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + (this.leftHanded ? 1 : -1)));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y + (this.leftHanded ? -1 : 1)));
                break;
        }
        return newPoints;
    };
    return StepShape;
}(Shape));
var StraightShape = (function (_super) {
    __extends(StraightShape, _super);
    function StraightShape(faceBgx, faceBgy, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        var x = cols / 2;
        var y = -2;
        _this.points = [];
        _this.points.push(new Point(x, y - 2));
        _this.points.push(new Point(x, y - 1));
        _this.points.push(new Point(x, y));
        _this.points.push(new Point(x, y + 1));
        return _this;
    }
    StraightShape.prototype.rotate = function (clockwise) {
        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 2;
        var newPoints = [];
        switch (this.rotation) {
            case 0:
                newPoints[0] = new Point(this.points[2].x, this.points[2].y - 2);
                newPoints[1] = new Point(this.points[2].x, this.points[2].y - 1);
                newPoints[2] = new Point(this.points[2].x, this.points[2].y);
                newPoints[3] = new Point(this.points[2].x, this.points[2].y + 1);
                break;
            case 1:
                newPoints[0] = new Point(this.points[2].x + 2, this.points[2].y);
                newPoints[1] = new Point(this.points[2].x + 1, this.points[2].y);
                newPoints[2] = new Point(this.points[2].x, this.points[2].y);
                newPoints[3] = new Point(this.points[2].x - 1, this.points[2].y);
                break;
        }
        return newPoints;
    };
    return StraightShape;
}(Shape));
var TShape = (function (_super) {
    __extends(TShape, _super);
    function TShape(faceBgx, faceBgy, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        _this.points = [];
        var x = cols / 2;
        var y = -2;
        _this.points.push(new Point(x - 1, y));
        _this.points.push(new Point(x, y));
        _this.points.push(new Point(x + 1, y));
        _this.points.push(new Point(x, y + 1));
        return _this;
    }
    TShape.prototype.rotate = function (clockwise) {
        this.rotation = (this.rotation + (clockwise ? 1 : -1)) % 4;
        var newPoints = [];
        switch (this.rotation) {
            case 0:
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                break;
            case 1:
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                break;
            case 2:
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                break;
            case 3:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                break;
        }
        return newPoints;
    };
    return TShape;
}(Shape));
var DotShape = (function (_super) {
    __extends(DotShape, _super);
    function DotShape(faceBgx, faceBgy, x, y) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        _this.points = [];
        _this.points.push(new Point(x, y));
        return _this;
    }
    DotShape.prototype.rotate = function (clockwise) {
        return this.points;
    };
    return DotShape;
}(Shape));
