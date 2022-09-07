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
var Shape = /** @class */ (function () {
    function Shape(faceBgx, faceBgy) {
        this.boxW = 24; //  Box-bildens storlek i pixlar
        this.boxH = 19;
        this.rotation = 0; // what rotation 0,1,2,3
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
    Shape.prototype.setPos = function (newPoints) {
        this.points = newPoints;
        this.updateSprites();
    };
    // return a set of points showing where this shape would be if we dropped it one
    Shape.prototype.drop = function () {
        return this.move(0, 1);
    };
    // return a set of points showing where this shape would be if we moved left one
    Shape.prototype.moveLeft = function () {
        return this.move(-1, 0);
    };
    // return a set of points showing where this shape would be if we moved right one
    Shape.prototype.moveRight = function () {
        return this.move(1, 0);
    };
    // override these
    // return a set of points showing where this shape would be if we rotate it
    Shape.prototype.rotate = function (clockwise) {
        throw new Error("This method is abstract");
    };
    Shape.prototype.updateSprites = function () {
        for (var i = 0; i < this.points.length; i++) {
            var sprite = this.sprites[i];
            var point = this.points[i];
            var row = point.y;
            if (row < 0) {
                row = 0;
            }
            sprite.x = this.faceBgx + Grid.rowInfos[row].x + point.x * Grid.rowInfos[row].w;
            sprite.y = this.faceBgy + Grid.rowInfos[row].y;
            sprite.scale.x = 0.5 * Grid.rowInfos[row].w / 33.9; //  Nedersta raden ger scale = 0.5
            sprite.scale.y = 0.5;
        }
    };
    return Shape;
}());
var SquareShape = /** @class */ (function (_super) {
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
        // this shape does not rotate
        return this.points;
    };
    return SquareShape;
}(Shape));
var LShape = /** @class */ (function (_super) {
    __extends(LShape, _super);
    function LShape(faceBgx, faceBgy, leftHanded, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        _this.leftHanded = leftHanded;
        var x = cols / 2;
        var y = -2;
        _this.points = [];
        _this.points.push(new Point(x, y - 1));
        _this.points.push(new Point(x, y)); // 1 is our base point
        _this.points.push(new Point(x, y + 1));
        _this.points.push(new Point(x + (leftHanded ? -1 : 1), y + 1));
        _this.sprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources["box"].texture));
        _this.sprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources["box"].texture));
        _this.sprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources["box"].texture));
        _this.sprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources["box"].texture));
        _this.updateSprites();
        for (var n = 0; n < _this.sprites.length; n++) {
            Game.app.stage.addChild(_this.sprites[n]);
        }
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
var StepShape = /** @class */ (function (_super) {
    __extends(StepShape, _super);
    function StepShape(faceBgx, faceBgy, leftHanded, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        _this.leftHanded = leftHanded;
        var x = cols / 2;
        var y = -1;
        _this.points = [];
        _this.points.push(new Point(x + (leftHanded ? 1 : -1), y));
        _this.points.push(new Point(x, y)); // point 1 is our base point
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
var StraightShape = /** @class */ (function (_super) {
    __extends(StraightShape, _super);
    function StraightShape(faceBgx, faceBgy, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        var x = cols / 2;
        var y = -2;
        _this.points = [];
        _this.points.push(new Point(x, y - 2));
        _this.points.push(new Point(x, y - 1));
        _this.points.push(new Point(x, y)); // point 2 is our base point
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
var TShape = /** @class */ (function (_super) {
    __extends(TShape, _super);
    function TShape(faceBgx, faceBgy, cols) {
        var _this = _super.call(this, faceBgx, faceBgy) || this;
        _this.points = [];
        var x = cols / 2;
        var y = -2;
        _this.points.push(new Point(x - 1, y));
        _this.points.push(new Point(x, y)); // point 1 is our base point
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
//# sourceMappingURL=shapes.js.map